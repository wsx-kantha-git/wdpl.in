import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  job_type: string;
  seniority_level?: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  perks?: string[];
  status: "open" | "closed"; // matches AdminDashboard
  created_at: string;
  updated_at: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchJobs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("job_postings")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
      return;
    }

    // ✅ Map status to correct union type
    const mappedJobs: JobPosting[] = (data || []).map(job => ({
      ...job,
      status: job.status === "open" ? "open" : "closed",
    }));

    setJobs(mappedJobs);
    setLoading(false);
  };

  fetchJobs();
}, []);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(251,146,60,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] animate-pulse"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm md:text-base font-semibold border border-primary/20 hover:scale-110 transition-transform duration-300">
              We’re Hiring!
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold  mb-6 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
            Open Positions
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Join our team and build your career with WDPL
          </p>
        </div>
      </section>

      {/* Job List Section */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg animate-pulse">
                Loading open positions...
              </p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No jobs available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 max-w-5xl mx-auto">
              {jobs.map((job, index) => (
                <Card
                  key={job.id}
                  className={`overflow-hidden group transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 hover:border-primary/60 bg-gradient-to-br from-background to-secondary/20 hover:from-primary/5 hover:to-accent/10`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {job.title}
                        </h2>
                        <div className="flex flex-wrap gap-3 items-center">
                          <Badge
                            variant="secondary"
                            className="capitalize text-sm px-3 py-1 group-hover:border-primary/40 transition-colors"
                          >
                            {job.department}
                          </Badge>

                          <div className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors duration-300 group-hover:text-primary">
                            <MapPin size={18} />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors duration-300 group-hover:text-accent">
                            <Briefcase size={18} />
                            <span>{job.job_type}</span>
                          </div>

                          {job.seniority_level && (
                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors duration-300 group-hover:text-accent">
                              <Clock size={18} />
                              <span>{job.seniority_level}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        asChild
                        variant="brand"
                        className="hover:scale-110 hover:shadow-xl transition-all duration-300 self-start"
                      >
                        <Link to={`/careers/${job.id}`}>Apply Now</Link>
                      </Button>
                    </div>

                    <p className="text-muted-foreground mb-6 text-base leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {job.description}
                    </p>

                    {job.perks && job.perks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.perks.slice(0, 4).map((perk, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                          >
                            {perk}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
