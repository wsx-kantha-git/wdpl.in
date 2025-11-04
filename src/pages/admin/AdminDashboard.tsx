import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, LogOut, Plus, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminTestimonialsDashboard from "./AdminTestimonialsDashboard";
import AdminContactDashboard from "./AdminContactDashboard";
import GalleryAdminPage from "./GalleryAdminPage";

// TYPES
interface Skill {
  name: string;
  percentage: number;
}
interface ContactEntry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status?: string | null;
  created_at?: string | null;
}

interface TeamForm {
  name: string;
  role: string;
  department_id: number | null;
  location: string;
  bio: string;
  linkedin_url: string;
  image_url: string;
  skills: Skill[];
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department_id: number;
  location: string;
  description: string;
  linkedin_url: string;
  image_url: string;
  active: boolean;
}

interface JobForm {
  title: string;
  department: string;
  location: string;
  jobType: string;
  seniority_level: string;
  description: string;
  responsibilities: string;
  requirements: string;
  perks: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  job_type: string;
  seniority_level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  status: "open" | "closed";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  // Job states
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);

  // Team states
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);

  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const [teamForm, setTeamForm] = useState<TeamForm>({
    name: "",
    role: "",
    department_id: null,
    location: "",
    bio: "",
    linkedin_url: "",
    image_url: "",
    skills: [],
  });

  // transient inputs for adding skills
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillPercentage, setNewSkillPercentage] = useState<number | "">("");

  const [jobForm, setJobForm] = useState<JobForm>({
    title: "",
    department: "",
    location: "",
    jobType: "",
    seniority_level: "",
    description: "",
    responsibilities: "",
    requirements: "",
    perks: "",
  });

  //  Check admin access
  useEffect(() => {
    const checkAdminAccess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: admin, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      if (error || !admin) {
        toast({
          title: "Access Denied",
          description: "You are not authorized to access the admin panel.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchJobs();
      fetchDepartments();
      fetchTeamMembers();
    };
    checkAdminAccess();
  }, [navigate]);
  //  Fetch departments
  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .eq("active", true)
      .order("name", { ascending: true });

    if (error) console.error(error);
    else setDepartments(data ?? []);
  };

  //  Fetch team members
  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      toast({
        title: "Error fetching team members",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTeamMembers(data as TeamMember[]);
    }
  };

  //  Add new department
  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim()) return;
    const { data, error } = await supabase
      .from("departments")
      .insert({ name: newDepartmentName, active: true })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Department added",
      description: `"${data.name}" added successfully`,
    });
    setDepartments((prev) => [...prev, data]);
    setTeamForm({ ...teamForm, department_id: data.id });
    setNewDepartmentName("");
  };

  //  Upload image
  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("team-profile-pictures")
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      return "";
    }

    const { publicUrl } = supabase.storage
      .from("team-profile-pictures")
      .getPublicUrl(filePath).data;

    return publicUrl;
  };

  //  Fetch jobs
  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_postings")
      .select("*")
      .order("id", { ascending: false });

    if (error)
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
    else setJobs(data as Job[]);
  };

  //  Logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
      localStorage.removeItem("isAdminAuthenticated");
      toast({ title: "Logged out successfully" });
      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      toast({
        title: "Logout Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add skill to teamForm.skills
  const addSkillToForm = () => {
    const name = newSkillName.trim();
    const percentage =
      typeof newSkillPercentage === "number"
        ? newSkillPercentage
        : Number(newSkillPercentage);
    if (!name || isNaN(percentage)) {
      toast({
        title: "Skill name and percentage required",
        variant: "destructive",
      });
      return;
    }
    if (percentage < 0 || percentage > 100) {
      toast({
        title: "Percentage must be between 0 and 100",
        variant: "destructive",
      });
      return;
    }
    setTeamForm({
      ...teamForm,
      skills: [...teamForm.skills, { name, percentage }],
    });
    setNewSkillName("");
    setNewSkillPercentage("");
  };

  const removeSkillFromForm = (index: number) => {
    setTeamForm({
      ...teamForm,
      skills: teamForm.skills.filter((_, i) => i !== index),
    });
  };

  //  Add / Update Team Member
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {
      name,
      role,
      department_id,
      location,
      bio,
      linkedin_url,
      image_url,
      skills,
    } = teamForm;

    try {
      if (editingTeamId) {
        // Update member
        const { error } = await supabase
          .from("team_members")
          .update({
            name,
            role,
            department_id,
            location,
            description: bio,
            linkedin_url,
            image_url,
          })
          .eq("id", editingTeamId);

        if (error) throw error;

        // Replace skills: delete existing then insert new
        const { error: delErr } = await supabase
          .from("skills")
          .delete()
          .eq("team_member_id", editingTeamId);

        if (delErr) throw delErr;

        if (skills.length) {
          const skillsInsert = skills.map((skill) => ({
            team_member_id: editingTeamId,
            name: skill.name,
            percentage: skill.percentage,
          }));
          const { error: insertErr } = await supabase
            .from("skills")
            .insert(skillsInsert);
          if (insertErr) throw insertErr;
        }

        toast({ title: "Team member updated successfully!" });
      } else {
        // Create member
        const { data, error } = await supabase
          .from("team_members")
          .insert({
            name,
            role,
            department_id,
            location,
            description: bio,
            linkedin_url,
            image_url,
            active: true,
          })
          .select()
          .single();

        if (error) throw error;

        if (skills.length && data?.id) {
          const skillsInsert = skills.map((skill) => ({
            team_member_id: data.id,
            name: skill.name,
            percentage: skill.percentage,
          }));
          const { error: insertErr } = await supabase
            .from("skills")
            .insert(skillsInsert);
          if (insertErr) throw insertErr;
        }

        toast({ title: "Team member added successfully!" });
      }

      setTeamForm({
        name: "",
        role: "",
        department_id: null,
        location: "",
        bio: "",
        linkedin_url: "",
        image_url: "",
        skills: [],
      });
      setEditingTeamId(null);
      setNewSkillName("");
      setNewSkillPercentage("");
      fetchTeamMembers();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  //  Edit Team Member (fetch skills too)
  const handleEditTeamMember = async (member: TeamMember) => {
    setEditingTeamId(member.id);
    // populate basic fields
    setTeamForm({
      name: member.name,
      role: member.role,
      department_id: member.department_id,
      location: member.location,
      bio: member.description,
      linkedin_url: member.linkedin_url,
      image_url: member.image_url,
      skills: [],
    });

    // fetch skills for this member
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("team_member_id", member.id)
      .order("id", { ascending: true });

    if (error) {
      toast({
        title: "Error loading skills",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const fetchedSkills: Skill[] = (data || []).map(
      (s: { name: string; percentage?: number }) => ({
        name: s.name,
        percentage: s.percentage ?? 0,
      })
    );
    setTeamForm((prev) => ({ ...prev, skills: fetchedSkills }));
  };

  //  Toggle Team Member Active/Inactive
  const handleToggleTeamStatus = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("team_members")
      .update({ active: !currentStatus })
      .eq("id", id);

    if (error)
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({
        title: "Status Updated",
        description: `Team member is now ${
          !currentStatus ? "Active" : "Inactive"
        }`,
      });
      setTeamMembers((prev) =>
        prev.map((member) =>
          member.id === id ? { ...member, active: !currentStatus } : member
        )
      );
    }
  };

  //  Delete Team Member (also delete skills)
  const handleDeleteTeamMember = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this team member?"))
      return;

    try {
      const { error: delSkillsErr } = await supabase
        .from("skills")
        .delete()
        .eq("team_member_id", id);
      if (delSkillsErr) throw delSkillsErr;

      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);
      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Team member removed successfully.",
      });
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast({
        title: "Error deleting",
        description: message,
        variant: "destructive",
      });
    }
  };

  //  Add / Update Job
  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const responsibilities = jobForm.responsibilities
      .split("\n")
      .filter(Boolean);
    const requirements = jobForm.requirements.split("\n").filter(Boolean);
    const perks = jobForm.perks.split("\n").filter(Boolean);

    if (editingJobId) {
      const { error } = await supabase
        .from("job_postings")
        .update({
          title: jobForm.title,
          department: jobForm.department,
          location: jobForm.location,
          job_type: jobForm.jobType,
          seniority_level: jobForm.seniority_level,
          description: jobForm.description,
          responsibilities,
          requirements,
          perks,
        })
        .eq("id", editingJobId);
      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else {
        toast({
          title: "Job Updated!",
          description: "The job posting has been updated successfully.",
        });
        setEditingJobId(null);
      }
    } else {
      const { error } = await supabase.from("job_postings").insert({
        title: jobForm.title,
        department: jobForm.department,
        location: jobForm.location,
        job_type: jobForm.jobType,
        seniority_level: jobForm.seniority_level,
        description: jobForm.description,
        responsibilities,
        requirements,
        perks,
        status: "open",
      });
      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else
        toast({
          title: "Job Posted!",
          description: "The job posting has been published successfully.",
        });
    }

    setJobForm({
      title: "",
      department: "",
      location: "",
      jobType: "",
      seniority_level: "",
      description: "",
      responsibilities: "",
      requirements: "",
      perks: "",
    });
    fetchJobs();
    setLoading(false);
  };

  //  Edit Job
  const handleEditJob = (job: Job) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      jobType: job.job_type,
      seniority_level: job.seniority_level,
      description: job.description,
      responsibilities: job.responsibilities.join("\n"),
      requirements: job.requirements.join("\n"),
      perks: job.perks.join("\n"),
    });

    document
      .querySelector('[data-value="jobs"]')
      ?.dispatchEvent(new Event("click"));
  };

  //  Toggle Job Status
  const handleToggleStatus = async (
    jobId: number,
    currentStatus: Job["status"]
  ) => {
    const newStatus: Job["status"] =
      currentStatus === "open" ? "closed" : "open";
    const { error } = await supabase
      .from("job_postings")
      .update({ status: newStatus })
      .eq("id", jobId);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    else {
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
      );
      toast({
        title: "Status updated",
        description: `Job is now ${newStatus}`,
      });
    }
  };

  //  Delete Job
  const handleDeleteJob = async (jobId: number) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;
    const { error } = await supabase
      .from("job_postings")
      .delete()
      .eq("id", jobId);
    if (error)
      toast({
        title: "Error deleting job",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({
        title: "Job Deleted",
        description: "The job posting has been removed successfully.",
      });
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    }
  };

  if (!isAdmin) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background py-12">
        <div className="container max-w-7xl">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-raleway font-bold">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground font-source mt-2">
                Manage your team and job postings
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>

          <Tabs defaultValue="team" className="animate-fade-in-up">
            <TabsList className="flex flex-wrap md:grid md:grid-cols-5 gap-2 mb-4 overflow-x-auto scrollbar-hide">

              {" "}
              {/* 5 columns */}
              <TabsTrigger value="team" className="gap-2 font-raleway">
                <Users className="h-4 w-4" /> Team Management
              </TabsTrigger>
              <TabsTrigger value="jobs" className="gap-2 font-raleway">
                <Briefcase className="h-4 w-4" /> Job Postings
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-2 font-raleway">
                <Users className="h-4 w-4" /> Contact Submissions
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2 font-raleway">
                <Users className="h-4 w-4" /> Testimonials
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-2 font-raleway">
                <Users className="h-4 w-4" /> Gallery
              </TabsTrigger>
            </TabsList>

            {/* ---------------- TEAM MANAGEMENT ---------------- */}
            <TabsContent value="team">
              <Card className="border-primary/20 shadow-lg animate-slide-in-up">
                <CardHeader>
                  <CardTitle className="font-raleway flex items-center gap-2">
                    <Plus className="h-5 w-5" />{" "}
                    {editingTeamId ? "Edit Team Member" : "Add New Team Member"}
                  </CardTitle>
                  <CardDescription className="font-source">
                    Upload team member details with skills, photo, and LinkedIn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* TEAM FORM */}
                  <form onSubmit={handleTeamSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          required
                          value={teamForm.name}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input
                          required
                          value={teamForm.role}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, role: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Select
                          value={teamForm.department_id?.toString() ?? ""}
                          onValueChange={(val) =>
                            setTeamForm({
                              ...teamForm,
                              department_id: Number(val),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((d) => (
                              <SelectItem key={d.id} value={d.id.toString()}>
                                {d.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex mt-2 gap-2">
                          <Input
                            placeholder="Add new department"
                            value={newDepartmentName}
                            onChange={(e) =>
                              setNewDepartmentName(e.target.value)
                            }
                          />
                          <Button type="button" onClick={handleAddDepartment}>
                            Add
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Select
                          value={teamForm.location}
                          onValueChange={(val) =>
                            setTeamForm({ ...teamForm, location: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chennai">Chennai</SelectItem>
                            <SelectItem value="coimbatore">
                              Coimbatore
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>LinkedIn URL</Label>
                        <Input
                          value={teamForm.linkedin_url}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              linkedin_url: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Profile Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const url = await handleImageUpload(
                                e.target.files[0]
                              );
                              setTeamForm({ ...teamForm, image_url: url });
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* SKILLS SECTION (inside same form) */}
                    <div>
                      <Label>Skills</Label>
                      <div className="flex gap-2 items-center mt-2">
                        <Input
                          placeholder="Skill name (e.g. React)"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          placeholder="%"
                          value={newSkillPercentage}
                          onChange={(e) =>
                            setNewSkillPercentage(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          className="w-28"
                          min={0}
                          max={100}
                        />
                        <Button type="button" onClick={addSkillToForm}>
                          + Add Skill
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {teamForm.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full"
                          >
                            <span className="font-medium">
                              {skill.name} ({skill.percentage}%)
                            </span>
                            <button
                              type="button"
                              onClick={() => removeSkillFromForm(idx)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        required
                        value={teamForm.bio}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, bio: e.target.value })
                        }
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading
                        ? "Saving..."
                        : editingTeamId
                        ? "Update Member"
                        : "Add Team Member"}
                    </Button>
                  </form>

                  {/* TEAM MEMBER LIST */}
                  <div className="mt-10">
                    <h2 className="text-2xl font-raleway font-bold mb-4">
                      Existing Team Members
                    </h2>
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <Card
                          key={member.id}
                          className="border-primary/20 shadow-md p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-4">
                            {member.image_url && (
                              <img
                                src={member.image_url}
                                alt={member.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-raleway font-semibold">
                                {member.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {member.role} • {member.location}
                              </p>
                              {/* show skills preview */}
                              <div className="mt-1 text-sm">
                                {/* fetch skills from DB when rendering? we fetch on edit; show nothing if not loaded */}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              onClick={() => handleEditTeamMember(member)}
                            >
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteTeamMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <span className="text-sm">
                                {member.active ? "Active" : "Inactive"}
                              </span>
                              <input
                                type="checkbox"
                                checked={member.active}
                                onChange={() =>
                                  handleToggleTeamStatus(
                                    member.id,
                                    member.active
                                  )
                                }
                                className="toggle toggle-primary"
                              />
                            </label>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- JOB POSTINGS ---------------- */}
            {/* JOB FORM & LIST */}
            <TabsContent value="jobs">
              <Card className="border-primary/20 shadow-lg animate-slide-in-right">
                <CardHeader>
                  <CardTitle className="font-raleway flex items-center gap-2">
                    <Plus className="h-5 w-5" />{" "}
                    {editingJobId
                      ? "Edit Job Posting"
                      : "Create New Job Posting"}
                  </CardTitle>
                  <CardDescription className="font-source">
                    Add or edit a position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJobSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Job Title</Label>
                        <Input
                          required
                          value={jobForm.title}
                          onChange={(e) =>
                            setJobForm({ ...jobForm, title: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Input
                          required
                          value={jobForm.department}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              department: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          required
                          value={jobForm.location}
                          onChange={(e) =>
                            setJobForm({ ...jobForm, location: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Job Type</Label>
                        <Input
                          required
                          value={jobForm.jobType}
                          onChange={(e) =>
                            setJobForm({ ...jobForm, jobType: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Seniority Level</Label>
                        <Input
                          required
                          value={jobForm.seniority_level}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              seniority_level: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        required
                        value={jobForm.description}
                        onChange={(e) =>
                          setJobForm({
                            ...jobForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Responsibilities (one per line)</Label>
                      <Textarea
                        value={jobForm.responsibilities}
                        onChange={(e) =>
                          setJobForm({
                            ...jobForm,
                            responsibilities: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Requirements (one per line)</Label>
                      <Textarea
                        value={jobForm.requirements}
                        onChange={(e) =>
                          setJobForm({
                            ...jobForm,
                            requirements: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Perks (one per line)</Label>
                      <Textarea
                        value={jobForm.perks}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, perks: e.target.value })
                        }
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading
                        ? "Saving..."
                        : editingJobId
                        ? "Update Job"
                        : "Publish Job"}
                    </Button>
                  </form>

                  {/* Job List */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-raleway font-bold mb-4">
                      Existing Job Postings
                    </h2>
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <Card
                          key={job.id}
                          className="border-primary/20 shadow-md p-4 flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-raleway font-semibold">
                              {job.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {job.department} • {job.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button
                              size="sm"
                              onClick={() => handleEditJob(job)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <span className="text-sm">
                                {job.status === "open" ? "Open" : "Closed"}
                              </span>
                              <input
                                type="checkbox"
                                checked={job.status === "open"}
                                onChange={() =>
                                  handleToggleStatus(job.id, job.status)
                                }
                                className="toggle toggle-primary"
                              />
                            </label>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
           
            {/* CONTACT SUBMISSIONS */}

            <TabsContent value="contacts">
              <Card className="border-primary/20 shadow-lg animate-slide-in-up">
                <AdminContactDashboard />
              </Card>
            </TabsContent>

            {/* TESTIMONIALS */}
            <TabsContent value="testimonials">
              <Card className="border-primary/20 shadow-lg animate-slide-in-up">
                <CardHeader>
                  <CardTitle className="font-raleway">
                    Testimonials Management
                  </CardTitle>
                  <CardDescription className="font-source">
                    Add, edit, and manage client testimonials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add form to create testimonial, list existing testimonials, edit/delete */}
                  <AdminTestimonialsDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            {/* GALLERY */}
            <TabsContent value="gallery">
              <Card className="border-primary/20 shadow-lg animate-slide-in-up">
                <CardHeader>
                  <CardTitle className="font-raleway">
                    Gallery Management
                  </CardTitle>
                  <CardDescription className="font-source">
                    Upload, edit, and manage gallery images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add form to upload images, list existing images, delete/edit */}
                  <GalleryAdminPage />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
