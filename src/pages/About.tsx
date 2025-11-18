import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import Bottom from "@/assets/wdpl-images/aboutus/philipandlennart.jpg";
import Hero from "@/assets/wdpl-images/aboutus/team.jpg";
import icon1 from "@/assets/wdpl-images/aboutus/creative.svg";
import icon2 from "@/assets/wdpl-images/aboutus/family.svg";
import icon3 from "@/assets/wdpl-images/aboutus/integrity.svg";
import icon4 from "@/assets/wdpl-images/aboutus/star.svg";

const About = () => {
  const values = [
    {
      icon: icon2,
      title: "Family First",
      description:
        "We treat our team like family, fostering a supportive and caring environment.",
    },
    {
      icon: icon1,
      title: "Innovation",
      description:
        "We embrace new technologies and creative solutions to stay ahead.",
    },
    {
      icon: icon4,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do.",
    },
    {
      icon: icon3,
      title: "Integrity",
      description: "We build trust through transparency and ethical practices.",
    },
  ];

  const timeline = [
    {
      year: "2025",
      title: "AI, React.js & Chatbots",
      description:
        "Embracing AI-powered automation, modern front-end frameworks, and conversational chatbots to redefine web experiences.",
    },
    {
      year: "2020",
      title: "B2B Large-Scale Websites",
      description:
        "Delivered complex, high-traffic B2B platforms with advanced product catalogs and dealer portals.",
    },
    {
      year: "2018",
      title: "WordPress Multisite",
      description:
        "Implemented large, multi-site WordPress networks for bigger clients.",
    },
    {
      year: "2016",
      title: "API Integrations",
      description:
        "Began integrating websites with CRMs, ERPs, and third-party systems to streamline business operations.",
    },
    {
      year: "2012",
      title: "WordPress, WooCommerce & SEO",
      description:
        "Transitioned to WordPress as our core platform, adding WooCommerce and SEO expertise for complete digital solutions.",
    },
    {
      year: "2005",
      title: "Joomla & VirtueMart",
      description:
        "Adopted CMS-driven development with Joomla and integrated eCommerce capabilities through VirtueMart.",
    },
    {
      year: "2002",
      title: "HTML/CSS & Support",
      description:
        "Expanded services with custom HTML/CSS websites and dedicated maintenance support for growing client needs.",
    },
    {
      year: "2000",
      title: "Founded",
      description:
        "Webstix was established with a vision to build reliable, high-performing websites that deliver measurable results.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-24 bg-center bg-cover bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-raleway text-5xl md:text-6xl font-bold mb-8 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-white inline-block">
              About WDPL
            </h1>
            <p
              className="text-xl md:text-2xl text-white/90 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Webstix Design Private Limited - A family owned technology partner
              committed to innovation, growth, and creating exceptional digital
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <Card
              className="p-10 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-primary/5"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="text-4xl font-bold  mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg">
                To empower businesses through cutting-edge design and
                development, while nurturing a workplace where talent thrives,
                creativity flourishes, and every team member feels valued and
                supported.
              </p>
            </Card>

            <Card
              className="p-10 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary/50 animate-fade-in bg-gradient-to-br from-background to-accent/5"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-4xl font-bold  mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-lg">
                To become the most sought-after employer in Tamil Nadu's tech
                industry, known for fostering innovation, professional growth,
                and a culture that balances excellence with work-life harmony.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-secondary">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-foreground mb-12">
      Our Journey
    </h2>

    <div className="max-w-4xl mx-auto relative">

      {/* Continuous line that stops above the last year */}
      <div className="absolute left-8 top-[60px] bottom-[60px] w-[2px] bg-primary/20"></div>

      <div className="space-y-14">
        {timeline.map((item, index) => (
          <div key={index} className="flex gap-6 group relative">

            {/* Year Circle */}
            <div className="flex flex-col items-center justify-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground 
                flex items-center justify-center font-bold text-lg group-hover:scale-110 
                transition-transform">
                {item.year}
              </div>
            </div>

            {/* Card */}
            <Card className="p-6 flex-1 group-hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
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
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <img
                    src={value.icon}
                    alt={value.title}
                    className="w-12 h-12 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* US Partnership Note */}
      <section
        className="relative py-24 bg-center bg-cover bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${Bottom})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 container mx-auto px-4 flex justify-start">
          <div className="max-w-3xl text-center md:text-left md:pl-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Global Reach, Local Values
            </h2>
            <p className="text-lg md:text-2xl  text-white/90 leading-relaxed">
              Proudly partnered with US Mid-West-Family Company, we combine
              international standards with Indian warmth and hospitality. This
              collaboration brings global opportunities while maintaining our
              core values of trust, respect, and family-first culture.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
