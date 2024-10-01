import { evaluate } from 'mathjs';

export const RegulaFalsi = (expression, a, b, tolerance, maxIterations) => {
    let iterCount = 0;
    let root = null;

    const f = (x) => evaluate(expression, { x });

    if (f(a) * f(b) >= 0) {
        console.error("Intervalo inválido. No se puede garantizar la existencia de una raíz en el intervalo dado.");
        return { root: null, iterations: iterCount };
    }

    let c = (a * f(b) - b * f(a)) / (f(b) - f(a));
    while (Math.abs(f(c)) > tolerance && iterCount < maxIterations) {
        c = (a * f(b) - b * f(a)) / (f(b) - f(a));
        iterCount++;

        if (f(c) === 0.0) break;
        if (f(c) * f(a) < 0) b = c;
        else a = c;
    }

    root = c;
    return { root, iterations: iterCount };
};
