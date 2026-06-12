import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axiosProvider from "../../../APIs/axiosProvider";
import toast from "react-hot-toast";
import Select from "react-select";

const PrescriptionModal = ({ doctor, appointment, onReportSaved }) => {
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", duration: "" },
  ]);

  const [tests, setTests] = useState([]);
  const [statusCompleted, setStatusCompleted] = useState(true);
  const [allTests, setAllTests] = useState([]);

  // ===== MEDICINES =====
  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dose: "", duration: "" }]);
  };

  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const updateMedicine = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const cleanedMedicines = medicines.filter(
    (m) =>
      m.name.trim() !== "" || m.dose.trim() !== "" || m.duration.trim() !== "",
  );

  // ===== TESTS =====
  const addTest = () => {
    setTests([...tests]);
  };

  const removeTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const updateTest = (index, value) => {
    const updated = [...tests];
    updated[index] = value;
    setTests(updated);
  };

  const handleSaveReport = async () => {
    const cleanedTests = tests;

    axiosProvider
      .post(`/reports/appointment/${appointment._id}`, {
        medicines: cleanedMedicines,
        tests: cleanedTests,
        notes: "",
        status: statusCompleted ? "completed" : "processing",
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Report Saved Successfully");

        // 🔥 update UI instantly
        if (onReportSaved) {
          onReportSaved();
        }

        // close modal AFTER success
        document.getElementById("report_modal").close();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to save report");
      });
  };

  useEffect(() => {
    axiosProvider
      .get("tests")
      .then((res) => {
        // convert to dropdown format
        const formatted = res.data.map((test) => ({
          value: test._id,
          label: test.name,
          departmentId: test.departmentId,
          departmentName: test.departmentName,
        }));

        // sort alphabetically
        formatted.sort((a, b) => a.label.localeCompare(b.label));

        setAllTests(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <dialog id="report_modal" className="modal">
      <div className="modal-box max-w-5xl p-0 bg-white text-gray-900 max-h-[90vh] overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-[#7B74EA] text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Prescription</h3>
          <p className="text-sm opacity-90">{doctor.name}</p>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* PATIENT CARD */}
          <div className="bg-purple-100 border-pink-100 rounded-xl p-4 flex justify-between items-center">
            <div>
              <h2 className="text-md font-bold text-[#7B74EA]">
                Patient Details
              </h2>
              <p className=" text-gray-900 flex gap-3">
                {" "}
                <p className="font-semibold">
                  {appointment?.patient?.name}
                </p>{" "}
                <p className="text-xs flex justify-center items-center bg-green-600 text-white px-1.5 py-0 rounded-xl">
                  Male
                </p>
              </p>
              <p className="text-sm text-gray-600 ">
                <p>Age: {appointment?.patient?.age} y/o</p>
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ===== TESTS ===== */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#7B74EA] mb-3">
                Recommended Tests
              </h4>

              <div className="space-y-3">
                {tests.map((test, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center gap-2 mt-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-800">{test.name}</span>
                      <span className="text-xs text-gray-400">
                        {test.departmentName}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setTests(tests.filter((_, index) => index !== i))
                      }
                      className="text-red-500 text-sm">
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addTest}
                className="mt-3 text-sm text-[#7B74EA] font-medium hover:underline">
                + Add Test
              </button>

              <Select
                options={allTests}
                placeholder="Search & select test..."
                onChange={(selected) => {
                  if (!selected) return;

                  const newTest = {
                    testId: selected.value,
                    name: selected.label,
                    departmentId: selected.departmentId,
                    departmentName: selected.departmentName,
                    status: "pending",
                  };

                  // prevent duplicate
                  if (tests.some((t) => t.testId === newTest.testId)) return;

                  setTests([...tests, newTest]);
                }}
                isClearable
              />
            </div>

            {/* ===== MEDICINES ===== */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-[#7B74EA] mb-3">Medicines</h4>

              <div className="space-y-3">
                {medicines.map((med, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      placeholder="Medicine"
                      value={med.name}
                      onChange={(e) =>
                        updateMedicine(i, "name", e.target.value)
                      }
                      className="col-span-4 border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-[#7B74EA] outline-none"
                    />

                    <input
                      placeholder="Dose"
                      value={med.dose}
                      onChange={(e) =>
                        updateMedicine(i, "dose", e.target.value)
                      }
                      className="col-span-3 border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-[#7B74EA] outline-none"
                    />

                    <input
                      placeholder="Duration"
                      value={med.duration}
                      onChange={(e) =>
                        updateMedicine(i, "duration", e.target.value)
                      }
                      className="col-span-3 border border-gray-300 rounded-md px-2 py-2 focus:ring-2 focus:ring-[#7B74EA] outline-none"
                    />

                    {medicines.length > 1 && (
                      <button
                        onClick={() => removeMedicine(i)}
                        className="col-span-2 text-red-500 hover:scale-110 transition">
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addMedicine}
                className="mt-3 text-sm text-[#7B74EA] font-medium hover:underline">
                + Add Medicine
              </button>
            </div>
          </div>

          {/* NOTES */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-[#7B74EA] mb-2">Notes</h4>
            <textarea
              placeholder="Additional notes..."
              className="w-full border border-gray-300 rounded-md p-3 h-24 focus:ring-2 focus:ring-[#7B74EA] outline-none"
            />
          </div>

          <div className="rounded-xl flex gap-4 p-4 ">
            <p>Completed</p>
            <input
              checked={statusCompleted}
              onChange={() => setStatusCompleted((prev) => !prev)}
              type="checkbox"
              className="toggle bg-primary/30 toggle-primary"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-4 border-t bg-white">
          <form method="dialog">
            <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">
              Cancel
            </button>
          </form>

          <button
            onClick={handleSaveReport}
            className="px-4 py-2 rounded-md bg-[#7B74EA] text-white hover:bg-pink-700">
            Save Report
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PrescriptionModal;
