"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Welcome, {user.userName}!
          </h2>
          <p className="text-muted-foreground">
            You are now logged in to your AgriScan account.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Account Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Username:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
