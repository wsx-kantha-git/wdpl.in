import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// ---------- TYPES ----------
type GalleryCategory = Database["public"]["Tables"]["gallery_categories"]["Row"];

type GalleryEventWithCategory = {
  id: string;
  name: string;
  category_id: string;
  cover_image?: string | null;
  created_at?: string | null;
  gallery_categories?: { name: string } | null;
};

type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"] & {
  event?: { name: string } | null;
  category?: { name: string } | null;
};

// ---------- COMPONENT ----------
const GalleryAdminPage = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [events, setEvents] = useState<GalleryEventWithCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newEvent, setNewEvent] = useState({ name: "", category_id: "" });
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // ---------- FETCH FUNCTIONS ----------
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("gallery_categories")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setCategories(data || []);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("gallery_events")
      .select(`
        id,
        name,
        category_id,
        cover_image,
        created_at,
        gallery_categories ( name )
      `)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setEvents(data || []);
  };

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*, event:gallery_events(name), category:gallery_categories(name)")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setImages(data as GalleryImage[]);
  };

  useEffect(() => {
    fetchCategories();
    fetchEvents();
    fetchImages();
  }, []);

  // ---------- CATEGORY CRUD ----------
  const addCategory = async () => {
    if (!newCategory.trim()) {
      toast({ title: "Please enter a category name." });
      return;
    }
    const { error } = await supabase.from("gallery_categories").insert({ name: newCategory });
    if (error) {
      toast({ title: "Error adding category", description: error.message });
    } else {
      toast({ title: "Category added successfully" });
      setNewCategory("");
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from("gallery_categories").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting category", description: error.message });
    } else {
      toast({ title: "Category deleted successfully" });
      fetchCategories();
    }
  };

  // ---------- EVENT CRUD ----------
  const addEvent = async () => {
    if (!newEvent.name.trim() || !newEvent.category_id) {
      toast({ title: "Please fill all event fields." });
      return;
    }
    const { error } = await supabase.from("gallery_events").insert(newEvent);
    if (error) {
      toast({ title: "Error adding event", description: error.message });
    } else {
      toast({ title: "Event added successfully" });
      setNewEvent({ name: "", category_id: "" });
      fetchEvents();
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from("gallery_events").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting event", description: error.message });
    } else {
      toast({ title: "Event deleted successfully" });
      fetchEvents();
      fetchImages();
    }
  };

  // ---------- IMAGE CRUD (MULTIPLE UPLOADS) ----------
  const uploadImages = async () => {
    if (!imageFileList.length || !selectedEvent || !selectedCategory) {
      toast({ title: "Please select category, event, and at least one image file." });
      return;
    }

    const uploadedImages: string[] = [];

    for (const file of imageFileList) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        toast({ title: `Error uploading ${file.name}`, description: uploadError.message });
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(filePath);
      const imageUrl = publicUrlData?.publicUrl;

      if (imageUrl) {
        uploadedImages.push(imageUrl);
        await supabase.from("gallery_images").insert({
          image_url: imageUrl,
          image_name: fileName,
          category_id: selectedCategory,
          event_id: selectedEvent,
        });
      }
    }

    if (uploadedImages.length > 0) {
      toast({ title: `${uploadedImages.length} image(s) uploaded successfully.` });
    } else {
      toast({ title: "No images were uploaded." });
    }

    setImageDialogOpen(false);
    setImageFileList([]);
    setSelectedCategory("");
    setSelectedEvent("");
    fetchImages();
  };

  const deleteImage = async (id: string) => {
    const image = images.find((img) => img.id === id);
    if (!image) return;

    const filePath = image.image_url?.split("/gallery-images/")[1];

    const { error: dbError } = await supabase.from("gallery_images").delete().eq("id", id);
    if (dbError) {
      toast({ title: "Error deleting image record", description: dbError.message });
      return;
    }

    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("gallery-images")
        .remove([filePath]);
      if (storageError) {
        toast({ title: "Warning", description: "Image removed from DB but not from storage" });
      }
    }

    toast({ title: "Image deleted successfully" });
    fetchImages();
  };

  // ---------- RENDER ----------
  return (
    <section className="py-12 container mx-auto px-4">
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        {/* ---------- Categories ---------- */}
        <TabsContent value="categories">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manage Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="New Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button onClick={addCategory}>Add</Button>
              </div>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id} className="flex justify-between items-center border rounded p-2">
                    <span>{cat.name}</span>
                    <Button variant="destructive" size="sm" onClick={() => deleteCategory(cat.id)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------- Events ---------- */}
        <TabsContent value="events">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manage Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2 mb-4">
                <Input
                  placeholder="Event Name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <select
                  className="border rounded p-2"
                  value={newEvent.category_id}
                  onChange={(e) => setNewEvent({ ...newEvent, category_id: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={addEvent}>Add Event</Button>

              <ul className="mt-6 space-y-2">
                {events.map((ev) => (
                  <li key={ev.id} className="flex justify-between items-center border rounded p-2">
                    <span>
                      {ev.name}{" "}
                      <span className="text-sm text-gray-500">
                        ({ev.gallery_categories?.name || "No Category"})
                      </span>
                    </span>
                    <Button variant="destructive" size="sm" onClick={() => deleteEvent(ev.id)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------- Images ---------- */}
        <TabsContent value="images">
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Manage Images</CardTitle>
              <Button onClick={() => setImageDialogOpen(true)}>Upload Images</Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="border rounded-lg overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.image_name || "Image"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2 text-sm flex justify-between items-center">
                      <div>
                        <p className="font-semibold truncate">{img.image_name}</p>
                        <p className="text-xs text-gray-500">
                          {img.event?.name || "No Event"}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImage(img.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ---------- Image Upload Dialog ---------- */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category</Label>
              <select
                className="w-full border rounded p-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Event</Label>
              <select
                className="w-full border rounded p-2"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">Select Event</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Image Files</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFileList(Array.from(e.target.files || []))}
              />
              {imageFileList.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {imageFileList.length} file(s) selected
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={uploadImages}>Upload All</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GalleryAdminPage;
