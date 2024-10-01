import { evaluate } from 'mathjs';

export const Bisection = (expression, a, b, tolerance, maxIterations) => {
    let iterCount = 0;
    let root = null;

    const f = (x) => evaluate(expression, { x });

    if (f(a) * f(b) >= 0) {
        alert("Intervalo inválido. No se puede garantizar la existencia de una raíz en el intervalo dado.");
        return { root: null, iterations: iterCount };
    }

    let mid = (a+b)/2;
    while (Math.abs(f(mid)) > tolerance && iterCount < maxIterations) {
        mid = (a + b) / 2.0;
        iterCount++;

        if (f(mid) === 0.0) break;
        if (f(mid) * f(a) < 0) b = mid;
        else a = mid;
    }

    root = mid;
    return { root, iterations: iterCount };
};
