import React from 'react'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import { faArrowDown, faCar,faPlusCircle,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu } from './ui/dropdown-menu'
import { DropdownMenuDemo } from './Drop-down-menu'
import { ModeToggle } from './ui/mode-toggle'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className='  flex flex-row width-full h-16 border border-black items-center justify-between px-2 md:px-10 '>
        <div className="flex items-center justify-center md:hidden">
        <DropdownMenuDemo/>
        </div>
        <div className="logo">
            <div className="img">
                <Link to={"/"}><img className='border border-black h-[60px] w-[100px]'  src="./src/assets/Capture-removebg-preview.png"   alt="" />
                </Link>
            </div>
        </div>
        <div className="nav border md:mr-2 border-black">
            <nav className='h-full'>
                <ul className='flex  border border-black h-full gap-4 md:gap-10 items-center justify-center'>
                    <li className='border  md:flex border-black'><ModeToggle/></li>
                    <li className='border border-black'><Link to="/search-ride"> <FontAwesomeIcon icon={faCar} size='lg'/> <span className='hidden md:inline'>Search Ride</span></Link ></li>
                    <li className='border border-black'><Link to="/create-ride"> <FontAwesomeIcon icon={faPlusCircle} size='lg' /><span className='hidden md:inline'>Publish Ride</span></Link></li>
                    <li className='border hidden md:flex border-black'><DropdownMenuDemo/></li>
                

                </ul>
            </nav>
        </div>
    </header>
  )
}


export default Header