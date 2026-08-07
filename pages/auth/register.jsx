import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import { CalendarCheck, ClipboardList, Ticket } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button, Input, Label } from "@/components/ui";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const registerUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toast.error("Please fill in your name, email and password.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/register`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, role: "attendee" }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.detail || "Registration failed. Please try again.");
      }else{
        toast.success("Account created successfully!");
      }
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      toast.error(error.detail || "An error occurred while creating the account.");
    }

  }
  return (
    <>
      <Head>
        <title>Create account — EventHub Campus Portal</title>
        <meta
          name="description"
          content="Register as an organizer, volunteer or attendee to join your college's centralized event and volunteer management portal."
        />
        <meta property="og:title" content="Create account — EventHub Campus Portal" />
        <meta
          property="og:description"
          content="Pick your role and get a dashboard built for event management, volunteer tasks or QR check-ins."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthShell
        eyebrow="Get started"
        title="Create your account"
        subtitle="Choose your role — access to events, tasks and analytics is granted accordingly."
        footer={
          <>
            Already registered?{" "}
            <Link href="/auth/login" className="font-medium text-white underline underline-offset-4 hover:text-[#00E5FF] transition-colors">
              Sign in instead
            </Link>
          </>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(e) => registerUser(e)}
        >

          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90">Full name</Label>
            <Input
              id="name"
              value={form.name}
              maxLength={100}
              onChange={update("name")}
              placeholder="Aditi Sharma"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">College email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              maxLength={255}
              onChange={update("email")}
              placeholder="you@college.edu"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                maxLength={72}
                onChange={update("password")}
                placeholder="8+ characters"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-white/90">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                maxLength={72}
                onChange={update("confirm")}
                placeholder="Repeat password"
              />
            </div>
          </div>

          <Button type="submit" variant="hero" className="w-full">
            Create account
          </Button>
          {loading && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-sm text-muted-foreground">Creating account...</p>
            </div>
          )}
        </form>
      </AuthShell>
    </>
  );
}
