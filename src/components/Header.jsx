import React, { useState } from 'react'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion'
import {FaShoppingBasket} from 'react-icons/fa'
import {MdAdd , MdLogout} from 'react-icons/md'
import { Link } from 'react-router-dom'


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase.config'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

const Header = () => {

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider(); 

    const [ismenu, setIsmenu] = useState(false);


    const login = async ()=>{
        if(!user){
            const {
              user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
              type: actionType.SET_USER,
              user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        }else{
            setIsmenu(!ismenu);
        }
    }
    const logout = ()=>{
        setIsmenu(false)
        localStorage.clear()

        dispatch({
            type:actionType.SET_USER,
            user:null
        })
    }

      const showCart = () => {
        dispatch({
          type: actionType.SET_CART_SHOW,
          cartShow: !cartShow,
        });
      };

  return (
    <div className=" fixed z-50 w-screen  bg-primary p-2 px-4 md:p-4 md:px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center  justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor font-bold text-xl">Foodie</p>
        </Link>
        <div className="flex gap-8 items-center">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Services
            </li>
            <li className="text-base text-textColor hover:text-headingColor transition-all ease-in-out duration-100 cursor-pointer">
              Home
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center  "
            onClick={showCart}
          >
            <FaShoppingBasket className=" text-textColor text-2xl " />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className=" text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full  "
              alt="user"
              onClick={login}
            />
            {ismenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-40 flex flex-col absolute right-0 bg-gray-50 shadow-xl rounded-lg "
              >
                {user && user.email === "rohitsaha372@gmail.com" && (
                  <Link to="/createItem">
                    <p
                      className="flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsmenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex justify-between items-center md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center "
          onClick={showCart}
        >
          <FaShoppingBasket className=" text-textColor text-2xl " />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className=" text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor font-bold text-xl">Foodie</p>
        </Link>
        <div className="relative ">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full  "
            alt="user"
            onClick={login}
          />
          {ismenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" w-40 flex flex-col absolute right-0 bg-gray-50 shadow-xl rounded-lg "
            >
              {user && user.email === "rohitsaha372@gmail.com" && (
                <Link to="/createItem">
                  <p
                    className="flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsmenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col    ">
                <li
                  className=" px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-300 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={() => setIsmenu(false)}
                >
                  Menu
                </li>
                <li
                  className=" px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-300 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={() => setIsmenu(false)}
                >
                  About Us
                </li>
                <li
                  className=" px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-300 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={() => setIsmenu(false)}
                >
                  Services
                </li>
                <li
                  className=" px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-300 transition-all ease-in-out duration-100 cursor-pointer"
                  onClick={() => setIsmenu(false)}
                >
                  Home
                </li>
              </ul>
              <p
                className="flex items-center justify-center m-2 p-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base bg-slate-200 rounded-md shadow-md"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header