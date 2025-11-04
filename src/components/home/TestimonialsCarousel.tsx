import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials") // exact table name
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
      } else if (data) {
        setTestimonials(data); // Type-safe, no 'any' or 'as unknown'
      }

      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) return <p className="text-center py-12">Loading testimonials...</p>;
  if (!testimonials.length) return <p className="text-center py-12">No testimonials available.</p>;

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

        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto animate-fade-in-up">
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
                            src={testimonial.image_url}
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
