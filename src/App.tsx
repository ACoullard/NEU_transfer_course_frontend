import { useEffect, useState, useRef, ReactElement } from 'react'
import './App.css'

let firstRun = true
type ClassList = {[key:string]: string[]}

function fetchClassList() {
  // fetches the list of available NEU classes in dictionary form
  // classlist[department] = [code1, code2, ...]
  return {"ENG":["101"], "MATH":["1365", "2000", "101"]}
}


function buildOptions(optionsValues: string[]) {
  const deptOptions = []
  for(let i = 0; i < optionsValues.length; i++) {
    deptOptions.push(<option key={i}>{optionsValues[i]}</option>)
  }
  console.log(deptOptions)
  return deptOptions
}

function App() {

  const [dept, setDept] = useState('')
  const [code, setCode] = useState('')
  const classList = useRef<ClassList | null>(null)
  const [deptOptions, setDeptOptions] = useState<ReactElement[] | null>(null)
  let codeOptions = null

  // this only runs on the first render
  useEffect(() => {
    if (firstRun) {
      firstRun = false
      
      classList.current = fetchClassList()
      const departments = Object.keys(classList.current)

      setDeptOptions(buildOptions([''].concat(departments)))
    }
  }, [])

  if (dept == '' || classList.current == null){
    codeOptions = [<option key='0'></option>]
  } else {
    codeOptions = buildOptions(classList.current[dept])
  }

  return (
    <>
    {/* Main div. Just centers*/}
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3x1' >Hello, this is the NEU Reverse transfer class finder</h1>

        <select 
          value={dept}
          
          onChange={(e) => {
          setDept(e.target.value)
        }}>
          {deptOptions}
        </select>

        <select 
          value={code}
          
          onChange={(e) => {
          setCode(e.target.value)
        }}>
          {codeOptions}
        </select>
        <p className='mt-4'>{dept} {code}</p>
      </div>
    </div>
    </>
  )
}

export default App
