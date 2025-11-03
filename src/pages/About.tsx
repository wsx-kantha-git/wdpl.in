import { Card } from "@/components/ui/card";
import { Target, Heart, Zap, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Family First",
      description: "We treat our team like family, fostering a supportive and caring environment.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace new technologies and creative solutions to stay ahead.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We build trust through transparency and ethical practices.",
    },
  ];

  const timeline = [
    { year: "2010", title: "Founded", description: "Started as a small design studio in Chennai" },
    { year: "2015", title: "Expanded", description: "Opened our Coimbatore office" },
    { year: "2018", title: "Growth", description: "Reached 50+ team members" },
    { year: "2020", title: "Digital Transformation", description: "Pivoted to full-stack development" },
    { year: "2024", title: "Today", description: "Leading employer in Tamil Nadu tech scene" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.15),transparent_60%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold  mb-8 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">About WDPL</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Webstix Design Private Limited - A family-owned technology partner committed to innovation, growth, and
              creating exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="p-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-primary/5" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-4xl font-bold  mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-muted-foreground text-lg">
                To empower businesses through cutting-edge design and development, while nurturing a workplace where
                talent thrives, creativity flourishes, and every team member feels valued and supported.
              </p>
            </Card>
            <Card className="p-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-accent/5" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-4xl font-bold  mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Vision</h2>
              <p className="text-muted-foreground text-lg">
                To become the most sought-after employer in Tamil Nadu's tech industry, known for fostering innovation,
                professional growth, and a culture that balances excellence with work-life harmony.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 transition-transform shrink-0">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && <div className="w-1 h-full bg-primary/20 mt-4"></div>}
                  </div>
                  <Card className="p-6 flex-1 group-hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <value.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* US Partnership Note */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Global Reach, Local Values</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Proudly partnered with a family-owned US Mid-West-Family Company, we combine international standards with Indian
            warmth and hospitality. This collaboration brings global opportunities while maintaining our core values of
            trust, respect, and family-first culture.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
