import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cultureCelebration from "@/assets/wdpl-images/Culture/diwali-2025.jpg";
import cultureTraining from "@/assets/wdpl-images/Culture/trainnig-team.jpg";
import cultureTrip from "@/assets/wdpl-images/Culture/monstry.jpg";
import { useNavigate } from "react-router-dom";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import Trainning from "@/assets/homepage/home-icons/trainning.svg";
import Food from "@/assets/homepage/home-icons/food-and-beverage.svg";
import Celebrate from "@/assets/homepage/home-icons/celebrate.svg";
import Travel from "@/assets/homepage/home-icons/travel.svg";
import Heart from "@/assets/wdpl-images/Culture/work-life-balance.svg";
import Users from "@/assets/wdpl-images/Culture/family-culture.svg";
import Hero from "@/assets/wdpl-images/Culture/maddy-and-team.jpg";
const Culture = () => {
  const navigate = useNavigate();

  const perks = [
    {
      icon: (
        <img
          src={Trainning}
          alt="Training"
          className="w-10 h-10 font-extrabold"
        />
      ),
      title: "Continuous Training",
      description:
        "Regular workshops, certifications, and skill development programs to help you grow professionally.",
    },
    {
      icon: <img src={Food} alt="Food" className="w-10 h-10 font-extrabold" />,
      title: "Inclusive Food & Beverages",
      description:
        "Complimentary meals, snacks, and beverages throughout the day to keep you energized.",
    },
    {
      icon: (
        <img src={Travel} alt="Travel" className="w-10 h-10 font-extrabold" />
      ),
      title: "Team Trips",
      description:
        "Annual team outings and retreats to explore new places and bond with colleagues.",
    },
    {
      icon: (
        <img
          src={Celebrate}
          alt="Celebrate"
          className="w-10 h-10 font-extrabold"
        />
      ),
      title: "Celebrations",
      description:
        "Birthdays, festivals, project milestones - we celebrate every moment together.",
    },
    {
      icon: (
        <img
          src={Heart}
          alt="Work-life balance"
          className="w-10 h-10 font-extrabold"
        />
      ),
      title: "Work-Life Balance",
      description:
        "Flexible hours and a supportive environment that values your personal time.",
    },
    {
      icon: (
        <img
          src={Users}
          alt="Family Culture"
          className="w-10 h-10 font-extrabold"
        />
      ),
      title: "Family Culture",
      description:
        "A tight-knit team where everyone is valued, heard, and supported.",
    },
  ];
  return (
    <Layout>
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat text-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${Hero})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 container mx-auto px-4">
          <Badge className="mb-6 animate-fade-in hover:scale-110 transition-transform duration-300">
            Our Culture
          </Badge>
          <h1
            className="text-3xl font-raleway md:text-5xl font-bold mb-8 text-white animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            More Than Just a Workplace
          </h1>
          <p
            className="text-xl md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            At WDPL, we believe in creating an environment where everyone can
            thrive. From continuous learning to celebrations, we're committed to
            your growth and happiness.
          </p>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Work With Us?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer more than just a job, we provide an environment where you
              can learn, grow, and enjoy your work every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <Card
                key={index}
                className="hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-secondary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-primary mb-6 hover:scale-125 hover:rotate-12 transition-all duration-300 inline-block">
                    {perk.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-muted-foreground text-[16px]">
                    {perk.description}
                  </p>
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
            <p className="text-muted-foreground text-lg">
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
