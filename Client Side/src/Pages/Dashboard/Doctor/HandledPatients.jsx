import React, { useEffect, useState } from "react";
import axiosProvider from "../../../APIs/axiosProvider";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineFileDone } from "react-icons/ai";

const HandledPatients = ({ doctor, onEditReport, currentAppointment }) => {
  const [handledAppointments, setHandledAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // 🔥 FETCH DATA
  useEffect(() => {
    axiosProvider
      .get(`reports/handled/department/${doctor?.department?.id}`)
      .then((res) => {
        setHandledAppointments(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [doctor.department.id,currentAppointment]);
  // 🔥 PAGINATION
  const totalPages = Math.ceil(handledAppointments.length / itemsPerPage);

  const paginatedData = handledAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [handledAppointments]);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md border-t-4 border-primary p-5">
      {/* HEADER */}
      <h3 className="text-lg flex gap-3 place-items-center font-semibold text-gray-800 mb-5">
        <AiOutlineFileDone className="text-xl text-primary" /> Handled Patients
      </h3>

      {/* LIST */}
      <div className="space-y-3">
        {paginatedData.length === 0 ?
          <div className="text-center text-gray-400 py-6">
            No handled patients yet
          </div>
        : paginatedData.map((appt) => (
            <div
              key={appt._id}
              className="flex justify-between items-center border-b pb-3">
              {/* LEFT */}
              <div className="flex gap-3 items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/078/657/664/small/young-man-in-round-glasses-giving-thumbs-up-gesture-photo.jpeg"
                  className="rounded-full h-10 w-10"
                  alt=""
                />
                <div className="">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {appt.patient.name}
                    </p>
                    <p className="text-xs flex gap-4 text-gray-500">
                      {appt.patient.designation}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs">
                      Age: {appt.patient.age}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                {/* STATUS */}
                <span
                  className={`text-xs px-3 py-1 rounded-full text-white ${
                    appt.status === "completed" ?
                      "bg-green-600"
                    : "bg-yellow-500"
                  }`}>
                  {appt.status}
                </span>

                {/* SERIAL */}
                <span className="text-sm font-semibold text-gray-700">
                  #{appt.serialNo}
                </span>

                {/* 3 DOT MENU */}
                <div className="relative group">
                  <HiDotsVertical className="cursor-pointer text-gray-600" />

                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border shadow-md rounded-md w-32 z-50">
                    <button
                      onClick={() => onEditReport(appt)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                      Edit Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* PAGINATION */}
      {handledAppointments.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#7B74EA] text-white rounded disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HandledPatients;
