import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/app/actions/user.actions";
import { Sparkles } from "lucide-react";
import { SubmitButton } from "./submit-button";

export default async function WelcomePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress;
  if (email) {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="text-primary w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to AppliAI!</CardTitle>
          <CardDescription>
            Let&apos;s get started. Please enter your full name so we can personalize your applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerUser} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Full Name
              </label>
              <Input 
                id="name" 
                name="name" 
                placeholder="e.g. John Doe" 
                required 
                autoComplete="name"
                className="w-full"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
