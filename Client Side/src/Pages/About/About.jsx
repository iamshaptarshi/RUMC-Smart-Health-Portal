import React from "react";
import { FaHeartbeat, FaUserMd, FaClock, FaMapMarkerAlt,FaBullseye,FaEye } from "react-icons/fa";
import Medical from "../../assets/Medical.jpg"

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-6 sm:p-10">

            {/* 🔥 Hero Section with Image */}
            <div className="grid md:grid-cols-2 gap-10 items-center mb-14">

                {/* Left Text */}
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-700">
                        About Our Medical Center
                    </h2>
                    <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                        Rajshahi University Medical Center is committed to providing accessible, affordable, and high‑quality healthcare services for students, faculty, and staff. Through the RUMC Smart Health Portal, patients can book appointments, request prescriptions, track pending tests, and access medical history online—anytime, anywhere.

                        We are dedicated to making healthcare not only physically available but also digitally connected, ensuring that every member of the university community receives timely and trusted support.
                    </p>

                    {/* Small highlight line */}
                    <p className="mt-4 text-gray-500">
                        📍 Located inside Rajshahi University Campus
                    </p>
                </div>

                {/* Right Image */}
                <div>
                    <img
                        src={Medical}
                        alt="Medical Center"
                        className="w-full h-[320px] object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300"
                    />
                </div>

            </div>

           

            {/* 🔥 Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-14">

                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                    
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                        <span className="text-2xl leading-none">🎯</span>
                        Our Mission
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        To provide compassionate, student-friendly, and technology-driven
                        healthcare services that ensure safety, preventive care, and
                        emergency readiness for the university community.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                        <span className="text-2xl leading-none">🚀</span>
                        Our Vision
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        To become a trusted healthcare hub within the university by
                        combining modern medical technology with professional and
                        patient-centered care.
                    </p>
                </div>

            </div>

            {/* 🔥 Location Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
                    Our Location
                </h3>

                <p className="text-gray-600 text-center mb-2">
                    📍 Rajshahi University Medical Center
                </p>

                <p className="text-gray-500 text-center mb-6">
                    Easily accessible for students, faculty, and staff
                </p>

                <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.345060285341!2d88.64144537535523!3d24.369296878253163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbf031f3896c39%3A0x94ebce44f55e285f!2sRajshahi%20University%20Medical%20Center!5e0!3m2!1sen!2sbd!4v1776711258057!5m2!1sen!2sbdc"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Medical Center Location"
                    ></iframe>
                </div>
            </div>

        </div>
    );
};

export default About;