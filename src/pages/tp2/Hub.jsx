import React, { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardTitle } from 'keep-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';


const Hub = () => {

    return (
        <div>
            <Link to={'../'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[75%] h-fit mx-auto flex justify-center gap-1 overflow-visible">
                <CardContent>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Bienvenido al menú del T.P. N° 2</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                        <Link to={'base-conversion'} className='w-full'>
                            <Card className="transition duration-150 min-w-[75%] h-fit mx-auto flex justify-center gap-1 overflow-visible cursor-pointer !bg-metal-700 hover:!bg-metal-800">
                                <CardContent>
                                    <CardTitle className="text-heading-5 font-medium text-center mb-10">Conversión de Bases Numéricas</CardTitle>
                                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                                        Acceda a una calculadora de conversión de bases numéricas, con la posibilidad de elegir la base de partida y la base de llegada, además de la cantidad de dígitos de precisión deseados.
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

export default Hub;