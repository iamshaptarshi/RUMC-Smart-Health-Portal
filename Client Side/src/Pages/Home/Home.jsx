import React from "react";
import bookAppointment from "../../assets/BookAppointment.png";
import pendingTestst from "../../assets/PendingTests.png";
import reportPrescription from "../../assets/reports.png";
import requestPrescription from "../../assets/requestPrescription.png";
import schedules from "../../assets/schedules.png";
import medicalHistory from "../../assets/history.png";
import { Link } from "react-router";
import CurrentActions from "./CurrentActions";
import NoticeInfo from "./NoticeInfo";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className=" mt-3 mx-3 sm:ml-6 lg:w-3/5 ">
        <div className="grid place-items-center grid-cols-2 sm:grid-cols-3">
          <Link to="book-appointment">
            <img
              src={bookAppointment}
              alt=""
              className=" md:max-w-[200px] lg:max-w-[250px] lg:max-w-[260px] "
            />
          </Link>

          <Link to="pending-tests">
            <img
              src={pendingTestst}
              alt=""
              className="md:max-w-[200px] lg:max-w-[250px] lg:max-w-[260px]  "
            />
          </Link>

          <Link to="medical-history">
            <img
              src={reportPrescription}
              alt=""
              className="md:max-w-[200px] lg:max-w-[250px] xl:max-w-[260px]  "
            />
          </Link>

          <Link to="virtual-prescription-request">
            <img
              src={requestPrescription}
              alt=""
              className="md:max-w-[200px] lg:max-w-[250px] xl:max-w-[260px]  "
            />
          </Link>

          <Link to="schedules">
            <img
              src={schedules}
              alt=""
              className="md:max-w-[200px] lg:max-w-[250px] xl:max-w-[260px]  "
            />
          </Link>

          <Link to="medical-history">
            <img
              src={medicalHistory}
              alt=""
              className="md:max-w-[200px] lg:max-w-[250px] xl:max-w-[260px] "
            />
          </Link>
        </div>

        <CurrentActions />
      </div>

      <div className="lg:w-2/5 lg:mr-9 not-sm:hidden">
        <NoticeInfo />
      </div>
    </div>
  );
};

export default Home;
