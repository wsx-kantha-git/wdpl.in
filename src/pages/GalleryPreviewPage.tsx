// pages/gallery/index.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

interface Category {
  id: string;
  name: string;
  description: string | null;
}

export default function GalleryPreviewPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("gallery_categories").select("*");
      if (!error && data) setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center my-10">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(`/gallery/${cat.id}`)}
          >
            <CategoryCover categoryId={cat.id} />
            <h2 className="mt-2 text-xl font-semibold text-center">{cat.name}</h2>
            {cat.description && <p className="text-center text-sm text-muted-foreground">{cat.description}</p>}
          </div>
        ))}
      </div>
    </Layout>
  );
}

// Get first image as cover
const CategoryCover = ({ categoryId }: { categoryId: string }) => {
  const [coverUrl, setCoverUrl] = useState<string>("");

  useEffect(() => {
    const fetchCover = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("image_url")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
      if (!error && data) setCoverUrl(data.image_url);
    };
    fetchCover();
  }, [categoryId]);

  return (
    <img
      src={coverUrl || "https://via.placeholder.com/400x300?text=No+Image"}
      className="w-full h-64 object-cover rounded-lg"
      alt="category cover"
    />
  );
};
