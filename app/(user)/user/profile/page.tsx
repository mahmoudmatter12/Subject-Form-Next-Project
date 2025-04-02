"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { toast } from "react-toastify";
import ProfileForm from "./components/ProfileForm";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    arabicName: "",
    email: "",
    phoneNumber: "",
    studentId: "",
    academicGuide: "",
    imgUrl: "",
    cgpa: "",
    level: "",
    program: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch the student's data
  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      fetch(`/api/student/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            fname: data.fname,
            lname: data.lname || "",
            arabicName: data.arabicName || "",
            email: data.email,
            phoneNumber: data.phoneNumber || "",
            studentId: data.studentId,
            academicGuide: data.academicGuide || "",
            imgUrl: data.imgUrl || "",
            cgpa: data.cgpa || "",
            level: data.Level || "",
            program: data.Program || "",
          });
        })
        .catch(() => toast.error("Failed to load profile data"))
        .finally(() => setIsLoading(false));
    }
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/student/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        setIsFormChanged(false);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <SignOutButton>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FiLogOut /> Sign Out
          </button>
        </SignOutButton>
      </div>

      {/* Profile Preview Section */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Profile Preview</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {formData.imgUrl && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500">
              <Image
                src={formData.imgUrl}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-profile.png";
                }}
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white">
              {formData.fname} {formData.lname}
            </h3>
            {formData.arabicName && (
              <p className="text-lg text-gray-300 mb-2">{formData.arabicName}</p>
            )}
            <p className="text-gray-400">{formData.email}</p>
            <p className="text-gray-400">{formData.studentId}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Program</p>
                <p className="text-white">{formData.program || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="text-white">{formData.level || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CGPA</p>
                <p className="text-white">{formData.cgpa || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Academic Guide</p>
                <p className="text-white">{formData.academicGuide || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProfileForm
          formData={formData}
          onFormChange={handleChange}
          onSubmit={handleSubmit}
          isFormChanged={isFormChanged}
        />
      </div>


    </div>
  );
}