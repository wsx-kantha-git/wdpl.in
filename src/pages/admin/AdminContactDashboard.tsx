import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

// Define your own type here if Database type is incompatible
type ContactEntry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status?: string | null;
  created_at?: string | null;
};

const AdminContactDashboard = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchEntries = useCallback(async () => {
    setLoading(true);

    // No generics to avoid TS errors
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch entries", variant: "destructive" });
    } else {
      // Type assertion to ContactEntry[]
      setEntries((data as ContactEntry[]) || []);
    }

    setLoading(false);
  }, [toast]);

  const deleteEntry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete entry", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Entry deleted successfully." });
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.email.toLowerCase().includes(search.toLowerCase()) ||
      (entry.phone && entry.phone.includes(search)) ||
      entry.message.toLowerCase().includes(search.toLowerCase())
  );

  return (

      <section className="py-12 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Contact Form Submissions</h1>

        <Input
          placeholder="Search by name, email, phone, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 max-w-md"
        />

        <Card>
          <CardHeader>
            <CardTitle>Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No entries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{entry.phone || "-"}</TableCell>
                      <TableCell>{entry.message}</TableCell>
                      <TableCell>{entry.status || "new"}</TableCell>
                      <TableCell>
                        {entry.created_at ? new Date(entry.created_at).toLocaleString() : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => deleteEntry(entry.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
  );
};

export default AdminContactDashboard;
