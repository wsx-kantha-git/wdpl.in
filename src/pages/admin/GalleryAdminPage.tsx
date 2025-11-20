import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Trash2, Edit, X, Save } from "lucide-react";

// ---------- TYPES ----------
type GalleryCategory =
  Database["public"]["Tables"]["gallery_categories"]["Row"];

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
  const [filterEventId, setFilterEventId] = useState(""); // <-- for filtering

  // Confirm delete modal state
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<
    { type: "category" | "event" | "image"; id: string; name?: string } | null
  >(null);

  // Edit states
  const [editingCategory, setEditingCategory] =
    useState<GalleryCategory | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editingEvent, setEditingEvent] =
    useState<GalleryEventWithCategory | null>(null);
  const [editEventData, setEditEventData] = useState({
    name: "",
    category_id: "",
  });
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editImageData, setEditImageData] = useState({
    image_name: "",
    category_id: "",
    event_id: "",
  });

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
      .select(
        `
        id,
        name,
        category_id,
        cover_image,
        created_at,
        gallery_categories ( name )
      `
      )
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setEvents(data || []);
  };

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select(
        "*, event:gallery_events(name), category:gallery_categories(name)"
      )
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
    const { error } = await supabase
      .from("gallery_categories")
      .insert({ name: newCategory });
    if (error)
      toast({ title: "Error adding category", description: error.message });
    else {
      toast({ title: "Category added successfully" });
      setNewCategory("");
      fetchCategories();
    }
  };

  const updateCategory = async () => {
    if (!editingCategory || !editCategoryName.trim()) return;
    const { error } = await supabase
      .from("gallery_categories")
      .update({ name: editCategoryName })
      .eq("id", editingCategory.id);
    if (error)
      toast({ title: "Error updating category", description: error.message });
    else {
      toast({ title: "Category updated successfully" });
      setEditingCategory(null);
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from("gallery_categories")
      .delete()
      .eq("id", id);
    if (error)
      toast({ title: "Error deleting category", description: error.message });
    else {
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
    if (error)
      toast({ title: "Error adding event", description: error.message });
    else {
      toast({ title: "Event added successfully" });
      setNewEvent({ name: "", category_id: "" });
      fetchEvents();
    }
  };

  const updateEvent = async () => {
    if (!editingEvent || !editEventData.name.trim()) return;
    const { error } = await supabase
      .from("gallery_events")
      .update(editEventData)
      .eq("id", editingEvent.id);
    if (error)
      toast({ title: "Error updating event", description: error.message });
    else {
      toast({ title: "Event updated successfully" });
      setEditingEvent(null);
      fetchEvents();
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from("gallery_events")
      .delete()
      .eq("id", id);
    if (error)
      toast({ title: "Error deleting event", description: error.message });
    else {
      toast({ title: "Event deleted successfully" });
      fetchEvents();
      fetchImages();
    }
  };

  // ---------- IMAGE CRUD ----------
  const uploadImages = async () => {
    if (!imageFileList.length || !selectedEvent || !selectedCategory) {
      toast({
        title: "Please select category, event, and at least one image file.",
      });
      return;
    }

    const uploadedImages: string[] = [];
    for (const file of imageFileList) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        toast({
          title: `Error uploading ${file.name}`,
          description: uploadError.message,
        });
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

    toast({
      title:
        uploadedImages.length > 0
          ? `${uploadedImages.length} image(s) uploaded successfully.`
          : "No images were uploaded.",
    });

    setImageDialogOpen(false);
    setImageFileList([]);
    setSelectedCategory("");
    setSelectedEvent("");
    fetchImages();
  };

  const updateImage = async () => {
    if (!editingImage) return;
    const { error } = await supabase
      .from("gallery_images")
      .update(editImageData)
      .eq("id", editingImage.id);
    if (error)
      toast({ title: "Error updating image", description: error.message });
    else {
      toast({ title: "Image updated successfully" });
      setEditingImage(null);
      fetchImages();
    }
  };

  const deleteImage = async (id: string) => {
    const image = images.find((img) => img.id === id);
    if (!image) return;
    const filePath = image.image_url?.split("/gallery-images/")[1];
    await supabase.from("gallery_images").delete().eq("id", id);
    if (filePath)
      await supabase.storage.from("gallery-images").remove([filePath]);
    toast({ title: "Image deleted successfully" });
    fetchImages();
  };

  // Universal confirm-delete handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    const { type, id } = deleteTarget;

    try {
      if (type === "category") {
        const { error } = await supabase
          .from("gallery_categories")
          .delete()
          .eq("id", id);
        if (error) {
          toast({ title: "Error deleting category", description: error.message });
        } else {
          toast({ title: "Category deleted successfully" });
          fetchCategories();
        }
      }

      if (type === "event") {
        const { error } = await supabase.from("gallery_events").delete().eq("id", id);
        if (error) {
          toast({ title: "Error deleting event", description: error.message });
        } else {
          toast({ title: "Event deleted successfully" });
          fetchEvents();
          fetchImages();
        }
      }

      if (type === "image") {
        const image = images.find((img) => img.id === id);
        if (!image) {
          toast({ title: "Image not found" });
        } else {
          // Delete DB row
          const { error } = await supabase.from("gallery_images").delete().eq("id", id);
          if (error) {
            toast({ title: "Error deleting image", description: error.message });
          } else {
            // Remove from storage if path exists
            const filePath = image.image_url?.split("/gallery-images/")[1];
            if (filePath) {
              const { error: storageError } = await supabase
                .storage
                .from("gallery-images")
                .remove([filePath]);
              if (storageError) {
                // storage removal failed but DB is deleted — notify
                toast({
                  title: "Image DB removed, but storage removal failed",
                  description: storageError.message,
                });
              }
            }
            toast({ title: "Image deleted successfully" });
            fetchImages();
          }
        }
      }
    } catch (err) {
      toast({ title: "Delete failed", description: String(err) });
    } finally {
      setConfirmDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  // ---------- FILTERED IMAGES ----------
  const filteredImages = filterEventId
    ? images.filter((img) => img.event_id === filterEventId)
    : images;

  // ---------- RENDER ----------
  return (
    <section className="py-12 container mx-auto px-4">
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="flex bg-foreground text-white justify-center mb-8 flex-wrap gap-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        {/* ---------- CATEGORIES ---------- */}
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
                  <li
                    key={cat.id}
                    className="flex justify-between items-center border rounded p-2"
                  >
                    {editingCategory?.id === cat.id ? (
                      <div className="flex gap-2 w-full">
                        <Input
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                        />
                        <Button size="sm" onClick={updateCategory}>
                          <Save size={16} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingCategory(null)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span>{cat.name}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditingCategory(cat);
                              setEditCategoryName(cat.name);
                            }}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setDeleteTarget({ type: "category", id: cat.id, name: cat.name });
                              setConfirmDeleteOpen(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------- EVENTS ---------- */}
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
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                />
                <select
                  className="border rounded p-2"
                  value={newEvent.category_id}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category_id: e.target.value })
                  }
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
                  <li
                    key={ev.id}
                    className="flex justify-between items-center border rounded p-2"
                  >
                    {editingEvent?.id === ev.id ? (
                      <div className="flex flex-col md:flex-row gap-2 w-full">
                        <Input
                          value={editEventData.name}
                          onChange={(e) =>
                            setEditEventData({
                              ...editEventData,
                              name: e.target.value,
                            })
                          }
                        />
                        <select
                          className="border rounded p-2"
                          value={editEventData.category_id}
                          onChange={(e) =>
                            setEditEventData({
                              ...editEventData,
                              category_id: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={updateEvent}>
                            <Save size={16} />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setEditingEvent(null)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>
                          {ev.name}{" "}
                          <span className="text-sm text-gray-500">
                            ({ev.gallery_categories?.name || "No Category"})
                          </span>
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditingEvent(ev);
                              setEditEventData({
                                name: ev.name,
                                category_id: ev.category_id,
                              });
                            }}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setDeleteTarget({ type: "event", id: ev.id, name: ev.name });
                              setConfirmDeleteOpen(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------- IMAGES ---------- */}
        <TabsContent value="images">
          <Card className="mb-8">
            <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
              <CardTitle>Manage Images</CardTitle>
              <div className="flex gap-2">
                <select
                  className="border rounded p-2"
                  value={filterEventId}
                  onChange={(e) => setFilterEventId(e.target.value)}
                >
                  <option value="">All Events</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name}
                    </option>
                  ))}
                </select>
                <Button onClick={() => setImageDialogOpen(true)}>
                  Upload Images
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className="border rounded-lg overflow-hidden p-2"
                  >
                    {editingImage?.id === img.id ? (
                      <div className="space-y-2">
                        {/* --- Image Edit Fields --- */}
                        <select
                          className="border rounded p-2 w-full"
                          value={editImageData.category_id}
                          onChange={(e) =>
                            setEditImageData({
                              ...editImageData,
                              category_id: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <select
                          className="border rounded p-2 w-full"
                          value={editImageData.event_id}
                          onChange={(e) =>
                            setEditImageData({
                              ...editImageData,
                              event_id: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Event</option>
                          {events.map((ev) => (
                            <option key={ev.id} value={ev.id}>
                              {ev.name}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2 ">
                          <Button size="sm" onClick={updateImage}>
                            <Save size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingImage(null)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={img.image_url}
                          alt="Event Image"
                          className="w-full h-48 object-cover rounded"
                        />
                        <div className="p-2 text-sm flex justify-between items-center">
                          <p className="text-sm font-medium truncate">
                            {img.event?.name || "No Event"}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              onClick={() => {
                                setEditingImage(img);
                                setEditImageData({
                                  image_name: img.image_name || "",
                                  category_id: img.category_id || "",
                                  event_id: img.event_id || "",
                                });
                              }}
                            >
                              <Edit size={16} />
                            </Button>

                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => {
                                setDeleteTarget({ type: "image", id: img.id, name: img.image_name || img.event?.name });
                                setConfirmDeleteOpen(true);
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ---------- IMAGE UPLOAD DIALOG ---------- */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category</Label>
              <select
                className="border rounded p-2 w-full"
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
                className="border rounded p-2 w-full"
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
              <Label>Images</Label>
              <Input
                type="file"
                multiple
                onChange={(e) =>
                  setImageFileList(Array.from(e.target.files || []))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={uploadImages}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------- CONFIRM DELETE DIALOG (GLOBAL) ---------- */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <p className="mb-4 text-sm text-muted-foreground">
            Are you sure you want to delete this{" "}
            <strong>{deleteTarget?.type}</strong>
            {deleteTarget?.name ? ` — "${deleteTarget.name}"` : ""}? This action
            cannot be undone.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmDeleteOpen(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GalleryAdminPage;
