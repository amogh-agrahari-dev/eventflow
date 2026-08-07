import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
// import { setToken } from "../lib/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginUser = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter your email and password to continue.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Matches JSON LoginRequest schema
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed. Please check your credentials.");
      }

      // Store Bearer Token
      setToken(data.access_token);
      setLoading(false);
      // Redirect to Role Selection
      router.push("/select-role")
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Sign in — EventHub Campus Portal</title>
        <meta
          name="description"
          content="Sign in to EventHub Campus to manage college events, volunteer tasks, QR check-ins and live attendance dashboards."
        />
        <meta property="og:title" content="Sign in — EventHub Campus Portal" />
        <meta
          property="og:description"
          content="Role-based access for organizers, volunteers and attendees in one centralized event management portal."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthShell
        eyebrow="Welcome back"
        title="Sign in to your portal"
        subtitle="Organizers, volunteers and attendees share one login — your dashboard adapts to your role."
        footer={
          <>
            New to the portal?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-white underline underline-offset-4 hover:text-[#00E5FF] transition-colors"
            >
              Create an account
            </Link>
          </>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(e) => loginUser(e)}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">College email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu"
              value={email}
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <button type="button" className="text-xs text-[#8F9BB3] hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              maxLength={72}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#8F9BB3]">
            <Checkbox id="remember" />
            Keep me signed in on this device
          </label>

          <Button type="submit" variant="hero" className="w-full">
            Sign in
          </Button>

          {loading && (
            <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm text-muted-foreground">Signing in...</p>
              </div>
          )}
        </form>
      </AuthShell>
    </>
  );
}
