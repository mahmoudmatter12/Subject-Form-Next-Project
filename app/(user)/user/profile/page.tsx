"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { toast } from "react-toastify";
import ProfileForm from "./components/ProfileForm";


export default function ProfilePage() {
  const { user } = useUser();
  // const router = useRouter();
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

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch the student's data
  useEffect(() => {
    if (user?.id) {
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
        });

      
    }
  }, [user?.id]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  // Handle form submission
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
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <ProfileForm
        formData={formData}
        onFormChange={handleChange}
        onSubmit={handleSubmit}
        isFormChanged={isFormChanged}
      />
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg max-w-40 hover:bg-red-600 cursor-pointer mt-6">
        <SignOutButton>
          <button>Sign Out</button>
        </SignOutButton>
      </div>
    </div>
  );
}