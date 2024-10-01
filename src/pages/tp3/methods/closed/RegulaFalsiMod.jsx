import { evaluate } from 'mathjs';

export const RegulaFalsiMod = (expression, a, b, tolerance, maxIterations) => {
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
};
