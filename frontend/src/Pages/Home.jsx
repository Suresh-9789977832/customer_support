import React, { useEffect } from 'react'
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';


const Home = ({data,setdata}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");

  const role = data.role === "admin" ? "admin" : "user";

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
    setUploaded(false);
    setUploadError("");
  };

     const getuserdata = async () => {
    try {
      const token = localStorage.getItem("Token");

      const res = await axios.get("http://localhost:5000/auth/getprofile",
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

  
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploaded(false);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:5000/api/upload", formData);
      console.log(res.data);
      setUploaded(true);
    } catch (err) {
      console.error(err);
      setUploadError("Couldn't take in that file. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const uploadquestion = async () => {
    if (!question.trim() || asking) return;
    setAsking(true);
    setAskError("");
    try {
      const res = await axios.post("http://localhost:5000/api/chat", { question });
      const response = res.data.answer;
      const cleanAnswer = response.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
      setAnswer(cleanAnswer);
    } catch (error) {
      console.error(error);
      setAskError("The desk came back empty-handed. Try asking again.");
    } finally {
      setAsking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") uploadquestion();
  };

  




  return (
    <div>
         <Navbar data={data} setdata={setdata}/> 
          
        <div className="max-w-5xl mx-auto px-6 py-16">

       
        <header className="mb-12">
        
         {
          role == 'user' ? 

           <h1 className="rd-display text-4xl sm:text-5xl leading-tight">
            Ask Anything About Our Products and Services.
          </h1>
          :
           <h1 className="rd-display text-4xl sm:text-5xl leading-tight">
            Upload Documents and Enable AI-Powered Customer Support.
          </h1>
         }
      
        </header>

        <div className="grid grid-cols-1  gap-8">

        {role == 'admin' ? 
         <section className="md:col-span-2">
            <div className="rd-card rounded-sm p-6 h-full flex flex-col">
              <h2 className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-4">
              </h2>

              <label
                htmlFor="rd-file"
                className="rd-dropzone rounded-sm flex-1 flex flex-col items-center justify-center text-center px-4 py-10 cursor-pointer"
                tabIndex={0}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-3 text-[var(--ink-soft)]">
                  <path d="M12 3v12m0-12 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {fileName ? (
                  <span className="rd-mono text-sm break-all">{fileName}</span>
                ) : (
                  <>
                    <span className="text-sm text-[var(--ink)]">Drop a file, or click to browse</span>
                    <span className="text-xs text-[var(--ink-soft)] mt-1">PDF, DOCX, or TXT</span>
                  </>
                )}
                <input id="rd-file" type="file" onChange={handleFileChange} className="sr-only" />
              </label>

              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="rd-btn rounded-sm mt-5 px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <span className="rd-leaves">
                      <span className="rd-leaf"></span>
                      <span className="rd-leaf"></span>
                      <span className="rd-leaf"></span>
                    </span>
                    Taking it in…
                  </>
                ) : (
                  "Upload"
                )}
              </button>

              {uploaded && (
                <div className="mt-5 flex items-center justify-center">
                  <span className="rd-stamp rd-mono text-xs uppercase px-3 py-1 rounded-sm">
                    Received
                  </span>
                </div>
              )}

              {uploadError && (
                <p className="mt-4 text-sm text-[var(--rust)]">{uploadError}</p>
              )}
            </div>
          </section>
          :
          ""
      }
         
        {
          role == 'user' ? 
          <section className="md:col-span-3">
            <div className="rd-card rounded-sm p-6">
              <h2 className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-4">
                Ask Question
              </h2>

              <div className="flex items-start gap-3">
                <span className="rd-display text-2xl text-[var(--teal)] leading-none pt-1.5">Q.</span>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Anything About Our Products..."
                  className="rd-input rounded-sm flex-1 px-3 py-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end mt-3">
                <button
                  onClick={uploadquestion}
                  disabled={!question.trim() || asking}
                  className="rd-btn rounded-sm px-4 py-2 text-sm font-medium flex items-center gap-2"
                >
                  {asking ? (
                    <>
                      <span className="rd-leaves">
                        <span className="rd-leaf"></span>
                        <span className="rd-leaf"></span>
                        <span className="rd-leaf"></span>
                      </span>
                      Reading…
                    </>
                  ) : (
                    "Get Answer"
                  )}
                </button>
              </div>

              {askError && (
                <p className="mt-4 text-sm text-[var(--rust)]">{askError}</p>
              )}

              {/* Answer card */}
              {(answer || asking) && (
                <div className="rd-perforated bg-[var(--paper-dark)] rounded-sm mt-6 pl-7 pr-5 py-5">
                  <span className="rd-display text-2xl text-[var(--rust)] leading-none">A.</span>
                  <div className="mt-2 text-sm leading-relaxed whitespace-pre-line">
                    {asking ? (
                      <span className="text-[var(--ink-soft)] rd-mono text-xs inline-flex items-center gap-2">
                        <span className="rd-leaves">
                          <span className="rd-leaf"></span>
                          <span className="rd-leaf"></span>
                          <span className="rd-leaf"></span>
                        </span>
                        Consulting the pages…
                      </span>
                    ) : (
                      <span className="rd-fade-in">{answer}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
          :
          ""
        }
          

        </div>
      </div>
    </div>
  )
}

export default Home