import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Linkedin, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

// Types
type TeamMemberRow = Tables<"team_members">;
type SkillRow = Tables<"skills">;
type DepartmentRow = Tables<"departments">;

interface TeamMember extends TeamMemberRow {
  department_name?: string | null;
  skills?: SkillRow[];
  photo_url?: string | null;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [departments, setDepartments] = useState<string[]>([]);

  // Fetch active departments
  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("name")
      .eq("active", true);

    if (error) console.error(error);
    else setDepartments(["all", ...(data?.map((d) => d.name) || [])]);
  };

  // Fetch team members + their skills + department name (ordered by id ascending)
  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select(`
        *,
        skills (*),
        departments!inner(name)
      `)
      .eq("active", true)
      .order("id", { ascending: true }); // Order by id ascending (oldest first)

    if (error) {
      console.error(error);
      return;
    }

    const members: TeamMember[] = (data ?? []).map(
      (member: TeamMemberRow & { skills: SkillRow[]; departments: DepartmentRow }) => ({
        ...member,
        department_name: member.departments?.name ?? null,
        skills: member.skills ?? [],
        photo_url: member.image_url ?? null,
      })
    );

    setTeamMembers(members);
  };

  useEffect(() => {
    fetchDepartments();
    fetchTeamMembers();
  }, []);

  const filteredMembers =
    selectedDepartment === "all"
      ? teamMembers
      : teamMembers.filter(
          (m) => m.department_name?.toLowerCase() === selectedDepartment.toLowerCase()
        );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed">
            The talented individuals who make WDPL a great place to work
          </p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 bg-background/70 backdrop-blur-sm border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
                className="capitalize"
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-muted-foreground text-lg">
                No team members found in this department.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className="overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 hover:-translate-y-3 hover:rotate-0 animate-fade-in border-2 hover:border-primary/50"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Image */}
                  <div className="w-full h-64 relative overflow-hidden bg-secondary">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-100 group-hover:rotate-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
                        <span className="text-7xl font-bold text-primary">{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="capitalize">
                        {member.department_name}
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <MapPin size={12} />
                        <span className="capitalize">{member.location}</span>
                      </div>
                    </div>

                    {member.description && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{member.description}</p>
                    )}

                    {member.skills && member.skills.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {member.skills.slice(0, 3).map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-foreground">{skill.name}</span>
                              <span className="text-muted-foreground">{skill.percentage}%</span>
                            </div>
                            <Progress value={skill.percentage ?? 0} className="h-1" />
                          </div>
                        ))}
                      </div>
                    )}

                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                      >
                        LinkedIn
                      </a>
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

export default Team;
