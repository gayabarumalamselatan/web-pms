"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/users";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the CMS
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  placeholder="admin"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            {state?.error && (
              <p className="text-sm font-medium text-destructive text-center">
                {state.error}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full py-6 text-lg font-semibold" disabled={isPending}>
              {isPending ? "Logging in..." : "Login to Dashboard"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
