import { useEffect, useState } from "react";
import axios from "axios";
import {Routes,Route} from 'react-router-dom'
import Signup from "./Pages/Signup";
import Login from "./Pages/Login"
import Home from "./Pages/Home";



function App() {

    const [data,setdata] = useState()


        const getuserdata = async () => {
    try {
      const token = localStorage.getItem("Token");

      const res = await axios.get("https://askmydocs-7zjl.onrender.com/auth/getprofile",
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      setdata(res.data.user)
      console.log(res.data.user)
    } catch (err) {
      console.error(err);
    } finally {

    }
  };

  useEffect(()=>{
    getuserdata();
  },[])



  return (
    <div className="rd-root min-h-screen">
       
        <Routes>
        <Route path="/" element={data? <Home setdata={setdata} data={data}/> : <Login setdata={setdata} data={data}/>}/>
       <Route path="/login" element={data?<Home setdata={setdata} data={data}/> : <Login setdata={setdata} data={data}/>}/>
      <Route path="/signup" element={data ? <Home setdata={setdata} data={data}/> : <Signup setdata={setdata} data={data}/>}/>
    </Routes>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .rd-root {
          --paper: #EDEBE2;
          --paper-card: #F5F3EC;
          --paper-dark: #E1DCCC;
          --ink: #1C2321;
          --ink-soft: #5B6360;
          --teal: #2F6F5E;
          --teal-dark: #204B3F;
          --rust: #B8501E;
          --rule: #C9C3B4;

          background-color: var(--paper);
          background-image:
            repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 3px);
          color: var(--ink);
          font-family: 'Work Sans', sans-serif;
        }

        .rd-display { font-family: 'Fraunces', serif; }
        .rd-mono { font-family: 'IBM Plex Mono', monospace; }

        .rd-eyebrow {
          letter-spacing: 0.18em;
          font-size: 0.72rem;
        }

        .rd-card {
          background: var(--paper-card);
          border: 1px solid var(--rule);
          box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 12px 24px -16px rgba(28,35,33,0.25);
        }

        .rd-dropzone {
          border: 1.5px dashed var(--rule);
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .rd-dropzone:hover {
          border-color: var(--teal);
          background-color: rgba(47,111,94,0.04);
        }

        .rd-btn {
          background: var(--ink);
          color: var(--paper-card);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .rd-btn:hover:not(:disabled) {
          background: var(--teal-dark);
          transform: translateY(-1px);
        }
        .rd-btn:active:not(:disabled) {
          transform: translateY(0px);
        }
        .rd-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .rd-btn:focus-visible, .rd-input:focus-visible, .rd-dropzone:focus-visible {
          outline: 2px solid var(--teal);
          outline-offset: 2px;
        }

        .rd-input {
          background: var(--paper-card);
          border: 1px solid var(--rule);
        }
        .rd-input:focus {
          border-color: var(--teal);
          outline: none;
        }

        /* Perforated left edge on the answer card, like a library slip */
        .rd-perforated {
          position: relative;
        }
        .rd-perforated::before {
          content: "";
          position: absolute;
          left: -1px;
          top: 0;
          bottom: 0;
          width: 14px;
          background-image: radial-gradient(circle at 7px 10px, var(--paper) 3.5px, transparent 4px);
          background-size: 14px 20px;
          background-repeat: repeat-y;
        }

        /* Stamp mark shown once a file is received */
        .rd-stamp {
          border: 2px solid var(--rust);
          color: var(--rust);
          transform: rotate(-7deg);
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.08em;
          animation: rd-stamp-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes rd-stamp-in {
          0% { opacity: 0; transform: rotate(-7deg) scale(1.7); }
          60% { opacity: 1; transform: rotate(-7deg) scale(0.94); }
          100% { opacity: 1; transform: rotate(-7deg) scale(1); }
        }

        /* Page-turn loader: three "leaves" flipping in sequence */
        .rd-leaves {
          display: inline-flex;
          gap: 5px;
          align-items: flex-end;
          height: 16px;
        }
        .rd-leaf {
          width: 6px;
          height: 14px;
          background: var(--teal);
          border-radius: 1px;
          transform-origin: bottom center;
          animation: rd-leaf-flip 1.1s ease-in-out infinite;
        }
        .rd-leaf:nth-child(2) { animation-delay: 0.15s; }
        .rd-leaf:nth-child(3) { animation-delay: 0.3s; }
        @keyframes rd-leaf-flip {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        .rd-fade-in {
          animation: rd-fade-in 0.4s ease;
        }
        @keyframes rd-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-leaf, .rd-stamp, .rd-fade-in {
            animation: none !important;
          }
        }
      `}</style>

      
    </div>
  );
}

export default App;
