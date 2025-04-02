import { GetUser } from "@/actions/GetUser";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiAward, 
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiXCircle
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import student from "@/types/student";

interface submission {
  id: string;
  status: string;
  createdAt: string;
  assignmentName?: string;
  grade?: number;
}

interface PageProps {
  params: { id: string };
}

export default async function ViewStudentDetails({ params }: PageProps) {
  const { id } =await params;
  const student = await GetUser(id) as student;

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Student Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The student you're looking for doesn't exist or may have been removed.
          </p>
          <Link href="/admin/dashboard">
            <Button className="gap-2">
              <FiArrowLeft size={16} />
              Back to Students
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <FiCheckCircle className="text-green-500" />;
      case "PENDING":
        return <FiClock className="text-amber-500" />;
      default:
        return <FiXCircle className="text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="gap-2">
              <FiArrowLeft size={16} />
              Back to Students
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Details
          </h1>
        </div>

        {/* Profile and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={student.imgUrl || undefined} />
                <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-2xl">
                  {student.fname?.charAt(0) ?? ''}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{student.fname}</CardTitle>
              <CardDescription className="text-center">
                {student.role} • Joined {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiAward className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  CGPA: {student.cgpa || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiUser className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Status: <Badge variant={student.isActive ? 'default' : 'destructive'}>
                    {student.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardDescription>Total Submissions</CardDescription>
                <CardTitle className="text-3xl">
                  {student.submissions?.length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardDescription>Approved</CardDescription>
                <CardTitle className="text-3xl text-green-600 dark:text-green-400">
                  {student.submissions.filter(s => s.status === "APPROVED").length}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardDescription>Average Grade</CardDescription>
                <CardTitle className="text-3xl">
                  {student.submissions.length > 0 
                    ? (student.submissions.reduce((acc, curr) => acc + (curr.grade || 0), 0) / 
                       student.submissions.filter(s => s.grade).length).toFixed(1)
                    : 'N/A'}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Submissions Table */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FiFileText />
                Submissions
              </CardTitle>
              <Badge variant="outline">
                {student.submissions.length} records
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {student.submissions.length > 0 ? (
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-700">
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.submissions.map((submission: submission) => (
                      <TableRow key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <TableCell className="font-medium">
                          {submission.assignmentName || 'Untitled'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(submission.status)}
                            <Badge 
                              variant={
                                submission.status === "APPROVED" ? "default" : 
                                submission.status === "PENDING" ? "secondary" : "destructive"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.grade ? (
                            <Badge variant="outline" className={
                              submission.grade >= 90 ? 'border-green-500 text-green-500' :
                              submission.grade >= 70 ? 'border-blue-500 text-blue-500' :
                              submission.grade >= 50 ? 'border-amber-500 text-amber-500' :
                              'border-red-500 text-red-500'
                            }>
                              {submission.grade}%
                            </Badge>
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {new Date(submission.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FiFileText className="text-gray-400 dark:text-gray-500 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No submissions found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  This student hasnt submitted any assignments yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}