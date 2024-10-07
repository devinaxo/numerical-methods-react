import React, { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardTitle, Input, Label } from 'keep-react';
import StyledSelect from '../../components/select/StyledSelect';
import { ArrowLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';
import DesmosPlotter from './DesmosPlotter';
import { Bisection, Halley, NewtonRaphson, RegulaFalsi, RegulaFalsiMod, Secant } from './methods';

const SimpleRoot = () => {

    const [expression, setExpression] = useState('x^2');
    const [method, setMethod] = useState('');
    const [t, setT] = useState('');
    const [iterations, setIterations] = useState('');
    const [initialValue, setInitialValue] = useState('');
    const [beginInterval, setBeginInterval] = useState('');
    const [endInterval, setEndInterval] = useState('');
    const [result, setResult] = useState(null);
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

        return transformedExpression;
    };

    const transformExpressionForDesmos = (expression) => {
        // Replace e^ with e^{} for LaTeX formatting
        let transformedExpression = expression.replace(/e\^([^\s]+)/g, 'e^{$1}');

        // ln(x) remains as ln(x) in Desmos
        return transformedExpression;
    };

    const handleCalculations = () => {
        let isValid = true;
        setErrors({});
        if (!expression) return;
        if (!t) {
            setErrors({ ...errors, t: 'Ingrese un valor de precisión válido' });
            isValid = false;
        }
        if (method.category === 'cerrado' && ((!beginInterval || !endInterval) || (beginInterval > endInterval))) {
            setErrors({ ...errors, interval: 'Ingrese un intervalo válido' });
            isValid = false;
        }
        if (method.category === 'abierto' && !initialValue && method.value !== 'secant') {
            setErrors({ ...errors, initialValue: 'Ingrese un valor inicial válido' });
            isValid = false;
        }

        if (isValid) {
            // Transform the expression for math.js
            const mathJsExpression = transformExpressionForMathJs(expression);
            console.log('Transformed Expression for Math.js:', mathJsExpression);

            let resultData = null;
            switch (method.value) {
                case 'bisection':
                    resultData = Bisection(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'false-position':
                    resultData = RegulaFalsi(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'false-position-mod':
                    resultData = RegulaFalsiMod(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'newton':
                    resultData = NewtonRaphson(mathJsExpression, parseFloat(initialValue), parseFloat(t), parseFloat(iterations));
                    break;
                case 'secant':
                    resultData = Secant(mathJsExpression, parseFloat(beginInterval), parseFloat(endInterval), parseFloat(t), parseFloat(iterations));
                    break;
                case 'halley':
                    resultData = Halley(mathJsExpression, parseFloat(initialValue), parseFloat(t), parseFloat(iterations));
                    break;
            }

            if (resultData) {
                setResult(resultData);
                console.log('Result set to:', resultData);
            }
        }
    };

    React.useEffect(() => {
        console.log('Updated Result:', result);
    }, [result]);


    return (
        <div>
            <Link to={'../error-theory'}>
                <Button className='bg-green-700 hover:bg-green-800'> <ArrowLeft size={28} /> Volver</Button>
            </Link>
            <Card className="min-w-[85%] h-fit mx-auto flex justify-center gap-1 overflow-visible">
                <CardContent className='w-full'>
                    <CardTitle className="text-heading-2 font-medium text-center mb-10">Calculadora de raíces simples</CardTitle>
                    <CardDescription className="text-center text-body-1 mb-10 flex flex-row">
                        <div className='w-2/5 mx-6'>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese su función</Label> <br />
                                <Label className='text-xs'>(para ingresar exponentes del número de Euler, use la función "exp(_)" donde en el argumento ingresará la potencia deseada)</Label>
                                <Input
                                    placeholder='Funcion a evaluar'
                                    type='text'
                                    value={expression}
                                    onChange={(e) => setExpression(e.target.value)}>
                                </Input>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Método a utilizar</Label> <br />
                                <StyledSelect
                                    placeholder='Seleccione el método de cálculo'
                                    options={methodsOptions}
                                    value={methodsOptions.find(option => option.value === method)}
                                    onChange={(selectedOption) => setMethod(selectedOption)}>
                                </StyledSelect>
                            </fieldset>
                            <fieldset className='w-full my-2'>
                                <Label>Ingrese su epsilon (Є) de precisión deseada</Label>
                                <Input
                                    placeholder='Dígitos de precisión (Є)'
                                    type='number'
                                    value={t}
                                    onChange={(e) => setT(e.target.value)}>
                                </Input>
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
                            {method.category === 'abierto' && method.value !== 'secant' &&
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
                            {(method.category === 'cerrado' || method.value === 'secant') &&
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
                    {result && (
                        <div className="mt-5 text-center text-slate-100 mb-6">
                            <p><strong>Resultado:</strong> Raíz aproximada: {result.root}</p>
                            <p><strong>Iteraciones:</strong> {result.iterations}</p>
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

export default SimpleRoot;