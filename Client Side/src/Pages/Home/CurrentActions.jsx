import React, { useState, useEffect } from "react";
import { FaCalendarCheck, FaVial } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import BookedModal from "./BookedModal";
import axiosProvider from "../../APIs/axiosProvider";

const CurrentActions = () => {
  const user = {
    _id: 1310383432,
    name: "Ahsan Habib",
    email: "ahsan@gmail.com",
    designation: "Undergraduate Student",
  };

  const [currentAppointment, setCurrentAppointment] = useState(null);

  useEffect(() => {
    axiosProvider
      .get(`appointments/current/${user._id}`) // ✅ FIXED
      .then((res) => {
        console.log(res.data);
        setCurrentAppointment(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user._id]);

  
  return (
    <div className="w-full sm:w-[99%]">
      <div className="grid grid-cols-1 justify-between md:grid-cols-2 gap-4 p-3">
        {/* Appointment Card */}
        <div className="bg-secondary s border border-primary rounded-xl shadow-xl p-4 flex items-center justify-start gap-4 hover:shadow-lg transition min-h-[15vh]">
          {" "}
          {/* ✅ FIXED */}
          <div className="bg-primary/10 p-3 rounded-full">
            <FaCalendarCheck className="text-primary text-4xl sm:text-5xl" />
          </div>

          <div className="w-full">
            <h3 className="font-semibold flex justify-between text-gray-800">
              <div>Upcoming Appointment</div>

              <HiDotsVertical
              className={`${currentAppointment ? "" : "hidden"}`}
                  onClick={() =>
                  document.getElementById("booked_modal").showModal()
                }
              />
            </h3>
            {currentAppointment ?
              <>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {currentAppointment?.department?.name} Department
                </p>

                <div className="text-sm flex gap-3 text-gray-600 mt-1">
                  <p className="text-primary text-[15px]">
                    Serial No: #{currentAppointment?.serialNo}
                  </p>

                  <p className="text-[15px]">
                    Room No: {currentAppointment?.roomNo}
                  </p>
                </div>

                <p className="text-sm text-green-600 font-medium mt-1">
                  Estimated: {currentAppointment?.estimatedTime}
                </p>
              </>
            : <p>No Available Booking</p>}
          </div>

        </div>

        {/* Test Card */}
        <div className="bg-secondary sm:w-[98%] border border-primary rounded-xl shadow-xl p-4 flex items-center justify-start gap-4 hover:shadow-lg transition">
          <div className="bg-primary/10 p-3 rounded-full">
            <FaVial className="text-primary text-5xl" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Pending Test</h3>
            <p className="text-sm text-gray-600 mt-1">Blood Work</p>
            <p className="text-sm text-gray-500">Requested March 7</p>
          </div>
        </div>
      </div>

      <BookedModal
        user={user}
        currentAppointment={currentAppointment}
        setCurrentAppointment={setCurrentAppointment}
      />
    </div>
  );
};

export default CurrentActions;
