import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import WorkCultureCarousel from "@/components/home/WorkCultureCarousel";
import HeroImage from "@/assets/homepage/slideshow_new_bg.webp";
import HeroIllustration from "@/assets/homepage/web-design.svg";
import chennaiImage from "@/assets/homepage/webstix-chennai-office-interior.jpg";
import coimbatoreImage from "@/assets/office-coimbatore.jpg";
import GalleryPreview from "./GalleryPreviewPage";
import Trainning from "@/assets/homepage/home-icons/trainning.svg";
import Food from "@/assets/homepage/home-icons/food-and-beverage.svg";
import Celebrate from "@/assets/homepage/home-icons/celebrate.svg";
import Travel from "@/assets/homepage/home-icons/travel.svg";
import CTA from "@/assets/homepage/group-team.jpg";
const Home = () => {
  const perks = [
    {
      icon: Trainning,
      title: "Training Programs",
      description: "Continuous learning & skill development",
    },
    {
      icon: Food,
      title: "Inclusive Food & Beverages",
      description: "Complimentary meals & beverages",
    },
    {
      icon: Travel,
      title: "Company Trips",
      description: "Annual team outings & retreats",
    },
    {
      icon: Celebrate,
      title: "Celebrations",
      description: "Regular events & recognition",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[95vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text Section */}
          <div className="px-6 max-w-3xl text-center md:text-left">
            <h1 className="text-[62px] md:text-5xl lg:text-7xl font-raleway font-bold text-background mb-8 leading-tight">
              Design, Build & Grow
            </h1>
            <p
              className="text-xl md:text-2xl font-source text-background/95 mb-10 animate-fade-in leading-relaxed"
              style={{ animationDelay: "0.1s" }}
            >
              Join WDPL in Chennai & Coimbatore. Family-first,
              growth-focused-training, food, trips, celebrations.
            </p>

            <div
              className="flex flex-wrap gap-5 animate-fade-in justify-center md:justify-start"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                asChild
                variant="brand"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-110 hover:shadow-2xl duration-300"
              >
                <Link to="/team">
                  SEE OUR TEAM{" "}
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
                className="bg-background/10 backdrop-blur-sm border-2 border-background text-background hover:bg-background hover:text-foreground text-lg px-8 py-6 hover:scale-110 duration-300"
              >
                <Link to="/culture">EXPLORE OUR CULTURE</Link>
              </Button>
            </div>
          </div>

          {/* Right SVG Section */}
          <div
            className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={HeroIllustration}
              alt="Team Illustration"
              className="w-[95%] md:w-[110%] lg:w-[130%] max-w-2xl drop-shadow-2xl hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Work Culture Carousel */}
      <WorkCultureCarousel />

      {/* Culture Highlights */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
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
                className="p-8 text-center hover:shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-500 group border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-secondary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <img
                    src={perk.icon}
                    alt={perk.title}
                    className="w-12 h-12 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
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
              <Link to="/culture">LEARN MORE ABOUT OUR CULTURE</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gradient-to-b from-secondary/50 via-background to-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-raleway font-bold  mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Our Offices
            </h2>
            <p className="text-xl font-source text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Modern workspaces in two vibrant Tamil Nadu cities
            </p>
          </div>
          <div className="mx-4 md:mx-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-700 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={chennaiImage}
                  alt="Chennai Office"
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-1 transition-all duration-700"
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
                  <a
                    href="https://maps.google.com/?q=286/1,+Rajiv+Gandhi+Salai,+Nehru+Nagar,+Perungudi,+Chennai,+600096"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map <ArrowRight className="ml-2" size={16} />
                  </a>
                </Button>
              </div>
            </Card>

            <Card
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-700 hover:-translate-y-2 border-2 hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={coimbatoreImage}
                  alt="Coimbatore Office"
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-1 transition-all duration-700"
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
                  Mikro Grafeio, 1st Floor, 766, 767, Puliakulam Road,
                  Coimbatore, Tamil Nadu 641037, India.
                </p>
                <Button asChild variant="link" className="mt-4 p-0">
                  <a
                    href="https://maps.google.com/maps/place/Mikro+Grafeio+(Beyond+Workspaces)/@11.0156305,76.9415592,13z/data=!4m10!1m2!2m1!1sMikro+Grafeio,+1st+Floor,+766,+767,+Puliakulam+Road,+++++++++++++++++++Coimbatore,+Tamil+Nadu+641037,+India."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map <ArrowRight className="ml-2" size={16} />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/* Gallery Preview Section */}
      <GalleryPreview />
      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* CTA Section */}
<section
  className="relative w-full h-[300px] md:h-[300px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${CTA})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-4xl">
    <h2 className="text-4xl md:text-5xl font-raleway font-bold text-white mb-6">
      Ready To Join Our Team?
    </h2>
    <p className="text-xl font-source text-white/90 mb-8">
      Explore open positions and take the first step toward an exciting career at WDPL
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button
        asChild
        variant="outline"
        size="lg"
        className="bg-primary text-background border-background hover:bg-background/90 hover:text-black font-raleway font-semibold"
      >
        <Link to="/careers">VIEW ALL ROLES</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-white text-white hover:bg-white hover:text-black font-raleway font-semibold"
      >
        <Link to="/team">MEET THE TEAM</Link>
      </Button>
    </div>
  </div>
</section>
    </Layout>
  );
};

export default Home;
