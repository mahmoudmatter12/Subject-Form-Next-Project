import { academicGuide, level, program } from "@prisma/client";
import { FiUser, FiMail, FiPhone, FiBook, FiAward, FiImage } from "react-icons/fi";
import { FaGraduationCap, FaIdCard, FaUserTie } from "react-icons/fa";

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

const formFields = [
  { 
    id: "fname", 
    label: "First Name", 
    type: "text", 
    required: true, 
    disabled: false,
    icon: <FiUser className="text-gray-400" />
  },
  { 
    id: "lname", 
    label: "Last Name", 
    type: "text", 
    required: false, 
    disabled: false,
    icon: <FiUser className="text-gray-400" />
  },
  { 
    id: "arabicName", 
    label: "Arabic Name", 
    type: "text", 
    required: false, 
    disabled: false,
    icon: <FiUser className="text-gray-400" />
  },
  { 
    id: "email", 
    label: "Email", 
    type: "email", 
    required: true, 
    disabled: true,
    icon: <FiMail className="text-gray-400" />
  },
  { 
    id: "phoneNumber", 
    label: "Phone Number", 
    type: "tel", 
    required: false, 
    disabled: false,
    icon: <FiPhone className="text-gray-400" />
  },
  { 
    id: "studentId", 
    label: "Student ID", 
    type: "text", 
    required: true, 
    disabled: true,
    icon: <FaIdCard className="text-gray-400" />
  },
  { 
    id: "academicGuide", 
    label: "Academic Guide", 
    type: "select", 
    options: Object.values(academicGuide), 
    required: true,
    icon: <FaUserTie className="text-gray-400" />
  },
  { 
    id: "level", 
    label: "Level", 
    type: "select", 
    options: Object.values(level), 
    required: true,
    icon: <FaGraduationCap className="text-gray-400" />
  },
  { 
    id: "program", 
    label: "Program", 
    type: "select", 
    options: Object.values(program), 
    required: true,
    icon: <FiBook className="text-gray-400" />
  },
  { 
    id: "cgpa", 
    label: "CGPA", 
    type: "text", 
    required: false, 
    disabled: true,
    icon: <FiAward className="text-gray-400" />
  },
  { 
    id: "imgUrl", 
    label: "Profile Image URL", 
    type: "text", 
    required: false, 
    disabled: false,
    icon: <FiImage className="text-gray-400" />
  }
];

export default function ProfileForm({ formData, onFormChange, onSubmit, isFormChanged }: ProfileFormProps) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-700/50">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
          Edit Your Profile
        </h2>
        <p className="text-gray-400 mt-1">Update your personal and academic information</p>
      </div>
      
      <form onSubmit={onSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={onFormChange}
                    className={`pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      field.disabled ? "cursor-not-allowed bg-gray-800/50" : ""
                    }`}
                    required={field.required}
                    disabled={field.disabled}
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
                    className={`pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      field.disabled ? "cursor-not-allowed bg-gray-800/50" : ""
                    }`}
                    required={field.required}
                    disabled={field.disabled}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8 space-x-3">
          <button
            type="submit"
            disabled={!isFormChanged}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isFormChanged 
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}