'use client'

import React from 'react'
import { useEffect, useState } from 'react'
// import { MakeOpen } from '@/actions/MakeOpen'
import { MakeClosed } from '@/actions/MakeClosed'

interface Subject {
  id: string;
  name: string;
  isOpen: boolean;
}

interface Data {
  subjects: Subject[];
}

function GetData() {
  const [data, setData] = useState<Data | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/subjects')
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])
  return data
}

function Page() {
  const subjects = GetData()
  return (
    <>
      <h1>Subjects</h1>
      {subjects?.subjects.map(subject => (
        <>
          <li key={subject.id}>{subject.name}</li>
          <li>{subject.isOpen ? 'bg-green' : 'bg-red'}</li>
          <li>
            {subject.isOpen ? 'open' : 'closed'}
          </li>
          <li>
            {subject.id}
          </li>
          <ul>
            <button onClick={() => MakeClosed(subject.id)} className='border-green-400 bg-green-400 p-4 m-4 cursor-pointer rounded-2xl'> make closed </button>
          </ul>
         
        </>
      ))}
    </>
  )
}

export default Page