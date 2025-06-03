/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import UpcomingScheduleCard from '../ui/UpcomingScheduleCard'
import Link from 'next/link'
import axios from 'axios'
import Loading from '../ui/loading'

const UpcomingScheduleSection = () => {
    const [schedules , setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
  
  // fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await axios.get("/api/student/schedule");
        setSchedules(data.schedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

    if (loading) return <div className="border border-slate-200 rounded-lg p-4"><Loading /></div>;
  return (
    <div className="border border-slate-200 rounded-lg p-4">
    <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
      <span className="text-text font-bold">Upcoming Schedule</span>
      <span>
        <Link
          href="/student/dashboard/schedule"
          className="text-xs text-primary hover:underline font-medium"
        >
          View calendar
        </Link>
      </span>
    </div>
    <div className="flex flex-col gap-4">
      {schedules.length > 0 ? schedules.map((schedule: any) => (
        <UpcomingScheduleCard
          key={schedule._id}
          title={schedule.meetingTitle}
          course="Course 1"
          time={schedule.startTime}
        />
      )) : (
        <div className="text-gray-500 text-center py-4">No files found</div>
      )}
    </div>
  </div>
  )
}

export default UpcomingScheduleSection