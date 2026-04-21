import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserPlus, Copy, Check } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(100),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  role: z.enum(["admin", "staff"]),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
});

interface Props {
  onCreated?: () => void;
}

const CreateEmployeeDialog = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<{ employee_id: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(formData);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-create-user", {
      body: parsed.data,
    });
    setLoading(false);

    if (error || !data?.ok) {
      return toast.error(data?.error ?? error?.message ?? "Failed to create employee");
    }

    setCreated({ employee_id: data.employee_id, password: parsed.data.password });
    toast.success(`Employee ${data.employee_id} created`);
    onCreated?.();
  };

  const reset = () => {
    setCreated(null);
    setCopied(false);
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) reset();
  };

  const copyCredentials = async () => {
    if (!created) return;
    await navigator.clipboard.writeText(
      `Employee ID: ${created.employee_id}\nPassword: ${created.password}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="hero" size="sm">
          <UserPlus className="h-4 w-4 mr-2" /> Create employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {created ? (
          <>
            <DialogHeader>
              <DialogTitle>Employee created</DialogTitle>
              <DialogDescription>
                Share these credentials with the employee. The password is shown only once.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 rounded-md border bg-muted/40 p-4">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Employee ID
                </Label>
                <p className="font-mono text-lg font-semibold">{created.employee_id}</p>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Temporary password
                </Label>
                <p className="font-mono text-lg font-semibold break-all">{created.password}</p>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={copyCredentials}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy credentials"}
              </Button>
              <Button onClick={() => handleOpenChange(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create employee account</DialogTitle>
              <DialogDescription>
                The system auto-generates an Employee ID. The employee will sign in with that ID
                and the password you set here.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ce-name">Full name</Label>
                <Input id="ce-name" name="full_name" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="ce-role">Role</Label>
                  <Select name="role" defaultValue="staff">
                    <SelectTrigger id="ce-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ce-phone">Phone (optional)</Label>
                  <Input id="ce-phone" name="phone" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ce-email">Email (optional)</Label>
                <Input id="ce-email" name="email" type="email" placeholder="Leave blank to auto-generate" />
                <p className="text-xs text-muted-foreground">
                  Used internally for password reset. Not required for sign-in.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ce-password">Initial password</Label>
                <Input id="ce-password" name="password" type="text" minLength={8} required />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters. Share securely with the employee.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create employee"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployeeDialog;
