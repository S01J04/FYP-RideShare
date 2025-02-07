import React, { useEffect, useRef, useState } from 'react'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import { faArrowDown, faCar,faPlusCircle,faSearch,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu } from './ui/dropdown-menu'
import { DropdownMenuDemo } from './Drop-down-menu'
import { ModeToggle } from './ui/mode-toggle'
import {TbCirclePlus} from 'react-icons/tb'
import { Link } from 'react-router'
import { useWindowScroll } from "react-use";
import clsx from "clsx";
import gsap from "gsap";
import { useTheme } from './theme-provider'

const Header = () => {
    const navContainerRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        if (currentScrollY === 0) {
          // Topmost position: show navbar without floating-nav
          setIsNavVisible(true);
          navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down: hide navbar and apply floating-nav
          setIsNavVisible(false);
          navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up: show navbar with floating-nav
          setIsNavVisible(true);
          navContainerRef.current.classList.add("floating-nav");
        }
    
        setLastScrollY(currentScrollY);
      }, [currentScrollY, lastScrollY]);
    
      useEffect(() => {
        gsap.to(navContainerRef.current, {
          y: isNavVisible ? 0 : -100,
          opacity: isNavVisible ? 1 : 0,
          duration: 0.2,
        });
      }, [isNavVisible]);
      const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme(); // Assumes 'light' or 'dark'

  // Add a scroll listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set `isScrolled` to true if scrolled
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine color dynamically
  const dynamicColor = isScrolled || theme === "dark" ? "white" : "#00AFF5";

  return (
    <div >
      <header ref={navContainerRef} className=' fixed z-50 inset-x-0  flex flex-row width-full h-16 mx-5 md:mt-3  -black items-center justify-between px-2 md:px-10 '>
        <div className="flex items-center justify-center md:hidden">
        <DropdownMenuDemo color={dynamicColor} />
        </div>
        <div className="logo">
            <div className="img font-bold text-heading  sm:text-2xl md:text-3xl ">
                <Link  to={"/"}><b>Ride <span className=' text-subtext '>Share</span></b>
                </Link>
            </div>
        </div>
        <div className="nav  md:mr-2 -black">
            <nav className='h-full'>
            <ul className="flex h-full gap-4 md:gap-10 items-center justify-center">
      {/* Mode Toggle */}
      <li className="md:flex">
        <ModeToggle />
      </li>

      {/* Search Ride */}
      <li>
        <Link to="/search-ride" className="md:flex gap-1 items-center">
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            style={{
              color: dynamicColor,
              transition: "color 0.3s ease-in-out", // Add smooth transition for color
            }}
          />
          <span
            className="hidden md:inline"
            style={{
              color: dynamicColor,
              transition: "color 0.3s ease-in-out", // Smooth transition for text color
            }}
          >
            Search
          </span>
        </Link>
      </li>

      {/* Publish Ride */}
      <li>
        <Link to="/create-ride" className="md:flex gap-1 items-center">
          <TbCirclePlus
            size={"1.6rem"}
            style={{
              color: dynamicColor,
              transition: "color 0.3s ease-in-out", // Add smooth transition for color
            }}
        
          />
          <span
            className="hidden md:inline"
            style={{
              color: dynamicColor,
              transition: "color 0.3s ease-in-out", // Smooth transition for text color
            }}
          >
            Publish a Ride
          </span>
        </Link>
      </li>

      {/* Dropdown Menu */}
      <li className="hidden md:flex">
        <DropdownMenuDemo color={dynamicColor} />
      </li>
    </ul>
            </nav>
        </div>
    </header>
    <div className='h-14 bg-transparent   '></div>
    </div>
  )
}


export default Header