// import { useState } from "react";
// import { toast } from "react-toastify";
import { academicGuide, level, program } from "@prisma/client";

interface ProfileFormProps {
  formData: {
    fname: string;
    lname: string;
    arabicName: string;
    email: string;
    phoneNumber: string;
    studentId: string;
    academicGuide: string;
    imgUrl: string;
    cgpa: string;
    level: string;
    program: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFormChanged: boolean;
}

export default function ProfileForm({ formData, onFormChange, onSubmit, isFormChanged }: ProfileFormProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Edit Your Profile</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Form Fields */}
        {[
          { id: "fname", label: "First Name", type: "text", required: true, disabled: false },
          { id: "lname", label: "Last Name", type: "text", required: false, disabled: false },
          { id: "arabicName", label: "Arabic Name", type: "text", required: false, disabled: false },
          { id: "email", label: "Email", type: "email", required: true, disabled: true },
          { id: "phoneNumber", label: "Phone Number", type: "tel", required: false, disabled: false },
          { id: "studentId", label: "Student ID", type: "text", required: true, disabled: true },
          { id: "academicGuide", label: "Academic Guide", type: "select", options: Object.values(academicGuide), required: true },
          { id: "level", label: "Level", type: "select", options: Object.values(level), required: true },
          { id: "program", label: "Program", type: "select", options: Object.values(program), required: true },
          { id: "cgpa", label: "CGPA", type: "text", required: false, disabled: true },
          { id: "imgUrl", label: "Personal Img", type: "text", required: false, disabled: false },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                value={formData[field.id as keyof typeof formData]}
                onChange={onFormChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id as keyof typeof formData]}
                onChange={onFormChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white ${
                  field.disabled ? "cursor-not-allowed" : ""
                }`}
                required={field.required}
                disabled={field.disabled}
              />
            )}
          </div>
        ))}

        {/* Buttons Section */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            disabled={!isFormChanged}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
              !isFormChanged ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}