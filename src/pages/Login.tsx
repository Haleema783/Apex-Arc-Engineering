import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

// Employees sign in with the Employee ID issued by their admin.
// We look up the linked email via a SECURITY DEFINER RPC and then call
// supabase.auth.signInWithPassword under the hood.
const signInSchema = z.object({
  employee_id: z
    .string()
    .trim()
    .min(3, "Enter your Employee ID")
    .max(40)
    .regex(/^[A-Za-z0-9-]+$/, "Employee ID may only contain letters, digits, and dashes"),
  password: z.string().min(6, "Enter your password").max(100),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = signInSchema.safeParse(data);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setLoading(true);
    // Normalize EMP-#### to upper-case for consistency
    const employeeId = parsed.data.employee_id.toUpperCase();

    const { data: emailRow, error: lookupErr } = await supabase.rpc(
      "get_email_for_employee_id",
      { _employee_id: employeeId }
    );
    if (lookupErr) {
      setLoading(false);
      return toast.error(lookupErr.message);
    }
    if (!emailRow) {
      setLoading(false);
      return toast.error("Employee ID not found or account is inactive");
    }

    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: emailRow as string,
      password: parsed.data.password,
    });

    if (error) {
      setLoading(false);
      return toast.error("Incorrect Employee ID or password");
    }

    const userId = signInData.user?.id;
    if (!userId) {
      setLoading(false);
      return toast.error("Sign-in failed");
    }

    // Role-based panel routing — admins go to /admin, staff to /staff
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");

    setLoading(false);
    toast.success("Welcome back");
    navigate(isAdmin ? "/admin" : "/staff");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left visual */}
      <div className="hidden md:flex relative overflow-hidden bg-gradient-hero text-primary-foreground p-12 flex-col justify-between">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 backdrop-blur p-1">
            <BrandLogo />
          </span>
          Apex Arc Engineering
        </Link>
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight">
            Engineering ERP, built for the field and the finance team.
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            Quotations, invoices, inventory, FBR-aligned taxes, delivery challans — one system.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/60">
          Accounts are issued by your administrator. Contact them if you need access.
        </p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-sm">
          <Link to="/" className="md:hidden inline-flex items-center gap-2 mb-6 font-display text-lg font-bold text-primary">
            <span className="grid h-8 w-8 place-items-center rounded-md ring-1 ring-border p-0.5">
              <BrandLogo />
            </span>
            Apex Arc Engineering
          </Link>

          <h1 className="font-display text-2xl font-bold">Employee sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Use the Employee ID and password issued by your administrator.
          </p>
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="si-employee-id">Employee ID</Label>
              <Input
                id="si-employee-id"
                name="employee_id"
                placeholder="EMP-0001"
                autoComplete="username"
                autoCapitalize="characters"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="si-password">Password</Label>
              <Input
                id="si-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            Forgot your password? Ask an administrator to reset it for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
