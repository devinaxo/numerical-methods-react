import { Input } from 'keep-react';
import React, { useEffect, useRef, useState } from 'react';

const DesmosPlotter = (props) => {
    const calculatorRef = useRef(null);
    const { expression } = props;

    useEffect(() => {
        const elt = document.getElementById('calculator');
        calculatorRef.current = Desmos.GraphingCalculator(elt, { expressionsCollapsed: true });

        calculatorRef.current.setExpression({ id: 'graph1', latex: expression });

        return () => {
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (calculatorRef.current) {
            calculatorRef.current.setExpression({ id: 'graph1', latex: expression });
        }
    }, [expression]);


    return (
        <div className='flex flex-col items-center'>
            <div id="calculator" className='w-full h-96 mx-20'></div>
        </div>
    );
};

export default DesmosPlotter;
