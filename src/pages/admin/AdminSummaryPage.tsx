import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, MessageCircle, Star, Image, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import wdplLogo from "@/assets/wdpl-logo-white.svg";

export default function AdminSummaryPage() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    teamMembers: 0,
    jobsOpen: 0,
    jobsClosed: 0,
    testimonials: 0,
    contacts: 0,
    gallery: 0,
  });
  const [userEmail, setUserEmail] = useState("");

  // Fetch counts
  useEffect(() => {
  const fetchSummary = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
        return;
      }

      setUserEmail(session.user.email);

      const { count: teamCount } = await supabase
        .from("team_members")
        .select("*", { count: "exact", head: true });

      const { data: jobsData } = await supabase.from("job_postings").select("*");
      const jobsOpen = jobsData?.filter((j) => j.status === "open").length || 0;
      const jobsClosed = jobsData?.filter((j) => j.status === "closed").length || 0;

      const { count: testimonialsCount } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true });

      const { count: contactsCount } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true });

      const { count: galleryCount } = await supabase
        .from("gallery_images")
        .select("*", { count: "exact", head: true });

      setSummary({
        teamMembers: teamCount || 0,
        jobsOpen,
        jobsClosed,
        testimonials: testimonialsCount || 0,
        contacts: contactsCount || 0,
        gallery: galleryCount || 0,
      });
    } catch (err) {
      console.error(err);
    }
  };
    fetchSummary();
}, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleNavigate = (tab: string) => {
    navigate("/admin/dashboard", { state: { tab } });
  };

  const handleVisitSite = () => {
window.open("https://wsx-kantha-git.github.io/wdpl.in/", "_blank");

  };

  const tabs = [
    { label: "Team", tab: "team", icon: <Users className="h-5 w-5" /> },
    { label: "Jobs", tab: "jobs", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Testimonials", tab: "testimonials", icon: <Star className="h-5 w-5" /> },
    { label: "Contacts", tab: "contacts", icon: <MessageCircle className="h-5 w-5" /> },
    { label: "Gallery", tab: "gallery", icon: <Image className="h-5 w-5" /> },
  ];

  const cards = [
    { label: "Team Members", count: summary.teamMembers, tab: "team", icon: <Users className="h-6 w-6" /> },
    { label: "Open Jobs", count: summary.jobsOpen, tab: "jobs", icon: <Briefcase className="h-6 w-6" /> },
    { label: "Closed Jobs", count: summary.jobsClosed, tab: "jobs", icon: <Briefcase className="h-6 w-6" /> },
    { label: "Testimonials", count: summary.testimonials, tab: "testimonials", icon: <Star className="h-6 w-6" /> },
    { label: "Contacts", count: summary.contacts, tab: "contacts", icon: <MessageCircle className="h-6 w-6" /> },
    { label: "Gallery", count: summary.gallery, tab: "gallery", icon: <Image className="h-6 w-6" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-foreground text-white flex flex-col">
        <div className="flex items-center justify-center py-6 border-b border-gray-700">
          <img src={wdplLogo} alt="Logo" className="h-16 mr-5" />
        </div>
        <nav className="flex flex-col mt-4">
          {tabs.map((t) => (
            <button
              key={t.label}
              className="flex items-center gap-2 p-4 hover:bg-white hover:text-foreground text-left font-medium"
              onClick={() => handleNavigate(t.tab)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 relative">
        {/* Profile + Live Status Top-Right */}
        <div className="absolute top-6 right-6 flex items-center gap-4">
          {/* Live Status */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Live</span>
          </div>

          {/* Visit Site */}
          <Button
            variant="default"
            className="bg-gray-200 text-gray-900 hover:bg-gray-300 flex items-center gap-1"
            onClick={handleVisitSite}
          >
            <ExternalLink className="h-4 w-4" /> Visit Site
          </Button>

          {/* Email */}
          <p className="font-medium text-gray-700">{userEmail}</p>

          {/* Logout */}
          <Button
            variant="default"
            className="bg-primary text-white hover:bg-primary/80 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        <h2 className="text-3xl font-bold mb-10">Admin Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Card
              key={card.label}
              className="p-8 cursor-pointer hover:shadow-2xl transition-all flex flex-col justify-between"
              onClick={() => handleNavigate(card.tab)}
            >
              <div className="flex items-center justify-between mb-6">
                {card.icon}
                <p className="text-3xl font-bold">{card.count}</p>
              </div>
              <p className="text-lg font-medium text-gray-700">{card.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
