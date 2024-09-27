import { Card, CardContent, CardDescription, CardTitle } from "keep-react"

export const Home = () => {
    return (
        <>
            <Card className="min-w-[75%] h-fit mx-auto flex justify-center gap-1">
                <CardContent>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Bienvenido al Sistema de Muestra para la materia de Programación Numérica</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10">
                        Puede navegar por los distintos trabajos prácticos en el menú lateral para acceder a los distintos métodos numéricos programados.
                    </CardDescription>
                    <CardDescription className="text-center text-sm">
                        Universidad Nacional de Salta | <a href="https://github.com/devinaxo" target="_blank" className="text-blue-600 hover:underline visited:text-purple-600">Ignacio García</a> | 2024
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    )
}
