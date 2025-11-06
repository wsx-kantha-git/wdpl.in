import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
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

  // ✅ Fetch latest images
  useEffect(() => {
    const fetchGalleryPreview = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, event_id, gallery_events(name)")
        .order("created_at", { ascending: false })
        .limit(12);

      if (!error && data) setImages(data);
    };
    fetchGalleryPreview();
  }, []);

  // ✅ Next / Prev
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // ✅ Auto carousel
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-3 sm:px-6 text-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Images className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold uppercase tracking-wide text-sm sm:text-base">
              Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Glimpses of WDPL Moments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mb-6 sm:mb-8">
            A sneak peek into our events, celebrations, and team experiences.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg relative">
            <img
              src={images[currentIndex]?.image_url || "/placeholder.jpg"}
              alt="Gallery Preview"
              className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 sm:py-4 px-3 sm:px-6 text-white text-center">
              <h3 className="text-sm sm:text-lg font-semibold tracking-wide uppercase">
                {images[currentIndex]?.gallery_events?.name || "Event"}
              </h3>
            </div>

            {/* Navigation Buttons (Desktop only) */}
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 sm:p-3 rounded-full text-white transition"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 sm:p-3 rounded-full text-white transition"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6 flex-wrap">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-12 h-12 sm:w-16 sm:h-16 overflow-hidden rounded-md border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-primary scale-105"
                  : "border-transparent hover:scale-105"
              }`}
            >
              <img
                src={img.image_url}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* View Full Gallery */}
        <div className="mt-8 sm:mt-10">
          <Button
            size="lg"
            variant="brand"
            onClick={() => navigate("/gallery")}
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold"
          >
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
