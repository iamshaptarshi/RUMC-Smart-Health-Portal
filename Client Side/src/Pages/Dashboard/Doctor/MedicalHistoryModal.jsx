import React from "react";

const MedicalHistoryModal = ({ history }) => {
  return (
    <dialog id="history_modal" className="modal">
      <div className="modal-box max-w-4xl bg-white text-gray-900 p-0 max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="bg-[#7B74EA] text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Medical History</h3>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 text-sm font-semibold text-gray-500 mb-3 px-4">
            <p>DATE</p>
            <p>DEPARTMENT</p>
            <p>STATUS</p>
            <p className="text-right">ACTION</p>
          </div>

          {/* LIST */}
          <div className="space-y-3">

            {history.length === 0 ? (
              <p className="text-center text-gray-400 py-6">
                No history available
              </p>
            ) : (
              history.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
                >
                  {/* DATE */}
                  <p className="text-gray-800 font-medium">
                    {item.date || "2026-04-20"}
                  </p>

                  {/* DEPARTMENT */}
                  <p className="text-gray-700">
                    {item.department?.name || "Medicine"}
                  </p>

                  {/* STATUS */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {item.status || "pending"}
                    </span>
                  </div>

                  {/* ACTION */}
                  <div className="text-right">
                    <button className="bg-[#7B74EA] text-white px-4 py-1.5 rounded-md text-sm">
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t p-4 flex justify-end bg-white">
          <form method="dialog">
            <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-800">
              Close
            </button>
          </form>
        </div>

      </div>
    </dialog>
  );
};

export default MedicalHistoryModal;