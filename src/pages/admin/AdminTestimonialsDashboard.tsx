import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Edit } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Database,
  TablesInsert,
  TablesUpdate,
} from "@/integrations/supabase/types";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const AdminTestimonialsDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal controls for Edit
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [form, setForm] = useState<TablesInsert<"testimonials">>({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image_url: "",
  });

  const [modalForm, setModalForm] = useState<TablesInsert<"testimonials">>({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image_url: "",
  });

  const [uploading, setUploading] = useState(false);
  const [modalUploading, setModalUploading] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ---------------------- ADD NEW ----------------------
  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.content || !form.image_url) {
      alert("All fields are required!");
      return;
    }

    try {
      await supabase.from("testimonials").insert(form);
      setForm({ name: "", role: "", content: "", rating: 5, image_url: "" });
      fetchTestimonials();
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const handleUpload = async (file: File) => {
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
      setForm({ ...form, image_url: data.publicUrl });
    } finally {
      setUploading(false);
    }
  };

  // ---------------------- EDIT MODAL ----------------------
  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setModalForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      image_url: t.image_url,
    });
    setShowModal(true);
  };

  const handleModalUpload = async (file: File) => {
    setModalUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("testimonials")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("testimonials")
        .getPublicUrl(fileName);
      setModalForm({ ...modalForm, image_url: data.publicUrl });
    } finally {
      setModalUploading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!modalForm.name || !modalForm.role || !modalForm.content) {
      alert("All fields are required");
      return;
    }

    await supabase
      .from("testimonials")
      .update(modalForm as TablesUpdate<"testimonials">)
      .eq("id", editingId);

    setShowModal(false);
    setEditingId(null);
    fetchTestimonials();
  };

  // ---------------------- DELETE ----------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <div className="p-6">
      {/* ----------------- ADD FORM (STAYS ON PAGE) ----------------- */}
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
            setForm({ ...form, rating: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })
          }
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          />
          {uploading && <p>Uploading...</p>}
          {form.image_url && (
            <img
              src={form.image_url}
              className="w-40 h-40 object-cover rounded mt-2 border"
            />
          )}
        </div>

        <Button onClick={handleSubmit}>{`Add Testimonial`}</Button>
      </div>

      {/* ----------------- TESTIMONIALS GRID ----------------- */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{t.name}</h3>
              <p className="italic text-sm">{t.role}</p>
              <p className="mt-2">{t.content}</p>
              <p className="mt-1">⭐ {t.rating}</p>

              {t.image_url && (
                <img
                  src={t.image_url}
                  className="w-full h-40 object-cover rounded mt-2"
                />
              )}

              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => handleEdit(t)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(t.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------- EDIT MODAL ----------------- */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto p-6 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Edit Testimonial
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={modalForm.name}
              onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={modalForm.role}
              onChange={(e) => setModalForm({ ...modalForm, role: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              value={modalForm.content}
              onChange={(e) => setModalForm({ ...modalForm, content: e.target.value })}
              rows={4}
            />
            <Input
              type="number"
              min={1}
              max={5}
              value={modalForm.rating}
              onChange={(e) =>
                setModalForm({ ...modalForm, rating: Number(e.target.value) })
              }
            />

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleModalUpload(e.target.files[0])}
              />
              {modalUploading && <p>Uploading...</p>}
              {modalForm.image_url && (
                <img
                  src={modalForm.image_url}
                  className="w-40 h-40 object-cover rounded mt-2 border"
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonialsDashboard;
