import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosProvider from "../../APIs/axiosProvider";

const LabProcessingTests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axiosProvider.get("/tests/processing").then((res) => {
      setTests(res.data);
    });
  }, []);

  const handleComplete = async (id) => {
    await axiosProvider.patch(`/tests/${id}/complete`);
    toast.success("Completed");
  };

  return (
    <div className="py-6 mx-20">
      <h2 className="text-lg mb-5">Processing Tests</h2>

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

            <button
              onClick={() => handleComplete(t._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabProcessingTests;