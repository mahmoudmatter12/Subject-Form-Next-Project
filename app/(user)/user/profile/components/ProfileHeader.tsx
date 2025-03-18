import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserResource } from "@clerk/types";

interface ProfileHeaderProps {
  user: UserResource;
  firstName: string;
  lastName: string;
}

export default function ProfileHeader({ user, firstName, lastName }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Image
          src={user?.imageUrl || "/next.svg"} // Fallback to a local image if user.imageUrl is undefined
          alt="User Profile Image"
          className="w-12 h-12 rounded-full mr-4"
          width={48}
          height={48}
        />
        <h1 className="text-2xl font-bold mr-10">
          {firstName} {lastName}
        </h1>
      </div>
      <button
        onClick={() => router.push("/user/dashboard")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Dashboard
      </button>
    </div>
  );
}