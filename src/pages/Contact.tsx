import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      city: "Chennai",
      address: "286/1, Rajiv Gandhi Salai, Nehru Nagar, Perungudi",
      fullAddress: "Chennai, Tamil Nadu 600096, India",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0486000973997!2d80.24550057507643!3d12.968741987346368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6cbd3f3a21%3A0x4d9dcffff16b35d5!2sPrince%20Info%20City%20I%2C%20286%2F1%2C%20Rajiv%20Gandhi%20Salai%2C%20Nehru%20Nagar%2C%20Perungudi%2C%20Chennai%2C%20Tamil%20Nadu%20600096!5e0!3m2!1sen!2sin!4v1762409933735!5m2!1sen!2sin",    },
    {
      city: "Coimbatore",
      address:
        "2nd Floor, MAPA Center, Mikro Grafeio opposite LuLu Hypermarket",
      fullAddress: "Papanaickenpalayam, Coimbatore, Tamil Nadu 641045, India",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3898421049676!2d76.9865162250453!3d11.009349389153908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85997d75fdd63%3A0x45702f5f5e148762!2sMikro%20Grafeio%20(Beyond%20Workspaces)!5e0!3m2!1sen!2sin!4v1762348760819!5m2!1sen!2sin",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_60%)]"></div>
        <div className="container mt-4 mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
            <Badge className="mb-4 animate-fade-in hover:scale-110 transition-transform duration-300">
              Contact Us
            </Badge>

            <h1
              className="text-3xl md:text-5xl font-bold mb-8 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent transition-transform duration-500 inline-block"
              style={{ animationDelay: "0.1s" }}
            >
              Let's Connect
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in max-w-2xl"
              style={{ animationDelay: "0.2s" }}
            >
              Have questions? Want to join our team? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Fixed Contact Form */}
            <div className="lg:sticky lg:top-20 self-start h-fit">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="eg. +91 98765 43210"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us what you'd like to discuss..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="brand"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Scrollable Offices Section */}
            <div className="space-y-8 overflow-y-auto max-h-[80vh] pr-2">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Our Offices
              </h2>
              <p className="text-muted-foreground mb-6">
                Visit us at our Chennai or Coimbatore locations.
              </p>

              {offices.map((office) => (
                <Card key={office.city}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {office.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">
                      {office.address}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {office.fullAddress}
                    </p>

                    {/* Direct Map Embed */}
                    <div className="aspect-video w-full overflow-hidden rounded-lg border">
                      <iframe
                        src={office.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;