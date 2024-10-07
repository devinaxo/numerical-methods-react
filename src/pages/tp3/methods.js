import { evaluate, derivative } from 'mathjs';

export function Bisection (expression, a, b, tolerance, maxIterations) {
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
}

export function RegulaFalsi (expression, a, b, tolerance, maxIterations) {
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
}

export function RegulaFalsiMod (expression, a, b, tolerance, maxIterations) {
    let iterCount = 0;
    let root = null;

    const f = (x) => evaluate(expression, { x });
    let F = f(a);
    let G = f(b);
    let w = f(a);

    if (f(a) * f(b) >= 0) {
        console.error("Intervalo inválido. No se puede garantizar la existencia de una raíz en el intervalo dado.");
        return { root: null, iterations: iterCount };
    }

    let c = (a * f(b) - b * f(a)) / (f(b) - f(a));
    while (Math.abs(f(c)) > tolerance && iterCount < maxIterations) {
        iterCount++;

        if (f(c) === 0.0) break;
        if (f(c) * f(a) < 0){ 
            b = c;
            G = f(c);
            if( w * G > 0){
                F /= 2;
            }
        }
        else{ 
            a = c;
            F = f(c);
            if( w * F > 0){
                G /= 2;
            }
        }
        c = (a * G - b * F) / (G - F);
    }

    root = c;
    return { root, iterations: iterCount };
}

export function NewtonRaphson (expression, x0, tolerance, maxIterations) {
    let iterCount = 0;
    let root;
    let xn;
    let xn1 = x0;

    const f = (x) => evaluate(expression, { x });
    const fPrime = derivative(expression, 'x');

    while (iterCount < maxIterations) {

        xn = xn1;
        xn1 = xn - f(xn) / fPrime.evaluate({ x: xn });

        if (Math.abs(xn1 - xn) < tolerance) {
            root = xn1;
            break;
        }

        iterCount++;
    }

    return { root, iterations: iterCount };
}

export function Secant (expression, xn, xn1, tolerance, maxIterations) {
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

export function Halley (expression, x0, tolerance, maxIterations) {
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