import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {

  const menuItems = [
    {
      name: 'Home',
      href: '#',
    },
    {
      name: 'About',
      href: '#',
    },
    {
      name: 'Contact',
      href: '#',
    },
  ]
  return (
    <div className="relative w-full bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
        <Link to='/' className="font-bold text-2xl">Books</Link>
        

        </div>
        <Link to='/order' className="font-bold text-2xl">Orders</Link>

    <Link to='/profile'>
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
          alt="Dan_Abromov"
        />
    </Link>
      </div>
    </div>
  )
}

export default Nav