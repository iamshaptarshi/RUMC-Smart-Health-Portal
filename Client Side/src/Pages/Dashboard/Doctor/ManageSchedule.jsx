import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const ManageSchedule = () => {
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [breakTime, setBreakTime] = useState({
    start: "",
    end: "",
  });

  const [savedBreak, setSavedBreak] = useState(null);

  const requests = [
    { id: 1, name: "Emergency Slot Request", time: "10:30 AM" },
    { id: 2, name: "Extra Consultation", time: "1:00 PM" },
  ];

  const handleSaveBreak = () => {
    if (!breakTime.start || !breakTime.end) return;
    setSavedBreak(breakTime);
    setBreakTime({ start: "", end: "" });
  };

  const removeBreak = () => {
    setSavedBreak(null);
  };

  return (
    <div className="flex-1 py-6 px-6 lg:px-10 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Manage Schedule</h2>
        <p className="text-sm text-gray-500">
          Control your availability and appointment flow
        </p>
      </div>

      {/* ================= AVAILABILITY ================= */}
      <div className="bg-white rounded-xl shadow-md border-t-4 border-primary p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
          <p className="text-sm text-gray-500">
            Toggle your availability for patients
          </p>
        </div>

        {/* TOGGLE */}
        <div
          onClick={() => setShowModal(true)}
          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition ${
            isActive ? "bg-primary" : "bg-gray-300"
          }`}>
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
              isActive ? "translate-x-6" : ""
            }`}></div>
        </div>
      </div>

      {/* ================= BREAK TIME ================= */}
      <div className="bg-white rounded-xl shadow-md border-t-4 border-secondary p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Break Time</h3>

          {savedBreak && (
            <span className="text-xs bg-secondary text-white px-3 py-1 rounded-full">
              Active
            </span>
          )}
        </div>

        {/* CURRENT BREAK */}
        {savedBreak && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Current Break</p>
              <p className="text-gray-900 font-medium">
                {savedBreak.start} → {savedBreak.end}
              </p>
            </div>

            <button
              onClick={removeBreak}
              className="text-red-500 text-sm font-medium hover:underline">
              Remove
            </button>
          </div>
        )}

        {/* INPUTS */}
        <div className="flex justify-between gap-4 items-end">
          <div className="flex gap-15">
            <div className="flex gap-5 items-center">
              <label className="text-md f text-primary ">Start Time</label>
              <div className="bg-white border rounded-md px-3 py-2 ring-1 ring-primary focus-within:ring-2 focus-within:ring-secondary">
                <input
                  type="time"
                  value={breakTime.start}
                  onChange={(e) =>
                    setBreakTime({ ...breakTime, start: e.target.value })
                  }
                  className="bg-transparent text-black outline-none w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-5  ">
              <label className="text-md text-primary">End Time</label>
              <div className="bg-white  border rounded-md px-3 py-2 ring-1 ring-primary focus-within:ring-2 focus-within:ring-secondary">
                <input
                  type="time"
                  value={breakTime.start}
                  onChange={(e) =>
                    setBreakTime({ ...breakTime, start: e.target.value })
                  }
                  className="bg-transparent text-black outline-none w-full"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveBreak}
            className="bg-secondary text-white px-6 py-2 rounded-md hover:opacity-90">
            Save Break
          </button>
        </div>
      </div>

     

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] text-center shadow-lg border">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Availability Change
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Do you want to turn{" "}
              <span className="font-medium">
                {isActive ? "Inactive" : "Active"}
              </span>
              ?
            </p>

            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-5 py-2 rounded-md">
                Cancel
              </button>

              <button
                onClick={() => {
                  setIsActive(!isActive);
                  setShowModal(false);
                }}
                className="bg-secondary text-white px-5 py-2 rounded-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchedule;
