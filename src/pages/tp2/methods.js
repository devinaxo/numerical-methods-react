// Helper to round symmetrically based on the t-th digit in base 10
function roundSymmetric(fractionalStr, base, t) {
    if (fractionalStr.length <= t) return fractionalStr; // No rounding needed if the string is shorter than t

    // Get the t-th digit in the given base and convert it to base 10 equivalent
    const checkDigit = parseInt(fractionalStr[t - 1], base);
    const fractionalValueBase10 = checkDigit / base;

    // Check if the fractional value is greater than or equal to 0.5 in base 10
    if (fractionalValueBase10 >= 0.5) {
        // We need to round the (t-1)th position digit
        let rounded = fractionalStr.slice(0, t).split('');

        // Increment the (t-1)th digit
        let carry = 1;
        for (let i = t - 1; i >= 0 && carry > 0; i--) {
            let digitVal = parseInt(rounded[i], base) + carry;
            if (digitVal >= base) {
                rounded[i] = '0'; // Reset to 0 if overflow
                carry = 1; // Continue carry to the next digit
            } else {
                rounded[i] = digitVal.toString(base);
                carry = 0; // Stop carry
            }
        }

        // If carry remains after the last digit, prepend '1'
        if (carry === 1) rounded.unshift('1');

        return rounded.join('');
    }

    // If the t-th digit is less than 0.5 in base 10, just cut the string at t
    return fractionalStr.slice(0, t);
}

// Helper to normalize a floating-point number
function normalizeFloatingPoint(numberStr, base) {
    let [integerPart, fractionalPart] = numberStr.split('.');

    // If integer part is zero, shift decimal point right
    if (integerPart === '0' && fractionalPart) {
        let indexOfFirstNonZero = fractionalPart.search(/[1-9]/);
        if (indexOfFirstNonZero !== -1) {
            let exponent = -(indexOfFirstNonZero + 1);
            let normalizedNumber = fractionalPart[indexOfFirstNonZero] + '.' + fractionalPart.slice(indexOfFirstNonZero + 1);
            return { normalized: normalizedNumber, exponent };
        }
    } else if (integerPart !== '0') {
        // If integer part is non-zero, shift decimal point left
        let exponent = integerPart.length - 1;
        let normalizedNumber = integerPart[0] + '.' + (integerPart.slice(1) + (fractionalPart || '')).replace(/0+$/, '');
        return { normalized: normalizedNumber, exponent };
    }

    return { normalized: numberStr, exponent: 0 };
}

function convertToDecimal(numStr, base) {
    // Split into integer and fractional parts
    let [integerPart, fractionalPart] = numStr.split('.');

    // Convert integer part from base B to decimal
    let integerValue = parseInt(integerPart, base);

    // Convert fractional part from base B to decimal (if exists)
    let fractionalValue = 0;
    if (fractionalPart) {
        for (let i = 0; i < fractionalPart.length; i++) {
            fractionalValue += parseInt(fractionalPart[i], base) / Math.pow(base, i + 1);
        }
    }

    // Return the sum of both parts as a decimal number
    return integerValue + fractionalValue;
}

function convertFromDecimal(decimal, base, t) {
    // Integer part conversion
    let integerPart = Math.floor(decimal).toString(base);

    // Fractional part conversion
    let fractionalPart = '';
    let fractional = decimal - Math.floor(decimal);

    while (fractional > 0 && fractionalPart.length < t + 5) { // Get extra precision
        fractional *= base;
        fractionalPart += Math.floor(fractional).toString(base);
        fractional -= Math.floor(fractional);
    }

    return { integerPart, fractionalPart };
}

// Function to generate both representations (cut-off and symmetric rounding)
export function convertWithPrecision(numStr, fromBase, toBase, t) {
    // Step 1: Convert to decimal (base 10)
    let decimalValue = convertToDecimal(numStr, fromBase);

    // Step 2: Convert from decimal to the target base
    let { integerPart, fractionalPart } = convertFromDecimal(decimalValue, toBase, t);

    // Full untruncated result
    let fullNumber = integerPart + (fractionalPart ? '.' + fractionalPart : '');

    // Step 3: Generate cut-off and symmetric rounding representations
    let cutOffFraction = fractionalPart.slice(0, t);
    let roundedFraction = roundSymmetric(fractionalPart, toBase, t);

    let nonNormalizedCutOff = integerPart + (cutOffFraction ? '.' + cutOffFraction : '');
    let nonNormalizedRounded = integerPart + (roundedFraction ? '.' + roundedFraction : '');

    // Step 4: Normalize all forms
    let { normalized: normalizedFull, exponent: exponentFull } = normalizeFloatingPoint(fullNumber, toBase);
    let { normalized: normalizedCutOff, exponent: exponentCutOff } = normalizeFloatingPoint(nonNormalizedCutOff, toBase);
    let { normalized: normalizedRounded, exponent: exponentRounded } = normalizeFloatingPoint(nonNormalizedRounded, toBase);

    // Return all forms (non-normalized and normalized)
    return {
        fullNumber,
        normalizedFull: `${normalizedFull} x ${toBase}^${exponentFull}`,
        nonNormalizedCutOff,
        normalizedCutOff: `${normalizedCutOff} x ${toBase}^${exponentCutOff}`,
        nonNormalizedRounded,
        normalizedRounded: `${normalizedRounded} x ${toBase}^${exponentRounded}`
    };
}

// Example usage:
const numStr = "3.8";
const fromBase = 9;
const toBase = 10;
const t = 3; // Number of digits to keep

const result = convertWithPrecision(numStr, fromBase, toBase, t);

// Full representation with all digits
console.log("Full number non-normalized:", result.fullNumber);
console.log("Full number normalized:", result.normalizedFull);

// Cut-off representation
console.log("Cut-off non-normalized:", result.nonNormalizedCutOff);
console.log("Cut-off normalized:", result.normalizedCutOff);

// Rounded representation
console.log("Rounded non-normalized:", result.nonNormalizedRounded);
console.log("Rounded normalized:", result.normalizedRounded);