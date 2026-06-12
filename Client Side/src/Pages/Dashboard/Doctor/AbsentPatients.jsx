import React, { useEffect, useState } from "react";
import axiosProvider from "../../../APIs/axiosProvider";
import { FaUserTimes, FaFilePrescription } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import toast from "react-hot-toast";
import PrescriptionModal from "./PrescriptionModal";

const doctor = {
  _id: 123456789,

  // BASIC INFO
  name: "Dr. Jashim Uddin",
  email: "john@example.com",
  phone: "017xxxxxxxx",

  // AUTH (if needed later)
  role: "doctor",
  password: "...", // hashed (optional now)

  // PROFESSIONAL INFO
  department: {
    id: "69d0b4d97e571f4fcd9d34fa",
    name: "Medicine",
  },

  specialization: "Cardiology",

  // STATUS (VERY IMPORTANT)
  isActive: true,

  schedule: {
    isAvailable: true,
    break: {
      start: null,
      end: null,
    },
  },

  // OPTIONAL (VERY USEFUL)
  chamber: {
    roomNo: 204,
    building: "Main Building",
  },

  // SYSTEM METADATA
  createdAt: new Date(),
  updatedAt: new Date(),
};

const AbsentPatients = () => {
  const [absentPatients, setAbsentPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    axiosProvider
      .get(`appointments/absent/department/${doctor.department?.id}`)
      .then((res) => setAbsentPatients(res.data))
      .catch((err) => console.log(err.message));
  }, [absentPatients]);

  const totalPages = Math.ceil(absentPatients.length / itemsPerPage);

  const paginatedAppointments = absentPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [absentPatients]);

  // ❌ CANCEL BOOKING
  const handleCancel = async (id) => {
    try {
      await axiosProvider.patch(`appointments/${id}/cancel`, {
        reason: "Doctor cancelled absent patient",
      });

      toast.success("Booking Cancelled");

      setAbsentPatients((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel");
    }
  };

  return (
    <div className="flex-1">
      <div className="py-6 mx-20">
        {/* HEADER */}

        {/* CARD */}
        <div className="bg-white flex flex-col min-h-[90vh] border-t-4 border-primary rounded-xl shadow-md p-5">
          <div className="mb-5">
            <h2 className="text-lg  text-black flex items-center  gap-4">
              <FaUserTimes className="text-primary" /> <p>Absent Patients</p>
            </h2>
          </div>
          {paginatedAppointments.length === 0 ?
            <div className="flex-1 grid justify-center items-center -mt-4 text-gray-400">
              <p>No absent patients</p>
            </div>
          : <div className="space-y-3">
              {paginatedAppointments.map((appt) => (
                <div
                  key={appt?._id}
                  className="flex justify-between items-center border-b pb-3">
                  {/* LEFT */}
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/078/657/664/small/young-man-in-round-glasses-giving-thumbs-up-gesture-photo.jpeg"
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appt?.patient?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appt?.patient?.designation}
                      </p>
                      <p className="text-xs text-gray-400">
                        Serial #{appt?.serialNo}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex gap-2 items-center">
                    {/* CREATE REPORT */}
                    <button
                      onClick={() =>
                        document.getElementById("report_modal").showModal()
                      }
                      className="bg-primary hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs flex gap-1 items-center">
                      <MdAssignmentAdd /> Report
                    </button>

                    {/* CANCEL */}
                    <button
                      onClick={() => handleCancel(appt?._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs flex gap-1 items-center">
                      Cancel
                    </button>
                  </div>

                  <PrescriptionModal doctor={doctor} appointment={appt} />
                </div>
              ))}
            </div>
          }

          {/* PAGINATION */}
          {absentPatients.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 text-primary rounded">
                Prev
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev,
                  )
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-primary text-white rounded">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbsentPatients;
