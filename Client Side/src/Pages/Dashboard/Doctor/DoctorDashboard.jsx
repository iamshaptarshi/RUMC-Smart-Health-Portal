import React, { useEffect, useState } from "react";
import {
  FaThLarge,
  FaCalendarAlt,
  FaUserInjured,
  FaFilePrescription,
  FaUserTimes,
  FaHistory,
} from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import PrescriptionModal from "./PrescriptionModal";
import { MdAssignmentAdd } from "react-icons/md";
import axiosProvider from "../../../APIs/axiosProvider";
import MedicalHistoryModal from "./MedicalHistoryModal";
import HandledPatients from "./HandledPatients";
import { RiCalendarScheduleLine } from "react-icons/ri";
import toast from "react-hot-toast";

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

const DoctorDashboard = () => {
  const [history, setHistory] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [handledAppointments, setHandledAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = () => {
      // 🔥 ACTIVE APPOINTMENTS (important)
      axiosProvider
        .get(`appointments/active/department/${doctor.department.id}`)
        .then((res) => {
          setPendingAppointments(res.data);
        })
        .catch((err) => console.log(err.message));
    };

    // first call immediately
    fetchData();

    // ⏱️ repeat every 1 minute
    const interval = setInterval(fetchData, 60000);

    // 🧹 cleanup (VERY IMPORTANT)
    return () => clearInterval(interval);
  }, []);

  const currentAppointment = pendingAppointments[0];
  const upcomingAppointments = pendingAppointments.slice(1);

  const totalPages = Math.ceil(upcomingAppointments.length / itemsPerPage);

  const paginatedAppointments = upcomingAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [pendingAppointments]);

  useEffect(() => {
    // history (optional, can keep once)
    axiosProvider
      .get(`appointments/patient/${currentAppointment?.patient.id}`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err.message));
  });

    //FETCH REQUESTS
  useEffect(() => {
    axiosProvider
      .get(
        `/appointments/virtual-prescription/department/${doctor.department.id}`,
      )
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const onReportSaved = () => {
    setPendingAppointments((prev) => prev.slice(1));
  };

  const handleMarkAbsent = async () => {
    try {
      const query = {
        $set: {
          status: "quarantined",
        },
      };

      const res = await axiosProvider.patch(
        `appointments/update/${currentAppointment._id}`,
        query,
      );

      console.log(res.data);
      toast.error("Successfully Quarantined");

      onReportSaved();
      document.getElementById("mark_absent_modal").close();
    } catch (err) {
      console.log(err);
      toast.error("Failed to mark absent");
    }
  };

  return (
    <div className="flex-1 w-full">
      {/* TOP BAR */}

      {/* CONTENT */}
      <div className="py-6 mx-20">
        {/* WELCOME */}
        <div className="mb-5">
          <p className="text-gray-700 text-sm">Welcome Back,</p>
          <h2 className="text-green-600 font-semibold text-lg">
            {doctor.name}
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2  gap-6">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-5 justify-between">
            {/* CURRENT PATIENT */}
            <div className="bg-white rounded-xl shadow-md border overflow-hidden">
              <div className="bg-[#7B74EA] text-xl text-white text-center py-4 font-semibold">
                Current Patient
              </div>

              <div className="flex gap-4 p-4 items-center">
                {currentAppointment ?
                  <>
                    <div>
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/078/657/664/small/young-man-in-round-glasses-giving-thumbs-up-gesture-photo.jpeg"
                        className="w-24 h-24 rounded-xl"
                        alt=""
                      />

                      <button
                        onClick={() =>
                          document.getElementById("history_modal").showModal()
                        }
                        className="text-gray-400 mt-3 text-xs flex gap-2 justify-center items-center">
                        {" "}
                        <FaHistory /> <p>Medical History</p>
                      </button>
                    </div>

                    <div className="flex-1 justify-between h-full">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentAppointment?.patient?.name}
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                          {currentAppointment?.patient?.age} y/o
                        </span>
                      </h3>

                      <p className="text-sm text-gray-500">
                        {currentAppointment?.patient?.designation}
                      </p>

                      <p className="text-sm font-medium text-gray-800 mt-1">
                        Serial No: #{currentAppointment?.serialNo}
                      </p>

                      <div className="flex gap-3 mr-5 text-lg mt-4">
                        <button
                          onClick={() =>
                            document.getElementById("report_modal").showModal()
                          }
                          className="bg-[#7B74EA] hover:bg-green-600 w-1/2 text-white px-4  py-2 flex gap-2 justify-center items-center rounded-md text-sm">
                          <MdAssignmentAdd className="text-lg" />{" "}
                          <p>Create Report</p>
                        </button>
                        <button
                          onClick={() =>
                            document
                              .getElementById("mark_absent_modal")
                              .showModal()
                          }
                          className="bg-red-500  hover:bg-secondary w-1/2 text-white px-4 py-2 flex gap-2 items-center justify-center rounded-md text-sm">
                          <FaUserTimes className="text-lg" /> <p>Mark Absent</p>
                        </button>
                      </div>
                    </div>
                  </>
                : <div className="h-20 w-full flex text-gray-400 text-md   place-content-center place-items-center ">
                    No Pending Appointments
                  </div>
                }
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 h-25 gap-4">
              {/* Pending Appointments */}
              <div className="bg-[#f8f8fb] border border-green-600 flex gap-3 place-items-center rounded-xl px-4 py-2 shadow-sm ">
                {/* TOP */}
                <div className="rounded-full bg-green-500/20 text-green-600 p-3">
                  <FaUserInjured className="text-2xl  " />
                </div>

                <div className=" gap-2">
                  <div>
                    <p className="text-sm font-bold text-gray-600">
                      Pending Appointments
                    </p>
                    <h2 className="text-2xl ml-3 font-bold text-gray-900">
                      {pendingAppointments.length}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Virtual Prescription */}
              <div className="bg-[#f8f8fb] flex gap-3 place-items-center rounded-xl px-4 py-2 shadow-sm border border-purple-500">
                {/* TOP */}
                <div className="rounded-full bg-purple-500/20 text-purple-500 p-3">
                  <FaFilePrescription className="text-xl" />
                </div>

                <div className=" gap-2">
                  <div>
                    <p className="text-sm font-bold text-gray-600">
                      Prescription Request
                    </p>
                    <h2 className="text-2xl ml-3 font-bold text-gray-900">{requests?.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-white border-t-4 border-primary rounded-lg shadow-md  p-4">
            <h3 className="font-semibold flex gap-3  place-items-center text-gray-800 mb-5">
              <RiCalendarScheduleLine className="text-lg text-primary" />{" "}
              Upcoming Appointments
            </h3>

            {paginatedAppointments.length === 0 ?
              <div className="flex h-full -mt-5 justify-center items-center text-gray-400 text-md">
                {" "}
                <p className="">No Upcoming Appointments</p>
              </div>
            : <div className="space-y-3">
                {paginatedAppointments.map((upcomingAppointment, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <div className="flex gap-3 items-center">
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/078/657/664/small/young-man-in-round-glasses-giving-thumbs-up-gesture-photo.jpeg"
                        className="rounded-full w-10 h-10"
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {upcomingAppointment?.patient?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {upcomingAppointment?.patient?.age} y/o
                        </p>
                      </div>
                    </div>

                    <span className="font-semibold text-gray-800">
                      #{upcomingAppointment?.serialNo}
                    </span>
                  </div>
                ))}

                {upcomingAppointments.length > 4 && (
                  <div className="flex justify-between items-center mt-4">
                    {/* PREV */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-200 text-primary rounded">
                      Prev
                    </button>

                    {/* PAGE INFO */}
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>

                    {/* NEXT */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          prev < totalPages ? prev + 1 : prev,
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50">
                      Next
                    </button>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
        <HandledPatients
          currentAppointment={currentAppointment}
          doctor={doctor}
          onEditReport={(appt) => {
            console.log("Edit report for:", appt);

            // 👉 open modal here
            document.getElementById("report_modal").showModal();
          }}
        />
      </div>

      <dialog id="mark_absent_modal" className="modal modal-middle">
        <div className="modal-box text-center bg-white rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>

          <p className="py-3 text-gray-600">
            Mark{" "}
            <span className="text-primary">
              {currentAppointment?.patient?.name}
            </span>{" "}
            as absent
          </p>

          <div className="flex justify-center gap-4 mt-4">
            {/* NO */}
            <form method="dialog">
              <button className="btn bg-gray-200 border-0 text-black px-6">
                No
              </button>
            </form>

            {/* YES */}
            <button
              onClick={handleMarkAbsent}
              className="btn bg-red-500 border-0 text-white px-6">
              Confirm
            </button>
          </div>
        </div>
      </dialog>

      <PrescriptionModal
        doctor={doctor}
        appointment={currentAppointment}
        handledAppointments={handledAppointments}
        setHandledAppointments={setHandledAppointments}
        onReportSaved={onReportSaved}
      />
      <MedicalHistoryModal history={history} />
    </div>
  );
};

export default DoctorDashboard;

/* ================= COMPONENT ================= */
