import { evaluate } from 'mathjs';

export const Secant = (expression, xn, xn1, tolerance, maxIterations) => {
    let iterCount = 0;
    let root, xn_1;

    const f = (x) => evaluate(expression, { x });

    while (iterCount < maxIterations) {
        
        xn_1 = xn;
        xn = xn1;

        xn1 = xn - f(xn) * (xn - xn_1) / (f(xn) - f(xn_1));

        if(Math.abs(xn1 - xn) < tolerance) {
            root = xn1;
            break;
        }

        iterCount++;
    }

    return { root, iterations: iterCount };
};
