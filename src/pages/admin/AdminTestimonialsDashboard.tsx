import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  Database,
  TablesInsert,
  TablesUpdate,
} from "@/integrations/supabase/types";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const AdminTestimonialsDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<TablesInsert<"testimonials">>({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      alert(error.message);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

// Handle form submit (add/update)
const handleSubmit = async () => {
  if (!form.name || !form.role || !form.content || !form.image_url) {
    alert("All fields are required!");
    return;
  }

  try {
    if (editingId) {
      const { error } = await supabase
        .from("testimonials")
        .update(form as TablesUpdate<"testimonials">)
        .eq("id", editingId);
      if (error) throw error;

      alert("Updated successfully!"); // ✅ Success alert for update
      setEditingId(null);
    } else {
      const { error } = await supabase.from("testimonials").insert(form);
      if (error) throw error;

      alert("Added successfully!"); // ✅ Success alert for add
    }

    setForm({ name: "", role: "", content: "", rating: 5, image_url: "" });
    fetchTestimonials();
  } catch (err) {
    alert(err instanceof Error ? err.message : String(err));
  }
};

  // Delete testimonial
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchTestimonials();
  };

  // Edit testimonial
  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      image_url: t.image_url,
    });
  };

  // Upload image to 'testimonial' bucket
  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("testimonials")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("testimonials")
        .getPublicUrl(fileName);
      const publicUrl = data?.publicUrl;
      if (!publicUrl) throw new Error("Failed to get public URL");

      setForm({ ...form, image_url: publicUrl });
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    
      <div className="p-6">

        {/* Form */}
        <div className="mb-6 space-y-2">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <Input
            type="number"
            min={1}
            max={5}
            placeholder="Rating"
            value={form.rating}
            onChange={(e) =>
              setForm({
                ...form,
                rating: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
              })
            }
          />

          {/* File upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleFileUpload(e.target.files[0])
              }
            />
            {uploading && <p>Uploading...</p>}
            {form.image_url && (
              <img
                src={form.image_url}
                alt="Preview"
                className="w-40 h-40 object-cover rounded mt-2 border"
              />
            )}
          </div>

          <Button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</Button>
        </div>

        {/* Testimonials list */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="border p-4 rounded shadow">
                <h3 className="font-bold">{t.name}</h3>
                <p className="italic">{t.role}</p>
                <p>{t.content}</p>
                <p>Rating: {t.rating} ⭐</p>
                {t.image_url && (
                  <img
                    src={t.image_url}
                    alt={t.name}
                    className="w-full h-40 object-cover rounded mt-2"
                  />
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => handleEdit(t)}>Edit</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
  );
};

export default AdminTestimonialsDashboard;
