import React, { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardTitle } from 'keep-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';


const HubTP3 = () => {

    return (
        <div>
            <Link to={'../'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[75%] h-fit mx-auto flex justify-center gap-1 overflow-visible">
                <CardContent>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Bienvenido al menú del T.P. N° 3</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                        <Link to={'simple-root'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Calcular raíz simple</CardTitle>
                                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                                    Acceda a una calculadora de raíces simples, con la posibilidad de elegir el método de cálculo deseado, además de la cantidad de dígitos de precisión y número de iteraciones deseado.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'compare-methods'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Comparar métodos de resolución</CardTitle>
                                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                                    Acceda a un módulo de comparación de métodos de resolución, con la posibilidad de elegir los métodos de cálculo a comparar.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    </CardDescription>
                    <CardDescription className="text-center text-sm">
                        Universidad Nacional de Salta | <a href="https://github.com/devinaxo" target="_blank" className="text-blue-600 hover:underline visited:text-purple-600">Ignacio García</a> | 2024
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
};

export default HubTP3;