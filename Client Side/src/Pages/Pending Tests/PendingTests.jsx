import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import axiosProvider from "../../APIs/axiosProvider";

const user = { _id: 1310383432 };

const PendingTests = () => {
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [report, setReport] = useState(null);

  // 🔁 SAME FLOW AS VIRTUAL PAGE
  useEffect(() => {
    axiosProvider
      .get(`appointments/virtual/latest/${user._id}`)
      .then((res) => setAppointment(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!appointment?._id) return;

    axiosProvider
      .get(`/reports/appointment/${appointment._id}`)
      .then((res) => setReport(res.data))
      .catch((err) => console.log(err));
  }, [appointment]);

  const tests = report?.tests || [];

  const pendingCount = tests.filter(t => t.status !== "completed").length;
  const completedCount = tests.filter(t => t.status === "completed").length;

  return (
    <div className="min-h-screen mt-5 sm:mt-10 bg-gradient-to-br from-[#f5f3ff] via-white to-[#ede9fe] sm:mx-10">

      {/* 🔙 Back */}
      <div className="flex items-center gap-2 text-red-500 font-medium mx-3 text-lg">
        <Link onClick={() => navigate(-1)} className="flex gap-1 items-center text-red-600">
          <IoIosArrowBack />
          <p>Back</p>
        </Link>
      </div>

      {/* 🧾 Header */}
      <div className="text-center -mt-7 mb-5">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
          Test Status
        </h1>

        {/* 🔥 Summary */}
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full">
            Pending: {pendingCount}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
            Completed: {completedCount}
          </span>
        </div>
      </div>

      {/* 🧊 MAIN CARD (SAME STYLE AS VIRTUAL PAGE) */}
      <div className="min-h-[60vh] mt-5 mx-3 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(123,116,234,0.15)] p-6">

        {tests.length === 0 ? (
          <div className="flex justify-center items-center h-[40vh] text-gray-400">
            No tests available
          </div>
        ) : (
          <div className="space-y-4">

            {/* 🔷 HEADER CARD (OPTIONAL BUT MATCHES YOUR STYLE) */}
            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border border-primary/20 shadow-sm">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>

              <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                Latest Report
              </p>

              <h2 className="text-lg font-bold text-gray-800 mt-1">
                {appointment?.department?.name}
              </h2>
            </div>

            {/* 🧪 TEST LIST (SAME AS VIRTUAL, BUT ENHANCED) */}
            <div className="rounded-2xl p-5 bg-white shadow-sm border border-gray-100">

              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  All Tests
                </p>

                <span className="text-xs text-primary font-medium">
                  {tests.length} Tests
                </span>
              </div>

              <div className="space-y-2">

                {tests.map((test, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-3 py-3 rounded-xl hover:bg-primary/5 transition"
                  >

                    {/* LEFT */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-800">
                        {test.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {test.departmentName}
                      </span>
                    </div>

                    {/* RIGHT STATUS */}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        test.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : test.status === "processing"
                          ? "bg-yellow-100 text-yellow-600"
                          : test.status === "sampled"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {test.status}
                    </span>

                  </div>
                ))}

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PendingTests;