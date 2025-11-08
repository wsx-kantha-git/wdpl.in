import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionSet, setSessionSet] = useState(false);

  useEffect(() => {
    // Extract the token part correctly when using HashRouter
    const fullHash = window.location.hash; 
    // e.g. "#/reset-password#access_token=..."
    const tokenPart = fullHash.split("#").pop(); // last part after second '#'
    const params = new URLSearchParams(tokenPart);

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            toast({
              title: "Session Error",
              description: error.message,
              variant: "destructive",
            });
          } else {
            setSessionSet(true);
          }
        });
    } else {
      toast({
        title: "Invalid Link",
        description: "Your reset link is invalid or expired.",
        variant: "destructive",
      });
    }
  }, []);

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    if (!sessionSet) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      toast({
        title: "Password Updated!",
        description: "You can now log in with your new password.",
      });
      navigate("/wdpl.in/#/admin/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error resetting password";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-card p-8 rounded-2xl shadow-2xl border border-primary/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Reset Password</h2>
        <Input
          type="password"
          required
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 border-primary/30 focus:border-primary"
        />
        <Button type="submit" disabled={loading || !sessionSet} className="w-full">
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
