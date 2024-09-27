import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 h-screen flex">
            <div className="mx-auto max-w-screen-sm text-center animate-keep-slide-down my-auto">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-[200px] text-primary-600 dark:text-primary-500 animate-pulse">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-primary md:text-4xl dark:text-white">Página no encontrada</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">La página que buscas no existe o ha sido movida.</p>
                <Link to="/" className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Volver al inicio</Link>
            </div>
        </div>
    )
}
