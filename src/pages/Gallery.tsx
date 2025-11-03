import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import cultureTrip from "@/assets/culture-trip.jpg";
import cultureCelebration from "@/assets/culture-celebration.jpg";
import cultureTraining from "@/assets/culture-training.jpg";

interface GalleryItem {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  event_type: string;
  event_date: string | null;
  location: string | null;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Mock data for demonstration
  const mockGalleryItems: GalleryItem[] = [
    {
      id: "1",
      title: "Ooty Team Trip 2024",
      caption: "Amazing team bonding experience in the hills of Ooty",
      image_url: cultureTrip,
      event_type: "trips",
      event_date: "2024-03-15",
      location: "Ooty"
    },
    {
      id: "2",
      title: "Annual Day Celebration",
      caption: "Celebrating our achievements and milestones together",
      image_url: cultureCelebration,
      event_type: "celebrations",
      event_date: "2024-02-20",
      location: "Chennai Office"
    },
    {
      id: "3",
      title: "React Advanced Training",
      caption: "Hands-on workshop on React 18 features and best practices",
      image_url: cultureTraining,
      event_type: "training",
      event_date: "2024-01-10",
      location: "Coimbatore Office"
    },
    {
      id: "4",
      title: "Diwali Celebration 2023",
      caption: "Festival of lights celebrated with the entire WDPL family",
      image_url: cultureCelebration,
      event_type: "celebrations",
      event_date: "2023-11-12",
      location: "Chennai Office"
    },
    {
      id: "5",
      title: "Kodaikanal Adventure",
      caption: "Trekking and adventure activities with the team",
      image_url: cultureTrip,
      event_type: "trips",
      event_date: "2023-10-05",
      location: "Kodaikanal"
    },
    {
      id: "6",
      title: "AWS Cloud Workshop",
      caption: "Deep dive into AWS services and cloud architecture",
      image_url: cultureTraining,
      event_type: "training",
      event_date: "2023-09-18",
      location: "Chennai Office"
    },
    {
      id: "7",
      title: "Team Birthday Bash",
      caption: "Monthly birthday celebrations bringing joy to the team",
      image_url: cultureCelebration,
      event_type: "celebrations",
      event_date: "2023-08-25",
      location: "Coimbatore Office"
    },
    {
      id: "8",
      title: "UI/UX Design Masterclass",
      caption: "Learning advanced Figma techniques and design systems",
      image_url: cultureTraining,
      event_type: "training",
      event_date: "2023-07-14",
      location: "Chennai Office"
    },
    {
      id: "9",
      title: "Pondicherry Beach Trip",
      caption: "Refreshing weekend getaway by the beach",
      image_url: cultureTrip,
      event_type: "trips",
      event_date: "2023-06-22",
      location: "Pondicherry"
    },
    {
      id: "10",
      title: "New Office Inauguration",
      caption: "Grand opening of our expanded Coimbatore workspace",
      image_url: cultureCelebration,
      event_type: "office",
      event_date: "2023-05-30",
      location: "Coimbatore"
    },
    {
      id: "11",
      title: "DevOps Bootcamp",
      caption: "Intensive training on Docker, Kubernetes, and CI/CD",
      image_url: cultureTraining,
      event_type: "training",
      event_date: "2023-04-12",
      location: "Chennai Office"
    },
    {
      id: "12",
      title: "Chennai Office Workspace",
      caption: "Modern, collaborative workspace designed for productivity",
      image_url: cultureCelebration,
      event_type: "office",
      event_date: "2023-03-01",
      location: "Chennai"
    }
  ];

  const galleryItems = mockGalleryItems;
  const eventTypes = ["all", "trips", "celebrations", "training", "office"];

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.event_type.toLowerCase() === filter
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(251,146,60,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 animate-fade-in hover:scale-110 transition-transform duration-300">Gallery</Badge>
            <h1 className="text-5xl md:text-7xl font-bold  mb-6 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block" style={{ animationDelay: "0.1s" }}>
              Moments That Matter
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Explore our journey through celebrations, training sessions, team trips, and everyday moments at WDPL
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-10 bg-background/50 backdrop-blur-sm border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {eventTypes.map((type) => (
              <Button
                key={type}
                variant={filter === type ? "brand" : "outline"}
                onClick={() => setFilter(type)}
                className="capitalize hover:scale-110 transition-all duration-300 hover:shadow-lg"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="container mx-auto px-4">
          {filteredItems && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 hover:-translate-y-3 hover:rotate-1 animate-fade-in border-2 border-transparent hover:border-primary/40"
                  onClick={() => setSelectedImage(item)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <Badge className="w-fit mb-3 capitalize bg-primary text-primary-foreground animate-fade-in hover:scale-110 transition-transform" style={{ animationDelay: "0.1s" }}>
                        {item.event_type}
                      </Badge>
                      <h3 className="text-white font-bold text-lg mb-2 animate-fade-in transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ animationDelay: "0.2s" }}>
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p className="text-white/90 text-sm animate-fade-in transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ animationDelay: "0.3s" }}>
                          {item.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-muted-foreground text-lg mb-4">No gallery items found.</p>
              <p className="text-sm text-muted-foreground">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden animate-scale-in">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain bg-secondary/20"
              />
              <div className="p-8 bg-gradient-to-t from-background to-secondary/10">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="capitalize text-base px-4 py-1 hover:scale-110 transition-transform">{selectedImage.event_type}</Badge>
                  {selectedImage.location && (
                    <Badge variant="outline" className="text-base px-4 py-1 hover:scale-110 transition-transform">{selectedImage.location}</Badge>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">{selectedImage.title}</h2>
                {selectedImage.caption && (
                  <p className="text-muted-foreground text-lg mb-4">{selectedImage.caption}</p>
                )}
                {selectedImage.event_date && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedImage.event_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
