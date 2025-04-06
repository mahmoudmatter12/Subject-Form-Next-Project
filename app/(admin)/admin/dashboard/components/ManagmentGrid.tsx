'use client'
import SubjectMainComp from '@/components/Subject/SubjectMainComp'
import React, { useEffect } from 'react'
import QuizzesMainComp from './quizzes/QuizzesMainComp'
import { useState } from 'react'
import Subject from '@/types/subject'

function ManagmentGrid() {
    const [subjects, setSubjects] = useState<Subject[]>([])

    const fetchSubjects = async () => {
        try {
            const res = await fetch("/api/subjects")
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const data = await res.json()
            if (data.subjects && Array.isArray(data.subjects)) {
                setSubjects(data.subjects)
            }
        } catch (error) {
            console.error("Error fetching subjects:", error)
        }
    }

    useEffect(() => {
        fetchSubjects()
    }, [])
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* All Subjects */}
            <SubjectMainComp />
            <QuizzesMainComp subjects={subjects}/>
        </div>
    )
}

export default ManagmentGrid