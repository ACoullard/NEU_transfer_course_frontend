// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* Main div. Just centers*/}
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3x1' >Hello</h1>
        <button className='bg-gray-500 hover:bg-gray-400'>
          hello
        </button>
      </div>
    </div>
    </>
  )
}

export default App
