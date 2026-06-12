import React, { useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL ="http://localhost:5173";
      const res = await axios.post(`${API_URL}/send`, formData);

      if (res.status === 200) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred.");
    }
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Contact Us
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center transition transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              General Inquiries
            </h3>
            <p className="mb-3 flex items-center justify-center gap-3 text-lg">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" /> Rajshahi
              University Campus, Rajshahi
            </p>
            <p className="mb-3 flex items-center justify-center gap-3 text-lg">
              <FaPhoneAlt className="text-green-600 text-2xl" /> 017XXXXXXXX
            </p>
            <p className="mb-3 flex items-center justify-center gap-3 text-lg">
              <FaEnvelope className="text-red-600 text-2xl" /> info@rumc.edu.bd
            </p>
            <p className="mb-3 flex items-center justify-center gap-3 text-lg">
              <FaClock className="text-yellow-600 text-2xl" /> Sun–Thu, 9 AM – 5
              PM
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-6 text-3xl">
              <a
                href="https://www.facebook.com/rajshahi.university.ac.bd"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.ru.ac.bd/"
                target="_blank"
                rel="noreferrer"
                className="text-green-600 hover:text-green-800 transition transform hover:scale-110"
              >
                <FaGlobe />
              </a>
              <a
                href="https://www.linkedin.com/school/university-of-rajshahi-ruacbde/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-600 transition transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Us a Message
            </h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition duration-300 hover:border-blue-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition duration-300 hover:border-blue-600"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition duration-300 hover:border-blue-600"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full mb-4 p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition duration-300 hover:border-blue-600"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 hover:shadow-lg transition transform hover:scale-105 text-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;