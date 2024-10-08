import { Route } from "react-router-dom";
import { PlaceholderComponent } from "../components/placeholder/PlaceholderComponent";
import React from "react";
import { Bug, DotsNine, Function, MathOperations, Radical } from "phosphor-react";

const routes = [
    {
        path: "error-theory",
        name: "T.P. N°2: Introducción a la Teoría del Error",
        icon: <Bug size={22} />,
        component: <PlaceholderComponent />,
        innerRoutes: [
            {
                path: "base-conversion",
                name: "Conversión de Bases Numéricas",
                icon: <DotsNine size={22} />,
                component: <PlaceholderComponent />,
            }
        ]
    },
    {
        path: "non-lineal-functions",
        name: "T.P. N°3: Resolución de Ecuaciones No Lineales",
        icon: <Function size={22} />,
        component: <PlaceholderComponent />,
        innerRoutes: [
            {
                path: "placeholder",
                name: "placeholder",
                icon: <DotsNine size={22} />,
                component: <PlaceholderComponent />,
            }
        ]
    },
    {
        path: "polynomial-roots",
        name: "T.P. N°4: Raíces de Polinomios",
        icon: <Radical size={22} />,
        component: <PlaceholderComponent />,
        innerRoutes: [
            {
                path: "placeholder",
                name: "placeholder",
                icon: <DotsNine size={22} />,
                component: <PlaceholderComponent />,
            }
        ]
    },
    {
        path: "lineal-equations",
        name: "T.P. N°5: Sistemas de Ecuaciones Lineales",
        icon: <MathOperations size={22} />,
        component: <PlaceholderComponent />,
        innerRoutes: [
            {
                path: "placeholder",
                name: "placeholder",
                icon: <DotsNine size={22} />,
                component: <PlaceholderComponent />,
            }
        ]
    }
]

//Método recursivo para crear inner routes dentro de inner routes
const generateRoutes = (routes, parentPath = '') => {
    return routes.map((route, index) => {
        const fullPath = `${parentPath}/${route.path}`;

        if (route.innerRoutes && route.innerRoutes.length > 0) {
            return (
                <React.Fragment key={index}>
                    <Route
                        path={fullPath}
                        element={route.component || <PlaceholderComponent />}
                    />
                    {generateRoutes(route.innerRoutes, fullPath)}
                </React.Fragment>
            );
        }

        return (
            <Route
                path={fullPath}
                element={route.component || <PlaceholderComponent />}
                key={index}
            />
        );
    });
};

const getRoutes = () => {
    return generateRoutes(routes);
};

export { routes, getRoutes }