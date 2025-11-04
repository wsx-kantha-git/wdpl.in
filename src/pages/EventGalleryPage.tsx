import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
}

export default function EventGalleryPage() {
  const { categoryId, eventId } = useParams();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("category_id", categoryId)
        .eq("event_id", eventId)
        .order("created_at", { ascending: true });

      if (!error && data) setImages(data);
    };
    fetchImages();
  }, [categoryId, eventId]);

  // Transform images for Lightbox
  const slides = images.map((img) => ({
    src: img.image_url,
    title: img.title || "",
    description: img.description || "",
  }));

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className="cursor-pointer"
            onClick={() => {
              setPhotoIndex(idx);
              setIsOpen(true);
            }}
          >
            <img
              src={img.image_url}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h2 className="mt-2 text-center font-medium">{img.title}</h2>
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          slides={slides}
          open={isOpen}
          index={photoIndex}
          close={() => setIsOpen(false)}
          onIndexChange={setPhotoIndex}
        />
      )}
    </Layout>
  );
}
