import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router";
import AppointmentCard from "./AppointmentCard";
import axiosProvider from "../../APIs/axiosProvider";
import BookingModal from "./BookingModal";

const BookAppointment = () => {
  const navigate = useNavigate();
  const user = {
    _id: 1310383432,
    name: "Ahsan Habib",
    email: "ahsan@gmail.com",
    designation: "Undergraduate Student",
    age: 22
  };

  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    axiosProvider
      .get("/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const [currentAppointment, setCurrentAppointment] = useState({});
  useEffect(() => {
    axiosProvider
      .get(`appointments/current/${user._id}`)
      .then((res) => {
        console.log(res.data);
        setCurrentAppointment(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user._id]);

  return (
    <div className="mt-5 sm:mt-10  sm:mx-10 ">
      <div className=" text-lg flex mx-3 justify-between">
        <Link
          onClick={() => navigate(-1)}
          className="flex gap-1 items-center   text-red-600">
          <IoIosArrowBack className="text-lg" />
          <p>Back</p>
        </Link>
        <div className=""></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
        {departments.map((department) => (
          <AppointmentCard
            key={department._id}
            department={department}
            setSelectedDept={setSelectedDept}
            currentAppointment={currentAppointment}
          />
        ))}
      </div>
      <BookingModal department={selectedDept} setCurrentAppointment={setCurrentAppointment} />
    </div>
  );
};

export default BookAppointment;
