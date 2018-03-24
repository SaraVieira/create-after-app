import React from 'react'
import logo from '../assets/react.svg'
import { Link } from 'react-router-dom'
import './header.css'

export default () => (
  <header className="header">
    <img className="logo" src={logo} alt="logo" />
    <h2>Welcome to After.js</h2>
    <Link className="link" to="/">Home</Link>
    <Link className="link" to="/about">About</Link>
  </header>
)
