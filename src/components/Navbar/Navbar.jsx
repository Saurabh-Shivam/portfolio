import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    // Update active section based on scroll position
    const sections = [
      "about",
      "skills",
      "experience",
      "work",
      "education",
      "certificates",
    ];
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, []);

  // Add scroll event listener with passive option for better performance
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Smooth scroll function with offset
  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Adjust this value based on your navbar height
      const sectionTop =
        section.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certificates", label: "Certificates" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${
        isScrolled
          ? "bg-white/50 dark:bg-[#050414]/50 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="text-gray-900 dark:text-white py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold cursor-pointer">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-gray-900 dark:text-white">Saurabh</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-gray-900 dark:text-white">Shivam</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-600 dark:text-gray-300">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-[#8245ec] transition-colors duration-200 ${
                activeSection === item.id ? "text-[#8245ec]" : ""
              }`}
            >
              <button onClick={() => handleMenuItemClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <FiSun className="text-gray-600 dark:text-gray-300 w-5 h-5" />
            ) : (
              <FiMoon className="text-gray-600 dark:text-gray-300 w-5 h-5" />
            )}
          </button>

          {/* Social Icons */}
          <a
            href="https://github.com/Saurabh-Shivam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-[#8245ec] transition-colors duration-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/saurabh-shivam-1b50931a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-[#8245ec] transition-colors duration-200"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://leetcode.com/u/saurabh-shivam/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-[#8245ec] transition-colors duration-200"
          >
            <FaCode size={24} />
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Theme Toggle Button (Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <FiSun className="text-gray-600 dark:text-gray-300 w-5 h-5" />
            ) : (
              <FiMoon className="text-gray-600 dark:text-gray-300 w-5 h-5" />
            )}
          </button>

          {isOpen ? (
            <FiX
              className="text-3xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-3xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-white/50 dark:bg-[#050414]/50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-600 dark:text-gray-300">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-[#8245ec] transition-colors duration-200 ${
                  activeSection === item.id ? "text-[#8245ec]" : ""
                }`}
              >
                <button onClick={() => handleMenuItemClick(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
            <div className="flex space-x-4">
              <a
                href="https://github.com/Saurabh-Shivam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#8245ec] transition-colors duration-200"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/saurabh-shivam-1b50931a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#8245ec] transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://leetcode.com/u/saurabh-shivam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#8245ec] transition-colors duration-200"
              >
                <FaCode size={24} />
              </a>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
