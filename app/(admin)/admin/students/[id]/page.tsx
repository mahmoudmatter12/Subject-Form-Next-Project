// app/students/[id]/page.tsx
import { GetUser } from "@/actions/GetUser";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface submission {
  id: string;
  status: string;
  createdAt: string;
}

export default async function StudentPage({ params }: { params: { id: string } }) {
  const {id} = params;
  const student = await GetUser(id);

  if (!student) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Student not found</h1>
        <Link href="/admin/dashboard">
          <Button variant="outline" className="mt-4">
            Back to Students
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Back Button */}
      <Link href="/admin/dashboard">
        <Button variant="outline" className="mb-6">
          &larr; Back to Students
        </Button>
      </Link>

      {/* Student Profile Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Role:</strong> {student.role}</p>
            <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Section */}
      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          {student.enrollments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course ID</TableHead>
                  <TableHead>Enrolled At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>{enrollment.courseId}</TableCell>
                    <TableCell>{new Date(enrollment.enrolledAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No enrollments found.</p>
          )}
        </CardContent>
      </Card> */}

      {/* Submissions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {student.submissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submission ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.submissions.map((submission: submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.id}</TableCell>
                    <TableCell>
                      <Badge variant={submission.status === "APPROVED" ? "default" : submission.status === "PENDING" ? "secondary" : "destructive"}>
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No submissions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}