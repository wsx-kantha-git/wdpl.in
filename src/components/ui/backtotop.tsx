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
    fixed bottom-4 right-4
    w-10 h-10                   /* mobile size */
    sm:w-12 sm:h-12             /* small tablets */
    md:w-14 md:h-14             /* larger screens */
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
  <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
</button>

  );
};

export default BackToTopButton;
