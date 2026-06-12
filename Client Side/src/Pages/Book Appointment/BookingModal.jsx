import React from "react";
import axiosProvider from "../../APIs/axiosProvider";
import toast from "react-hot-toast";

const BookingModal = ({ department, setCurrentAppointment }) => {
  const user = {
    _id: 1310383432,
    name: "Ahsan Habib",
    email: "ahsan@gmail.com",
    designation: "Undergraduate Student",
    age: 22
  };

  const bookingInfo = {
    serialNo: 1,
    estimatedTime: "11:30AM - 12:00AM",
    roomNo: 204,
  };

  console.log(department?.name)
  const confirmAppointment = async () => {
    const appointmentData = {
      serialNo: bookingInfo.serialNo,
      estimatedTime: bookingInfo.estimatedTime,
      status: "pending",
      roomNo: bookingInfo.roomNo,

      patient: {
        id: user._id,
        name: user.name,
        designation: user.designation,
        age: user.age,
      },

      department: {
        id: department?._id,
        name: department?.name,
      },

      doctor: {
        id: null,
        name: null,
      },

      metaData: {
        bookingTime: new Date(),
        cancelledBy: null,
        cancelReason: null,
        completedAt: null,
        isActive: true,
      },
    };

    console.log(appointmentData);
    await axiosProvider
      .post("/appointments", appointmentData)
      .then((res) => {
        if (res.data?.insertedId || res.status === 201) {
          toast.success("Booking Confirmed");
          setCurrentAppointment(appointmentData);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to Book");
      });
  };
  return (
    <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box p-0 overflow-hidden rounded-3xlsm:rounded-2xl ">
        {/* 🔷 TOP USER SECTION */}
        <div className="bg-primary text-white p-5">
          <h3 className="text-xl font-bold">Confirm Appointment</h3>

          <div className="mt-3 space-y-1">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm opacity-90">{user.email}</p>
            <p className="text-sm opacity-90">{user.designation}</p>
          </div>
        </div>

        {/* 📄 BODY */}
        <div className="p-5">
          {/* 🏥 Department */}
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-primary">
              {department?.name} Department
            </p>
          </div>

          {/* 📊 SERIAL + TIME */}
          <div className="bg-base-200 rounded-lg p-4 mb-4 text-center space-y-2">
            <p className="text-gray-600">Your Serial Number</p>
            <p className="text-2xl font-bold text-primary">#12</p>

            <p className="text-gray-600 mt-2">Estimated Time</p>
            <p className="text-lg font-semibold text-green-600">
              11:30 AM - 12:00 PM
            </p>
          </div>

          {/* ⚠️ CONFIRM TEXT */}
          <p className="text-center text-gray-600 mb-5 font-medium">
            Are you sure you want to confirm this appointment?
          </p>

          {/* 🔘 BUTTONS */}
          <div className="flex justify-center gap-4">
            {/* ❌ CANCEL */}
            <form method="dialog">
              <button className="btn bg-red-500 hover:bg-red-600 text-white px-6">
                Cancel
              </button>
            </form>

            {/* ✅ CONFIRM */}
            <button
              className="btn bg-green-500 hover:bg-green-600 text-white px-6"
              onClick={() => {
                confirmAppointment();
                console.log("Confirmed");
                document.getElementById("booking_modal").close();
              }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
