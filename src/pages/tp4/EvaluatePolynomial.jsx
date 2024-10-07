import { Button, Card, CardContent, CardDescription, CardTitle, Input, Label } from "keep-react"
import { useState } from "react";
import { evaluate } from 'mathjs';
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

export const EvaluatePolynomial = () => {

    const [polynomial, setPolynomial] = useState('');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const handleEvaluation = () => {
        if (!polynomial || !value) {
            setResult('Error: Por favor complete todos los campos.');
            return;
        }
        try {
            const xValue = parseFloat(value);
            const f = (x) => evaluate(polynomial, { x });
            setResult(f(xValue));
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
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Calculadora de polinomios</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10">
                        <fieldset className="flex flex-row justify-around gap-5">
                            <div className="w-full">
                                <Label>Ingrese su polinomio</Label>
                                <Input
                                    placeholder='Polinomio a evaluar'
                                    type='text'
                                    value={polynomial}
                                    onChange={(e) => setPolynomial(e.target.value)}>
                                </Input>
                            </div>
                            <div className="w-full">
                                <Label>Ingrese el punto en el que lo desea evaluar</Label>
                                <Input
                                    placeholder='Punto a evaluar'
                                    type='text'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}>
                                </Input>
                            </div>
                        </fieldset>
                    </CardDescription>
                    <div className="w-full flex justify-center items-center place-content-center mb-8">
                        <Button onClick={handleEvaluation} className='bg-green-700 hover:bg-green-800'>Evaluar</Button>
                    </div>
                    {result && (
                        <div className="text-center text-lg my-5 text-slate-100">
                            <p><strong>Resultado:</strong> {result}</p>
                        </div>
                    )}
                    <CardDescription className="text-center text-sm">
                        Universidad Nacional de Salta | <a href="https://github.com/devinaxo" target="_blank" className="text-blue-600 hover:underline visited:text-purple-600">Ignacio García</a> | 2024
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    )
}