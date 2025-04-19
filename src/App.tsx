import { useEffect, useState, useRef, ReactElement } from 'react'
import './App.css'
const SERVER_URL = 'http://127.0.0.1:5000/api'
let firstRun = true
type ClassList = {[key:string]: string[]}

async function fetchClassList() {
  // fetches the list of available NEU classes in dictionary form
  // classlist[department] = [code1, code2, ...]
  const url = SERVER_URL.concat('/courseslist')
  try {
    const responce = await fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    console.log("responce", responce)
    const json = await responce.json()
    console.log("json", json, json[0])
    return json
  }
  catch {
    console.error("AHHHHH!!!!! ERROR!!")
  }

  // return {"CS":["3000", "3500"], "MATH":["1365"]}
}

async function fetchCourses(courseCode: string) {
  const url = SERVER_URL.concat('/course?class_code=', courseCode)
  try {
    const responce = await fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    console.log("responce", responce)
    const json = await responce.json()
    console.log("json", json, json[0])
    return json
  }
  catch {
    console.error("AHHHHH!!!!! ERROR!!")
  }
  
  // return [["MATH 281","Alfred University"],["MATH 130","American College of Thessaloniki, The"]]
}

function buildOptions(optionsValues: string[]) {
  const deptOptions = []
  for(let i = 0; i < optionsValues.length; i++) {
    deptOptions.push(<option key={i}>{optionsValues[i]}</option>)
  }
  return deptOptions
}

function buildTable(courses: string[][]) {
  const tableRows = []
  let count = 0
  for (const coursePair of courses) {
    const row = <tr key={count}>
      <th className="p-4">
        <p className="text-sm leading-none font-normal">
          {coursePair[0]}
        </p>
      </th>
      <th className="p-4">
        <p className="text-sm leading-none font-normal">
          {coursePair[1]}
        </p>
      </th>
    </tr>
    tableRows.push(row)
    count++
  }
  return tableRows
}

function App() {

  const [dept, setDept] = useState('')
  const [code, setCode] = useState('')
  const classList = useRef<ClassList | null>(null)
  const [deptOptions, setDeptOptions] = useState<ReactElement[] | null>(null)
  let codeOptions = null
  const [tableRows, setTableRows] = useState<ReactElement[] | null>(null)

  function displayTable(code: string) {
    const rawCourses = fetchCourses(code)
    rawCourses.then((res) => {setTableRows(buildTable(res))})
  }

  // this only runs on the first render
  useEffect(() => {
    if (firstRun) {
      firstRun = false
      fetchClassList().then((res) => {
        classList.current = res
        setDeptOptions(buildOptions([''].concat(Object.keys(res))))
      })
      // const departments = Object.keys(classList.current)
      // setDeptOptions(buildOptions([''].concat(departments)))
    }
  }, [])


  if (!dept || classList.current == null) {
    codeOptions = [<option key="0"></option>];
  } else {
    codeOptions = buildOptions(classList.current[dept]);
  }

  return (
    <>
    <header className='bg-neu-red text-white p-6'>
      <a>NEU Reverse Transfer Course Database</a>

    </header>
    {/* Main div. Just centers*/}
    <div className='h-screen flex items-center flex-col'>
      <div className='flex flex-col gap-4 mt-20'>
        <h1 className='text-3x1' >Hello, this is the NEU Reverse transfer class finder</h1>
        <div className='flex flex-col sm:flex-row'>
          <select 
            value={dept}
            onChange={(e) => {
              const newDept = e.target.value
              setDept(newDept)
              if (newDept && classList.current){
                const newCode = classList.current[newDept][0]
                setCode(newDept.concat(newCode))
                displayTable(newDept.concat(newCode))
              } else {
                setCode('')
              }
            }}>
            {deptOptions}
          </select>

          <select 
            value={code}
            onChange={(e) => {
              const newCode = e.target.value
              console.log(newCode)
              setCode(newCode)
              displayTable(dept.concat(newCode))
          }}>
            {codeOptions}
          </select>
        </div>
      
          {/* <p className='mt-4'>{dept} {code}</p> */}
        <div className='overflow-y-auto w-full'>
          <table className="w-full table-auto min-w-max text-slate-800 mt-16">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th>Course</th>
                <th>Institution</th>
              </tr>
            </thead>
            <tbody className='table-auto'>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
