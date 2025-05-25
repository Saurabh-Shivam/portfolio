import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";

const Contact = () => {
  const form = useRef();
  const submitButton = useRef();
  const [isSent, setIsSent] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    // Get submit button position for confetti origin
    const buttonRect = submitButton.current.getBoundingClientRect();
    setConfettiPosition({
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2,
    });

    emailjs
      .sendForm(
        "service_g8iodye",
        "template_o2r1jx9",
        form.current,
        "o7CFTm6D1kGBrmepN"
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            onClose: () => setIsSent(false),
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] relative"
    >
      {/* Confetti Effect */}
      {isSent && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
            colors={[
              "#8245ec", // Primary purple
              "#a855f7", // Light purple
              "#c084fc", // Lighter purple
              "#e9d5ff", // Lightest purple
              "#f472b6", // Pink from gradient
              "#ec4899", // Darker pink
              "#db2777", // Deep pink
              "#be185d", // Deepest pink
              "#4f46e5", // Indigo accent
              "#6366f1", // Light indigo
              "#818cf8", // Lighter indigo
              "#a5b4fc", // Lightest indigo
            ]}
            style={{ position: "fixed", top: 0, left: 0 }}
            confettiSource={{
              x: confettiPosition.x,
              y: confettiPosition.y,
              w: 0,
              h: 0,
            }}
            initialVelocityX={25}
            initialVelocityY={40}
            tweenDuration={50}
            spread={360}
            angle={90}
          />
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          CONTACT
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg font-semibold">
          I&apos;d love to hear from you—reach out for any opportunities or
          questions!
        </p>
      </div>

      {/* Contact Form */}
      <div className="mt-8 w-full max-w-md bg-white dark:bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
          Connect With Me <span className="ml-1">🚀</span>
        </h3>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="mt-4 flex flex-col space-y-4"
        >
          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-gray-50 dark:bg-[#131025] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-gray-50 dark:bg-[#131025] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3 rounded-md bg-gray-50 dark:bg-[#131025] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3 rounded-md bg-gray-50 dark:bg-[#131025] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-500"
          />

          {/* Send Button */}
          <button
            ref={submitButton}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
