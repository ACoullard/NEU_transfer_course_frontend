// import { useState } from 'react'
import { useEffect, useState, useRef } from 'react'
import './App.css'

let firstRun = true
type ClassList = {[key:string]: string}

function fetchClassList() {
  // fetches the list of available NEU classes in dictionary form
  // classlist[department] = [code1, code2, ...]
  return {"ENG":"101", "MATH":"1365"}
}


function buildDeptOptions(classList: ClassList) {
  const deptOptions = []
  for(let i = 0; i < classList.keys.length; i++) {
    deptOptions.push(<option key={i}>{classList.keys[i]}</option>)
  }

}

function App() {

  const [dept, setDept] = useState('')
  const classList = useRef<ClassList | null>(null)
  const deptOption = useRef<JSX.Element[]>

  // this only runs on the first render
  useEffect(() => {
    if (firstRun) {
      firstRun = false
      
      classList.current = fetchClassList()
    }
  }, [])

  console.log(classList)
  return (
    <>
    {/* Main div. Just centers*/}
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3x1' >Hello</h1>
        <button className='bg-gray-500 hover:bg-gray-400'>
          hello
        </button>

        <select 
          value={dept}
          
          onChange={(e) => {
          setDept(e.target.value)
        }}>
          <option id='0'></option>
          <option id='1'>helloooo</option>
          <option id='2'>test2</option>
        </select>
        <p>{dept}</p>
      </div>
    </div>
    </>
  )
}

export default App
