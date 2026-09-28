import React, { useState } from 'react';
import { convertWithPrecision } from './methods';
import { Button, Card, CardContent, CardDescription, CardTitle, Input, Label } from 'keep-react';
import StyledSelect from '../../components/select/StyledSelect';
import { ArrowLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';

const BaseConversion = () => {

    const [num, setNum] = useState('');
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(2);
    const [t, setT] = useState('');
    const [result, setResult] = useState(null);

    const bases = [
        { value: 2, label: '2 (Binario)' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8 (Octal)' },
        { value: 9, label: '9' },
        { value: 10, label: '10 (Decimal)' },
        { value: 11, label: '11' },
        { value: 12, label: '12' },
        { value: 13, label: '13' },
        { value: 14, label: '14' },
        { value: 15, label: '15' },
        { value: 16, label: '16 (Hexadecimal)' }
    ];

    const handleConversion = () => {
        if (!num || !t) return;
        const result = convertWithPrecision(num, fromBase, toBase, t);
        setResult(result);
        console.log(result);
    }

    return (
        <div>
            <Link to={'../error-theory'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[75%] h-fit mx-auto flex justify-center gap-1 overflow-visible">
                <CardContent>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Conversión de Bases Numéricas</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                        <div className='w-2/5'>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese su número</Label>
                                <Input
                                    placeholder='Número a convertir'
                                    type='number'
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}>
                                </Input>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Desde la base</Label> <br />
                                <StyledSelect
                                    placeholder='Seleccione la base de partida'
                                    options={bases}
                                    value={bases.find(option => option.value === fromBase)}
                                    onChange={(selectedOption) => setFromBase(selectedOption.value)}>
                                </StyledSelect>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>A la base</Label> <br />
                                <StyledSelect
                                    placeholder='Seleccione la base de llegada'
                                    options={bases}
                                    value={bases.find(option => option.value === toBase)}
                                    onChange={(selectedOption) => setToBase(selectedOption.value)}>
                                </StyledSelect>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese dígitos de precisión deseados</Label>
                                <Input
                                    placeholder='Dígitos de precisión (t)'
                                    type='number'
                                    value={t}
                                    onChange={(e) => setT(e.target.value)}>
                                </Input>
                            </fieldset>
                        </div>
                        <div className='w-3/5'>
                            <div className='w-[90%] h-full flex flex-col mx-auto gap-2'>
                                <div className='w-[90%] h-full flex flex-col mx-auto gap-2'>
                                    <div className='w-full h-auto border border-metal-800 rounded-lg p-2 break-all whitespace-normal overflow-hidden'>
                                        <p className='text-sm font-bold'>Número completo (sin normalizar): </p>
                                        <div className="w-fit">
                                            <p className='text-sm'>{result?.fullNumber}</p>
                                        </div>
                                    </div>
                                    <div className='w-full h-auto border border-metal-800 rounded-lg p-2 break-all whitespace-normal overflow-hidden'>
                                        <p className='text-sm font-bold'>Número completo (normalizado): </p>
                                        <p className='text-sm'>{result?.normalizedFull}</p>
                                    </div>
                                    <div className='w-full h-auto border border-metal-800 rounded-lg p-2 break-all whitespace-normal overflow-hidden'>
                                        <p className='text-sm font-bold'>Número por corte (sin normalizar): </p>
                                        <p className='text-sm'>{result?.nonNormalizedCutOff}</p>
                                    </div>
                                    <div className='w-full h-auto border border-metal-800 rounded-lg p-2 break-all whitespace-normal overflow-hidden'>
                                        <p className='text-sm font-bold'>Número por corte (normalizado): </p>
                                        <p className='text-sm'>{result?.normalizedCutOff}</p>
                                    </div>
                                    <div className='w-full h-auto border border-metal-800 rounded-lg p-2 break-all whitespace-normal overflow-hidden'>
                                        <p className='text-sm font-bold'>Número por redondeo simétrico (sin normalizar): </p>
                                        <p className='text-sm'>{result?.nonNormalizedRounded}</p>
                                    </div>
                                    <div className='w-full h-auto border border-metal-800 rounded-lg p-2 break-all whitespace-normal overflow-hidden'>
                                        <p className='text-sm font-bold'>Número por redondeo simétrico (normalizado): </p>
                                        <p className='text-sm'>{result?.normalizedRounded}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </CardDescription>
                    <div className="w-full flex justify-center items-center place-content-center mb-8">
                        <Button onClick={handleConversion} className='bg-green-700 hover:bg-green-800'>Convertir</Button>
                    </div>
                    <CardDescription className="text-center text-sm">
                        Universidad Nacional de Salta | <a href="https://github.com/devinaxo" target="_blank" className="text-blue-600 hover:underline visited:text-purple-600">Ignacio García</a> | 2024
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
};

export default BaseConversion;