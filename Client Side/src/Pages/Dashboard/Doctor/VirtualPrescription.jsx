import React, { useEffect, useState } from "react";
import axiosProvider from "../../../APIs/axiosProvider";
import { FaFilePrescription, FaCheck, FaTimes } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import PrescriptionModal from "./PrescriptionModal";
import HistoryModal from "./HistoryModal";
import { MdAssignmentAdd } from "react-icons/md";

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

const VirtualPrescription = () => {
  const [requests, setRequests] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  //FETCH REQUESTS
  useEffect(() => {
    axiosProvider
      .get(
        `/appointments/virtual-prescription/department/${doctor.department.id}`,
      )
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const paginated = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [requests]);

  //CONFIRM
  const handleConfirm = async (id) => {
    try {
      await axiosProvider.patch(`appointments/update/${id}`, {
        $set: { status: "approved" },
      });

      toast.success("Request Approved");

      //UPDATE STATE
      setRequests((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "approved" } : item,
        ),
      );
    } catch {
      toast.error("Failed");
    }
  };

  //REJECT
  const handleReject = async (id) => {
    try {
      await axiosProvider.patch(`appointments/update/${id}`, {
        $set: { status: "rejected", "metaData.isActive": false },
      });

      toast.error("Request Rejected");

      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex-1">
      <div className="py-6 mx-20">
        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-lg flex items-center gap-3 text-black">
            <FaFilePrescription className="text-primary" />
            Virtual Prescription Requests
          </h2>
        </div>

        {/* CARD */}
        <div className="bg-white border-t-4 border-primary rounded-xl shadow-md p-5 flex flex-col min-h-[80vh]">
          {/* TABLE HEADER */}
          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-3 px-3">
            <p>Patient</p>
            <p>Serial</p>
            <p className="text-center">Actions</p>
            <p className="text-right">Decision</p>
          </div>

          {/* LIST */}
          {paginated.length === 0 ?
            <div className="flex-1 flex items-center justify-center text-gray-400">
              No requests found
            </div>
          : <div className="space-y-3">
              {paginated.map((appt) => (
                <div
                  key={appt._id}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-3 shadow-sm">
                  {/* PATIENT */}
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://i.pravatar.cc/40"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-sm font-medium text-gray-900">
                      {appt.patient.name}
                    </p>
                  </div>

                  <p className="text-sm text-gray-800 font-semibold">
                    #{appt.serialNo}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedAppointment(appt);
                        document.getElementById("premium_modal").showModal();
                      }}
                      className="bg-gray-300 px-3 py-1.5 rounded-md text-black text-sm flex items-center gap-1">
                      <IoMdEye /> View
                    </button>
                  </div>

                  {/* DECISION */}
                  <div className="flex gap-2 justify-end">
                    {appt?.status === "approved" ?
                      <button
                        onClick={() =>
                          document.getElementById("report_modal").showModal()
                        }
                        className="bg-[#7B74EA] hover:bg-green-600 w-full text-white px-4  py-2 flex gap-2 justify-center items-center rounded-md text-sm">
                        <MdAssignmentAdd className="text-lg" /> <p>Report</p>
                      </button>
                    : <>
                        <button
                          onClick={() => handleConfirm(appt?._id)}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm">
                          <FaCheck />
                        </button>

                        <button
                          onClick={() => handleReject(appt?._id)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm">
                          <FaTimes />
                        </button>
                      </>
                    }
                  </div>
                  {/* MODALS */}
                  <PrescriptionModal doctor={doctor} appointment={appt} />

                  <HistoryModal appointmentDetails={selectedAppointment} />
                </div>
              ))}
            </div>
          }

          {/* PAGINATION */}
          {requests.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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

export default VirtualPrescription;
