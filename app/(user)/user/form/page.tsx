import React from 'react'
import MainUserForm from '@/components/SubjectUserForm/MainUserForm';

async function SubjectForm() {



  return (
    <div className="min-h-screen  text-white p-8">
      {/* Dashboard Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Form Section */}
        <MainUserForm />
      </div>
    </div>
  )
}

export default SubjectForm