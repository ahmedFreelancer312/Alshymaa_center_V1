/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaBookOpen, FaFilePdf, FaArrowLeft, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../ui/loading";

interface File {
  id: string;
  fileCode: string;
  courseCode: string;
  courseName: string;
  fileName: string;
  fileDescription: string;
  fileUrl: string;
  createdAt: string;
  uploadedAt: string;
}

export default function AllFiles() {
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/student/files");
        const files = response.data.files.map((file: any) => ({
          id: file._id,
          fileCode: file.fileCode,
          courseCode: file.courseCode,
          courseName: file.courseName,
          fileName: file.fileName,
          fileDescription: file.fileDescription,
          fileUrl: file.fileUrl,
          uploadedAt: new Date(file.createdAt).toLocaleDateString()
        }));
        setAllFiles(files);
      } catch (err) {
        setError("Failed to load files. Please try again later.");
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles = allFiles.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.fileDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/student/dashboard"
            className="flex items-center text-blue-600 w-max hover:underline text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Page header */}
        <div className="bg-white rounded-lg shadow border border-gray-200 mb-6 sm:mb-8">
          <div className="bg-blue-600 px-4 py-4 sm:px-6 sm:py-5 rounded-t-lg">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">All Course Files</h1>
                <p className="text-white/90 mt-1 text-sm sm:text-base">
                  Browse all your course materials in one place
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white hidden sm:block">
                <FaBookOpen className="text-xl text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4 sm:mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Files section */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Available Files ({filteredFiles.length})
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                {searchTerm ? `Showing results for "${searchTerm}"` : "Sorted by course and upload date"}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors md:flex-row md:items-center"
                >
                  <div className="flex items-start flex-1 min-w-0">
                    <FaFilePdf className="text-red-500 text-lg sm:text-xl mr-3 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
                        {file.fileName}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                        {file.fileDescription}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {file.courseCode}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          {file.courseName} • Uploaded: {file.uploadedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 sm:mt-0 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs sm:text-sm transition-colors text-center w-full sm:w-auto"
                  >
                    View File
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                {allFiles.length === 0 ? "No files available" : "No files found matching your search"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}