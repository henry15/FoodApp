import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate= useNavigate()
  const handleSubmit = async (e) => {
      e.preventDefault(); // study this
      let domain =  process.env.REACT_APP_DOMAINURL 
      const response = await fetch( domain +"/api/login", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: credentials.email, password: credentials.password
          })
      })
      const json = await response.json()
      console.log(json)

      if (!json.success){
          alert('enter valid credentials')
      }
      else{
        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authtoken",json.authtoken)
        console.log(json.authtoken)
        navigate("/")
      }
  }

  const onchange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
            <div className='container'>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/signup" className='m-3 btn btn-danger'>New user</Link> 
            </form>
        </div>

  )
}
