export function parsePolynomial(input) {
    return input.split(',').map(Number);
};

export function coefficientsToPolynomial(coefficients) {
    // Initialize an array to hold polynomial terms
    const terms = [];

    // Iterate over the coefficients from highest degree to lowest
    for (let i = coefficients.length - 1; i >= 0; i--) {
        const coef = coefficients[i];
        if (coef !== 0) { // Skip zero coefficients
            let term = '';

            // Handle the coefficient
            if (coef > 0 && terms.length > 0) {
                term += '+'; // Add a plus sign for positive coefficients, except for the first term
            }
            term += coef; // Add the coefficient

            // Handle the variable part
            if (i > 0) { // If index is greater than 0, we have a variable
                term += 'x';
                if (i > 1) {
                    term += `^${i}`; // Add the exponent if it's greater than 1
                }
            }

            terms.push(term); // Add the term to the terms array
        }
    }

    // Join all terms into a single polynomial string
    return terms.join(' ').trim(); // Trim to remove any extra spaces
}

export function HornerSimple(coef_p, grado, a) {
    // Make a copy of the coef_p array
    let coef_c = [...coef_p].reverse();
    let reverse_coef_p = [...coef_p].reverse();

    // Perform the Horner's method
    for (let i = grado - 1; i >= 0; i--) {
        coef_c[i] = coef_c[i + 1] * a + reverse_coef_p[i];
    }
    // Get the quotient and remainder
    let coc = coef_c.slice(1).reverse();  // equivalent to coef_c[1:]
    let res = coef_c[0];  // equivalent to the remainder

    return { coc, res };
}

export function HornerDoble(coef_p, grado, a, b) {
    // Make a copy of the coef_p array
    let coef_c = [...coef_p].reverse();
    let reverse_coef_p = [...coef_p].reverse();

    // Initial calculation for coef_c[grado - 1]
    coef_c[grado - 1] = (-a) * coef_c[grado] + reverse_coef_p[grado - 1];

    // Perform the Horner's method for the rest of the coefficients
    for (let i = grado - 2; i >= 1; i--) {
        coef_c[i] = (-a) * coef_c[i + 1] + (-b) * coef_c[i + 2] + reverse_coef_p[i];
    }

    // Handle the final term
    coef_c[0] = (-b) * coef_c[2] + reverse_coef_p[0];

    // Get the quotient and remainder
    let coc = coef_c.slice(2).reverse();  // equivalent to coef_c[2:]
    let res = coef_c.slice(0, 2).reverse();  // equivalent to coef_c[:2]

    return { coc, res };
}

export function formatRoots(roots) {
    return roots.join(', ');
}

function getDivisors(num) {
    const divisors = [];
    const absNum = Math.abs(num);
    
    for (let i = 1; i <= absNum; i++) {
        if (absNum % i === 0) {
            divisors.push(i);
        }
    }
    
    return divisors;
}

function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

export function findRoots(coefficients) {
    // Remove leading zeros
    while (coefficients.length > 0 && coefficients[0] === 0) {
        coefficients.shift();
    }

    const degree = coefficients.length - 1;

    // If the polynomial is constant or zero
    if (degree < 0) {
        return { integerRoots: [], rationalRoots: [] };
    }

    // Identify the leading coefficient and the constant term
    const leadingCoefficient = coefficients[0];
    const constantTerm = coefficients[degree];

    // Check for non-integer coefficients
    const hasNonIntegerCoefficients = coefficients.some(coef => !Number.isInteger(coef));

    // If there are non-integer coefficients, find the least common multiple (LCM) of the denominators
    let multiplier = 1;
    if (hasNonIntegerCoefficients) {
        const denominators = coefficients.map(coef => {
            const fraction = String(coef).split('.');
            return fraction.length > 1 ? Math.pow(10, fraction[1].length) : 1;
        });
        multiplier = denominators.reduce((a, b) => (a * b) / gcd(a, b));
    }

    // Scale coefficients to ensure they are all integers
    const scaledCoefficients = hasNonIntegerCoefficients ? coefficients.map(coef => coef * multiplier) : coefficients;

    // Find integer roots
    const integerDivisors = getDivisors(scaledCoefficients[degree]);
    const integerRoots = integerDivisors.concat(integerDivisors.map(d => -d)); // Include negative divisors

    // Find rational roots
    const leadingDivisors = getDivisors(scaledCoefficients[0]);
    const rationalRoots = [];

    for (const numerator of integerDivisors) {
        for (const denominator of leadingDivisors) {
            rationalRoots.push(`${numerator}/${denominator}`);
        }
    }

    return { integerRoots, rationalRoots };
}