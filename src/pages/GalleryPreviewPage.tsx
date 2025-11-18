import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GalleryImage {
  id: string;
  image_url: string;
  event_id: string;
  gallery_events?: {
    name: string;
  };
}

const GalleryPreview = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  //  Fetch latest images
  useEffect(() => {
    const fetchGalleryPreview = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, event_id, gallery_events(name)")
        .order("created_at", { ascending: false })
        .limit(100);

      if (!error && data) setImages(data);
    };
    fetchGalleryPreview();
  }, []);

  //  Next / Prev
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  //  Auto carousel
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-background via-secondary/10 to-background z-0">
      <div className="container mx-auto px-3 sm:px-6 text-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-2">
          <h2 className="font-raleway text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Glimpses of WDPL Moments
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-6 sm:mb-8">
            A sneak peek into our events, celebrations, and team experiences.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[450px] md:min-h-[500px] z-[1]">
          {images.map((img, index) => {
            const position =
              index === currentIndex
                ? "center"
                : index === (currentIndex - 1 + images.length) % images.length
                ? "left"
                : index === (currentIndex + 1) % images.length
                ? "right"
                : "hidden";

            const baseStyle =
              "absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu rounded-2xl shadow-xl object-cover";

            const styles: Record<string, string> = {
              center:
                "z-30 scale-100 opacity-100 translate-x-0 blur-0 w-[60%] sm:w-[55%] md:w-[50%]",
              left: "z-20 scale-75 opacity-60 -translate-x-[80%] blur-[2px] w-[30%]",
              right:
                "z-20 scale-75 opacity-60 translate-x-[80%] blur-[2px] w-[30%]",
              hidden:
                "z-0 opacity-0 scale-50 translate-x-0 pointer-events-none",
            };

            return (
              <img
                key={img.id}
                src={img.image_url}
                alt="Gallery Preview"
                className={`${baseStyle} ${styles[position]} h-[220px] sm:h-[350px] md:h-[420px]`}
              />
            );
          })}

          {/* Navigation Buttons */}
{/* Prev Button */}
<button
  onClick={prevSlide}
  className="
    absolute 
    left-2 sm:left-10 
    top-1/2 -translate-y-1/2 
    bg-black/40 hover:bg-black/60 
    p-2 sm:p-3 
    rounded-xl sm:rounded-full 
    text-white 
    transition-all duration-300 
    z-20 backdrop-blur-md
  "
>
  <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
</button>

{/* Next Button */}
<button
  onClick={nextSlide}
  className="
    absolute 
    right-2 sm:right-10 
    top-1/2 -translate-y-1/2 
    bg-black/40 hover:bg-black/60 
    p-2 sm:p-3 
    rounded-xl sm:rounded-full
    text-white 
    transition-all duration-300 
    z-20 backdrop-blur-md
  "
>
  <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
</button>

        </div>

        {/* View Full Gallery */}
        <div className="mt-10">
          <Button
            size="lg"
            variant="brand"
            onClick={() => navigate("/gallery")}
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base font-raleway sm:text-base font-semibold"
          >
            VIEW FULL GALLERY
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
