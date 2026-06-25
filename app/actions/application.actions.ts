"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveGeneratedApplication(data: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  language: string;
  matchScore: number;
  cvData: {
    skills: string[];
    projects: any[];
    experience: any[];
  };
  coverLetterContent: string;
}) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Ensure the user exists in our local database first
  const dbUser = await prisma.users.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // If not found by ID (Clerk ID), upsert by email
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) throw new Error("User email not found");

    await prisma.users.upsert({
      where: { email },
      update: { name: user.fullName || "User" },
      create: {
        id: user.id,
        email,
        name: user.fullName || "User",
      },
    });
  }

  try {
    // Create the Application record along with CvAnalyse and GeneratedLetters in a transaction
    const application = await prisma.applications.create({
      data: {
        user_id: user.id,
        company_name: data.companyName,
        job_title: data.jobTitle,
        job_description: data.jobDescription,
        language: data.language,
        match_score: data.matchScore,
        cv_analyse: {
          create: {
            extracted_skills: data.cvData.skills,
            extracted_projects: data.cvData.projects,
            extracted_experience: data.cvData.experience,
          },
        },
        generated_letters: {
          create: {
            content: data.coverLetterContent,
            language: data.language,
          },
        },
      },
    });

    revalidatePath("/applications");
    revalidatePath("/dashboard");

    return { success: true, applicationId: application.id };
  } catch (error) {
    console.error("Error saving application:", error);
    throw new Error("Failed to save application to database");
  }
}

export async function updateGeneratedLetter(applicationId: string, content: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  try {
    // First, verify the application belongs to this user
    const app = await prisma.applications.findUnique({
      where: { id: applicationId },
      select: { user_id: true },
    });

    if (!app || app.user_id !== user.id) {
      throw new Error("Access denied or application not found");
    }

    // Update or create the generated letter
    const letter = await prisma.generatedLetters.findFirst({
      where: { application_id: applicationId },
    });

    if (letter) {
      await prisma.generatedLetters.update({
        where: { id: letter.id },
        data: { content },
      });
    } else {
      await prisma.generatedLetters.create({
        data: {
          application_id: applicationId,
          content,
          language: "en", // default or dynamically look up from app
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating cover letter:", error);
    throw new Error("Failed to save cover letter changes");
  }
}

export async function getUserApplications() {
  const user = await currentUser();
  if (!user) return [];

  try {
    return await prisma.applications.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function getCoverLetter(applicationId: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  try {
    const app = await prisma.applications.findUnique({
      where: { id: applicationId },
      include: {
        generated_letters: {
          orderBy: { generated_at: "desc" },
          take: 1,
        },
      },
    });

    if (!app || app.user_id !== user.id) {
      throw new Error("Access denied or application not found");
    }

    return {
      application: app,
      letter: app.generated_letters[0] || null,
    };
  } catch (error) {
    console.error("Error fetching cover letter:", error);
    throw new Error("Failed to fetch cover letter data");
  }
}
