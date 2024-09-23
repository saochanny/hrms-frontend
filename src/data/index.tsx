import {
    MdEvent,
    MdOutlineNotificationsActive,
    MdOutlineSpaceDashboard,
    MdOutlineWifiProtectedSetup
} from "react-icons/md";
import {IoMdPeople} from "react-icons/io";
import {FaPersonRunning} from "react-icons/fa6";
import {IoDocumentTextOutline, IoSettingsOutline} from "react-icons/io5";
import {GrUserManager} from "react-icons/gr";
import {RiContractLine, RiMoneyPoundCircleLine} from "react-icons/ri";
import {SiGotomeeting} from "react-icons/si";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";
import {FcOvertime} from "react-icons/fc";
import {GoDot} from "react-icons/go";

export const menus = [
    {
        title: "Dashboard",
        icon: <MdOutlineSpaceDashboard className={'w-5 h-5'}/>,
        to: "/",
        description: "Dashboard",
    },
    {
        title: "Employees",
        icon: <IoMdPeople className={'w-5 h-5'}/>,
        to: "/employees",
        description: 'Employees Management'
    },
    {title: "Leaves", icon: <FaPersonRunning className={'w-5 h-5'}/>, to: "/leaves", description: 'Manage Leaves'},
    {
        title: "Settings ",
        icon: <IoSettingsOutline className={'w-5 h-5'}/>,
        to: "/setting",
        description: 'Settings',
    },
    {
        title: "Setup ",
        icon: <MdOutlineWifiProtectedSetup className={'w-5 h-5'}/>,
        to: "/setup",
        description: 'Setup',
        subMenu: [
            {
                title: "Roles",
                icon: <GoDot className={'w-5 h-5'}/>,
                to: "/roles",
                description: 'Roles Management',
            },
            {
                title: "Permissions",
                icon: <GoDot className={'w-5 h-5'}/>,
                to: "/permissions",
                description: 'Permissions Management',
            },
            {
                title: "Leave Type",
                icon: <GoDot className={'w-5 h-5'}/>,
                to: "/leave-type",
                description: 'Leave Type',
            }
        ]
    },
    {
        title: "Users Management",
        icon: <GrUserManager className={'w-5 h-5'}/>,
        to: "/users-management",
        description: 'Users Management'
    },
    {
        title: "Contract",
        icon: <RiContractLine className={'w-5 h-5'}/>,
        to: "/contracts",
        description: 'Contract Management'
    },
    {
        title: "Document",
        icon: <IoDocumentTextOutline className={'w-5 h-5'}/>,
        to: "/documents",
        description: 'Document Management'
    },
    {
        title: "AL Management ",
        icon: <IoSettingsOutline className={'w-5 h-5'}/>,
        to: "/al-management",
        description: 'Annual Leave Management'
    },
    {
        title: "Account ",
        icon: <RiMoneyPoundCircleLine className={'w-5 h-5'}/>,
        to: "/account",
        description: 'Account Management'
    },
    {title: "Meeting", icon: <SiGotomeeting className={'w-5 h-5'}/>, to: "/meeting", description: 'Meeting'},
    {
        title: "Project",
        icon: <AiOutlineFundProjectionScreen className={'w-5 h-5'}/>,
        to: "/project",
        description: 'Manage Projects'
    },
    {title: "Event", icon: <MdEvent className={'w-5 h-5'}/>, to: "/events", description: 'Manage Event'},
    {
        title: "Notification ",
        icon: <MdOutlineNotificationsActive className={'w-5 h-5'}/>,
        to: "/notifications",
        description: 'Notifications'
    },
    {
        title: "Overtime ",
        icon: <FcOvertime className={'w-5 h-5'}/>,
        to: "/overtimes",
        description: 'Working Overtime'
    },
];
