// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { toast } from "sonner";
// import Subject from "@/types/subject";
// import Submission from "@/types/submition";
// import { getMaxSubjectsAndHours, isMaxSubjectsOrHoursReached } from "@/components/SubjectUserForm/SubjectFormOne";

// interface enrolledSubjects {
//     status: string;
//     subject: Subject[];
// }

// interface SubmitionUserEditPageProps {
//     submission: Submission;
//     enrolledSubjects: enrolledSubjects[];
//     onSave?: (updatedSubmission: Submission) => void;
//     onClose?: () => void;
//     isOpen?: boolean;
//     studentInfo: { cgpa: string };
// }

// export default function SubmitionUserEditPage({
//     submission,
//     enrolledSubjects,
//     onSave,
//     onClose,
//     isOpen,
//     studentInfo,
// }: SubmitionUserEditPageProps) {
//     const [editedSubmission, setEditedSubmission] = useState(submission);

//     const { maxSubjects, maxHours } = getMaxSubjectsAndHours(studentInfo.cgpa);

//     const handleSubjectChange = (index: number, field: string, value: string | number | boolean) => {
//         const updatedSubjects = [...editedSubmission.subjects];
//         updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
//         setEditedSubmission({ ...editedSubmission, subjects: updatedSubjects });
//     };

//     const handleAddSubject = () => {
//         const newSubject = {
//             id: `temp-${Date.now()}`,
//             subjectCode: "",
//             name: "",
//             isOpen: true,
//             creditHours: 3,
//             prerequisites: [],
//             createdAt: new Date().toISOString(),
//         };
//         setEditedSubmission({ ...editedSubmission, subjects: [...editedSubmission.subjects, newSubject] });
//     };

//     const handleRemoveSubject = (index: number) => {
//         const updatedSubjects = editedSubmission.subjects.filter((_, i) => i !== index);
//         setEditedSubmission({ ...editedSubmission, subjects: updatedSubjects });
//     };

//     const handleSave = () => {
//         const checkedSubjects = editedSubmission.subjects.reduce((acc, subject) => {
//             acc[subject.id] = true;
//             return acc;
//         }, {} as { [key: string]: boolean });

//         const { reached, message } = isMaxSubjectsOrHoursReached(
//             checkedSubjects,
//             editedSubmission.subjects,
//             maxSubjects,
//             maxHours
//         );
//         if (reached) {
//             toast.error(message);
//             return;
//         }
//         onSave?.(editedSubmission);
//         toast.success("Submission updated successfully!");
//         onClose?.();
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="bg-gray-900 text-white">
//                 <DialogHeader>
//                     <DialogTitle>Edit Your Submission</DialogTitle>
//                 </DialogHeader>

//                 {/* Subjects List */}
//                 <div className="space-y-4">
//                     <h2 className="text-lg font-semibold">Subjects</h2>
//                     {editedSubmission.subjects.map((subject, index) => (
//                         <div key={subject.id} className="bg-cyan-900 p-4 rounded-lg">
//                             <Input
//                                 type="text"
//                                 placeholder="Subject Name"
//                                 value={subject.name}
//                                 onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
//                                 className="mb-2 bg-gray-800 text-white"
//                             />
//                             <Input
//                                 type="text"
//                                 placeholder="Subject Code"
//                                 value={subject.subjectCode}
//                                 onChange={(e) => handleSubjectChange(index, "subjectCode", e.target.value)}
//                                 className="mb-2 bg-gray-800 text-white"
//                             />
//                             <Input
//                                 type="number"
//                                 placeholder="Credit Hours"
//                                 value={subject.creditHours}
//                                 onChange={(e) => handleSubjectChange(index, "creditHours", parseInt(e.target.value))}
//                                 className="mb-2 bg-gray-800 text-white"
//                             />
//                             <Button
//                                 variant="destructive"
//                                 onClick={() => handleRemoveSubject(index)}
//                                 className="w-full"
//                             >
//                                 Remove Subject
//                             </Button>
//                         </div>
//                     ))}
//                     <Button onClick={handleAddSubject} className="w-full bg-blue-500 hover:bg-blue-600">
//                         Add Subject
//                     </Button>
//                 </div>

//                 {/* Actions */}
//                 <DialogFooter>
//                     <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
//                         Save Changes
//                     </Button>
//                     <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
//                         Cancel
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }