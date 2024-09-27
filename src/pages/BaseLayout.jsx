import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SidebarComponent } from "../components/sidebar/Sidebar";
import { routes, getRoutes } from "../utils/routes";
import { Home } from "./home/Home";

export const BaseLayout = () => {

    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState("home");

    useEffect(() => {
        getActiveRoute(routes);
    }, [location.pathname]);

    const getActiveRoute = (routes) => {
        let activeRoute = "home";
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(
                    routes[i].layout + "/" + routes[i].path
                ) !== -1
            ) {
                setCurrentRoute(routes[i].name);
            }
        }
        return activeRoute;
    };

    return (
        <div className="flex min-h-screen bg-metal-800">
            <SidebarComponent />
            <div className="ml-[20%] w-4/5 min-h-screen">
                <main
                    className="transition-all md:pr-2 ml-3 pt-5"
                >
                    {/* Routes */}
                    <div className="w-full h-full">
                        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <Routes>
                                {getRoutes()}
                                <Route
                                    path="/"
                                    element={<Home />}
                                    key="home"
                                />
                                <Route
                                    path="/*"
                                    element={<Navigate to="/404" replace />}
                                    key="notfound"
                                />
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}