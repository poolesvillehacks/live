import React from 'react';

import './App.css';

function App() {
  return (
      <div className="App overflow-hidden">
          <div className="background flex flex-col align-center justify-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <p className="bg">POOLESVILLE</p>
              <p className="bg">POOLESVILLE</p>
              <p className="bg">POOLESVILLE</p>
              <p className="bg">POOLESVILLE</p>
              <p className="bg">POOLESVILLE</p>
          </div>
          <div className="box fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-blue w-[50%] h-[400px] border-2 flex flex-col items-center py-5 px-20 ">
              <h1 className="text-white font-bold text-3xl ">poolesville_hacks</h1>
              <label className='text-white font-light self-start'>EMAIL</label>
              <input className='w-[100%] h-12 text-white bg-transparent border-2 focus:rounded-none focus:outline-none p-2'></input>
              <button className='btn text-white border-2 h-12 px-10 mt-4'>Submit</button>
          </div>
      </div>
  );
}

export default App;
