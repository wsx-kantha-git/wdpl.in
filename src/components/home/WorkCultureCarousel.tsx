import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import OurWorkCulture1 from "@/assets/homepage/manager-developer-talk.jpg";
import OurWorkCulture2 from "@/assets/homepage/team-meet.jpg";
import OurWorkCulture3 from "@/assets/homepage/team-viewing-monitor.jpg";
import OurWorkCulture4 from "@/assets/homepage/employees-handshake.jpg";
import OurWorkCulture5 from "@/assets/homepage/looking-at-screen.jpg";
import OurWorkCulture6 from "@/assets/homepage/manager-developer-tdiscuss.jpg";

const cultureValues = [
  {
    id: 1,
    title: "Employee Well-being",
    description:
      "We prioritize the health and happiness of our team with comprehensive benefits, flexible schedules, and a supportive environment.",
    image: OurWorkCulture1,
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Collaborative Spirit",
    description:
      "Our open workspace fosters creativity and teamwork. We believe the best ideas come from diverse perspectives working together.",
    image: OurWorkCulture2,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Innovation First",
    description:
      "We encourage experimentation and learning. Failure is just another step towards success in our culture of continuous improvement.",
    image: OurWorkCulture3,
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: 4,
    title: "Recognition & Growth",
    description:
      "Your achievements matter. We celebrate wins and invest in your professional development with training and mentorship programs.",
    image: OurWorkCulture4,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: 5,
    title: "Global Mindset",
    description:
      "With teams across continents, we embrace diversity and bring global perspectives to local challenges, fostering innovation and collaboration.",
    image: OurWorkCulture5,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 6,
    title: "Learning Culture",
    description:
      "Continuous learning is in our DNA. Access courses, workshops, and conferences to stay ahead and grow your expertise.",
    image: OurWorkCulture6,
    color: "from-primary/20 to-accent/20",
  },
];

const WorkCultureCarousel = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-raleway font-bold mb-4">
            Our Work Culture
          </h2>
          <p className="text-xl text-muted-foreground font-source max-w-2xl mx-auto">
            More than just a workplace — it's a community where innovation
            thrives and people grow
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto animate-fade-in-up"
        >
          <CarouselContent>
            {cultureValues.map((value, index) => (
              <CarouselItem key={value.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card
                    className="flex flex-col h-full border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden group hover:shadow-lg animate-bounce-in"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <CardContent className="flex flex-col p-0 h-full">
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <div
                          className={`absolute inset-0 `}
                        ></div>
                        <img
                          src={value.image}
                          alt={value.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Equal height ensured by flex-grow */}
                      <div className="flex flex-col flex-grow p-6">
                        <h3 className="text-xl font-raleway font-bold mb-3 group-hover:text-primary transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground font-source leading-relaxed flex-grow">
                          {value.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hover:scale-110 transition-transform absolute -left-5 top-1/2 -translate-y-1/2 md:-left-6 z-20 bg-background/80 backdrop-blur-sm border border-primary/30 shadow-md rounded-full p-2" />
          <CarouselNext className="hover:scale-110 transition-transform absolute -right-5 top-1/2 -translate-y-1/2 md:-right-6 z-20 bg-background/80 backdrop-blur-sm border border-primary/30 shadow-md rounded-full p-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default WorkCultureCarousel;
