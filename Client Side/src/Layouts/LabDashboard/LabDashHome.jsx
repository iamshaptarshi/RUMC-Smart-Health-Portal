import React, { useEffect, useState } from "react";
import { FaClock, FaSpinner, FaCheck } from "react-icons/fa";
import axiosProvider from "../../APIs/axiosProvider";

const LabDashHome = () => {
  const [stats, setStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
  });

  useEffect(() => {
    axiosProvider.get("/tests/lab-stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="py-6 mx-20">
      <h2 className="text-lg font-semibold mb-5">Lab Dashboard</h2>

      <div className="grid grid-cols-3 gap-5">

        {/* Pending */}
        <div className="bg-white border border-yellow-500 rounded-xl p-5 flex gap-4 items-center">
          <FaClock className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Pending Tests</p>
            <h3 className="text-2xl font-bold">{stats.pending}</h3>
          </div>
        </div>

        {/* Processing */}
        <div className="bg-white border border-blue-500 rounded-xl p-5 flex gap-4 items-center">
          <FaSpinner className="text-blue-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Processing</p>
            <h3 className="text-2xl font-bold">{stats.processing}</h3>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white border border-green-500 rounded-xl p-5 flex gap-4 items-center">
          <FaCheck className="text-green-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Completed Today</p>
            <h3 className="text-2xl font-bold">{stats.completed}</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LabDashHome;