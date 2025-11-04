// pages/gallery/[categoryId].tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// types.ts or local component type
export interface Event {
  id: string;
  name: string;
  category_id: string;
  cover_image?: string | null; // <-- optional now
  created_at?: string | null;
}


export default function EventPreviewPage() {
  const { categoryId } = useParams();
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("gallery_events")
        .select("*")
        .eq("category_id", categoryId);
      if (!error && data) setEvents(data);
    };
    fetchEvents();
  }, [categoryId]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(`/gallery/${categoryId}/${ev.id}`)}
          >
            <img src={ev.cover_image} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="mt-2 text-lg font-semibold text-center">{ev.name}</h2>
          </div>
        ))}
      </div>
    </Layout>
  );
}
