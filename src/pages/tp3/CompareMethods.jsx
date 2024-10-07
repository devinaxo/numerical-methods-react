import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardTitle, Input, Label } from 'keep-react';
import StyledSelect from '../../components/select/StyledSelect';
import { ArrowLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';
import DesmosPlotter from './DesmosPlotter';
import { Bisection, Halley, NewtonRaphson, RegulaFalsi, RegulaFalsiMod, Secant } from './methods';

const CompareMethods = () => {

    const [expression, setExpression] = useState('x^2');
    const [method1, setMethod1] = useState('');
    const [method2, setMethod2] = useState('');
    const [t, setT] = useState('');
    const [iterations, setIterations] = useState('');
    const [initialValue, setInitialValue] = useState('');
    const [beginInterval, setBeginInterval] = useState('');
    const [endInterval, setEndInterval] = useState('');
    const [result1, setResult1] = useState(null);
    const [result2, setResult2] = useState(null);
    const [errors, setErrors] = useState({});

    const methodsOptions = [
        {
            label: "Métodos Cerrados",
            options: [
                { value: 'bisection', label: 'Bisección', category: 'cerrado' },
                { value: 'false-position', label: 'Falsa Posición (Regula Falsi)', category: 'cerrado' },
                { value: 'false-position-mod', label: 'Falsa Posición Modificado', category: 'cerrado' },
            ],
        },
        {
            label: "Métodos Abiertos",
            options: [
                { value: 'newton', label: 'Newton-Raphson', category: 'abierto' },
                { value: 'secant', label: 'Secante', category: 'abierto' },
                { value: 'halley', label: 'Halley', category: 'abierto' },
            ],
        },
    ];

    const transformExpressionForMathJs = (expression) => {
        // Replace e^x with exp(x) for math.js
        let transformedExpression = expression.replace(/e\^([^\s+*/()-]+)/g, 'exp($1)');

        // Replace log(x) with log(10, x) for math.js
        transformedExpression = transformedExpression.replace(/log\(([^\s+*/()-]+)\)/g, 'log($1, 10)');

        // Replace ln(x) with log(x)
        transformedExpression = transformedExpression.replace(/\bln\(([^)]+)\)/g, 'log($1)');

        // Ensure powers like 2^2x are treated as 2^(2x)
        transformedExpression = transformedExpression.replace(/(\d+)\^(\d+[a-zA-Z]+)/g, '$1^($2)');

        return transformedExpression;
    };

    const transformExpressionForDesmos = (expression) => {
        // Replace e^ with e^{} for LaTeX formatting
        let transformedExpression = expression.replace(/e\^([^\s]+)/g, 'e^{$1}');

        // Ensure that powers like 2^2x are treated as 2^{2x}
        transformedExpression = transformedExpression.replace(/(\d+)\^(\d+[a-zA-Z]+)/g, '$1^{$2}');

        // ln(x) remains as ln(x) in Desmos
        return transformedExpression;
    };

    const handleCalculations = () => {
        let isValid = true;
        let newErrors = {};
        if (!expression) return;
        if (!method1 || !method2) {
            newErrors.method = '(!) Seleccione los métodos de cálculo';
            isValid = false;
        }
        if (!iterations) {
            newErrors.iterations = '(!) Ingrese una cantidad de iteraciones válida';
            isValid = false;
        }
        if (!t) {
            newErrors.t = '(!) Ingrese un valor de precisión válido';
            isValid = false;
        }
        if ((method1.category === 'cerrado' || method2.category === 'cerrado') && ((!beginInterval || !endInterval) || (beginInterval > endInterval))) {
            newErrors.interval = '(!) Ingrese un intervalo válido';
            isValid = false;
        }
        if ((method1.category === 'abierto' || method2.category === 'abierto') && !initialValue && (method1.value !== 'secant' || method2.value !== 'secant')) {
            newErrors.initialValue = '(!) Ingrese un valor inicial válido';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Transform the expression for math.js
            const mathJsExpression = transformExpressionForMathJs(expression);
            console.log('Transformed Expression for Math.js:', mathJsExpression);

            let resultData1 = null;
            let resultData2 = null;
            switch (method1.value) {
                case 'bisection':
                    resultData1 = Bisection(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'false-position':
                    resultData1 = RegulaFalsi(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'false-position-mod':
                    resultData1 = RegulaFalsiMod(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'newton':
                    resultData1 = NewtonRaphson(mathJsExpression, parseFloat(initialValue), parseFloat(t), parseFloat(iterations));
                    break;
                case 'secant':
                    resultData1 = Secant(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'halley':
                    resultData1 = Halley(mathJsExpression, parseFloat(initialValue), parseFloat(t), parseFloat(iterations));
                    break;
            }
            switch (method2.value) {
                case 'bisection':
                    resultData2 = Bisection(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'false-position':
                    resultData2 = RegulaFalsi(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'false-position-mod':
                    resultData2 = RegulaFalsiMod(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'newton':
                    resultData2 = NewtonRaphson(mathJsExpression, parseFloat(initialValue), parseFloat(t), parseFloat(iterations));
                    break;
                case 'secant':
                    resultData2 = Secant(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'halley':
                    resultData2 = Halley(mathJsExpression, parseFloat(initialValue), parseFloat(t), parseFloat(iterations));
                    break;
            }

            if (resultData1 && resultData2) {
                setResult1(resultData1);
                setResult2(resultData2);
                console.log('Result1 set to:', resultData1);
                console.log('Result2 set to:', resultData2);
            }
        }
    };

    useEffect(() => {
        console.log('Updated Result1:', result1);
        console.log('Updated Result2:', result2);
    }, [result1, result2]);

    useEffect(() => {
        console.log('Method1:', method1);
        console.log('Method2', method2);
    }, [method1, method2]);


    return (
        <div>
            <Link to={'../non-lineal-functions'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[85%] h-fit mx-auto flex justify-center gap-1 overflow-visible">
                <CardContent className='w-full'>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Comparar métodos de resolución</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                        <div className='w-2/5 mx-6'>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese su función</Label> <br />
                                <Input
                                    placeholder='Funcion a evaluar'
                                    type='text'
                                    value={expression}
                                    onChange={(e) => setExpression(e.target.value)}>
                                </Input>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Métodos a utilizar</Label> <br />
                                <div className='flex flex-row justify-between gap-4'>
                                    <StyledSelect
                                        className='w-1/2'
                                        placeholder='Seleccione'
                                        options={methodsOptions}
                                        value={methodsOptions.find(option => option.value === method1)}
                                        onChange={(selectedOption) => setMethod1(selectedOption)}>
                                    </StyledSelect>
                                    <StyledSelect
                                        className='w-1/2'
                                        placeholder='Seleccione'
                                        options={methodsOptions}
                                        value={methodsOptions.find(option => option.value === method2)}
                                        onChange={(selectedOption) => setMethod2(selectedOption)}>
                                    </StyledSelect>
                                </div>
                                <Label className='text-red-500'>{errors?.method}</Label>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese su epsilon (Є) de precisión deseada</Label>
                                <Input
                                    placeholder='Dígitos de precisión (Є=0.0...1)'
                                    type='number'
                                    value={t}
                                    onChange={(e) => setT(e.target.value)}>
                                </Input>
                                <Label className='text-red-500'>{errors?.t}</Label>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese la cantidad máxima de iteraciones</Label>
                                <Input
                                    placeholder='Cantidad máxima de iteraciones'
                                    type='number'
                                    value={iterations}
                                    onChange={(e) => setIterations(e.target.value)}>
                                </Input>
                                <Label className='text-red-500'>{errors?.iterations}</Label>
                            </fieldset>
                            {((method1.category === 'abierto' && method1.value !== 'secant') || (method2.category === 'abierto' && method2.value !== 'secant')) &&
                                <fieldset className='w-full my-2'>
                                    <Label>Ingrese su X inicial</Label>
                                    <Input
                                        placeholder='Valor de x inicial'
                                        type='number'
                                        value={initialValue}
                                        onChange={(e) => setInitialValue(e.target.value)}>
                                    </Input>
                                    <Label className='text-red-500'>{errors?.initialValue}</Label>
                                </fieldset>}
                            {((method1.category === 'cerrado' || method1.value === 'secant') || (method2.category === 'cerrado' || method2.value === 'secant')) &&
                                <fieldset className='w-full my-2'>
                                    <Label>Ingrese el intervalo a chequear</Label>
                                    <div className='flex flex-row gap-3'>
                                        <Input
                                            placeholder='Inicio de intervalo'
                                            type='number'
                                            value={beginInterval}
                                            onChange={(e) => setBeginInterval(e.target.value)}>
                                        </Input>
                                        <Input
                                            placeholder='Fin de intervalo'
                                            type='number'
                                            value={endInterval}
                                            onChange={(e) => setEndInterval(e.target.value)}>
                                        </Input>
                                    </div>
                                    <Label className='text-red-500'>{errors?.interval}</Label>
                                </fieldset>}
                        </div>
                        <div className='w-3/5'>
                            <div className='w-full h-full flex flex-col mx-auto gap-2 my-5'>
                                <DesmosPlotter expression={transformExpressionForDesmos(expression)} />
                            </div>
                        </div>
                    </CardDescription>
                    <div className="w-full flex justify-center items-center place-content-center mb-8">
                        <Button onClick={handleCalculations} className='bg-green-700 hover:bg-green-800'>Calcular</Button>
                    </div>
                    {result1 && result2 && (
                        <div className="mt-5 text-center text-slate-100 mb-6">
                            <div className="flex flex-row justify-around gap-6">
                                <div>
                                    <p><strong>Método 1 ({method1.label}):</strong></p>
                                    <p><strong>Raíz aproximada:</strong> {result1.root}</p>
                                    <p><strong>Iteraciones:</strong> {result1.iterations}</p>
                                </div>
                                <div>
                                    <p><strong>Método 2 ({method2.label}):</strong></p>
                                    <p><strong>Raíz aproximada:</strong> {result2.root}</p>
                                    <p><strong>Iteraciones:</strong> {result2.iterations}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <CardDescription className="text-center text-sm">
                        Universidad Nacional de Salta | <a href="https://github.com/devinaxo" target="_blank" className="text-blue-600 hover:underline visited:text-purple-600">Ignacio García</a> | 2024
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
};

export default CompareMethods;