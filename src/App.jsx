import { useState, useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [upperAllowed, setUpperAllowed] = useState(true);
  const [lowerAllowed, setLowerAllowed] = useState(true);
  const [noRepeat, setNoRepeat] = useState(false);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    // Allow inclusion of uppercase and lowercase letters separately
    if (upperAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowerAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]~`";

    // Avoid ambiguous characters if selected
    if (avoidAmbiguous) str = str.replace(/[O0Il|]/g, "");

    if (noRepeat && str.length < length) {
      console.error("Not enough unique characters for selected length");
      return;
    }

    let usedChars = new Set();

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      let char = str.charAt(charIndex);

      // Avoid repeated characters
      if (noRepeat) {
        while (usedChars.has(char)) {
          charIndex = Math.floor(Math.random() * str.length);
          char = str.charAt(charIndex);
        }
        usedChars.add(char);
      }

      pass += char;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, upperAllowed, lowerAllowed, noRepeat, avoidAmbiguous]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const handleGeneratePassword = () => {
    passwordGenerator();
  };
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
        <div className=' flex flex-wrap grid-flow-col text-sm gap-x-4'>
          <div className='flex text-sm gap-x-4'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className=' cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label>Length: {length}</label>
            </div>
            <div className=' flex text-sm gap-x-2'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
          </div>
          <div className=' text-sm gap-x-4 mt-2'>
            <div className=' flex text-sm gap-x-2'>
              <input
                type="checkbox"
                defaultChecked={upperAllowed}
                id='upperInput'
                onChange={() => {
                  setUpperAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='upperInput'>Uppercase</label>
            </div>
            <div className=' flex text-sm gap-x-2'>
              <input
                type="checkbox"
                defaultChecked={lowerAllowed}
                id='lowerInput'
                onChange={() => {
                  setLowerAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='lowerInput'>Lowercase</label>
            </div>
          </div>
          <div className='flex text-sm gap-x-4 mt-2'>
            <div className=' flex text-sm gap-x-2'>
              <input
                type="checkbox"
                defaultChecked={noRepeat}
                id='repeatInput'
                onChange={() => {
                  setNoRepeat((prev) => !prev);
                }}
              />
              <label htmlFor='repeatInput'>Avoid Repeating Characters</label>
            </div>
            <div className=' flex text-sm gap-x-2'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id='charInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='charInput'>Special Characters</label>
            </div>
            <div className=' flex text-sm gap-x-2'>
              <input
                type="checkbox"
                defaultChecked={avoidAmbiguous}
                id='ambiguousInput'
                onChange={() => {
                  setAvoidAmbiguous((prev) => !prev);
                }}
              />
              <label htmlFor='ambiguousInput'>Avoid Ambiguous Characters</label>
            </div>
          </div>
          <div className='w-full flex flex-wrap justify-center text-cyan-50'>
            <button onClick={handleGeneratePassword} className="generator__btn bg-blue-700 px-4 py-1 ">
              Generate Password
            </button>
          </div>
        </div>
      </div>
      <p className=' bottom-0  flex justify-center gap-1 pb-4 font-roboto '>
        Made with <span className='text-red-500'>&#9829;</span> by Nandkishor
      </p>
    </>
  )
}

export default App;
