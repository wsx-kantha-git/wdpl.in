// src/components/ui/BackToTopButton.tsx
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6
        w-14 h-14
        bg-red-500/30 backdrop-blur-md
        rounded-full
        flex items-center justify-center
        shadow-lg
        hover:bg-red-500/50 hover:scale-110
        transition-all duration-300
        z-50
      "
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6 text-white" />
    </button>
  );
};

export default BackToTopButton;
