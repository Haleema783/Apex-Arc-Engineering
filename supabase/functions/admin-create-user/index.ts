import { createClient, corsHeaders } from "@supabase/supabase-js";

// Admin-only edge function for creating employee accounts.
// Validates the caller has the 'admin' role, then provisions the auth user
// (email auto-confirmed) and lets the existing handle_new_user trigger
// populate the profile + role rows.

interface CreatePayload {
  full_name: string;
  password: string;
  role: "admin" | "staff";
  phone?: string;
  email?: string; // optional real email; otherwise we synthesize one
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Missing Authorization header" }, 401);
    }

    // 1) Verify caller and check admin role
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return json({ error: "Invalid session" }, 401);
    }
    const callerId = userData.user.id;

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

    const { data: callerRoles } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId);
    const isAdmin = (callerRoles ?? []).some((r) => r.role === "admin");
    if (!isAdmin) return json({ error: "Admin access required" }, 403);

    // 2) Validate payload
    const body = (await req.json()) as Partial<CreatePayload>;
    const full_name = (body.full_name ?? "").trim();
    const password = body.password ?? "";
    const role = body.role === "admin" ? "admin" : "staff";
    const phone = (body.phone ?? "").trim() || null;

    if (full_name.length < 2 || full_name.length > 100) {
      return json({ error: "Full name must be 2–100 characters" }, 400);
    }
    if (password.length < 8 || password.length > 100) {
      return json({ error: "Password must be 8–100 characters" }, 400);
    }

    // 3) Mint Employee ID up-front so we can echo it back and use it in email
    const { data: empIdRow, error: empIdErr } = await admin.rpc("next_employee_id");
    if (empIdErr || !empIdRow) {
      return json({ error: empIdErr?.message ?? "Failed to generate employee ID" }, 500);
    }
    const employee_id = empIdRow as string;

    // 4) Determine login email — real one if provided, otherwise synthesize
    const providedEmail = (body.email ?? "").trim().toLowerCase();
    const email =
      providedEmail.length > 0
        ? providedEmail
        : `${employee_id.toLowerCase()}@apexarc.local`;

    // 5) Create the auth user (email auto-confirmed so admin's chosen
    // password works immediately without an inbox round-trip)
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        phone,
        employee_id,
        role,
      },
    });
    if (createErr || !created.user) {
      return json({ error: createErr?.message ?? "Failed to create user" }, 400);
    }

    return json({
      ok: true,
      user_id: created.user.id,
      employee_id,
      email,
    });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
