import { Button, Card, CardContent, CardDescription, CardTitle, Input, Label } from "keep-react"
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { coefficientsToPolynomial, HornerDoble, HornerSimple, parsePolynomial } from "./methods";

export const DividePolynomial = () => {
    const [polynomial, setPolynomial] = useState('');
    const [divisor, setDivisor] = useState('');
    const [result, setResult] = useState('');

    const handleEvaluation = () => {
        if (!polynomial || !divisor) {
            setResult('Error: Por favor complete todos los campos.');
            return;
        }

        try {
            const coefP = parsePolynomial(polynomial); // Parse the input polynomial
            const divisorCoefficients = parsePolynomial(divisor); // Parse the divisor
            const gradoP = coefP.length - 1; // Degree of the input polynomial

            if (divisorCoefficients.length === 1) {
                // Handle division by degree 1 polynomial
                const a = divisorCoefficients[0];
                const { coc, res } = HornerSimple(coefP, gradoP, -a);
                setResult(`Cociente: ${coefficientsToPolynomial(coc.reverse())}, Resto: ${res}`);
            } else if (divisorCoefficients.length === 2) {
                // Handle division by degree 2 polynomial
                const a = divisorCoefficients[1];
                const b = divisorCoefficients[0];
                const { coc, res } = HornerDoble(coefP, gradoP, b, a);
                console.log('coc', coc);
                setResult(`Cociente: ${coefficientsToPolynomial(coc.reverse())}, Resto: ${coefficientsToPolynomial(res.reverse())}`);
            } else {
                setResult('Error: El divisor debe ser un polinomio de grado 1 o 2.');
            }
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
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Calculadora de división de polinomios</CardTitle>
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
                            <div className="w-full">
                                <Label>Ingrese el polinomio divisor (grado 1 o grado 2)</Label>
                                <Input
                                    placeholder='Ejemplo: -2 (para x - 2) o 2,1 (para x^2 + 2x + 1)'
                                    type='text'
                                    value={divisor}
                                    onChange={(e) => setDivisor(e.target.value)}>
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
    );
};
