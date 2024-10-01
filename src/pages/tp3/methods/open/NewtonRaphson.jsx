import { evaluate, derivative } from 'mathjs';

export const NewtonRaphson = (expression, x0, tolerance, maxIterations) => {
    let iterCount = 0;
    let root;
    let xn;
    let xn1 = x0;

    const f = (x) => evaluate(expression, { x });
    const fPrime = derivative(expression, 'x');

    while (iterCount < maxIterations) {
        
        xn = xn1;
        xn1 = xn - f(xn) / fPrime.evaluate({ x: xn });

        if(Math.abs(xn1 - xn) < tolerance) {
            root = xn1;
            break;
        }

        iterCount++;
    }

    return { root, iterations: iterCount };
};
