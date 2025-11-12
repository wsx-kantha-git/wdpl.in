import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Home, Users, Briefcase, Heart, Image, FileText, Mail, Shield, FileCheck } from "lucide-react";

const Sitemap = () => {
  const siteLinks = [
    {
      category: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Our Team", path: "/team" },
        { name: "Work Culture", path: "/culture" },
      ]
    },
    {
      category: "Career & Opportunities",
      icon: Briefcase,
      links: [
        { name: "Careers", path: "/careers" },
      ]
    },
    {
      category: "Media & Resources",
      icon: Image,
      links: [
        { name: "Gallery", path: "/gallery" },
      ]
    },
    {
      category: "Contact & Support",
      icon: Mail,
      links: [
        { name: "Contact Us", path: "/contact" },
      ]
    },
    {
      category: "Legal & Policies",
      icon: Shield,
      links: [
        { name: "Terms and Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Sitemap", path: "/sitemap" },
      ]
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-raleway text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sitemap
            </h1>
            <p className="font-source text-lg text-muted-foreground max-w-3xl">
              Navigate through all the pages and sections of our website
            </p>
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteLinks.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-raleway text-xl font-bold text-foreground">
                        {section.category}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            to={link.path}
                            className="font-source text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="mt-16 bg-muted/30 rounded-lg p-8">
              <h2 className="font-raleway text-2xl font-bold text-foreground mb-4">
                Need Help Finding Something?
              </h2>
              <p className="font-source text-muted-foreground mb-6 leading-relaxed">
                If you're having trouble finding what you're looking for, please don't hesitate to reach out to us. Our team is here to help you navigate our services and find the information you need.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-source font-medium hover:bg-primary/90 transition-all duration-300 hover:translate-x-1"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
            </div>

            {/* Office Locations */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-raleway text-xl font-bold text-foreground mb-3">
                  Chennai Office
                </h3>
                <p className="font-source text-muted-foreground text-sm">
                  286/1, Rajiv Gandhi Salai, Nehru Nagar, Perungudi, Chennai, 600096
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-raleway text-xl font-bold text-foreground mb-3">
                  Coimbatore Office
                </h3>
                <p className="font-source text-muted-foreground text-sm">
                  2nd Floor, MAPA Center, Mikro Grafeio opposite LuLu Hypermarket, Coimbatore, 641045
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Sitemap;