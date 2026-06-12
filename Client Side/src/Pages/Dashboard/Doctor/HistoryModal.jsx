import { IoMdDownload } from "react-icons/io";

const HistoryModal = ({appointmentDetails}) => {
  return (
    <dialog id="premium_modal" className="modal">
      <div className="modal-box max-w-lg p-0 rounded-3xl overflow-hidden shadow-2xl">
        {/* 🌈 Gradient Header */}
        <div className="bg-primary text-white p-5 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Appointment Details</h3>
          <form method="dialog">
            <button className="text-white text-xl">
              ✕
            </button>
          </form>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Info Card */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <p className="flex justify-between text-sm text-gray-600">
              <span>Department</span>
              <span className="font-semibold text-gray-800">{appointmentDetails?.department?.name}</span>
            </p>

            <div className=" my-3"></div>

            <p className="flex justify-between text-sm text-gray-600">
              <span>Doctor</span>
              <span className="font-semibold text-gray-800">
                Dr. Ahmed Hossen
              </span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button className="btn bg-green-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition">
             <IoMdDownload className="text-lg" /> Download Test Reports
            </button>

            <button className="btn bg-green-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition">
              <IoMdDownload className="text-lg" /> Download Prescription
            </button>
          </div>
        </div>

        {/* Footer */}
        
      </div>
    </dialog>
  );
};

export default HistoryModal;
