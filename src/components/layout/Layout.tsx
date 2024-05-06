import {Link, Outlet} from "react-router-dom";
import {
    MdEvent,
    MdOutlineNotificationsActive,
    MdOutlineSpaceDashboard,
    MdOutlineWifiProtectedSetup
} from "react-icons/md";
import {IoMdPeople} from "react-icons/io";
import {FaPersonRunning} from "react-icons/fa6";
import {IoDocumentTextOutline, IoSettingsOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {GrUserManager} from "react-icons/gr";
import {RiContractLine, RiLockPasswordLine, RiLogoutBoxRLine, RiMoneyPoundCircleLine} from "react-icons/ri";
import {SiGotomeeting} from "react-icons/si";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";
import {FcOvertime} from "react-icons/fc";
import {PopupMenu} from "react-simple-widgets";
import {CgProfile} from "react-icons/cg";
import {Service} from "../../api/Service.tsx";

export default function Layout() {
    const API=Service();

    const Menus = [
        {title: "Dashboard", icon: <MdOutlineSpaceDashboard className={'w-5 h-5'}/>, to: "/dashboard"},
        {title: "Employees", icon: <IoMdPeople className={'w-5 h-5'}/>, to: "/employees"},
        {title: "Leaves", icon: <FaPersonRunning className={'w-5 h-5'}/>, to: "/leaves"},
        {title: "Settings ", icon: <IoSettingsOutline className={'w-5 h-5'}/>, to: "/setting"},
        {title: "Setup ", icon: <MdOutlineWifiProtectedSetup className={'w-5 h-5'}/>, to: "/setup"},
        {title: "Users Management", icon: <GrUserManager className={'w-5 h-5'}/>, to: "/users-management"},
        {title: "Contract", icon: <RiContractLine className={'w-5 h-5'}/>, to: "/contracts"},
        {title: "Document", icon: <IoDocumentTextOutline className={'w-5 h-5'}/>, to: "/documents"},
        {title: "AL Management ", icon: <IoSettingsOutline className={'w-5 h-5'}/>, to: "/al-management"},
        {title: "Account ", icon: <RiMoneyPoundCircleLine className={'w-5 h-5'}/>, to: "/account"},
        {title: "Meeting", icon: <SiGotomeeting className={'w-5 h-5'}/>, to: "/meeting"},
        {title: "Project", icon: <AiOutlineFundProjectionScreen className={'w-5 h-5'}/>, to: "/project"},
        {title: "Event", icon: <MdEvent className={'w-5 h-5'}/>, to: "/events"},
        {title: "Notification ", icon: <MdOutlineNotificationsActive className={'w-5 h-5'}/>, to: "/notifications"},
        {title: "Overtime ", icon: <FcOvertime className={'w-5 h-5'}/>, to: "/overtimes"},
    ];


    const [activeMenu, setActiveMenu] = useState("");
    useEffect(() => {
        const pathName = window.location.pathname;
        if (pathName === "/") {
            setActiveMenu("/dashboard");
        } else {
            setActiveMenu(pathName);
        }
    }, []);

    const handleLogout=()=>{
        API.logout().then((response)=>{
            if(response.ok){
                localStorage.removeItem('accessExpire');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('refreshExpire')
                window.location.reload();
                console.log("logged out");
            }
            else {
                console.log("logout failed");
            }
        })
    }


    return (
        <div className={'w-full h-screen bg-sky-50 flex flex-wrap'}>
            <div className={`w-[16%] h-full bg-dark-blue p-4 overflow-scroll scroll-smooth`}>
                <ul className={'nav w-full h-auto flex flex-col gap-2.5'}>
                    {
                        Menus.map((menu, index) => {
                            return (
                                <Link onClick={() => {
                                    setActiveMenu(menu.to);
                                }} key={index} to={menu.to}
                                      className={`flex ${activeMenu === menu.to ? 'bg-blue-800' : 'hover:bg-light-white'} text-[14px] p-2 py-2.5 flex-row gap-2.5 items-center text-gray-200 rounded-lg `}>
                                    {menu.icon}
                                    {menu.title}
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={`w-[84%] bg-white h-screen`}>
                <div
                    className={'header w-[100%] px-4 py-2 bg-white flex flex-row items-center justify-between shadow-md'}>
                    <div className={'logo company flex flex-row gap-2 items-center justify-between cursor-pointer'}
                         onClick={() => {
                             window.location.href = "/";
                         }}>
                        <img src={'src/assets/hrms-logo.png'} alt={'src/assets/hrms-logo.png'} className={'w-[40px] '}/>
                        <div className={'title flex flex-col text-left'}>
                            <p className={'text-sm text-gray-700'}>
                                HR Management System
                            </p>
                            <span className={'text-[12px] text-gray-500'}>Manage your business</span>
                        </div>
                    </div>
                    <PopupMenu>
                        <div className={'user nav flex flex-row items-center gap-4'}>
                            <div
                                className={'bg-gray-200 flex gap-1.5 items-center flex-row-reverse cursor-pointer rounded-md px-2 p-1.5'}>
                                <img src={'src/assets/avatar.webp'} alt={'src/assets/avatar.webp'}
                                     className={'w-9 h-9 rounded-full object-cover border-b-gray-400 border-1'}/>
                                <div className={'username flex flex-col'}>
                                <span className={'text-[13px] font-semibold text-gray-600'}>
                                    Channy SAO
                                </span>
                                    <span className={'text-gray-500 text-[12px]'}>
                                    Admin
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
                <div className={'p-1.5 pb-0 w-full bg-transparent h-[calc(100vh-65.5px)] shadow-md overflow-scroll scroll-smooth'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}