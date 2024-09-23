import {Link, useLocation, useParams} from "react-router-dom";
import {TfiAngleRight} from "react-icons/tfi";
import {IoHome} from "react-icons/io5";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter(x => x);
    const {id}=useParams();
    return (
        pathNames.length > 0 &&
        <nav className={'flex flex-row text-gray-600 font-normal py-2 px-1 pt-1'}>
            <ul className={'flex flex-row text-md'}>
                <li key={'Home'} className={'text-blue-700 hover:underline'}>
                    <Link to={'/'} className={'flex flex-row items-center gap-1.5'}>
                        <IoHome/>
                        Home
                    </Link>
                </li>

                {
                    pathNames.map((path, index) => {
                        const last = index === pathNames.length - 1;
                        const beforeLast= index===pathNames.length-2;
                        const to = `/${pathNames.slice(0, index + 1).join("/")}`;
                        const title = path.charAt(0).toUpperCase() + path.slice(1);
                        return (
                            path !== id ?
                                <li key={to} className={'flex flex-row items-center'}>
                                    {/*<span className={'mx-2'}></span>*/}
                                    <TfiAngleRight className={'mx-2'}/>
                                    {
                                        last || (beforeLast && pathNames.includes(id as string))?
                                            <span key={index}>{title}</span>
                                            :
                                            <Link key={index} className={'text-blue-700'} to={to}>
                                                {title}
                                            </Link>

                                    }

                                </li>
                                :
                                null

                        )
                    })
                }
            </ul>
        </nav>
    )
}
export default Breadcrumbs;