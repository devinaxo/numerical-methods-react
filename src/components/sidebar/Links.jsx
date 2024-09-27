/* eslint-disable */
import { SidebarCollapse, SidebarDropdown, SidebarDropdownList, SidebarItem } from "keep-react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export function SidebarLinks(props) {

    let location = useLocation();

    const { routes } = props;

    // Verifica si la ruta actual es la misma que la ruta pasada
    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    };


    const createLinks = (routes, prefix = '/') => {
        return routes.map((route, index) => {
            return (

                route.innerRoutes ? createDropdownLinks(route, prefix) : createItemLink(route, prefix)
            );
        }
        );
    };


    const createDropdownLinks = (route, prefix = '/') => {

        const [isOpen, setIsOpen] = useState(false);
        const toggleDropdown = () => setIsOpen(!isOpen);

        return <SidebarItem dropdown key={prefix + route.path}>
            <SidebarDropdown>
                <SidebarCollapse
                    className={`mb-4 flex hover:cursor-pointer ${activeRoute(prefix + route.path) ? 'bg-primary/30 font-bold text-sm hover:!bg-primary hover:font-extrabold' : 'font-bold text-sm hover:!bg-primary hover:font-extrabold'}`}>
                    <Link key={prefix + route.path} to={prefix + route.path}>
                        <div className="flex items-center gap-3">
                            {route.icon ? route.icon : <p>Sin icono</p>}
                            {route.name}
                        </div>
                    </Link>
                    <span onClick={toggleDropdown} className="flex-grow flex justify-end">
                        <FaAngleDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={22} />
                    </span>
                </SidebarCollapse>
                <SidebarDropdownList>
                    {createLinks(route.innerRoutes, prefix + route.path + '/')}
                </SidebarDropdownList>
            </SidebarDropdown>
        </SidebarItem>
    }

    const createItemLink = (route, prefix = '/') => {
        return (
            <Link key={prefix + route.path} to={prefix + route.path}>
                <SidebarItem className={`mb-4 flex hover:cursor-pointer ${activeRoute(prefix + route.path) ? 'bg-primary/30 font-bold text-sm hover:!bg-primary hover:font-extrabold' : 'font-bold text-sm hover:!bg-primary hover:font-extrabold'}`}>
                    {route.icon ? route.icon : <p>Sin icono</p>}
                    <p>
                        {route.name}
                    </p>
                </SidebarItem>
            </Link>
        );
    }
    // BRAND
    return createLinks(routes);
}

export default SidebarLinks;