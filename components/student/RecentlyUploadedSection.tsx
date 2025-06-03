/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../ui/loading";
import RecentlyUploadedFilesCard from "../ui/RecentlyUploadedFilesCard ";
import Link from "next/link";

const RecentlyUploadedSection = () => {
  const [latestFiles, setLatestFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get("/api/student/courses/files");

        const allFiles = data.courses.flatMap(
          (course: any) =>
            course.files?.map((file: any) => ({
              ...file,
              courseName: course.courseName,
              courseCode: course.courseCode,
            })) || []
        );

        const sortedFiles = allFiles
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 4);

        setLatestFiles(sortedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  if (loading) return <Loading bg="border-r-primary" />;

  return (
    <div className="flex flex-col gap-4 border border-slate-200 rounded-lg p-4">
      <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
        <span className="text-text font-bold">Recently Uploaded Files</span>
        <span>
          <Link
            href="/dashboard"
            className="text-xs text-primary hover:underline font-medium"
          >
            View all files
          </Link>
        </span>
      </div>
      {latestFiles.length > 0 ? (
        latestFiles.map((file) => (
          <RecentlyUploadedFilesCard
            key={file._id}
            fileUrl={file.fileUrl}
            fileName={file.fileName}
            course={`${file.courseCode} - ${file.courseName}`}
            date={new Date(file.createdAt).toLocaleDateString()}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center py-4">No files found</div>
      )}
    </div>
  );
};

export default RecentlyUploadedSection;
