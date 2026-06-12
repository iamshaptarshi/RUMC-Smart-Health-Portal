import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosProvider from "../../APIs/axiosProvider";

const LabPendingTests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axiosProvider.get("/tests/pending").then((res) => {
      setTests(res.data);
    });
  }, []);

  const handleCollect = async (id) => {
    await axiosProvider.patch(`/tests/${id}/collect`);
    toast.success("Sample Collected");
  };

  const handleProcessing = async (id) => {
    await axiosProvider.patch(`/tests/${id}/processing`);
    toast.success("Marked Processing");
  };

  return (
    <div className="py-6 mx-20">
      <h2 className="text-lg mb-5">Pending Tests</h2>

      <div className="bg-white rounded-xl shadow-md p-5 space-y-3">
        {tests.map((t) => (
          <div
            key={t._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{t.patient.name}</p>
              <p className="text-sm text-gray-500">{t.testName}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCollect(t._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Collect
              </button>

              <button
                onClick={() => handleProcessing(t._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Processing
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabPendingTests;