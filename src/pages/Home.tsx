import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  Coffee,
  Users,
  Plane,
  GraduationCap,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import WorkCultureCarousel from "@/components/home/WorkCultureCarousel";
import heroImage from "@/assets/hero-main.jpg";
import chennaiImage from "@/assets/office-chennai.jpg";
import coimbatoreImage from "@/assets/office-coimbatore.jpg";

const Home = () => {
  const perks = [
    {
      icon: GraduationCap,
      title: "Training Programs",
      description: "Continuous learning & skill development",
    },
    {
      icon: Coffee,
      title: "Free Food & Drinks",
      description: "Complimentary meals & beverages",
    },
    {
      icon: Plane,
      title: "Company Trips",
      description: "Annual team outings & retreats",
    },
    {
      icon: Award,
      title: "Celebrations",
      description: "Regular events & recognition",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[95vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-[96px] md:text-7xl lg:text-8xl font-raleway font-bold text-background mb-8">
              Design, Build & Grow
            </h1>
            <p
              className="text-xl md:text-3xl font-source text-background/95 mb-10 animate-fade-in leading-relaxed"
              style={{ animationDelay: "0.1s" }}
            >
              Join WDPL in Chennai & Coimbatore. Family-first,
              growth-focused-training, food, trips, celebrations.
            </p>
            <div
              className="flex flex-wrap gap-5 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                asChild
                variant="brand"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-110 hover:shadow-2xl transition-all duration-300"
              >
                <Link to="/team">
                  See Our Team{" "}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={24}
                  />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-background/10 backdrop-blur-sm border-2 border-background text-background hover:bg-background hover:text-foreground text-lg px-8 py-6 hover:scale-110 transition-all duration-300"
              >
                <Link to="/culture">Explore Our Culture</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-gradient-to-b from-secondary/50 via-background to-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-raleway font-bold  mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Our Offices
            </h2>
            <p className="text-xl font-source text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Modern workspaces in two vibrant Tamil Nadu cities
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <Card
              className="overflow-hidden group cursor-pointer hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 hover:-translate-y-3  border-2 hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={chennaiImage}
                  alt="Chennai Office"
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-background mb-2">
                    Chennai
                  </h3>
                  <p className="text-background/90 text-sm">
                    Perungudi, Prince Infocity-1
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground">
                  286/1, Rajiv Gandhi Salai, Nehru Nagar, Perungudi, Chennai,
                  Tamil Nadu 600096, India
                </p>
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link to="/contact">
                    View on Map <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </Card>

            <Card
              className="overflow-hidden group cursor-pointer hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 hover:-translate-y-3 border-2 hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={coimbatoreImage}
                  alt="Coimbatore Office"
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:-rotate-2 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-background mb-2">
                    Coimbatore
                  </h3>
                  <p className="text-background/90 text-sm">
                    Papanaickenpalayam
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground">
                  2nd Floor, MAPA Center, Mikro Grafeio opposite LuLu
                  Hypermarket, Coimbatore, Tamil Nadu 641045, India
                </p>
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link to="/contact">
                    View on Map <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Culture Highlights */}
      <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-raleway font-bold mb-6 md:leading-[1.2] bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Why Join WDPL?
            </h2>
            <p className="text-xl font-source text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              More than just a workplace a family that grows together
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-2 transition-all duration-500 group border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-secondary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <perk.icon
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                    size={36}
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {perk.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {perk.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12 rounded-full">
            <Button asChild variant="brand" size="lg" className="rounded-full">
              <Link to="/culture">Learn More About Our Culture</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Work Culture Carousel */}
      <WorkCultureCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary-foreground mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl font-source text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Explore open positions and take the first step toward an exciting
            career at WDPL
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-background text-primary border-background hover:bg-background/90 hover:text-black font-raleway font-semibold"
            >
              <Link to="/careers">View Open Positions</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-raleway font-semibold"
            >
              <Link to="/team">Meet the Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
