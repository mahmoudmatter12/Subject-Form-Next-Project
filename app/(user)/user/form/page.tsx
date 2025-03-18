import React from 'react'
import MainUserForm from '@/components/SubjectUserForm/MainUserForm';
import Header from '@/components/utils/Header';

async function SubjectForm() {



  return (
    <div className="min-h-screen  text-white p-8">
      {/* Dashboard Container */}
      <div className="w-full max-w-6xl mx-auto">
        <Header />
        {/* Form Section */}
        <MainUserForm />
      </div>
    </div>
  )
}

export default SubjectForm