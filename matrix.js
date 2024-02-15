function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {

    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            td.textContent = dataArray[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);

    let result = null; 

    if (operation === 'add') {
        result = addMatrices(matrix1, matrix2);
    } else if (operation === 'subtract') {
        result = subtractMatrices(matrix1, matrix2);
    } else if (operation === 'multiply') {
        result = multiplyMatrices(matrix1, matrix2);
    }

    if (result !== null) {
        showResult2D('The Result', 'matrix3', result);
    } else {
        console.log("Operation could not be performed. Check matrices' dimensions.");
    }
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};

function addMatrices(matrix1, matrix2){ 
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Error");
        return null;
    }
    let sumResult = [];
    for (let row = 0; row < matrix1.length; row++) {
        let sumRow = [];
        for (let col = 0; col < matrix1[row].length; col++) {
            sumRow.push(matrix1[row][col] + matrix2[row][col]);
        }
        sumResult.push(sumRow);
    }
    return sumResult;
}
const subtractMatrices = function (matrix1, matrix2) { 
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Error");
        return null;
    }
    let differenceResult = [];
    for (let row = 0; row < matrix1.length; row++) {
        let differenceRow = [];
        for (let col = 0; col < matrix1[row].length; col++) {
            differenceRow.push(matrix1[row][col] - matrix2[row][col]);
        }
        differenceResult.push(differenceRow);
    }
    return differenceResult;
}
const multiplyMatrices = (matrix1, matrix2) => { 
    if (matrix1[0].length !== matrix2.length) {
        console.log("Error");
        return null;
    }
    let multiplicationResult = [];
    for (let row = 0; row < matrix1.length; row++) {
        multiplicationResult[row] = [];
        for (let col = 0; col < matrix2[0].length; col++) {
            let cellSum = 0;
            for (let index = 0; index < matrix1[0].length; index++) {
                cellSum += matrix1[row][index] * matrix2[index][col];
            }
            multiplicationResult[row][col] = cellSum;
        }
    }
    return multiplicationResult;
};
