import React from "react";
import { FaBell, FaBullhorn, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../Authentication/AuthProvider";

const NoticeInfo = () => {
  const notices = [
    "Without card, you can not collect medicine",
    "System maintenance scheduled for March 13, 2026",
    "You are allowed to collect medicine once per day",
  ];

  const { user }= useAuth();

  console.log(user);
  

  return (
    <div className="w-full max-w-130 h-full mt-3 mx-3 sm:mx-6 space-y-4">
      
      {/* 🔔 NOTICES */}
      <div className="bg-white  rounded-xl shadow-lg px-10 py-8">
        <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
          <FaBell className="text-primary" />
          <span>Important Notices</span>
        </div>

        <hr className="mb-3" />

        <div className="space-y-3">
          {notices.map((notice, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <FaBullhorn className="text-primary mt-1" />
              <p>{notice}</p>
            </div>
          ))}
        </div>

        <div className="text-right mt-3">
          <button className="text-primary text-sm font-medium hover:underline">
            Show All →
          </button>
        </div>
      </div>

      {/* 👤 USER INFO */}
      <div className="bg-white border-t-4 border-primary rounded-xl shadow-lg px-10 py-8">
        <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
          <FaUserCircle className="text-primary" />
          <span>User Information</span>
        </div>

        <hr className="mb-4" />

        <div className="text-sm text-gray-700 space-y-2">
          <p><span className="font-medium">User ID</span> : {user?.userId}</p>
          <p><span className="font-medium">Name</span> : {user?.name}</p>
          <p><span className="font-medium">Department</span> : {user?.department}</p>
          <p><span className="font-medium">Designation</span> : {user?.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeInfo;