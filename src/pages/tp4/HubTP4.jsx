import React, { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardTitle } from 'keep-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';


const HubTP4 = () => {

    return (
        <div>
            <Link to={'../'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[90%] h-fit mx-auto flex justify-center gap-1 overflow-visible">
                <CardContent>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Bienvenido al menú del T.P. N° 4</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10 flex">
                        <Link to={'evaluate-polynomial'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Calcular valor de polinomio</CardTitle>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'divide-polynomials'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Dividir polinomios</CardTitle>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'possible-roots'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Determinar posibles raíces</CardTitle>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'positive-negative-bounds'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Determinar cotas de raíces positivas y negativas</CardTitle>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to={'find-roots'} className='w-[75%] mx-5'>
                            <Card className="transition duration-150 min-w-full h-full flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-6">Encontrar raíces de polinomios</CardTitle>
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

export default HubTP4;