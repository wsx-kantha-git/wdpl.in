import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import Autoplay from "embla-carousel-autoplay";


type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error.message);
      } else if (data) {
        setTestimonials(data);
      }

      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading)
    return <p className="text-center py-12">Loading testimonials...</p>;
  if (!testimonials.length)
    return <p className="text-center py-12">No testimonials available.</p>;

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className=" p-[20px] text-3xl md:text-6xl font-raleway font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            What Our Team Say
          </h2>
          <p className="text-xl text-muted-foreground font-source max-w-4xl mx-auto">
            Don't just take our word for it hear from the companies we've helped
            succeed
          </p>
        </div>

        <Carousel
  opts={{ align: "start", loop: true }}
  plugins={[
    Autoplay({
      delay: 10000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]}
  className="w-full max-w-5xl mx-auto md:px-10"
>

          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/2 md:px-4"
              >
                <div className="p-4 h-full">
                  <Card
                    className="h-full flex flex-col border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:scale-105 bg-card/50 backdrop-blur-sm animate-scale-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <CardContent className="p-8 relative flex flex-col h-full">
                      <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />

                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
                          <img
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 relative z-10"
                          />
                        </div>

                        <div>
                          <h4 className="font-raleway font-bold text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-muted-foreground font-source">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* Show stars ONLY if rating is enabled */}
                      {testimonial.rating !== null &&
                        testimonial.rating > 0 && (
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-5 w-5 fill-primary text-primary animate-bounce-in"
                                  style={{ animationDelay: `${i * 0.1}s` }}
                                />
                              )
                            )}
                          </div>
                        )}

                      <p className="text-foreground/90 font-source leading-relaxed italic flex-grow">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="
              hover:scale-110 transition-transform 
              absolute 
              -left-6 md:-left-6
              top-1/2 -translate-y-1/2 
              z-20 bg-background/80 backdrop-blur-sm 
              border border-primary/30 shadow-md rounded-full p-2
            "
          />

          <CarouselNext
            className="
              hover:scale-110 transition-transform 
              absolute 
              -right-6 md:-right-6
              top-1/2 -translate-y-1/2 
              z-20 bg-background/80 backdrop-blur-sm 
              border border-primary/30 shadow-md rounded-full p-2
            "
          />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
