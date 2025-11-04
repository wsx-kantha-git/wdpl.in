import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Plus, Minus, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Event {
  id: string;
  name: string;
  category_id: string;
  cover_image?: string | null;
}

interface GalleryImage {
  id: string;
  image_url: string;
  event_id: string;
}

const Gallery = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("gallery_categories")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEventsWithCovers = async () => {
      let query = supabase.from("gallery_events").select("*");
      if (selectedCategory !== "all") query = query.eq("category_id", selectedCategory);

      const { data: eventsData } = await query.order("created_at", { ascending: false });
      if (!eventsData) return;

      const updatedEvents = await Promise.all(
        eventsData.map(async (event) => {
          const { data: imageData } = await supabase
            .from("gallery_images")
            .select("image_url")
            .eq("event_id", event.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            ...event,
            cover_image: imageData?.image_url || "/placeholder.jpg",
          };
        })
      );

      setEvents(updatedEvents);
    };

    fetchEventsWithCovers();
  }, [selectedCategory]);

  // Fetch images
  const fetchImages = async (eventId: string) => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });
    if (data) setImages(data);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    fetchImages(event.id);
  };

  const handleImageClick = (img: GalleryImage, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    setZoom(1);
  };

  const handleNext = () => {
    if (!images.length) return;
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
    setZoom(1);
  };

  const handlePrev = () => {
    if (!images.length) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
    setZoom(1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return;
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "Escape") setSelectedImage(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const resetZoom = () => setZoom(1);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(251,146,60,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 animate-fade-in hover:scale-110 transition-transform duration-300">
              Gallery
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent inline-block">
              Moments That Matter
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in leading-relaxed">
              Explore our journey through celebrations, training sessions, team
              trips, and everyday moments at WDPL
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-10 bg-background/50 backdrop-blur-sm border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
  variant={selectedCategory === "all" ? "brand" : "outline"}
  onClick={() => {
    setSelectedCategory("all");
    setSelectedEvent(null); // go back to events grid
    setImages([]);          // clear previous event images
  }}
  className="capitalize hover:scale-110 transition-all duration-300"
>
  All
</Button>

            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "brand" : "outline"}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedEvent(null);
                  setImages([]);
                }}
                className="capitalize hover:scale-110 transition-all duration-300"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      {!selectedEvent && (
        <section className="py-20 bg-gradient-to-b from-background via-secondary/5 to-background">
          <div className="container mx-auto px-4">
            {events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 hover:-translate-y-3 animate-fade-in border-2 border-transparent hover:border-primary/40"
                    onClick={() => handleEventClick(event)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative overflow-hidden aspect-square rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
                      <img
                        src={event.cover_image || "/placeholder.jpg"}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Always-visible dark overlay at bottom */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/60 py-3 px-4 text-center">
                        <h3 className="text-white font-raleway font-semibold uppercase tracking-wide text-sm md:text-base">
                          {event.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-muted-foreground text-lg mb-4">
                  No events found for this category.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Event Images Grid */}
      {selectedEvent && (
        <section className="py-20 bg-gradient-to-b from-background via-secondary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className=" font-raleway text-3xl font-bold text-primary">
                {selectedEvent.name}
              </h2>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                ← Back to Events
              </Button>
            </div>
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-xl transition-all duration-500"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img.image_url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No images found for this event.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
  <div
    className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center"
    onClick={() => setSelectedImage(null)} // click outside closes
  >
    {/* Prevent closing when clicking the image */}
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {/* Centered Image */}
      <img
        src={selectedImage.image_url}
        alt=""
        style={{ transform: `scale(${zoom})`, transition: "transform 0.3s ease" }}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg select-none"
        onDoubleClick={resetZoom}
      />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 rounded-full p-3 text-white transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 rounded-full p-3 text-white transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/10 rounded-full backdrop-blur-md px-4 py-2">
        <button onClick={zoomOut} className="text-white hover:text-accent transition p-2">
          <Minus className="w-5 h-5" />
        </button>
        <button onClick={resetZoom} className="text-white font-semibold text-sm px-3">
          {Math.round(zoom * 100)}%
        </button>
        <button onClick={zoomIn} className="text-white hover:text-accent transition p-2">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/30 rounded-full p-2 text-white transition"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
)}

    </Layout>
  );
};

export default Gallery;
