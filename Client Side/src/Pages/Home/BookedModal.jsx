import React, { useEffect } from "react";
import axiosProvider from "../../APIs/axiosProvider";
import toast from "react-hot-toast";

const BookedModal = ({ user, currentAppointment, setCurrentAppointment }) => {

  const handleCancelAppointment = () => {
    axiosProvider
      .patch(`/appointments/${currentAppointment._id}/cancel`, {
        reason: "User cancelled",
      })
      .then(() => {
        setCurrentAppointment(null);
        toast.error("Cancelled Your Appointment")
      });
  };

  return (
    <dialog id="booked_modal" className="modal modal-bottom  sm:modal-middle">
      <div className="modal-box p-0 overflow-hidden rounded-3xl sm:rounded-2xl">
        {/* 🔷 TOP USER SECTION */}
        <div className="bg-primary text-white p-5">
          <h3 className="text-xl font-bold">Appointment Details</h3>

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
              {currentAppointment?.department?.name} Department
            </p>
            <p className="text-green-600">Room No. 28</p>
          </div>

          {/* 📊 SERIAL + TIME */}
          <div className="bg-base-200 rounded-lg p-4 mb-4 text-center space-y-2">
            <p className="text-gray-600">Your Serial Number</p>
            <p className="text-2xl font-bold text-primary">#1</p>

            <p className="text-gray-600 mt-2">Estimated Time</p>
            <p className="text-lg font-semibold text-green-600">
              2:30 AM - 3:00 PM
            </p>
          </div>

          {/* 🔘 BUTTONS */}
          <div className="flex justify-center gap-4">
            {/* ❌ CANCEL */}

            <button
              className="btn bg-gray-200 text-black px-6"
              onClick={() => {
                document.getElementById("booked_modal").close();
              }}>
              Close
            </button>

            {/* ✅ CONFIRM */}
            <button
              className="btn bg-red-500 hover:bg-green-600 text-white px-6"
              onClick={() => {
                document.getElementById("confirm_cancel_modal").showModal();
              }}>
              Cancel Booking
            </button>
          </div>
        </div>
      </div>

      {/* Are You Sure You Want TO Delete Modal */}
      <dialog id="confirm_cancel_modal" className="modal modal-middle">
        <div className="modal-box text-center rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>

          <p className="py-3 text-gray-600">
            Do you really want to cancel your booking?
          </p>

          <div className="flex justify-center gap-4 mt-4">
            {/* NO */}
            <form method="dialog">
              <button className="btn bg-gray-200 px-6">No</button>
            </form>

            {/* YES */}
            <button
              onClick={() => {
                handleCancelAppointment();
                document.getElementById("confirm_cancel_modal").close();
                document.getElementById("booked_modal").close();
              }}
              className="btn bg-red-500 text-white px-6">
              Yes, Cancel
            </button>
          </div>
        </div>
      </dialog>
    </dialog>
  );
};

export default BookedModal;
