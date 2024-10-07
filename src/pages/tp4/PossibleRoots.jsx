import { Button, Card, CardContent, CardDescription, CardTitle, Input, Label } from "keep-react"
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { coefficientsToPolynomial, findRoots, formatRoots, HornerDoble, HornerSimple, parsePolynomial } from "./methods";

export const PossibleRoots = () => {
    const [polynomial, setPolynomial] = useState('');
    const [result, setResult] = useState('');

    const handleEvaluation = () => {
        if (!polynomial) {
            setResult('Error: Por favor complete todos los campos.');
            return;
        }

        try {
            const result = findRoots(parsePolynomial(polynomial));
            setResult(result);
        } catch (error) {
            console.log(error);
            setResult('Error: Por favor ingrese una expresión válida.');
        }
    };

    return (
        <>
            <Link to={'../polynomial-roots'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[75%] h-fit mx-auto flex justify-center gap-1">
                <CardContent>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Calculadora de posibles raíces de polinomio</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10">
                        <fieldset className="flex flex-row justify-around gap-5">
                            <div className="w-full">
                                <Label>Ingrese su polinomio</Label>
                                <Input
                                    placeholder='Ejemplo: 3,4,5 = 3x^2 + 4x + 5'
                                    type='text'
                                    value={polynomial}
                                    onChange={(e) => setPolynomial(e.target.value)}>
                                </Input>
                            </div>
                        </fieldset>
                    </CardDescription>
                    <div className="w-full flex justify-center items-center place-content-center mb-8">
                        <Button onClick={handleEvaluation} className='bg-green-700 hover:bg-green-800'>Encontrar</Button>
                    </div>
                    {result && (
                        <div className="text-center text-lg my-5 text-slate-100">
                            <p><strong>Posibles raíces enteras (±):</strong> {formatRoots(result.integerRoots.filter(num => num > 0))}</p>
                            <p><strong>Posibles raíces racionales (±):</strong> {formatRoots(result.rationalRoots)}</p>
                        </div>
                    )}
                    <CardDescription className="text-center text-sm">
                        Universidad Nacional de Salta | <a href="https://github.com/devinaxo" target="_blank" className="text-blue-600 hover:underline visited:text-purple-600">Ignacio García</a> | 2024
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
};
