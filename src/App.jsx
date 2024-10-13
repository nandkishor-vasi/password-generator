import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+{}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)  
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])
  
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md 
    rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-600 mt-40"> 
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        /> 
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
        Copy</button>
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className=' cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className=' flex text-sm gap-x-2'>
          <input 
          type="checkbox"
          defaultChecked = {numberAllowed}
          id='numberInput'
          onChange={() => {
            setNumberAllowed((prev) => !prev);  //callback vlaue allowed in set()..
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className=' flex text-sm gap-x-2'>
          <input 
          type="checkbox"
          defaultChecked= {charAllowed}
          id='charInput'
          onChange={() => {
            setCharAllowed((prev) => !prev);  //callback vlaue allowed in set()..
            }}
          />
          <label htmlFor='charInput'>Char</label>
        </div>
      </div>
    </div>
    <p className=' bottom-0  flex justify-center gap-1 pb-4 font-roboto '>
      Made with <span className='text-red-500'>&#9829;</span> by Nandkishor
    </p>
    </>
  )
}

export default App
