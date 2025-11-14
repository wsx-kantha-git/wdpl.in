import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import logo from "@/assets/wdpl-logo-white.svg";
import LinkedIn from "@/assets/linkedin.svg";
import TermsAndConditions from "@/pages/TermsAndConditions";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4 group">
              <img src={logo} alt="WDPL Logo" className="h-20 w-auto " />
            </Link>

            <div className=" mt-4 flex items-center gap-2 text-background/80">
              <span className="text-lg">Follow Us:</span>
              <a
                href="https://www.linkedin.com/company/webstix-design-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center group"
              >
                <img
                  src={LinkedIn}
                  alt="LinkedIn"
                  className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:brightness-100"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-background mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-flow-col grid-rows-4 gap-x-8 gap-y-2">
              {[
                { name: "Home", to: "/" },
                { name: "About Us", to: "/about" },
                { name: "Our Team", to: "/team" },
                { name: "Work Culture", to: "/culture" },
                { name: "Careers", to: "/careers" },
                { name: "Gallery", to: "/gallery" },
                { name: "Contact", to: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-background/80 text-[16px] relative transition-all duration-300"
                  >
                    {/* Chevron always visible */}
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />

                    {/* Text with underline on hover */}
                    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chennai Office */}
          <div className="group ">
            <h3 className="text-lg font-semibold text-background mb-4">
              Chennai Office
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-background/80 text-[16px]">
                <MapPin
                  size={16}
                  className="mt-1 shrink-0 transition-transform duration-300 "
                />
                <span>
                  Prince Infocity 1, 8th Floor, 286/1, OMR, Kandhanchavadi, Chennai,
                  <br />
                  Tamil Nadu-600096, India.
                </span>
              </div>

              {/* Map Button */}
              <Button
                asChild
                variant="link"
                className="text-secondary text-[16px] font-medium underline-offset-8 hover:underline decoration-primary transition-all duration-300"
              >
                <a
                  href="https://maps.google.com/?q=286/1,+Rajiv+Gandhi+Salai,+Nehru+Nagar,+Perungudi,+Chennai,+600096"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map <ArrowRight className="ml-2" size={16} />
                </a>
              </Button>
            </div>
          </div>

          {/* Coimbatore Office */}
          <div className="group">
            <h3 className="text-lg font-semibold text-background mb-4">
              Coimbatore Office
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-background/80 text-[16px]">
                <MapPin
                  size={16}
                  className="mt-1 shrink-0 transition-transform duration-300 "
                />
                <span>
                  Mikro Grafeio, 1st Floor, 766, 767, Puliakulam Road,
                  Coimbatore,
                  <br /> Tamil Nadu-641037, India.
                </span>
              </div>

              {/* Map Button */}
              <Button
                asChild
                variant="link"
                className="text-secondary text-[16px] font-medium underline-offset-8 hover:underline decoration-primary transition-all duration-300"
              >
                <a
                  href="https://maps.app.goo.gl/JtXBgWZf2aDxMULU9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map <ArrowRight className="ml-2" size={16} />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Webstix Design Private Limited. All
              Rights Reserved.
            </p>

            <div className="mx-20 flex items-center gap-2 text-sm">
              <Link
                to="/terms"
                className="text-background/60 underline-offset-4 hover:underline decoration-secondary transition-all duration-300"
              >
                Terms & Conditions
              </Link>
              <span className="text-background/40">|</span>
              <Link
                to="/privacy"
                className="text-background/60 underline-offset-4 hover:underline decoration-secondary transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-background/40">|</span>
              <Link
                to="/sitemap"
                className="text-background/60 underline-offset-4 hover:underline decoration-secondary transition-all duration-300"
              >
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
