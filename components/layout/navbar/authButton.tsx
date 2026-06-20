"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default  function AuthButton() {
    const { user, isLoaded } =  useUser();

    if (!isLoaded) {
        return <div className="h-9 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>;
    }

    return (
        <>
            {!user ? (
                <SignInButton>
                    <Button variant={"outline"} className="text-sm font-bold cursor-pointer">Get Started</Button>
                </SignInButton>
            ) : (
                <div className="flex items-center">
                    <UserButton showName />
                </div>
            )}
        </>
    );
}