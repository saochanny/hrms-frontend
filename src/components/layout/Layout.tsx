import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useState} from "react";
import {RiLockPasswordLine, RiLogoutBoxRLine} from "react-icons/ri";

import {PopupMenu} from "react-simple-widgets";
import {CgProfile} from "react-icons/cg";
import {Service} from "../../api/Service.tsx";
import {MdMenu} from "react-icons/md";
import {menus} from "../../data";
import './layout.css';
import Breadcrumbs from "../../routes/Breadcrumbs.tsx";
import {TfiAngleRight} from "react-icons/tfi";
import React from "react";
import {useAuthentication} from "../../hooks/AuthContext.tsx";
import {getImage} from "../../utils/ImageUtils.ts";

export default function Layout() {
    const API = Service();
    const location = useLocation();
    const navigate = useNavigate();
    const [show, setShow] = useState<boolean>(true);

    const {user}= useAuthentication();

    const handleLogout = () => {
        API.logout().then((response) => {
            if (response.ok) {
                localStorage.removeItem('accessExpire');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('refreshExpire')
                window.location.href='/';
                console.log("logged out");
            } else {
                console.log("logout failed");
            }
        })
    }

    const hasContent=(to:string)=>{
        return location.pathname.includes(to) && to!=='/';
    }
    const getTitle = () => {
        const pathName = location.pathname.split('/');
        const last = pathName.slice(-1).pop();
        if (last === '') {
            return 'Dashboard';
        }
        if (last) {
            return pathName[1].charAt(0).toUpperCase() + pathName[1]?.slice(1);
        }

    }

    const [openMenu, setOpenMenu]=useState<{[key:number]:boolean}>({});

    const toggleSubMenu=(index:number)=>{
        setOpenMenu((prevState)=>({
            ...prevState, [index]: !prevState[index]
        }));

    }

    return (
        <div className={'w-full h-screen bg-white flex flex-wrap'}>
            <div
                className={`${show ? 'w-[18%]' : 'w-0'} menu-group h-screen bg-dark-blue flex flex-col items-center transition ease-in-out delay-100`}>
                <div className={'w-[95%] h-auto border-b-[1px] border-gray-200 flex items-center justify-center mb-3'}>
                    <img src={'src/assets/hrms-logo.png'} alt={'src/assets/hrms-logo.png'}
                         className={'w-[60px] m-3 cursor-pointer'} onClick={() => {
                        navigate('/');
                    }}/>
                </div>
                <div className={'h-screen overflow-scroll scroll-smooth w-full'}>
                    <ul className={'nav w-full h-auto flex flex-col gap-2 p-3'}>
                        {
                            menus.map((menu, index) => {
                                const subMenus = menu.subMenu;
                                return (
                                    <React.Fragment key={index}>
                                        {
                                            menu.subMenu ?
                                                <p key={index} onClick={() => {
                                                    toggleSubMenu(index)
                                                }}
                                                   className={`relative flex hover:bg-light-white text-[14px] p-3 flex-row gap-2.5 items-center text-gray-200 rounded-md justify-between`}>
                                                    <span className={'flex flex-row gap-2.5'}>{menu.icon}
                                                        {menu.title}</span>
                                                    <TfiAngleRight className={`text-md font-medium ${openMenu[index] && 'rotate-90'}`}/>
                                                </p>
                                                :
                                                <NavLink key={index} to={menu.to} end={true}
                                                         className={`relative flex hover:bg-light-white text-[14px] p-3 flex-row gap-2.5 items-center text-gray-200 rounded-md ${hasContent(menu.to) && 'active'}`}>
                                                    {menu.icon}
                                                    {menu.title}
                                                </NavLink>

                                        }
                                        {
                                            openMenu[index] &&
                                            <ul key={'submenu_' + index} className={'pl-8 gap-2.5 flex flex-col'}>
                                                {
                                                    subMenus?.map((sub, i) => {
                                                        return (
                                                            <NavLink key={'submenu_' + i} to={sub.to}
                                                                     end={true}
                                                                     className={`submenu flex hover:bg-light-white text-[14px] p-3 flex-row gap-2.5 items-center text-gray-200 rounded-md `}>
                                                                {sub.icon}
                                                                {sub.title}
                                                            </NavLink>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }

                                    </React.Fragment>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={`${show ? 'w-[82%]' : 'w-[100%]'} bg-gray-50 h-screen transition ease-in-out delay-100`}>
                <div
                    className={'header w-[100%] px-4 py-2 bg-white flex flex-row items-center justify-between shadow-xl'}>
                    <div className={'logo company flex flex-row gap-2 items-center justify-between'}>
                        <div className={'title flex flex-row text-left gap-1.5 font-medium'}>
                            <MdMenu className={'text-[24px] text-gray-600 mx-2 cursor-pointer'}
                                    onClick={() => {
                                        setShow(!show);
                                    }}/>
                            <p className={'text-md text-gray-800'}>
                            {getTitle()}
                            </p>
                        </div>
                    </div>
                    <PopupMenu>
                        <div className={'user nav flex flex-row items-center gap-4'}>
                            <div
                                className={'bg-gray-200 flex gap-1.5 items-center flex-row-reverse cursor-pointer rounded-md px-2 p-1.5'}>
                                <img src={getImage(user?.image as string)}
                                     className={'w-9 h-9 rounded-full object-cover border-b-gray-400 border-1'}/>
                                <div className={'username flex flex-col'}>
                                <span className={'text-[13px] font-semibold text-gray-600'}>
                                    {user?.firstName} {user?.lastName}
                                </span>
                                    <span className={'text-gray-500 text-[12px]'}>
                                    {user?.authorities[0]}
                                </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={'absolute right-[-120px] top-[40px] w-[190px] h-auto mt-2 py-2 px-1 bg-white border rounded-lg shadow-xl z-50'}>
                            <div
                                className={'transition-colors flex flex-row gap-1.5 justify-start items-center duration-200 px-4 py-2 text-sm text-gray-700 rounded hover:text-gray-800 z-50 hover:bg-gray-200 cursor-pointer'}>
                                <CgProfile className={'w-[20px] h-[20px]'}/>
                                <span className={'inline-block'}>Profile</span>
                            </div>
                            <div className={'py-1.5'}>
                                <hr/>
                            </div>
                            <div
                                className={'transition-colors flex flex-row gap-1.5 justify-start items-center duration-200 px-4 py-2 text-sm text-gray-700 rounded hover:text-gray-800 z-50 hover:bg-gray-200 cursor-pointer'}>
                                <RiLockPasswordLine className={'w-[20px] h-[20px]'}/>
                                <span className={'inline-block'}>Change Password</span>
                            </div>
                            <div className={'py-1.5'}>
                                <hr/>
                            </div>
                            <div onClick={handleLogout}
                                 className={'transition-colors flex flex-row gap-1.5 justify-start items-center duration-200 px-4 py-2 text-sm text-gray-700 rounded hover:text-gray-800 z-50 hover:bg-gray-200 cursor-pointer'}>
                                <RiLogoutBoxRLine className={'w-[20px] h-[20px]'}/>
                                <span className={'inline-block'}>Logout</span>
                            </div>

                        </div>
                    </PopupMenu>

                </div>
                <div
                    className={'p-1.5 pb-0 w-full bg-slate-100 h-[calc(100vh-65.5px)] shadow-md overflow-scroll scroll-smooth'}>
                    <Breadcrumbs/>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}