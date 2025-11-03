import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import cultureCelebration from "@/assets/culture-celebration.jpg";
import cultureTraining from "@/assets/culture-training.jpg";
import cultureTrip from "@/assets/culture-trip.jpg";

const cultureValues = [
  {
    id: 1,
    title: "Employee Well-being",
    description: "We prioritize the health and happiness of our team with comprehensive benefits, flexible schedules, and a supportive environment.",
    image: cultureCelebration,
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Collaborative Spirit",
    description: "Our open workspace fosters creativity and teamwork. We believe the best ideas come from diverse perspectives working together.",
    image: cultureTraining,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Innovation First",
    description: "We encourage experimentation and learning. Failure is just another step towards success in our culture of continuous improvement.",
    image: cultureTrip,
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: 4,
    title: "Recognition & Growth",
    description: "Your achievements matter. We celebrate wins and invest in your professional development with training and mentorship programs.",
    image: cultureCelebration,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: 5,
    title: "Global Mindset",
    description: "With teams across continents, we embrace diversity and bring global perspectives to local challenges.",
    image: cultureTraining,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 6,
    title: "Learning Culture",
    description: "Continuous learning is in our DNA. Access courses, workshops, and conferences to stay ahead in your field.",
    image: cultureTrip,
    color: "from-primary/20 to-accent/20",
  },
];

const WorkCultureCarousel = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-raleway font-bold mb-4">
            Our Work Culture
          </h2>
          <p className="text-xl text-muted-foreground font-source max-w-2xl mx-auto">
            More than just a workplace - it's a community where innovation thrives and people grow
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
            {cultureValues.map((value, index) => {
              
              return (
                <CarouselItem key={value.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card 
                      className="border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden group hover:shadow-2xl animate-bounce-in"
                      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-80 z-10`}></div>
                          <img
                            src={value.image}
                            alt={value.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-raleway font-bold mb-3 group-hover:text-primary transition-colors">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground font-source leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hover:scale-110 transition-transform" />
          <CarouselNext className="hover:scale-110 transition-transform" />
        </Carousel>
      </div>
    </section>
  );
};

export default WorkCultureCarousel;
