import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({data,setdata}) => {

    let navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem('Token')
        setdata('')
        navigate('/login')
    }

  return (
    <div>
        <div className="navbar  shadow-sm bg-[#EDEBE2]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl"> <h6>Welcome {data.username}</h6></a>
  </div>
  <div className="navbar-end">
       <button type='button' className="btn btn-outline btn-error" onClick={logout}>Logout</button>


  </div>
</div>

    </div>
  )
}

export default Navbar