import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import logo from "@/assets/wdpl-logo-white.svg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4 group">
              <img
                src={logo}
                alt="WDPL Logo"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-background/80 text-sm mb-4">
              Family-first, growth-focused. Join our team in Chennai &
              Coimbatore.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-background/80 hover:text-primary transition-all duration-300 hover:translate-x-1 group"
            >
              <Linkedin
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              <span className="text-sm">Follow us</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-background mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-background/80 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-background/80 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/culture"
                  className="text-background/80 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Work Culture
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-background/80 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Chennai Office */}
          <div className="group">
            <h3 className="font-semibold text-background mb-4">
              Chennai Office
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-background/80 text-sm">
                <MapPin
                  size={16}
                  className="mt-1 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary"
                />
                <span>
                  286/1, Rajiv Gandhi Salai, Nehru Nagar, Perungudi, Chennai,
                  TamilNadu 600096, India
                </span>
              </div>

              {/* Glassy Button */}
              <a
                href="https://maps.google.com/?q=286/1,+Rajiv+Gandhi+Salai,+Nehru+Nagar,+Perungudi,+Chennai,+600096"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs px-4 py-2 rounded-lg transition-all duration-500 hover:bg-white/20 hover:shadow-lg hover:scale-105"
              >
                View Map
              </a>
            </div>
          </div>

          {/* Coimbatore Office */}
          <div className="group">
            <h3 className="font-semibold text-background mb-4">
              Coimbatore Office
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-background/80 text-sm">
                <MapPin
                  size={16}
                  className="mt-1 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary"
                />
                <span>
                  2nd Floor, MAPA Center, Opposite LuLu Hypermarket, Coimbatore,
                  TamilNadu 641045, India
                </span>
              </div>

              {/* Glassy Button */}
              <a
                href="https://maps.google.com/?q=MAPA+Center,+Mikro+Grafeio,+Coimbatore,+641045"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs px-4 py-2 rounded-lg transition-all duration-500 hover:bg-white/20 hover:shadow-lg hover:scale-105"
              >
                View Map
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Webstix Design Private Limited. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/terms&conditions"
                className="text-background/60 hover:text-primary text-sm transition-all duration-300 hover:translate-y-[-2px]"
              > 
                Terms & Conditions
              </Link>
              <Link
                to="/privacypolicy"
                className="text-background/60 hover:text-primary text-sm transition-all duration-300 hover:translate-y-[-2px]"
              >
                Privacy policy
              </Link>
              <Link
                to="/sitemap"
                className="text-background/60 hover:text-primary text-sm transition-all duration-300 hover:translate-y-[-2px]"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
