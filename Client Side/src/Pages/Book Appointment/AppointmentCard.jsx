import React from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import BookAppointment from "./BookAppointment";
import BookingModal from "./BookingModal";
const AppointmentCard = ({
  department,
  setSelectedDept,
  currentAppointment,
}) => {
  return department.status.status === "open" ?
      <div className=" mt-3 sm:mt-8 not-sm:w-[180px] w-[250px]  lg:w-[280px] bg-white border-2 border-primary rounded-xl shadow-xl">
        <div className="not-sm:my-1 my-3">
          <div className="not-sm:my-2 my-3 ">
            <div className="w-full flex justify-center items-center gap-2">
              {/* <FaHeart className="text-2xl not-sm:text-xl text-red-500" /> */}
              <h2 className="text-2xl not-sm:text-xl  font-semibold">
                {department.name}
              </h2>
            </div>
            <hr className="mx-4 not-md:mt-2 mt-3 text-gray-300" />
          </div>

          <div className="mx-4 not-sm:mx-2">
            <p className="text-[22px] not-sm:text-[16px] flex justify-center font-semibold text-green-600">
              {department.status.displayTime}
            </p>
            <p className="flex justify-center text-[17px] not-sm:text-[13px]  text-gray-500">
              4 Available Doctors
            </p>
            {currentAppointment ?
              <button
                disabled
                className="btn my-3 not-sm:py-3 py-5.5 bg-gray-200 text-red-600 font-semibold text-[17px] not-sm:text-[13px]  w-full rounded-xl">
                A booking is active
              </button>
            : <button
                onClick={() => {
                  setSelectedDept(department);
                  document.getElementById("booking_modal").showModal();
                }}
                className="btn my-3 not-sm:py-3 py-5.5 bg-primary text-white font-semibold text-[17px] not-sm:text-[13px]  w-full rounded-xl">
                Book Appointment
              </button>
            }
          </div>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
      </div>
    : <div className=" mt-3 sm:mt-8 not-sm:w-[180px] w-[250px]  lg:w-[280px] bg-white border-2 border-red-500 rounded-xl shadow-xl">
        <div className="not-sm:my-1 my-3">
          <div className="not-sm:my-2 my-3 ">
            <div className="w-full flex justify-center items-center gap-2">
              {/* <FaHeart className="text-2xl not-sm:text-xl text-red-500" /> */}
              <h2 className="text-2xl not-sm:text-xl  font-semibold">
                {department.name}
              </h2>
            </div>
            <hr className="mx-4 not-md:mt-2 mt-3 text-gray-300" />
          </div>

          <div className="mx-4 not-sm:mx-2">
            <p className="text-[22px] not-sm:text-[16px] flex justify-center font-semibold text-red-500">
              {department.status.message}
            </p>
            <p className="flex justify-center text-[17px] not-sm:text-[13px]  text-gray-500">
              Opens {department.status.nextOpen}
            </p>
            <button
              disabled
              className="btn cursor-not-allowed my-3 not-sm:py-3 py-5.5 bg-gray-300 text-red-500 font-semibold text-[17px] not-sm:text-[13px]  w-full rounded-xl">
              Unavailable
            </button>
          </div>
        </div>
      </div>;
};

export default AppointmentCard;
