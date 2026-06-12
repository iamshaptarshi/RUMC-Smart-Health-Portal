import React, { use } from "react";
import { IoIosArrowBack, IoIosArrowDropdown } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router";

const Schedules = () => {
  const navigate = useNavigate();
  const doctorsData = [
    {
      department: "Cardiology",
      time: "10:00AM - 5:00PM",
      doctors: [
        { name: "Dr. Rafi Hosen", active: true },
        { name: "Dr. Suraiya Yasmin", active: true },
        { name: "Dr. Maaf Mollah", active: true },
      ],
    },
    {
      department: "Medicine",
      time: "10:00AM - 5:00PM",
      doctors: [
        { name: "Dr. Tanvir Hosen", active: true },
        { name: "Dr. Samiha Islam", active: true },
        { name: "Dr. Raihan Udden", active: false },
      ],
    },
    {
      department: "Pediatrics",
      time: "9:00AM - 1:00PM",
      doctors: [
        { name: "Dr. Sumita Roy", active: true },
        { name: "Dr. Sharif Mondol", active: false },
        { name: "Dr. Rohan Howlader", active: true },
      ],
    },
    {
      department: "ENT",
      time: "10:00AM - 7:00PM",
      doctors: [
        { name: "Dr. Monika Afrin Toma", active: false },
        { name: "Dr. Tariqul Islam", active: false },
        { name: "Dr. Hasan Mahmud", active: true },
      ],
    },
  ];

  const testsData = [
    {
      title: "Pathology",
      tests: [
        { name: "Blood Sugar", price: "Free" },
        { name: "CBC", price: "Free" },
        { name: "CRPBF", price: "50Tk" },
        { name: "Lipid Profile", price: "Free" },
        { name: "Thyroid Panel", price: "80Tk" },
        { name: "Urinalyis", price: "Free" },
        { name: "S.Bilirubin", price: "Free" },
        { name: "Widal Test", price: "Free" },
        { name: "Stool R/M/E", price: "320Tk" },
      ],
    },
    {
      title: "Cardiology",
      tests: [
        { name: "ECG", price: "Free" },
        { name: "Chest X-Ray", price: "300Tk" },
        { name: "Blood Test", price: "Free" },
      ],
    },
    {
      title: "Ultrasonography",
      tests: [
        { name: "4D Pregnancy", price: "Free" },
        { name: "Anomaly Scan", price: "Free" },
        { name: "Lower Abdomen", price: "80Tk" },
      ],
    },
    {
      title: "X-Ray",
      tests: [
        { name: "X-ray", price: "Free" },
        { name: "Dental X-ray", price: "Free" },
        { name: "Dental X-ray (OPG) Flim (10-12)", price: "Free" },
        { name: "Digital X-ray Flim (10-14)", price: "Free" },
        { name: "Digital X-ray Flim (14-17)", price: "Free" },
        { name: "X-ray Flim (10-8)", price: "Free" },
        { name: "X-ray Flim (12-10)", price: "Free" },
        { name: "X-ray Flim (15-12)", price: "Free" },
        
      ],
    },
  ];

  return (
    <div className="px-4 py-2 sm:py-6 max-w-[1350px] mx-auto">
      {/* 🔙 Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-red-500 font-medium  cursor-pointer hover:gap-3 transition-all sm:mx-3 text-lg">
          <Link
            onClick={() => navigate(-1)}
            className="flex gap-1 items-center   text-red-600">
            <IoIosArrowBack className="text-lg" />
            <p>Back</p>
          </Link>
        </div>
      </div>

      {/* 🔷 Title */}
      <div className="text-center hidden sm:flex justify-center -mt-9 mb-3">
        <h2 className="text-md sm:text-2xl font-bold text-gray-800">
          Schedules & Available Tests
        </h2>
      </div>

      {/* 👨‍⚕️ DOCTORS */}
      <div className=" rounded-2xl   mb-3">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="font-semibold text-lg">Available Doctors</h3>

          <div className="text-sm flex gap-4">
            <span className="flex items-center gap-1 text-green-500">
              ● Active
            </span>
            <span className="flex items-center gap-1 text-red-500">
              ● Unavailable
            </span>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          {doctorsData.map((dept, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition">
              {/* Header */}
              <div className="bg-primary text-white text-center py-3">
                <h4 className="font-semibold">{dept.department}</h4>
                <p className="text-xs opacity-80">{dept.time}</p>
              </div>

              {/* Doctors */}
              <div className="p-4 space-y-3">
                {dept.doctors.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-medium">{doc.name}</span>

                    <span
                      className={`w-3 h-3 rounded-full ${
                        doc.active ? "bg-green-500" : "bg-red-500"
                      }`}></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🧪 TESTS */}
      <div className="rounded-2xl mt-10">
  <h3 className="font-semibold text-lg mb-4">Available Tests</h3>

  <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
    {testsData.map((section, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition"
      >
        {/* 🔵 DESKTOP VIEW (unchanged) */}
        <div className="hidden sm:block">
          {/* Header */}
          <div className="bg-primary text-white text-center py-3">
            <h4 className="font-semibold">{section.title}</h4>
          </div>

          {/* Tests */}
          <div className="px-8 py-4 space-y-2 text-sm">
            {section.tests.map((test, idx) => (
              <div key={idx} className="flex justify-between pb-1">
                <span>{test.name}</span>
                <span className="text-green-500 font-medium">
                  {test.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 📱 MOBILE VIEW (dropdown only) */}
        <div className="sm:hidden">
          <details className="group">
            {/* Header */}
            <summary className="bg-primary text-white px-4 py-3 flex justify-between items-center cursor-pointer list-none">
              <h4 className="font-semibold">{section.title}</h4>

              <span className="transition-transform duration-300 group-open:rotate-180">
                <IoIosArrowDropdown className="text-lg" />
              </span>
            </summary>

            {/* Tests */}
            <div className="px-8 py-4 space-y-2 text-sm border-t">
              {section.tests.map((test, idx) => (
                <div key={idx} className="flex justify-between pb-1">
                  <span>{test.name}</span>
                  <span className="text-green-500 font-medium">
                    {test.price}
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default Schedules;
