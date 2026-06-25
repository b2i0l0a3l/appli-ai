"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  
  if (!name || name.trim() === "") {
    throw new Error("Name is required");
  }

  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const email = user.emailAddresses[0]?.emailAddress;
  
  if (!email) {
    throw new Error("User email not found");
  }

  try {
    await prisma.users.upsert({
      where: { email },
      update: { name },
      create: {
        id: user.id, 
        email,
        name,
      }
    });
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Failed to save user to database");
  }

  redirect("/dashboard");
}
