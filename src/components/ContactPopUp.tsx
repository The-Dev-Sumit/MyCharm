import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Github from "../assets/images/github.png";
import Linkedin from "../assets/images/linkedin.png";
import CursorParticles from "./CursorParticles";


interface ContactPopupProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  access_key?: string;
}

const ContactPopUp: React.FC<ContactPopupProps> = ({ onClose }) => {
    const [successMessage, setSuccessMessage] = useState<string>("");

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
         
        const object: FormData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            access_key: import.meta.env.VITE_FORM_ACCESS_KEY as string,
        };


        try {
            const res = await fetch(import.meta.env.VITE_FORM_API_URL as string, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(object),
            });

            const data = await res.json();

            if (data.success) {
                console.log("Success", data);
                setSuccessMessage("Your message has been sent successfully!");
                (event.target as HTMLFormElement).reset();
            } else {
                console.error("Error", data);
                setSuccessMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setSuccessMessage("Network error. Please try again later.");
        }
    }

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-black/90 border-2 border-amber-100/30 rounded-lg shadow-xl w-full max-w-2xl relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 font-bold text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer">
                ✕
              </button>

              <div className="p-8 flex flex-col items-center">
                <h1 className="text-4xl text-slate-200 anton tracking-wider mb-8">
                  Get in Touch
                </h1>

                <div className="flex flex-col w-full md:flex-row gap-8">
                  {/* Left Side - Contact Info */}
                  <div className="flex flex-col space-y-6 items-center md:w-[20rem]">
                    <div className="w-full flex justify-center items-center">
                      <p className="text-blue-300">
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          className="text-green-500 mr-2"
                        />
                        sumit73564@gmail.com
                      </p>
                    </div>

                    <div className="flex items-center md:items-start space-x-4 md:flex-col md:gap-5 md:flex md:mr-36">
                      <a
                        href="https://github.com/The-Dev-Sumit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative">
                        <img
                          src={Github}
                          alt="GitHub icon"
                          className="w-9 h-9 transition-transform duration-150 group-hover:scale-110"
                        />
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-700/10 border-1 tracking-wider border-blue-200/40 text-white px-2 py-1 rounded opacity-0 lg:group-hover:opacity-100 xl:group-hover:opacity-100 transition-opacity">
                          GitHub
                        </span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/sumit-sonar-097738281/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative">
                        <img
                          src={Linkedin}
                          alt="LinkedIn icon"
                          className="w-9 h-9 transition-transform duration-150 group-hover:scale-110"
                        />
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-700/10 border-1 border-blue-200/40 tracking-wider text-white px-2 py-1 rounded opacity-0 lg:group-hover:opacity-100 xl:group-hover:opacity-100 transition-opacity">
                          LinkedIn
                        </span>
                      </a>
                    </div>

                    <a
                      href="/Resume of Sumit.pdf"
                      download="SumitSonarCV.pdf"
                      className="hover:bg-gray-950 bg-transparent hover:border-1 hover:border-cyan-700 text-white py-2 px-4 rounded-md transition-colors text-center">
                      Download CV
                    </a>
                  </div>

                  {/* Right Side - Contact Form */}
                  <div className="md:w-[30rem] w-full flex flex-col items-center">
                    <form
                      onSubmit={onSubmit}
                      className="space-y-6 md:w-[70%] w-[95%]">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                          className="w-full p-2 bg-gray-900/80 text-gray-300 rounded-md focus:outline-lime-500"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          className="w-full p-2 bg-gray-900/80 text-gray-300 rounded-md focus:outline-lime-500"
                        />
                      </div>

                      <div>
                        <textarea
                          name="message"
                          placeholder="Message"
                          required
                          rows={5}
                          className="w-full p-3 bg-gray-900/80 text-gray-300 rounded-md focus:outline-lime-500"
                        />
                      </div>

                      <div className="ml-8">
                        <button
                          type="submit"
                          className="hover:bg-gray-950 bg-transparent text-white hover:border-1 hover:border-cyan-700 py-2 px-6 rounded-md flex items-center gap-2 transition-colors duration-100">
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="text-green-500"
                          />
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {successMessage && (
                <div className="absolute top-4 left-0 right-0 text-center text-green-500 font-medium">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        );
    };

export default ContactPopUp
