import { useState, useRef, useEffect } from "react";
import { projects } from "../../constants";
import { FaGithub } from "react-icons/fa";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (selectedProject) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProject]);

  return (
    <section
      id="work"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          PROJECTS
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg font-semibold">
          A showcase of the projects I have worked on, highlighting my skills
          and experience in various technologies
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="border border-gray-200 dark:border-white bg-white dark:bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-500 mb-4 pt-4 line-clamp-3">
                {project.description}
              </p>
              <div className="mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 dark:bg-[#251f38] text-xs font-semibold text-purple-600 dark:text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Repositories Button */}
      <div className="flex justify-center mt-16">
        <a
          href="https://github.com/Saurabh-Shivam?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          style={{
            background: "linear-gradient(90deg, #8245ec, #a855f7)",
            boxShadow: "0 0 1px #8245ec, 0 0 1px #8245ec, 0 0 20px #8245ec",
          }}
        >
          <FaGithub className="mr-2" size={24} />
          View More Projects on GitHub
        </a>
      </div>

      {/* Modal Container */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-90 p-4 overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[90%] max-w-2xl overflow-hidden relative my-4"
          >
            <div className="flex justify-end p-4 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <button
                onClick={handleCloseModal}
                className="text-gray-900 dark:text-white text-3xl font-bold hover:text-purple-500 bg-white dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col max-h-[85vh] overflow-y-auto scrollbar-hide">
              <div className="w-full flex justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-[400px] object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-[#251f38] text-xs font-semibold text-purple-600 dark:text-purple-500 rounded-full px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-800 text-gray-700 dark:text-gray-400 px-4 py-2 rounded-xl text-base font-semibold text-center transition-all duration-300"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-base font-semibold text-center transition-all duration-300"
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
