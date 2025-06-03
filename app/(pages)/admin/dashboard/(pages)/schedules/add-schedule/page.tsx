import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ScheduleForm from "@/components/forms/ScheduleForm";

const addSchedulePage = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text flex items-center">
          <FaCalendarAlt className="mr-2 text-primary" />
          Schedule New Meeting
        </h1>
        <Link
          href="/admin/dashboard/schedules"
          className="text-primary hover:text-primary-dark flex items-center"
        >
          Back to Schedule
        </Link>
      </div>

      <ScheduleForm />
    </>
  );
};

export default addSchedulePage;
