// hooks/useOnboardingForm.ts
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface OnboardingFormData {
  firstName: string;
  lastName: string;
  arabicName: string;
  email: string;
  phoneNumber: string;
  studentId: string;
  imgUrl: string;
}
export function useOnboardingForm(userId: string | null) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: OnboardingFormData) => {
    if (loading || !userId) return;

    setLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          clerkId: userId,
        }),
      });

      if (response.ok) {
        toast.success("Profile created successfully");
        router.push("/user/dashboard");
      } else if (response.status === 409) {
        const errorData = await response.json();
        toast.error(`${errorData.error}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}
