import React from "react";
import { FaAmbulance, FaFireExtinguisher, FaTint, FaUserMd } from "react-icons/fa";

const EmergencyServices = () => {
  const services = [
    { name: "Ambulance", phone: "+8802588866469", icon: <FaAmbulance className="text-3xl text-red-600 mx-auto mb-3" /> },
    { name: "Fire Service", phone: "+8801901022229", icon:<FaFireExtinguisher className="text-3xl text-orange-600 mx-auto mb-3" /> },
    { name: "Blood Bank(Bhadon)", phone: "+880 1706-894541", icon: <FaTint className="text-3xl text-pink-600 mx-auto mb-3" /> },
    { name: "Urgent Doctor", phone: "+8802588866469", icon:  <FaUserMd className="text-3xl text-green-600 mx-auto mb-3" /> },
  ];

  return (
    
    <div className="bg-gray-50 min-h-screen p-8">
         <div className="text-center  sm:flex justify-center mt-0.5 mb-4">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
          Emergency Services
        </h2>
      </div>
      
      {/* Alert Banner */}
      <div className="bg-red-600 text-white text-center py-2 rounded-lg mb-6 animate-pulse">
        🚨 For life-threatening emergencies, dial 999 immediately!
      </div>
      

      {/* Emergency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-6 text-center bg-white transform transition hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold mb-4">
              {service.icon} {service.name}
            </h3>
            
            {/* Phone Number */}
            <p className="text-gray-700 font-medium mb-3">
              📞 {service.phone}
            </p>

            {/* Call Button */}
            <a
              href={`tel:${service.phone}`}
              className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Call Now
            </a>
          </div>
        ))}
      </div>

      {/* Tips Section */}
    <div className="mt-10 bg-white rounded-xl shadow-lg p-8">
  <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center tracking-wide">
    Emergency Tips
  </h3>
  <ul className="space-y-4 text-gray-800">
    <li className="flex items-start">
      <span className="text-red-600 text-2xl mr-3">🩸</span>
      <span className="text-lg font-medium">
        Control bleeding: Apply firm pressure with a clean cloth or bandage.
      </span>
    </li>
    <li className="flex items-start">
      <span className="text-blue-600 text-2xl mr-3">❤️</span>
      <span className="text-lg font-medium">
        CPR basics: If someone is unconscious and not breathing, begin chest compressions immediately.
      </span>
    </li>
    <li className="flex items-start">
      <span className="text-orange-600 text-2xl mr-3">🔥</span>
      <span className="text-lg font-medium">
        Burns: Cool the area with clean running water for at least 10 minutes.
      </span>
    </li>
    <li className="flex items-start">
      <span className="text-green-600 text-2xl mr-3">🦴</span>
      <span className="text-lg font-medium">
        Fractures: Immobilize the injured area and avoid unnecessary movement.
      </span>
    </li>
  </ul>
</div>


    </div>
  );
};

export default EmergencyServices;
