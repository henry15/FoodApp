import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Cart from '../screens/Cart';
//import {createPortal} from 'react-dom'
import Model from '../Model'
import { useCart } from './ContextReducer'

export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authtoken")
    navigate("/login")
  }

  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart()

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MernFoodApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

            <ul className="navbar-nav me-auto mb-2">
              <li>
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authtoken")) ?
                <li>
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li>
                : ""
              }
            </ul>

            {(!localStorage.getItem("authtoken")) ?
              <form className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
              </form>
              :
              <div>
                <div className='btn bg-white text-succes mx-2' onClick={() => setCartView(true)}>My Cart {" "}
                  <Badge pill bg='danger'>{items.length}</Badge>
                </div>
                {cartView && (
                  <Model onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Model>
                )}
                <button className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout </button>
              </div>
            }
          </div>

        </div>
      </nav>

    </div>
  )
}
