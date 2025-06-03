"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import Loading from "../ui/loading";

type IStudent = {
  name: string;
  academicId: string;
  faculty: string;
  department: string;
  academicLevel: string;
  phone: string;
};

export default function SettingSection() {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get("/api/student/profile");
        setStudent(data);
        setPhone(data.phone || "");
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await axios.patch("/api/student/profile", {
        phone,
        password: password || undefined,
      });

      setShowEditForm(false);
      setPassword("");
      setStudent((prev) => prev ? { ...prev, phone } : prev);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text mb-2">Student Profile</h1>
          <p className="text-text-secondary/80">Manage your basic information</p>
        </div>

        {/* Profile Card */}
        {student && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {/* Profile Picture Section */}
            <div className="bg-primary-light/10 py-6 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  {student.name ? (
                    <span className="text-3xl font-medium text-primary">
                      {student.name[0]}
                    </span>
                  ) : (
                    <FaUser className="text-3xl text-primary/70" />
                  )}
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-xs text-text-secondary/70 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="font-medium text-text text-lg">{student.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-text-secondary/70 uppercase tracking-wider">
                  Student ID
                </p>
                <p className="font-medium text-text text-lg">{student.academicId}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-text-secondary/70 uppercase tracking-wider">
                  Academic Level
                </p>
                <p className="font-medium text-text text-lg">{student.academicLevel}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-text-secondary/70 uppercase tracking-wider">
                  Major
                </p>
                <p className="font-medium text-text text-lg">{student.department}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-text-secondary/70 uppercase tracking-wider">
                  Faculty
                </p>
                <p className="font-medium text-text text-lg">{student.faculty}</p>
              </div>

              {/* Phone */}
              <div className="pt-2 space-y-1">
                <p className="text-xs text-text-secondary/70 uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="font-medium text-text">
                  {student.phone || "+20 123 456 7890"}
                </p>
              </div>

              {/* Change Form Toggle */}
              <div className="pt-4">
                <button
                  onClick={() => setShowEditForm(!showEditForm)}
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-lg text-primary hover:bg-primary-light/10 transition-colors font-medium"
                >
                  <FaLock className="mr-2" />
                  {showEditForm ? "Cancel" : "Change Password & Phone"}
                </button>
              </div>

              {/* Edit Form */}
              {showEditForm && (
                <div className="pt-4 space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">New Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
