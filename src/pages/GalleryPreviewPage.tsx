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

  // ✅ Fetch latest images from multiple events
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

  // ✅ Manual next/previous controls
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // ✅ Auto-carousel every 4 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 text-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Images className="w-6 h-6" />
            <span className="font-semibold uppercase tracking-wide">Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Glimpses of WDPL Moments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A sneak peek into our events, celebrations, and team experiences.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-lg relative">
            <img
              src={images[currentIndex]?.image_url || "/placeholder.jpg"}
              alt="Gallery Preview"
              className="w-full h-[500px] object-cover transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-4 px-6 text-white text-center">
              <h3 className="text-lg font-semibold tracking-wide uppercase">
                {images[currentIndex]?.gallery_events?.name || "Event"}
              </h3>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 overflow-hidden rounded-md border-2 transition-all duration-300 ${
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
        <div className="mt-10">
          <Button
            size="lg"
            variant="brand"
            onClick={() => navigate("/gallery")}
            className="px-8 py-3 rounded-full text-lg font-semibold"
          >
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
