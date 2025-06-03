/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import StartsCards from "./StartsCards";
import axios from "axios";
import Loading from "../ui/loading";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";

const StartSection = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedules , setSchedules] = useState([])
  const [loading, setLoading] = useState(true);


//   Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("/api/admin/students");
        setStudents(data);
      } catch (error: any) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

//   Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/admin/courses");
        setCourses(data);
      } catch (error: any) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);


//   Fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await axios.get("/api/admin/schedules");
        setSchedules(data);
      } catch (error: any) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) return <Loading bg="border-r-primary" />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <StartsCards
          icon={<FaUsers className="text-2xl" />}
          title="All Students"
          value={students.length}
        />
        <StartsCards
          icon={<IoBookSharp className="text-2xl text-success" />}
          title="All Courses"
          value={courses.length}
        />
        <StartsCards
          icon={<FaCalendarAlt className="text-2xl text-warning" />}
          title="All Schedules"
          value={schedules.length}
        />
      </div>
    </>
  );
};

export default StartSection;
