import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Coffee,
  Plane,
  PartyPopper,
  Heart,
  Users,
} from "lucide-react";
import cultureCelebration from "@/assets/culture-celebration.jpg";
import cultureTraining from "@/assets/culture-training.jpg";
import cultureTrip from "@/assets/culture-trip.jpg";
import { useNavigate } from "react-router-dom";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";

const Culture = () => {
  const navigate = useNavigate();

  const perks = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Continuous Training",
      description:
        "Regular workshops, certifications, and skill development programs to help you grow professionally.",
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Inclusive Food & Beverages",
      description:
        "Complimentary meals, snacks, and beverages throughout the day to keep you energized.",
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Team Trips",
      description:
        "Annual team outings and retreats to explore new places and bond with colleagues.",
    },
    {
      icon: <PartyPopper className="w-8 h-8" />,
      title: "Celebrations",
      description:
        "Birthdays, festivals, project milestones we celebrate every moment together.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Work-Life Balance",
      description:
        "Flexible hours and a supportive environment that values your personal time.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Culture",
      description:
        "A tight-knit team where everyone is valued, heard, and supported.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl max-h-4xl mx-auto text-center">
            <Badge className="mb-6 animate-fade-in hover:scale-110 transition-transform duration-300">
              Our Culture
            </Badge><br />
            <h1
              className="text-5xl md:text-5xl font-bold  mb-8 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent  transition-transform duration-500 inline-block"
              style={{ animationDelay: "0.1s" }}
            >
              More Than Just a Workplace
            </h1>
            <p
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              At WDPL, we believe in creating an environment where everyone can
              thrive. From continuous learning to celebrations, we're committed
              to your growth and happiness.
            </p>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Work With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job; We provide an environment where you
              can learn, grow, and enjoy your work every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <Card
                key={index}
                className="hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-secondary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-primary mb-6 hover:scale-125 hover:rotate-12 transition-all duration-300 inline-block">
                    {perk.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-muted-foreground">{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Life at WDPL
            </h2>
            <p className="text-muted-foreground">
              A glimpse into our culture, training sessions, celebrations, and
              team adventures.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Training */}
            <div
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() =>
                navigate(
                  "/gallery?category=823c0902-8394-4ce2-9156-27cc654cf91c"
                )
              }
            >
              <img
                src={cultureTraining}
                alt="Training and development sessions"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Training Programs
                  </h3>
                  <p className="text-white/80 text-sm">
                    Continuous skill development
                  </p>
                </div>
              </div>
            </div>

            {/* Celebrations */}
            <div
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() =>
                navigate(
                  "/gallery?category=3aa3fbb9-be0f-4ada-8b87-5e641f822640"
                )
              }
            >
              <img
                src={cultureCelebration}
                alt="Team celebrations and events"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Celebrations
                  </h3>
                  <p className="text-white/80 text-sm">
                    Every milestone matters
                  </p>
                </div>
              </div>
            </div>

            {/* Team Trips */}
            <div
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() =>
                navigate(
                  "/gallery?category=7bbb34bd-dbde-43e2-a3c8-0e1ca75af7f6"
                )
              }
            >
              <img
                src={cultureTrip}
                alt="Team trips and outings"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Team Trips
                  </h3>
                  <p className="text-white/80 text-sm">Adventure and bonding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}

      <TestimonialsCarousel />
    </Layout>
  );
};

export default Culture;
