import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, Shield } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  //  Auto redirect if already logged in AND verified as admin
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const isAdmin = localStorage.getItem("isAdminAuthenticated") === "true";
      if (data.session && isAdmin) navigate("/admin/dashboard");
    };
    checkSession();
  }, [navigate]);

  //  Handle Sign In
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Sign in via Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.session) throw new Error("Session not found. Please try again.");

      // Step 2: Check if user exists in `admins` table
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You are not authorized to access the admin panel.",
          variant: "destructive",
        });
        return;
      }

      //  Step 3: Mark admin verified in localStorage
      localStorage.setItem("isAdminAuthenticated", "true");

      toast({
        title: "Login Successful!",
        description: "Redirecting to admin dashboard...",
      });

      //  Step 4: Navigate to dashboard
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  //  Handle Forgot Password
  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for reset instructions.",
      });
      setForgotMode(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send reset link";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-4 relative overflow-hidden">
      <Card className="w-full max-w-md border-primary/30 shadow-2xl backdrop-blur-md bg-card/90 animate-scale-in relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-6 animate-bounce-in shadow-lg">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-4xl font-raleway font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-lg font-source mt-2">
            {forgotMode ? "Reset your password" : "Sign in to manage your website"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!forgotMode ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-raleway font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/30 focus:border-primary transition-all font-source"
                  placeholder="admin@yourdomain.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-raleway font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/30 focus:border-primary transition-all font-source"
                  placeholder="••••••••"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  className="text-sm text-primary hover:underline font-source"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-lg py-6 font-raleway font-semibold hover:scale-105 transition-all shadow-lg"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resetEmail" className="font-raleway font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Enter your email
                </Label>
                <Input
                  id="resetEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/30 focus:border-primary transition-all font-source"
                  placeholder="your@email.com"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full text-lg py-6 font-raleway font-semibold">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setForgotMode(false)}
                  className="text-sm text-primary hover:underline font-source"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
