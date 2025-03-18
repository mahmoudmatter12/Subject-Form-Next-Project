// import React from 'react'
// import SubmitionEditPage from '@/components/Submitions/Forms/SubmitionEditPage'
// import SubmitionUserEditPage from '@/components/Submitions/Forms/SubmitionUserEditPage'
// // interface Subject {
// //     id: string;
// //     subjectCode: string;
// //     name: string;
// //     isOpen: boolean;
// //     creditHours: number;
// //     prerequisites: string[];
// //     createdAt: string;
// // }

// // interface Submission {
// //     id: string;
// //     studentId: string;
// //     status: string;
// //     createdAt: string;
// //     updatedAt: string;
// //     subjects: Subject[];
// // }

// interface studentInfo{
//     cgpa: string
// }
// function page() {
    
//     const studentInfo: studentInfo = {
//         cgpa: '3.5'
//     }

//     const submission = {
//         id: '1',
//         studentId: '1',
//         status: 'pending',
//         createdAt: '2021-09-01',
//         updatedAt: '2021-09-01',
//         subjects: [
//             {
//                 id: '1',
//                 subjectCode: 'CS101',
//                 name: 'Introduction to Computer Science',
//                 isOpen: true,
//                 creditHours: 3,
//                 prerequisites: [],
//                 createdAt: '2021-09-01',
//             },
//             {
//                 id: '2',
//                 subjectCode: 'CS102',
//                 name: 'Data Structures and Algorithms',
//                 isOpen: true,
//                 creditHours: 3,
//                 prerequisites: ['CS101'],
//                 createdAt: '2021-09-01',
//             },
//         ],
//     }
//     return (
//         <>
//             <div>
//                 <SubmitionEditPage isOpen={false} submission={submission} />
//                 <SubmitionUserEditPage isOpen={true} submission={submission} studentInfo={studentInfo} enrolledSubjects={[]}  />
//             </div>
//         </>
//     )
// }

// export default page