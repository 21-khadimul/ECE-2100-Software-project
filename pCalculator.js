
//CASIO
//fx-991EX


let expression = '', previousResult = '', previousExpression = '';
let tempPreviousResult = '', resultInSD = 0;

// UNUVARSAL

let A, B, C, D, X, Y;
let sumSign = 0, subtractSign = 0, multiplySign = 0, powerForMatrix = 0;
let count = 1;

//  MATRIX MODE VARIABLE


let variableForMatrix = 0, modeSetCount = 0, setMatrixA = '', setMatrixB = '', setMatrixC = '', setMatrixD = '', setMatrixX = '', determinant = 0, invertMatrix = 0, matSum, countForFirstChar = 0, variavleForLastCase = 0;


//  EQUATION MODE VARIABLE

let variableForEquation = 0, modeSetCountForEquation = 0, variableForSimul = 0, variableForPoly = 0, simulSetCountForEquation = 0;


//  CALCULAS VARIABLE

let variableForDifferentiate = 0, variableForIntegrate = 0;

// VECTOR MODE VARIABLE

let variableForVector = 0, dot = 0, cross = 0, modeSetCountForVector = 0;


//  PARTIAL FRACTION VARIABLE


let variableForPartialFraction = 0, modeSetCountForPartialFraction = 0;

//  GRAPH VARIABLE


let variableForGraph = 0;
let xValues = [];
let yValues1 = [];
let yValues2 = [];

let start = -10;   // Initial X start
let end = 10;      // Initial X end
let yStart = -10;  // Initial Y start
let yEnd = 10;     // Initial Y end
let step = 0.01;    // Step size for X values


let expression1 = '', expression2 = '';

function plot() {
    expression1 = '', expression2 = '';

    function includeY() {
        return expression.includes("Y");
    }

    if (includeY()) {

        let tempExpression = expression;

        expression = expression + ',Y'
        expression = 'solve(' + expression + ')';

        console.log(expression);

        expression = expression.replace(/×/g, "*");

        let x = nerdamer(`${expression}`);

        let resultOfEquation = x.toString();
        console.log(resultOfEquation);
        let start = 0, count = 0;

        for (let i = 0; i < resultOfEquation.length; i++) {

            if (resultOfEquation.charAt(i) === '[' && start === 0) {
                start = 1;
                count++;
                console.log(i);
            }

            if (count === 1) {


                console.log(i);
                expression1 += resultOfEquation.charAt(i);
                console.log(expression1);
            }

            if (resultOfEquation.charAt(i) === ',') {
                start = 0;
                count++;
                console.log(start);
                console.log('else');
                console.log(i);
            }



            if (count === 2) {
                expression2 += resultOfEquation.charAt(i);
                console.log('count');
            }


        }
        console.log(expression1);
        console.log(expression2);
        expression1 = expression1.slice(0, -1);
        expression2 = expression2.slice(0, -1);
        expression1 = expression1.slice(1);
        expression2 = expression2.slice(1);

        console.log(expression1);
        console.log(expression2);

        expression = tempExpression;

    }
    else {

        expression1 = expression;
        expression2 = "";
        console.log(expression1);

    }



    updatePlot();
}

// CANVAS
function toggleGraph() {

    let plotContainer = document.getElementById('plot-container');
    let toggleBtn = document.getElementById('toggleBtn');
    let clearBtn = document.getElementById('clearBtn');

    console.log(expression);



    if (plotContainer.style.display === 'none') {
        document.querySelector('.js-modeShow').value = '       GRAPH';
        plotContainer.style.display = 'block';
        toggleBtn.textContent = '';
        clearBtn.style.display = 'inline';

        updatePlot();
    } else {
        document.querySelector('.js-modeShow').value = '';
        plotContainer.style.display = 'none';
        toggleBtn.textContent = '';
        expression1 = '';
        expression2 = '';
        updatePlot();
    }
}

function clearGraph() {

    document.querySelector('.js-modeShow').value = '';

    Plotly.purge('plot');
    document.getElementById('plot-container').style.display = 'none';
    document.getElementById('toggleBtn').textContent = '';
    document.getElementById('clearBtn').style.display = 'none';
    expression1 = '';
    expression2 = '';
    updatePlot();
}


function generateXValues(start, end, step) {
    xValues = [];
    for (let i = start; i <= end; i += step) {
        xValues.push(i);
    }
}

function generateYValues() {
    yValues1 = [];
    yValues2 = [];



    let expr1 = expression1
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/sin\^-1/g, "Math.asin")
        .replace(/cos\^-1/g, "Math.acos")
        .replace(/tan\^-1/g, "Math.atan")
        .replace(/\bsin\b/g, "Math.sin")
        .replace(/\bcos\b/g, "Math.cos")
        .replace(/\btan\b/g, "Math.tan")

        .replace(/ln/g, "Math.log")
        .replace(/√/g, "Math.sqrt")
        .replace(/log([0-9]+)\(([^)]+)\)/g, "(Math.log($2) / Math.log($1))") // atan remains in radians
        .replace(/\^/g, "**")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/abs/g, "Math.abs");

    let expr2 = expression2
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/\^/g, "**")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/ln/g, "Math.log")
        .replace(/√/g, "Math.sqrt")
        .replace(/log([0-9]+)\(([^)]+)\)/g, "(Math.log($2) / Math.log($1))")
        .replace(/tan\^-1/g, "Math.atan")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E");


    console.log(expr1);
    console.log(expr2);




    for (let i = 0; i < xValues.length; i++) {
        let X = xValues[i];
        try {

            yValues1.push(eval(expr1));
            yValues2.push(eval(expr2));

            console.log(i);
            // console.log(yValues1.push(eval(expr1)))

        } catch (error) {
            yValues1.push(null);
            yValues2.push(null);
        }
    }
}

function zoomOut() {
    start -= 1;
    end += 1;
    yStart -= 1; // Expand Y range
    yEnd += 1;

    generateXValues(start, end, step);
    generateYValues();
    updatePlot();
}

function zoomIn() {
    start += 1;
    end -= 1;
    yStart += 1; // Shrink Y range
    yEnd -= 1;

    generateXValues(start, end, step);
    generateYValues();
    updatePlot();
}

function updatePlot() {
    console.log(expression1);
    console.log(expression2);
    generateXValues(start, end, step);
    generateYValues();

    let trace1 = {
        x: xValues,
        y: yValues1,
        mode: 'lines',
        name: '1st',
        line: { color: 'blue' }
    };

    let trace2 = {
        x: xValues,
        y: yValues2,
        mode: 'lines',
        name: '2nd',
        line: { color: 'blue' }
    };

    let layout = {
        title: 'PLOT A FUNCTION',
        xaxis: { title: 'X', range: [start, end] },
        yaxis: { title: 'Y', range: [yStart, yEnd] }
    };

    Plotly.newPlot('plot', [trace1, trace2], layout);
}



// CALCULATOR

function writeInDisplay(v) {

    console.log(v);

    if (variableForVector === 1 && v === 'C') {
        cross = 1;
        dot = 0;
        console.log(cross + ' ' + dot);
        writeInDisplay('cross([');
    }
    else {
        if (variableForMatrix === 1 && v === '+') {
            sumSign = 1;
        }
        else if (variableForMatrix === 1 && v === '-') {
            subtractSign = 1;
        }
        else if (variableForMatrix === 1 && v === '^-1') {
            invertMatrix = 1;
        }
        else if (variableForMatrix === 1 && v === '×') {
            multiplySign = 1;
        }
        else if (variableForMatrix === 1 && v === '^') {
            powerForMatrix = 1;
            console.log(variableForMatrix);
        }
        else if (v === 'partfrac(') {

            variableForPartialFraction = 1;
            variableForMatrix = 0;
            variableForEquation = 0;
            variableForVector = 0;
            console.log(variableForPartialFraction);
        }



        if (expression === '') {
            document.querySelector('.js-input').value = '';
        }


        expression += v;
        console.log(expression);
        document.querySelector('.js-input').value += v;

    }


}
console.log(expression);

// ALL CALTULATION

function calculateResult() {
    console.log(expression);

    // matrix calculation

    if (variableForMatrix === 1 && determinant === 1) {

        console.log('m1');

        let lastchar2 = expression.charAt(expression.length - 2);
        console.log(lastchar2);

        if (lastchar2 === 'A') {
            console.log(setMatrixA.length)
            if (setMatrixA.length === 11) {
                let n = Number(setMatrixA.charAt(setMatrixA.length - 3))
                document.querySelector('.js-input').value = n;
                determinant = 0;
                expression = '';
            }
            else {
                console.log(`${setMatrixA}`);

                nerdamer.setVar('temSet', `${setMatrixA}`);


                nerdamer.setVar('M', 'matrix([4,5],[1,7])');
                let x = nerdamer('determinant(M)');
                console.log(x.toString());

                let temp = nerdamer('determinant(temSet)').evaluate();

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
            }

        }
        else if (lastchar2 === 'B') {
            console.log(setMatrixB.length)
            if (setMatrixB.length === 11) {
                let n = Number(setMatrixB.charAt(setMatrixB.length - 3))
                document.querySelector('.js-input').value = n;
            }
            else {
                console.log(`${setMatrixB}`);

                nerdamer.setVar('temSet', `${setMatrixB}`);


                nerdamer.setVar('M', 'matrix([4,5],[1,7])');
                let x = nerdamer('determinant(M)');
                console.log(x.toString());

                let temp = nerdamer('determinant(temSet)').evaluate();

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
            }
        }
        else if (lastchar2 === 'C') {
            console.log(setMatrixC.length)
            if (setMatrixC.length === 11) {
                let n = Number(setMatrixC.charAt(setMatrixC.length - 3))
                document.querySelector('.js-input').value = n;
            }
            else {
                console.log(`${setMatrixC}`);

                nerdamer.setVar('temSet', `${setMatrixC}`);


                nerdamer.setVar('M', 'matrix([4,5],[1,7])');
                let x = nerdamer('determinant(M)');
                console.log(x.toString());

                let temp = nerdamer('determinant(temSet)').evaluate();

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
            }
        }
        else if (lastchar2 === 'D') {
            console.log(setMatrixD.length)
            if (setMatrixD.length === 11) {
                let n = Number(setMatrixD.charAt(setMatrixD.length - 3))
                document.querySelector('.js-input').value = n;
            }
            else {
                console.log(`${setMatrixD}`);

                nerdamer.setVar('temSet', `${setMatrixD}`);


                nerdamer.setVar('M', 'matrix([4,5],[1,7])');
                let x = nerdamer('determinant(M)');
                console.log(x.toString());

                let temp = nerdamer('determinant(temSet)').evaluate();

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
            }
        }
        else if (lastchar2 === 'X') {
            console.log(setMatrixX.length)
            if (setMatrixX.length === 11) {
                let n = Number(setMatrixX.charAt(setMatrixX.length - 3))
                document.querySelector('.js-input').value = n;
            }
            else {
                console.log(`${setMatrixX}`);

                nerdamer.setVar('temSet', `${setMatrixX}`);


                nerdamer.setVar('M', 'matrix([4,5],[1,7])');
                let x = nerdamer('determinant(M)');
                console.log(x.toString());

                let temp = nerdamer('determinant(temSet)').evaluate();

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
            }
        }

    }
    else if (variableForMatrix === 1 && invertMatrix === 1) {
        console.log('m2');
        let firstchar = expression.charAt(0);
        console.log(firstchar);

        console.log(setMatrixA);



        if (firstchar === 'A') {
            let lastchar3 = setMatrixA.charAt(expression.length + 4);
            console.log(lastchar3);
            console.log(setMatrixA.length + 4)
            if (setMatrixA.length === 11) {

                document.querySelector('.js-input').value = `matrix([1/${lastchar3}])`;
                previousResult = `matrix([1/${lastchar3}])`;
                console.log(previousResult);
                invertMatrix = 0;
                expression = '';
            }
            else {
                console.log(`${setMatrixA}`);

                nerdamer.setVar('temSet', `${setMatrixA}`);

                let temp = nerdamer('invert(temSet)');

                console.log(temp.toString());

                previousResult = temp.toString();
                console.log(previousResult);

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
                invertMatrix = 0;
            }

        }
        else if (firstchar === 'B') {
            let lastchar3 = setMatrixB.charAt(expression.length + 4);
            console.log(lastchar3);
            console.log(setMatrixB.length + 4)
            if (setMatrixB.length === 11) {

                document.querySelector('.js-input').value = `matrix([1/${lastchar3}])`;
                previousResult = `matrix([1/${lastchar3}])`;
                console.log(previousResult);
                invertMatrix = 0;
                expression = '';
            }
            else {
                console.log(`${setMatrixB}`);

                nerdamer.setVar('temSet', `${setMatrixB}`);

                let temp = nerdamer('invert(temSet)');

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
                invertMatrix = 0;
            }
        }
        else if (firstchar === 'C') {
            let lastchar3 = setMatrixC.charAt(expression.length + 4);
            console.log(lastchar3);
            console.log(setMatrixC.length + 4)
            if (setMatrixC.length === 11) {

                document.querySelector('.js-input').value = `matrix([1/${lastchar3}])`;
                previousResult = `matrix([1/${lastchar3}])`;
                console.log(previousResult);
                invertMatrix = 0;
                expression = '';
            }
            else {
                console.log(`${setMatrixC}`);

                nerdamer.setVar('temSet', `${setMatrixC}`);

                let temp = nerdamer('invert(temSet)');

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
                invertMatrix = 0;

            }
        }
        else if (firstchar === 'D') {
            let lastchar3 = setMatrixD.charAt(expression.length + 4);
            console.log(lastchar3);
            console.log(setMatrixD.length + 4)
            if (setMatrixD.length === 11) {

                document.querySelector('.js-input').value = `matrix([1/${lastchar3}])`;
                previousResult = `matrix([1/${lastchar3}])`;
                console.log(previousResult);
                invertMatrix = 0;
                expression = '';
            }
            else {
                console.log(`${setMatrixD}`);

                nerdamer.setVar('temSet', `${setMatrixD}`);

                let temp = nerdamer('invert(temSet)');

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
                invertMatrix = 0;
            }
        }
        else if (firstchar === 'X') {
            let lastchar3 = setMatrixX.charAt(expression.length + 4);
            console.log(lastchar3);
            console.log(setMatrixX.length + 4)
            if (setMatrixX.length === 11) {

                document.querySelector('.js-input').value = `matrix([1/${lastchar3}])`;
                previousResult = `matrix([1/${lastchar3}])`;
                console.log(previousResult);
                invertMatrix = 0;
                expression = '';
            }
            else {
                console.log(`${setMatrixX}`);

                nerdamer.setVar('temSet', `${setMatrixX}`);

                let temp = nerdamer('invert(temSet)');

                console.log(temp.toString());

                previousResult = temp.toString();

                document.querySelector('.js-input').value = temp.toString();

                expression = '';
                determinant = 0;
                invertMatrix = 0;
            }
        }
    }
    else if (variableForMatrix === 1 && (sumSign === 1 || subtractSign === 1 || multiplySign === 1 || powerForMatrix === 1) && (expression.charAt(0) === 'A' || expression.charAt(0) === 'B' || expression.charAt(0) === 'C' || expression.charAt(0) === 'D' || expression.charAt(0) === 'X')) {
        console.log('m3');
        console.log(5);

        if (powerForMatrix === 1) {

            let power = 0;
            console.log(expression.length);
            for (let i = 2; i <= expression.length; i++) {
                power += expression.charAt(i);
            }
            power = Number(power);
            console.log(expression.length);
            console.log(power);

            let _0char = expression.charAt(0);

            expression = '';

            for (let i = 0; i < power; i++) {
                if (_0char === 'A') {
                    if (i === 0) {
                        expression += 'A';
                    }
                    else {
                        expression += '×A';
                        console.log(expression);
                    }

                }
                else if (_0char === 'B') {
                    if (i === 0) {
                        expression += 'B';
                    }
                    else {
                        expression += '×B';
                        console.log(expression);
                    }
                }
                else if (_0char === 'C') {
                    if (i === 0) {
                        expression += 'C';
                    }
                    else {
                        expression += '×C';
                        console.log(expression);
                    }
                }
                else if (_0char === 'D') {
                    if (i === 0) {
                        expression += 'D';
                    }
                    else {
                        expression += '×D';
                        console.log(expression);
                    }
                }
                else if (_0char === 'X') {
                    if (i === 0) {
                        expression += 'X';
                    }
                    else {
                        expression += '×X';
                        console.log(expression);
                    }
                }
            }
            console.log(expression);

            for (let i = 0; i < expression.length; i++) {
                console.log('length' + expression.length);

                let tempChar = expression.charAt(i);
                console.log(tempChar);
                let tempSign = expression.charAt(i - 1);
                console.log(tempSign);
                console.log('loop ' + i);


                if (i === 0) {
                    console.log(9);
                    if (tempChar === 'A') {
                        console.log('9a');
                        matSum = setMatrixA;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'B') {
                        console.log('9b');
                        matSum = setMatrixB;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'C') {
                        matSum = setMatrixC;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'D') {
                        matSum = setMatrixD;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'X') {
                        matSum = setMatrixX;
                        console.log(90);
                        console.log(matSum.toString());
                    }


                }
                else {
                    if (tempSign === '+') {
                        console.log(3);
                        calculateSumMatrix(`${tempChar}`);

                    }
                    else if (tempSign === '-') {
                        calculateSubtractMatrix(`${tempChar}`);
                    }
                    else if (tempSign === '×') {
                        calculateMultiplyMatrix(`${tempChar}`);
                    }


                }
            }

            sumSign = 0;
            subtractSign = 0;
            expression = '';

        }

        else {

            for (let i = 0; i < expression.length; i++) {
                console.log('length' + expression.length);

                let tempChar = expression.charAt(i);
                console.log(tempChar);
                let tempSign = expression.charAt(i - 1);
                console.log(tempSign);
                console.log('loop ' + i);
                if (i === 0) {
                    console.log(9);
                    if (tempChar === 'A') {
                        console.log('9a');
                        matSum = setMatrixA;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'B') {
                        console.log('9b');
                        matSum = setMatrixB;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'C') {
                        matSum = setMatrixC;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'D') {
                        matSum = setMatrixD;
                        console.log(matSum.toString());
                    }
                    else if (tempChar === 'X') {
                        matSum = setMatrixX;
                        console.log(90);
                        console.log(matSum.toString());
                    }


                }
                else {
                    if (tempSign === '+') {
                        console.log(3);
                        calculateSumMatrix(`${tempChar}`);

                    }
                    else if (tempSign === '-') {
                        calculateSubtractMatrix(`${tempChar}`);
                    }
                    else if (tempSign === '×') {
                        calculateMultiplyMatrix(`${tempChar}`);
                    }


                }
            }

            sumSign = 0;
            subtractSign = 0;
            expression = '';
        }


    }
    else if (variableForMatrix === 1 && setVariableForLastCase() && !((expression.charAt(0) === 'A' || expression.charAt(0) === 'B' || expression.charAt(0) === 'C' || expression.charAt(0) === 'D' || expression.charAt(0) === 'X'))) {
        console.log('m4');
        let tempOnlyChar = '';
        for (let i = 0; i < expression.length; i++) {
            if (expression.charAt(i) === 'A') {
                tempOnlyChar = 'A';
                break;
            }
            else if (expression.charAt(i) === 'B') {
                tempOnlyChar = 'B';
                break;
            }
            else if (expression.charAt(i) === 'C') {
                tempOnlyChar = 'C';
                break;
            }
            else if (expression.charAt(i) === 'D') {
                tempOnlyChar = 'D';
                break;
            }
            else if (expression.charAt(i) === 'X') {
                tempOnlyChar = 'X';
                break;
            }

        }

        if (tempOnlyChar === 'A') {
            nerdamer.setVar('M', `${setMatrixA}`);
            expression = expression.replace(/A/g, "M");
            expression = expression.replace(/×/g, "*");
            var x = nerdamer(`${expression}`);
            previousResult = x.toString();
            document.querySelector('.js-input').value = x.toString();
            expression = '';
            console.log(x.toString());
        }
        else if (tempOnlyChar === 'B') {
            nerdamer.setVar('M', `${setMatrixB}`);
            expression = expression.replace(/B/g, "M");
            expression = expression.replace(/×/g, "*");
            var x = nerdamer(`${expression}`);
            previousResult = x.toString();
            document.querySelector('.js-input').value = x.toString();
            expression = '';
            console.log(x.toString());
        }
        else if (tempOnlyChar === 'C') {
            nerdamer.setVar('M', `${setMatrixC}`);
            expression = expression.replace(/C/g, "M");
            expression = expression.replace(/×/g, "*");
            var x = nerdamer(`${expression}`);
            previousResult = x.toString();
            document.querySelector('.js-input').value = x.toString();
            expression = '';
            console.log(x.toString());
        }
        else if (tempOnlyChar === 'D') {
            nerdamer.setVar('M', `${setMatrixD}`);
            expression = expression.replace(/D/g, "M");
            expression = expression.replace(/×/g, "*");
            var x = nerdamer(`${expression}`);
            previousResult = x.toString();
            document.querySelector('.js-input').value = x.toString();
            expression = '';
            console.log(x.toString());
        }
        else if (tempOnlyChar === 'X') {
            nerdamer.setVar('M', `${setMatrixX}`);
            expression = expression.replace(/X/g, "M");
            expression = expression.replace(/×/g, "*");
            var x = nerdamer(`${expression}`);
            previousResult = x.toString();
            document.querySelector('.js-input').value = x.toString();
            expression = '';
            console.log(x.toString());
        }

    }
    else if (variableForEquation === 1 && isItEquation()) {
        console.log(expression);

        if (variableForSimul === 1) {
            expression = expression.replace(/×/g, "*");
            console.log(expression);
            expression.replace
            console.log(expression.split(','));
            let newExpression = expression.split(',');
            var resultOfSimulEquation = nerdamer.solveEquations(newExpression);
            console.log(resultOfSimulEquation.toString());
            previousResult = resultOfSimulEquation.toString();
            document.querySelector('.js-input').value = resultOfSimulEquation;

            expression = '';
        }
        else {
            let lastString = expression.charAt(expression.length - 1);

            expression = 'solve(' + expression + ')';

            console.log(expression);

            expression = expression.replace(/×/g, "*");

            let x = nerdamer(`${expression}`);

            console.log(x.toString());
            let resultOfEquation = x.toString();

            resultOfEquation = `${lastString}` + '=' + x.toString();

            document.querySelector('.js-input').value = resultOfEquation;

            expression = '';

        }




    }
    else if (variableForVector === 1 && (dot === 1 || cross === 1)) {
        if (dot === 1) {
            console.log(expression);
            var resultOfDotProduct = nerdamer(`${expression}`);
            console.log(resultOfDotProduct.toString());

            document.querySelector('.js-input').value = resultOfDotProduct.toString();

            dot = 0;
            previousResult = resultOfDotProduct;

            expression = '';

        }
        else if (cross === 1) {
            console.log(expression);
            var resultOfCrossProduct = nerdamer(`${expression}`);
            console.log(resultOfCrossProduct.toString());

            document.querySelector('.js-input').value = resultOfCrossProduct.toString();

            cross = 0;
            previousResult = resultOfCrossProduct.toString();

            expression = '';
        }
    }
    else {

        if (variableForDifferentiate === 1) {
            console.log(expression);
            var resultOfDifferetation = nerdamer(`${expression}`);

            document.querySelector('.js-input').value = resultOfDifferetation.toString();


            previousResult = resultOfDifferetation.toString();;

            variableForDifferentiate = 0;
            expression = '';
        }
        else if (variableForIntegrate === 1) {


            if (!(expression.charAt(expression.length - 2) === 'A' || expression.charAt(expression.length - 2) === 'B' || expression.charAt(expression.length - 2) === 'C' || expression.charAt(expression.length - 2) === 'D' || expression.charAt(expression.length - 2) === 'X' || expression.charAt(expression.length - 2) === 'Y' || expression.charAt(expression.length - 2) === 'x' || expression.charAt(expression.length - 2) === 'y')) {
                expression = expression.replace(/÷/g, "/");
                expression = expression.replace(/×/g, "*");
                let newExpression = '';
                let flag = 0;
                for (let i = 0; i < expression.length; i++) {

                    if (expression.charAt(i) === '(') {
                        flag = 1;
                    }
                    if (flag === 1) {
                        newExpression += expression.charAt(i);
                    }

                }
                console.log(expression);
                expression = 'defint' + newExpression;
                console.log(expression);

                var y = nerdamer('defint(x^2+2*x+1,0, 10)');
                console.log(y.text());
                var resultOfIntegration = nerdamer(`${expression}`);

                console.log(resultOfIntegration);

                document.querySelector('.js-input').value = resultOfIntegration.text();

                previousResult = resultOfIntegration.toString();

                variableForIntegrate = 0;
                expression = '';
            }
            else {
                expression = expression.replace(/÷/g, "/");
                expression = expression.replace(/×/g, "*");
                console.log(expression);
                var resultOfIntegration = nerdamer(`${expression}`);

                document.querySelector('.js-input').value = resultOfIntegration.toString();

                previousResult = resultOfIntegration.text();

                variableForIntegrate = 0;
                expression = '';
            }


        }
        else if (variableForPartialFraction === 1 && isItEquation()) {


            console.log(isItEquation());
            expression = expression.replace(/÷/g, "/");
            expression = expression.replace(/×/g, "*");
            var resultOfPartialFraction = nerdamer(`${expression}`);



            document.querySelector('.js-input').value = resultOfPartialFraction.toString();

            expression = '';
            variableForPartialFraction = 0;
            console.log(variableForPartialFraction);

        }
        else if (expression.charAt(expression.length - 1) === '!') {
            expression = expression.slice(0, -1);
            let n = Number(expression);

            factorial(n);
        }
        else {
            console.log(variableForEquation);
            console.log(isItEquation());

            console.log('m5');
            try {

                expression = expression.replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)")
                expression = expression.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)")
                expression = expression.replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)")


                expression = expression.replace(/ln\(([^)]+)\)/g, "Math.log($1)");
                expression = expression.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)");
                expression = expression.replace(/log([0-9]+)\(([^)]+)\)/g, "(Math.log($2) / Math.log($1))");

                expression = expression.replace(/sin\^-1/g, "Math.asin");
                expression = expression.replace(/cos\^-1/g, "Math.acos");
                expression = expression.replace(/tan\^-1/g, "Math.atan");
                expression = expression.replace(/abs/g, "Math.abs");
                expression = expression.replace(/A/g, A);
                expression = expression.replace(/B/g, B);
                expression = expression.replace(/C/g, C);
                expression = expression.replace(/D/g, D);
                expression = expression.replace(/X/g, X);
                expression = expression.replace(/Y/g, Y)

                expression = expression.replace(/\^/g, "**");
                expression = expression.replace(/×/g, "*");
                expression = expression.replace(/÷/g, "/");
                expression = expression.replace(/π/g, "Math.PI");
                expression = expression.replace(/e/g, "Math.E");




            }
            catch (e) {
                return error;
            }

            console.log(expression);
            let result = new Function('return ' + expression)();
            console.log(result);

            result = Number(result.toPrecision(10));

            console.log(typeof result);

            document.querySelector('.js-input').value = result;


            previousResult = Number(result);
            previousExpression = expression;
            expression = '';
        }





    }

}






function callAns() {
    expression += previousResult;

    if (variableForMatrix === 1) {
        document.querySelector('.js-input').value = previousResult;
    }
    else {
        document.querySelector('.js-input').value = Number(expression);
    }


}

function clearDisplay() {
    console.log(document.querySelector('.js-input').value);

    document.querySelector('.js-input').value = '';

    expression = '';

    console.log(document.querySelector('.js-input').value);
}
function deleteLastCharacter() {

    console.log(expression);
    expression = expression.slice(0, -1);
    console.log(expression);


    document.querySelector('.js-input').value = expression;

}

function factorial(n) {
    let factorial = n;

    for (let i = factorial - 1; i > 1; i--) {
        factorial *= i;
    }
    expression = '';
    document.querySelector('.js-input').value = factorial;
    console.log(factorial);
}



// CLICL TIMER



let clickTimer;

function handleSingleClick(value) {

    if (variableForVector === 1 && value === 'D') {
        dot = 1;
        cross = 0;
        console.log(dot + " " + cross);
        writeInDisplay('dot([');
    }

    else {
        if (clickTimer) {
            clearTimeout(clickTimer);
        }
        clickTimer = setTimeout(() => {
            console.log("Single click detected");
            writeInDisplay(value);
            // Add your single-click logic here
        }, 200); // Delay to differentiate single and double click

        if (value === 'integrate(') {
            variableForIntegrate = 1;
            console.log(variableForIntegrate);
        }
    }


}

function handleDoubleClick(value) {
    if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
    }
    console.log("Double click detected");
    writeInDisplay(value);
    console.log(expression);

    if (variableForMatrix === 1 && value === 'determinant(') {

        determinant = 1;
        console.log(determinant);

    }
    if (value === 'diff(') {
        variableForDifferentiate = 1;
        console.log(variableForDifferentiate);
        variableForIntegrate = 0;
        console.log(variableForIntegrate);
    }



    // Add your double-click logic here
}




// MATRIX MODE

function setModeVariableForMatrix() {



    if (modeSetCount === 0) {
        modeSetCount++;
        variableForMatrix = 1;
        document.querySelector('.js-modeShow').value = '      MATRIX';
        console.log(variableForMatrix);

        // RESET ALL OTHER MODE
        variableForEquation = 0;
        variableForPartialFraction = 0;
        variableForVector = 0;
    }
    else if (modeSetCount == 1) {
        variableForMatrix = 0;
        document.querySelector('.js-modeShow').value = '';
        modeSetCount = 0;
        console.log(variableForMatrix);
    }
}

function storeSomething(v) {

    if (variableForEquation === 1 && variableForSimul === 0) {
        variableForSimul = 1;
        console.log(variableForSimul);
        document.querySelector('.js-modeShow').value = ' EQUA (SIMUL)';

    }
    else if (variableForEquation == 1 && variableForSimul === 1) {
        variableForSimul = 0;
        document.querySelector('.js-modeShow').value = '  EQUA (POLY)';
        console.log(variableForSimul);
    }

    else {
        if (variableForMatrix === 1) {
            console.log(v);
            let lastchar = v.charAt(v.length - 1);

            v = v.slice(0, -1);

            console.log(lastchar);
            console.log(v);
            nerdamer.setVar(lastchar, nerdamer(`matrix(${v})`));

            if (lastchar === 'A') {
                setMatrixA = nerdamer(lastchar).toString();
            }
            else if (lastchar === 'B') {
                setMatrixB = nerdamer(lastchar).toString();
            }
            else if (lastchar === 'C') {
                setMatrixC = nerdamer(lastchar).toString();
            }
            else if (lastchar === 'D') {
                setMatrixD = nerdamer(lastchar).toString();
            }
            else if (lastchar === 'X') {
                setMatrixX = nerdamer(lastchar).toString();
            }

            console.log(nerdamer(lastchar).toString());
            document.querySelector('.js-input').value = `Stor ~ ${lastchar}`;


            expression = '';
        }

        else {

            console.log(v);
            let lastchar = v.charAt(v.length - 1);

            v = v.slice(0, -1);

            console.log(lastchar);
            console.log(v);

            if (lastchar === 'A') {
                A = Number(v);
            }
            else if (lastchar === 'B') {
                B = Number(v);
            }
            else if (lastchar === 'C') {
                C = Number(v);
            }
            else if (lastchar === 'D') {
                D = Number(v);
            }
            else if (lastchar === 'X') {
                X = Number(v);
            }
            else if (lastchar === 'Y') {
                Y = Number(v);
            }

            document.querySelector('.js-input').value = `Stor ~ ${lastchar}`;
            expression = '';
        }
    }




}

function getSomething() {

    if (variableForMatrix === 1) {
        let tempExpression = '';

        tempExpression = expression;

        expression = expression.slice(0, -1);
        if (tempExpression.charAt(tempExpression.length - 1) === 'A') {
            expression += setMatrixA;
            document.querySelector('.js-input').value = expression;
            expression = '';

        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'B') {
            expression += setMatrixB;
            document.querySelector('.js-input').value = expression;
            expression = '';
        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'C') {
            expression += setMatrixC;
            document.querySelector('.js-input').value = expression;
            expression = '';
        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'D') {
            expression += setMatrixD;
            document.querySelector('.js-input').value = expression;
            expression = '';
        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'X') {
            expression += setMatrixX;
            document.querySelector('.js-input').value = expression;
            expression = '';
        }

    }
    else {
        let tempExpression = '';

        tempExpression = expression;

        expression = expression.slice(0, -1);
        if (tempExpression.charAt(tempExpression.length - 1) === 'A') {
            expression += `${A}`;
            document.querySelector('.js-input').value = expression;


        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'B') {
            expression += `${B}`;
            document.querySelector('.js-input').value = expression;

        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'C') {
            expression += `${C}`;
            document.querySelector('.js-input').value = expression;

        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'D') {
            expression += `${D}`;
            document.querySelector('.js-input').value = expression;

        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'X') {
            expression += `${X}`;
            document.querySelector('.js-input').value = expression;

        }
        else if (tempExpression.charAt(tempExpression.length - 1) === 'Y') {
            expression += `${Y}`;
            document.querySelector('.js-input').value = expression;

        }
    }
}

function calculateSumMatrix(v) {



    if (v === 'A') {



        matSum = nerdamer(`${matSum}+ ${setMatrixA}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'B') {



        matSum = nerdamer(`${matSum}+ ${setMatrixB}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'C') {



        matSum = nerdamer(`${matSum}+ ${setMatrixC}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'D') {



        matSum = nerdamer(`${matSum}+ ${setMatrixD}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();


    }
    else if (v === 'X') {



        matSum = nerdamer(`${matSum}+ ${setMatrixX}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
}

function calculateSubtractMatrix(v) {


    if (v === 'A') {



        matSum = nerdamer(`${matSum}- ${setMatrixA}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'B') {



        matSum = nerdamer(`${matSum}- ${setMatrixB}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'C') {



        matSum = nerdamer(`${matSum}- ${setMatrixC}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'D') {



        matSum = nerdamer(`${matSum}- ${setMatrixD}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();


    }
    else if (v === 'X') {



        matSum = nerdamer(`${matSum}- ${setMatrixX}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }

}
function calculateMultiplyMatrix(v) {
    if (v === 'A') {



        matSum = nerdamer(`${matSum} * ${setMatrixA}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'B') {



        matSum = nerdamer(`${matSum} *  ${setMatrixB}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'C') {



        matSum = nerdamer(`${matSum} * ${setMatrixC}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }
    else if (v === 'D') {



        matSum = nerdamer(`${matSum} * ${setMatrixD}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();
        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();


    }
    else if (v === 'X') {



        matSum = nerdamer(`${matSum} * ${setMatrixX}`);


        console.log(matSum.toString());

        previousResult = matSum.toString();

        console.log(previousResult);
        document.querySelector('.js-input').value = matSum.toString();

    }

}
function setVariableForLastCase() {
    let flag = 0;
    for (let i = 0; i < expression.length; i++) {

        if (((expression.charAt(i) === 'A') || (expression.charAt(i) === 'B') || (expression.charAt(i) === 'C') || (expression.charAt(i) === 'D') || (expression.charAt(i) === 'X'))) {
            console.log(true);
            console.log(i);
            flag = 1;
            return true;
        }

    }
    if (flag === 0) {
        console.log(false);
        return false;
    }

}


// EQUATION MODE

function setModeVariableForEquation() {

    if (modeSetCountForEquation === 0) {
        modeSetCountForEquation++;
        variableForEquation = 1;
        document.querySelector('.js-modeShow').value = '  EQUA (POLY)';
        console.log(variableForEquation);
        // RESET ALL OTHER MODE
        variableForMatrix = 0;
        variableForPartialFraction = 0;
        variableForVector = 0;

    }
    else if (modeSetCountForEquation == 1) {
        variableForEquation = 0;
        modeSetCountForEquation = 0;
        document.querySelector('.js-modeShow').value = '';
        console.log(variableForEquation);
    }
}

function isItEquation() {
    for (let i = 0; i < expression.length; i++) {
        if (expression.charAt(i) === 'A' || expression.charAt(i) === 'B' || expression.charAt(i) === 'C' || expression.charAt(i) === 'D' || expression.charAt(i) === 'X' || expression.charAt(i) === 'Y' || expression.charAt(i) === 'a' || expression.charAt(i) === 'b' || expression.charAt(i) === 'x' || expression.charAt(i) === 'y') {
            return true;
        }

    }
    return false;
}

// VECTOR MODE,

function setModeVariableForVector() {

    if (modeSetCountForVector === 0) {
        modeSetCountForVector++;
        variableForVector = 1;
        document.querySelector('.js-modeShow').value = '     VECTOR';
        console.log(variableForVector);
        // RESET ALL OTHER MODE
        variableForMatrix = 0;
        variableForPartialFraction = 0;
        variableForEquation = 0;

    }
    else if (modeSetCountForVector == 1) {
        variableForVector = 0;
        modeSetCountForVector = 0;
        document.querySelector('.js-modeShow').value = '';
        console.log(variableForVector);
    }


}

// SD CONVERSION

function SD() {

    if (tempPreviousResult !== previousResult) {
        count = 1;
    }
    if (count % 2 !== 0) {
        console.log(previousExpression);

        var y = previousExpression;
        var x = nerdamer(`${y}`);
        var g = x.text('decimals');
        var b = nerdamer(`${g}`);
        console.log(b.text('fractions'))
        resultInSD = b.text('fractions');

        if (document.querySelector('.js-input').value !== '') {
            document.querySelector('.js-input').value = b.text('fractions');
            count++;
        }

    }
    else if (count % 2 === 0) {
        console.log(previousExpression);

        var y = resultInSD;
        var x = nerdamer(`${y}`);

        console.log(x.text('decimals'));
        if (document.querySelector('.js-input').value !== '') {
            document.querySelector('.js-input').value = x.text('decimals');
            count++;
        }

    }
    tempPreviousResult = previousResult;


}

//MODE sHOW
