import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content: "Working with Webstix has transformed our digital presence. Their innovative solutions and dedicated team exceeded all expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, InnovateLabs",
    content: "The level of expertise and professionalism is unmatched. They delivered a complex project on time and within budget.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    content: "Exceptional creativity and technical skills. Our website now perfectly reflects our brand and engages our audience effectively.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder, StartupHub",
    content: "From concept to launch, the team was incredibly supportive and innovative. Highly recommend their services!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-raleway font-bold mb-4">
            What Our Team Say
          </h2>
          <p className="text-xl text-muted-foreground font-source max-w-2xl mx-auto">
            Don't just take our word for it hear from the companies we've helped succeed
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto animate-fade-in-up"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-4">
                  <Card 
                    className="border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:scale-105 bg-card/50 backdrop-blur-sm animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                  >
                    <CardContent className="p-8 relative">
                      <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10 animate-float" />
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 relative z-10"
                          />
                        </div>
                        <div>
                          <h4 className="font-raleway font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground font-source">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-5 w-5 fill-primary text-primary animate-bounce-in" 
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>

                      <p className="text-foreground/90 font-source leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:scale-110 transition-transform" />
          <CarouselNext className="hover:scale-110 transition-transform" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
