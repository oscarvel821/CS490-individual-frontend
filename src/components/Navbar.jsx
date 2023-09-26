import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';

const NavBar = () => {

    const [nav, setNav] = useState(true);
    const handleNav = () => {
        setNav(!nav);
    }
    return(
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
            <h1 className="w-full text-3xl font-bold text-[#FF7F50]">Sakila.</h1>
            <ul className="hidden md:flex">
                <li className="p-4 text-lg font-medium"><Link to='/'>Home</Link></li>
                <li className="p-4 text-lg font-medium"><Link to='/movies'>Movies</Link></li>
                <li className="p-4 text-lg font-medium"><Link to='/customers'>Customers</Link></li>
            </ul>
            <div onClick={handleNav} className="block md:hidden">
                {!nav ? <AiOutlineClose/> : <AiOutlineMenu/>}
            </div>
            <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-200 bg-white ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <h1 className="w-full text-3xl font-bold text-[#FF7F50] m-4">Sakila.</h1>
                <ul className="p-4 uppercase">
                <li className="p-4 border-b border-gray-200"><Link to='/'>Home</Link></li>
                <li className="p-4 border-b border-gray-200"><Link to='/movies'>Movies</Link></li>
                <li className="p-4 border-b border-gray-200"><Link to='/customers'>Customers</Link></li> 
                </ul>
            </div>
        </div>

    )
}

export default NavBar