import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import HistoryModal from "../Dashboard/Doctor/HistoryModal";
import { Link, useNavigate } from "react-router";
import axiosProvider from "../../APIs/axiosProvider";

const user = {
  _id: 1310383432,
  name: "Ahsan Habib",
  email: "ahsan@gmail.com",
  designation: "Undergraduate Student",
};

const History = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [appointmentDetails, setAppointment] = useState(null);

  useEffect(() => {
    axiosProvider
      .get(`appointments/patient/${user._id}`) // ✅ FIXED
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="min-h-screen mt-5 sm:mt-10 bg-gradient-to-br from-[#f5f3ff] via-white to-[#ede9fe]  sm:mx-10">
      {/* 🔙 Back */}
      <div className="flex items-center gap-2 text-red-500 font-medium  cursor-pointer hover:gap-3 transition-all mx-3 text-lg">
        <Link
          onClick={() => navigate(-1)}
          className="flex gap-1 items-center   text-red-600">
          <IoIosArrowBack className="text-lg" />
          <p>Back</p>
        </Link>
      </div>

      {/* 🧾 Header */}
      <div className="text-center -mt-7 mb-2 sm:mb-5">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">
          My Medical History
        </h1>
      </div>

      {/* 🧊 Glass Card */}
      <div className="min-h-[100vh] border-t-1 border-primary mt-5 mx-3 bg-white/60 backdrop-blur-xl  shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-3xl px-2 py-3 sm:p-6">
        {/* Header Row */}
        <div className="grid grid-cols-4 text-gray-400 text-[10px] sm:text-xs uppercase text-center tracking-wider pb-3 px-3">
          <span className="text-left">Date</span>
          <span>Department</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        {/* Data Rows */}
        {data ?
          <>
            {" "}
            {data.map((appointment, i) => (
              <>
                <div
                  key={i}
                  className="text-center grid grid-cols-4 text-xs sm:text-lg items-center px-3 py-4 rounded-xl hover:bg-white/70 transition-all duration-200 group">
                  <span className="text-gray-700 font-medium text-left">
                    {
                      new Date(appointment.metaData.bookingTime)
                        .toISOString()
                        .split("T")[0]
                    }
                  </span>

                  <span className="text-gray-600">
                    {appointment.department.name}
                  </span>

                  {/* Status */}
                  <span>
                    <span
                      className={`px-3 py-1 text-[10px] sm:text-sm font-semibold rounded-full ${
                        appointment.status === "completed" ?
                          "bg-green-100 text-green-600"
                        : appointment.status === "cancelled" ?
                          "bg-red-100 text-red-500"
                        : appointment.status === "quarantined" ?
                          "bg-blue-200 text-blue-500"
                        : "bg-yellow-100 text-yellow-600"
                      }`}>
                      {appointment.status}
                    </span>
                  </span>

                  {/* Action */}
                  <div className="text-right">
                    <button
                      disabled={appointment.status === "cancelled" || appointment.status === "pending" || appointment.status === "processing" || appointment.status === "virtual_report" || appointment.status === "quarantined"}
                      onClick={() => {
                        setAppointment(appointment);
                        document.getElementById("premium_modal").showModal();
                      }}
                      className={`px-2 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-sm rounded-lg 
  bg-primary text-white transition-all duration-200 
  hover:scale-105 hover:shadow-lg 
  disabled:bg-gray-500 disabled:cursor-not-allowed 
  disabled:hover:scale-100 disabled:hover:shadow-none`}>
                      Details
                    </button>
                  </div>
                </div>
              </>
            ))}
          </>
        : <div className="grid min-h-[70vh] justify-items-center place-items-center text-primary text-lg">
            No Medical History
          </div>
        }
      </div>

      <HistoryModal appointmentDetails={appointmentDetails} />
    </div>
  );
};

export default History;
