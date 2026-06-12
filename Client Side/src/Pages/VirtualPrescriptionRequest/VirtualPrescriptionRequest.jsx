import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import axiosProvider from "../../APIs/axiosProvider";
import toast from "react-hot-toast";
import { useAuth } from "../../Authentication/AuthProvider";

const VirtualPrescriptionRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [report, setReport] = useState(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    axiosProvider
      .get(`appointments/virtual/latest/${user?.userId}`)
      .then((res) => {
        setAppointment(res.data);
        console.log(appointment);
      })
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    if (!appointment?._id) return;

    axiosProvider
      .get(`/reports/appointment/${appointment._id}`)
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => console.log(err));
  }, [appointment]);

  const handleRequest = async () => {
    try {
      await axiosProvider.patch(`/appointments/update/${appointment._id}`, {
        $set: {
          status: "virtual_pending",
        },
      });

      toast.success("Virtual request sent");
      setAppointment({ ...appointment, status: "virtual_pending" });
      setRequested(true);
    } catch (err) {
      toast.error("Failed to send request");
    }
  };

  const canRequest =
    report?.tests?.length > 0 &&
    report.tests.every((t) => t.status === "completed");

  return (
    <div className="min-h-screen mt-5 sm:mt-10 bg-gradient-to-br from-[#f5f3ff] via-white to-[#ede9fe] sm:mx-10">
      {/* 🔙 Back */}
      <div className="flex items-center gap-2 text-red-500 font-medium cursor-pointer mx-3 text-lg">
        <Link
          onClick={() => navigate(-1)}
          className="flex gap-1 items-center text-red-600">
          <IoIosArrowBack />
          <p>Back</p>
        </Link>
      </div>

      {/* 🧾 Header */}
      <div className="text-center -mt-7 mb-5 ">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
          Virtual Prescription Request
        </h1>
      </div>

      {/* 🧊 Main Card */}
      <div className="min-h-[60vh] mt-5 mx-3 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(123,116,234,0.15)] p-6">
        {!appointment ?
          <div className="flex justify-center items-center h-[40vh] text-gray-400">
            No recent appointment
          </div>
        : <div className="space-y-6">
            {/* 🔷 HEADER CARD */}
            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border border-primary/20 shadow-sm">
              {/* subtle glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>

              <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                Latest Appointment
              </p>

              <h2 className="text-xl font-bold text-gray-800 mt-1">
                {appointment.department?.name}
              </h2>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">Serial No</span>
                <span className="font-semibold text-gray-700">
                  #{appointment.serialNo}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm items-center">
                <span className="text-gray-500">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === "completed" ?
                      "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}>
                  {appointment.status}
                </span>
              </div>
            </div>

            {/* 🧪 TESTS CARD */}
            <div className="rounded-2xl p-5 bg-white shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  Recommended Tests
                </p>

                <span className="text-xs text-primary font-medium">
                  {report?.tests?.length || 0} Tests
                </span>
              </div>

              {report?.tests?.length > 0 ?
                <div className="space-y-2">
                  {report?.tests.map((test, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-primary/5 transition">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-800">
                          {test.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {test.departmentName}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-medium ${
                          test.status === "completed" ?
                            "text-green-500"
                          : "text-yellow-500"
                        }`}>
                        {test.status}
                      </span>
                    </div>
                  ))}
                </div>
              : <p className="text-gray-400 text-sm text-center py-4">
                  No tests available
                </p>
              }
            </div>

            {/* 🎯 ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              {/* Send Report */}
              <button className="flex-1 bg-primary text-white py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition font-medium">
                Send Report to Doctor
              </button>

              {/* Request */}
              <button
                disabled={!canRequest || requested}
                onClick={handleRequest}
                className={`flex-1 py-2.5 rounded-xl font-medium transition ${
                  canRequest ?
                    "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}>
                Request Virtual Recommendation
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default VirtualPrescriptionRequest;
