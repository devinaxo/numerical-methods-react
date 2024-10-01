import { evaluate, derivative } from 'mathjs';

export const Halley = (expression, x0, tolerance, maxIterations) => {
    let iterCount = 0;
    let root;
    let xn, num, den;
    let xn1 = x0;

    const f = (x) => evaluate(expression, { x });
    const fPrime = derivative(expression, 'x');
    const fSecond = derivative(fPrime, 'x');

    while (iterCount < maxIterations) {
        
        xn = xn1;
        num = 2 * f(xn) * fPrime.evaluate({ x: xn });
        den = 2 * Math.pow(fPrime.evaluate({ x: xn }), 2) - f(xn) * fSecond.evaluate({ x: xn });
        xn1 = xn - num / den;

        if(Math.abs(xn1 - xn) < tolerance) {
            root = xn1;
            break;
        }

        iterCount++;
    }

    return { root, iterations: iterCount };
};
