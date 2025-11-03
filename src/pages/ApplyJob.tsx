import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Briefcase } from "lucide-react";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app, this would upload to Supabase
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
    
    setTimeout(() => {
      navigate("/careers");
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-12">
        <div className="container max-w-3xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/careers")}
            className="mb-6 animate-fade-in hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Button>

          <Card className="border-primary/20 shadow-lg backdrop-blur-sm bg-card/95 animate-fade-in-up">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 animate-bounce-in">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-raleway font-bold">Apply for Position</CardTitle>
              <CardDescription className="text-lg font-source">
                Join our innovative team and make a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                  <Label htmlFor="name" className="font-raleway font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-primary/30 focus:border-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                  <Label htmlFor="email" className="font-raleway font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-primary/30 focus:border-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
                  <Label htmlFor="phone" className="font-raleway font-semibold">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-primary/30 focus:border-primary transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
                  <Label htmlFor="resume" className="font-raleway font-semibold">Resume/CV *</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="border-primary/30 focus:border-primary transition-all"
                    />
                    <Upload className="h-5 w-5 text-muted-foreground animate-float" />
                  </div>
                  {formData.resume && (
                    <p className="text-sm text-primary font-source">
                      Selected: {formData.resume.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
                  <Label htmlFor="coverLetter" className="font-raleway font-semibold">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="min-h-[200px] border-primary/30 focus:border-primary transition-all font-source"
                    placeholder="Tell us why you'd be a great fit for this role..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-lg py-6 font-raleway font-semibold animate-scale-in hover:scale-105 transition-transform"
                  style={{ animationDelay: "0.6s", animationFillMode: "both" }}
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyJob;
