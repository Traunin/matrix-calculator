export default class Matrix {
    constructor(
        rowCount,
        colCount,
        isSquare = false,
        isAugmented = false,
        matrix
    ) {
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.isSquare = isSquare;
        this.isAugmented = isAugmented;
        this.determinant = 0;

        this.matrix = [];

        this.kVector = new Array(rowCount).fill(0);

        for (let i = 0; i < rowCount; i++) {
            this.matrix[i] = new Array(colCount).fill(0);
        }

        if (matrix != undefined) {
            this.matrix = matrix;
        }
    }

    addRow() {
        if (this.rowCount < 20) {
            this.matrix[this.rowCount] = new Array(this.colCount).fill(0);
            this.kVector[this.rowCount] = 0;
            this.rowCount++;
        }
    }

    removeRow() {
        if (this.rowCount > 1) {
            this.matrix.pop();
            this.kVector.pop();
            this.rowCount--;
        }
    }

    addCol() {
        if (this.colCount < 20) {
            for (let i = 0; i < this.rowCount; i++) {
                this.matrix[i][this.colCount] = 0;
            }

            this.colCount++;

            if (this.isSquare) {
                this.addRow();
            }
        }
    }

    setRowCount(newRowCount) {
        newRowCount = parseInt(newRowCount);
        if (
            newRowCount > 0 &&
            newRowCount <= 20 &&
            newRowCount != this.rowCount
        ) {
            this.matrix.length = newRowCount;
            this.kVector.length = newRowCount;

            for (let i = this.rowCount; i < newRowCount; i++) {
                this.matrix[i] = new Array(this.colCount).fill(0);
                this.kVector[i] = 0;
            }

            this.rowCount = newRowCount;

            return true; //size changed
        }

        return false;
    }

    setColCount(newColCount) {
        newColCount = parseInt(newColCount);
        if (
            newColCount > 0 &&
            newColCount <= 20 &&
            newColCount != this.colCount
        ) {
            for (let i = 0; i < this.rowCount; i++) {
                this.matrix[i].length = newColCount;
                for (let j = this.colCount; j < newColCount; j++) {
                    this.matrix[i][j] = 0;
                }
            }

            this.colCount = newColCount;

            if (this.isSquare) {
                this.setRowCount(newColCount);
            }

            return true; //size changed
        }

        return false;
    }

    removeCol() {
        if (this.colCount > 1) {
            for (let i = 0; i < this.rowCount; i++) {
                this.matrix[i].pop();
            }
            this.colCount--;

            if (this.isSquare) {
                this.removeRow();
            }
        }
    }

    updateCellValue(rowIndex, colIndex, newValue) {
        this.matrix[rowIndex][colIndex] = newValue;
    }

    updateKVectorValue(rowIndex, newValue) {
        this.kVector[rowIndex] = newValue;
    }

    updateMatrixFromString(newValue) {
        // Split the text into lines
        const lines = newValue.trim().split('\n');
        // Determine the dimensions of the matrix
        const rows = lines.length;
        let cols = this.isSquare ? rows : 0;
        // Determine the maximum column count among rows
        if (!this.isSquare) {
            cols = lines.reduce((maxCols, line) => {
                const rowCols = line.trim().split(/\s+/).length;
                return Math.max(maxCols, rowCols);
            }, 0);
        }
        // Create a new 2D array for the matrix
        const matrix = [];
        const parsedRows = [];
        // Parse the text and populate the matrix
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];

            const rowValues = lines[i].trim().split(/\s+/).map(parseFloat);
            parsedRows[i] = rowValues;
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = rowValues[j] || 0; // fill with 0 if no value
            }
            // Fill remaining columns with 0 if not square matrix
            if (!this.isSquare && cols > rowValues.length) {
                for (let k = rowValues.length; k < cols; k++) {
                    matrix[i][k] = 0;
                }
            }
        }
        // If isAugmented is true, calculate the kVector
        let kVector = null;
        if (this.isAugmented) {
            kVector = new Array(cols - 1).fill(0);
            for (let i = 0; i < rows; i++) {
                const kValue = this.isSquare
                    ? parsedRows[i][matrix.length]
                    : matrix[i].pop();
                kVector[i] = kValue;
            }
        }

        this.setMatrix(matrix, kVector);
    }

    getMatrixAsString() {
        let string = '';

        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                string += this.matrix[i][j];
                if (j < this.colCount - 1) {
                    string += ' ';
                }
            }

            if (this.isAugmented) {
                string += ' ';
                string += this.kVector[i];
            }

            if (i < this.rowCount - 1) {
                string += '\n';
            }
        }

        return string;
    }

    setMatrix(matrix, kVector) {
        this.rowCount = matrix.length;
        this.colCount = matrix[0].length;
        this.matrix = matrix;
        if (kVector != null) {
            this.kVector = kVector;
        }
    }

    calculateDetetrminantRecursively(matrix) {
        if (matrix == null) {
            return this.calculateDeterminant(this.matrix, this.matrix.length);
        }

        return this.calculateDeterminant(matrix, matrix.length);
    }

    calculateDeterminant(matrix, order) {
        if (order == 1) {
            return matrix[0][0];
        } else if (order == 2) {
            return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
        } else if (order == 3) {
            return (
                matrix[0][0] * matrix[1][1] * matrix[2][2] -
                matrix[0][0] * matrix[1][2] * matrix[2][1] -
                matrix[0][1] * matrix[1][0] * matrix[2][2] +
                matrix[0][1] * matrix[1][2] * matrix[2][0] +
                matrix[0][2] * matrix[1][0] * matrix[2][1] -
                matrix[0][2] * matrix[1][1] * matrix[2][0]
            );
        }

        let lowerOrderMatrix = [];
        // copying the array without the first row and the first column
        for (let i = 0; i < order - 1; i++) {
            lowerOrderMatrix[i] = [];
            for (let j = 0; j < order - 1; j++) {
                lowerOrderMatrix[i][j] = matrix[i + 1][j + 1];
            }
        }

        let subtraction = -1; // adding or subtracting based on the `
        let determinant =
            matrix[0][0] *
            this.calculateDeterminant(lowerOrderMatrix, order - 1);

        // shifting the excluded row
        for (let i = 0; i < order - 1; i++) {
            for (let j = 0; j < order - 1; j++) {
                lowerOrderMatrix[i][j] = matrix[i][j + 1];
            }
            determinant +=
                subtraction *
                matrix[i + 1][0] *
                this.calculateDeterminant(lowerOrderMatrix, order - 1);
            subtraction = -subtraction;
        }

        return Math.round(determinant * 10000) / 10000;
    }

    calculateSolutionsWithCramer() {
        let matrix = this.matrix;
        let kVector = this.kVector;

        let solutions = [];
        let rowCount = matrix.length;
        let columnCount = matrix[0].length;
        let determinant = this.calculateDetetrminantRecursively(matrix);

        if (determinant == 0) {
            return { solutions: [], determinant: 0 };
        }

        let matrixForInsertingKVector = JSON.parse(JSON.stringify(this.matrix));

        // insert the kVector in every column one by one
        for (let i = 0; i < columnCount; i++) {
            if (i > 0) {
                for (let j = 0; j < rowCount; j++) {
                    matrixForInsertingKVector[j][i - 1] = matrix[j][i - 1];
                }
            }

            for (let j = 0; j < rowCount; j++) {
                matrixForInsertingKVector[j][i] = kVector[j];
            }

            let currentDeterminant = this.calculateDetetrminantRecursively(
                matrixForInsertingKVector
            );

            solutions[i] =
                Math.round((currentDeterminant / determinant) * 10000) / 10000;
        }

        return { solutions: solutions, determinant: determinant };
    }

    static multiplyMatrices(matrix1, matrix2) {
        let product = [];
        // Determine dimensions of matrices
        let complementSquareSize = matrix1.length;
        let productColCount = matrix1[0].length;
        let productRowCount = matrix2.length;

        // Initialize product matrix with zeros
        for (let i = 0; i < productRowCount; i++) {
            product[i] = [];
            for (let j = 0; j < productColCount; j++) {
                product[i][j] = 0;
            }
        }

        // multiply
        for (let i = 0; i < productRowCount; i++) {
            //row
            for (let j = 0; j < productColCount; j++) {
                //col
                for (let k = 0; k < complementSquareSize; k++) {
                    product[i][j] += matrix1[k][j] * matrix2[i][k];
                }
            }
        }

        return product;
    }

    findInverseMatrix() {
        let determinant = this.calculateDetetrminantRecursively();

        if (determinant == 0) return { determinant }; // unable to find because the determinant is zero

        let algebraicComplementMatrix = new Array(this.rowCount);
        if (this.rowCount == 1) {
            algebraicComplementMatrix = [[1]];
        } else {
            for (let i = 0; i < this.rowCount; i++) {
                algebraicComplementMatrix[i] = new Array(this.colCount);
                for (let j = 0; j < this.colCount; j++) {
                    algebraicComplementMatrix[i][j] =
                        this.findAlgebraicComplement(this.matrix, i, j);
                }
            }
        }

        let inverseMatrix = this.transposeMatrix(algebraicComplementMatrix);
        for (let i = 0; i < inverseMatrix.length; i++) {
            for (let j = 0; j < inverseMatrix[0].length; j++) {
                inverseMatrix[i][j] =
                    Math.round((inverseMatrix[i][j] / determinant) * 10000) /
                    10000;
            }
        }

        return { determinant, inverseMatrix };
    }

    findAlgebraicComplement(matrix, row, col) {
        let minorMatrix = new Array(matrix.length - 1);
        for (let i = 0; i < minorMatrix.length; i++) {
            minorMatrix[i] = new Array(matrix[0].length - 1);
            for (let j = 0; j < matrix.length; j++) {
                minorMatrix[i][j] =
                    matrix[i + (i >= row ? 1 : 0)][j + (j >= col ? 1 : 0)];
            }
        }

        return (
            this.calculateDetetrminantRecursively(minorMatrix) *
            ((row + col) % 2 ? -1 : 1)
        );
    }

    transposeMatrix(matrix) {
        let transposedMatrixRowCount = matrix[0].length;
        let transposedMatrixColCount = matrix.length;

        let transposedMatrix = new Array(transposedMatrixRowCount);
        for (let i = 0; i < transposedMatrixRowCount; i++) {
            transposedMatrix[i] = new Array(transposedMatrixColCount);
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                transposedMatrix[j][i] = matrix[i][j];
            }
        }

        return transposedMatrix;
    }

    findSolutionsWithInverseMatrix() {
        let inverseMatrixResult = this.findInverseMatrix();
        if (inverseMatrixResult.determinant == 0) {
            return { determinant: 0 };
        }

        let kVectorMatrix = new Array(this.kVector.length);
        for (let i = 0; i < this.kVector.length; i++) {
            kVectorMatrix[i] = [this.kVector[i]];
        }

        let solution = Matrix.multiplyMatrices(
            kVectorMatrix,
            inverseMatrixResult.inverseMatrix
        );

        let solutions = [];

        for (let i = 0; i < solution.length; i++) {
            solutions[i] = solution[i][0];
        }

        return {
            determinant: inverseMatrixResult.determinant,
            solutions,
        };
    }

    copyMatrix(matrix) {
        let originalMatrix = matrix == undefined ? this.matrix : matrix;
        let rows = originalMatrix.length;
        if (rows == 0) return [];
        let cols = originalMatrix[0].length;

        let matrixCopy = new Array(rows);

        for (let i = 0; i < rows; i++) {
            matrixCopy[i] = new Array(cols);
            for (let j = 0; j < cols; j++) {
                matrixCopy[i][j] = originalMatrix[i][j];
            }
        }

        return matrixCopy;
    }

    roundToDecimalPlace(number, precision) {
        return (
            Math.round(
                (number + Number.EPSILON * Math.sign(number)) * 10 ** precision
            ) /
            10 ** precision
        );
    }

    solveWithGaussElimination() {
        let { rowEchelonMatrix, rowEchelonkVector } =
            this.convertMatrixToRowEchelonForm();

        this.convertToDiagonalFromRowEchelon(
            rowEchelonMatrix,
            rowEchelonkVector
        );

        let rows = rowEchelonMatrix.length;
        let cols = rowEchelonMatrix[0].length;

        let roots = [];

        for (let i = 0; i < Math.min(rows, cols); i++) {
            if (rowEchelonMatrix[i][i] <= Number.EPSILON * 100) {
                roots[i] = { k: 'R' };
                continue;
            }

            roots[i] = {
                k: `${this.roundToDecimalPlace(rowEchelonkVector[i], 4)}`,
                rationalSubtraction: {},
            };

            for (let j = i + 1; j < cols; j++) {
                if (Math.abs(rowEchelonMatrix[i][j]) > Number.EPSILON * 100) {
                    let subtractionCoefficient = Math.abs(
                        this.roundToDecimalPlace(rowEchelonMatrix[i][j], 4)
                    );

                    roots[i]['rationalSubtraction'][`${j + 1}`] =
                        (Math.sign(-rowEchelonMatrix[i][j]) == -1
                            ? ' - '
                            : ' + ') +
                        (subtractionCoefficient == 1
                            ? ''
                            : subtractionCoefficient);
                }
            }
        }

        for (let i = rows; i < cols; i++) {
            roots[i] = { k: 'R' };
        }

        return roots;
    }

    convertMatrixToRowEchelonForm(matrix, kVector) {
        let rowEchelonMatrix = this.copyMatrix(matrix);
        let rowEchelonkVector =
            kVector == undefined ? [...this.kVector] : [...kVector];

        let rows = rowEchelonMatrix.length;
        let cols = rowEchelonMatrix[0].length;

        let pivotNumberI = 0;
        let pivotNumberJ = 0;

        while (pivotNumberI < rows && pivotNumberJ < cols) {
            // find a row with a maximum absolute value in the current column
            let rowWithMaxNumber = pivotNumberI;
            let maxNumber = Math.abs(
                rowEchelonMatrix[pivotNumberI][pivotNumberJ]
            );

            for (let i = pivotNumberI + 1; i < rows; i++) {
                let checkingNumber = Math.abs(
                    rowEchelonMatrix[i][pivotNumberJ]
                );
                if (checkingNumber > maxNumber) {
                    maxNumber = checkingNumber;
                    rowWithMaxNumber = i;
                }
            }

            if (Math.abs(maxNumber) <= Number.EPSILON * 100) {
                pivotNumberJ++;
            } else {
                // swap rows so that the one with the largest absolut value is at the top
                if (rowWithMaxNumber != pivotNumberI) {
                    for (let j = pivotNumberJ; j < cols; j++) {
                        let temp = rowEchelonMatrix[rowWithMaxNumber][j];
                        rowEchelonMatrix[rowWithMaxNumber][j] =
                            rowEchelonMatrix[pivotNumberI][j];

                        rowEchelonMatrix[pivotNumberI][j] = temp;
                    }

                    let temp = rowEchelonkVector[pivotNumberI];
                    rowEchelonkVector[pivotNumberI] =
                        rowEchelonkVector[rowWithMaxNumber];
                    rowEchelonkVector[rowWithMaxNumber] = temp;
                }

                for (let i = pivotNumberI + 1; i < rows; i++) {
                    let factor =
                        rowEchelonMatrix[i][pivotNumberJ] /
                        rowEchelonMatrix[pivotNumberI][pivotNumberJ];
                    rowEchelonMatrix[i][pivotNumberJ] = 0;

                    for (let j = pivotNumberJ + 1; j < cols; j++) {
                        // subtract
                        rowEchelonMatrix[i][j] =
                            rowEchelonMatrix[i][j] -
                            rowEchelonMatrix[pivotNumberI][j] * factor +
                            Number.EPSILON;
                    }

                    rowEchelonkVector[i] =
                        rowEchelonkVector[i] -
                        rowEchelonkVector[pivotNumberI] * factor +
                        Number.EPSILON;
                }
            }

            pivotNumberI++;
            pivotNumberJ++;
        }

        return { rowEchelonMatrix, rowEchelonkVector };
    }

    convertToDiagonalFromRowEchelon(matrix, kVector) {
        let rows = matrix.length;
        let cols = matrix[0].length;

        for (let i = 1; i < Math.min(rows, cols); i++) {
            if (Math.abs(matrix[i][i]) > Number.EPSILON * 100) {
                for (let j = i - 1; j >= 0; j--) {
                    let factor = matrix[j][i] / matrix[i][i];
                    kVector[j] =
                        kVector[j] - kVector[i] * factor + Number.EPSILON;
                    matrix[j][i] = 0;
                    for (let k = i + 1; k < cols; k++) {
                        matrix[j][k] =
                            matrix[j][k] -
                            matrix[i][k] * factor +
                            Number.EPSILON;
                    }
                }
            }
        }

        for (let i = 0; i < Math.min(rows, cols); i++) {
            if (Math.abs(matrix[i][i]) > Number.EPSILON * 100) {
                kVector[i] = kVector[i] / matrix[i][i];
                for (let j = i + 1; j < cols; j++) {
                    matrix[i][j] /= matrix[i][i];
                }
                matrix[i][i] = 1;
            }
        }
    }

    getEigenvector() {
        let eigenVectors = [];
        let eigenvectorCount = this.rowCount;

        for (let i = 0; i < eigenvectorCount; i++) {
            let vector = new Array(eigenvectorCount);
            for (let j = 0; j < eigenvectorCount; j++) {
                vector[j] = [Math.random()];
            }
            //console.log(`vector${i}`, [...vector].toString())

            for (let j = 0; j < 100; j++) {
                vector = Matrix.multiplyMatrices(vector, this.matrix);
                //console.log(`vector${i}`, [...vector].toString())
                vector = this.normalizeVector(vector);
                //console.log(`vector${i}`, [...vector].toString())
            }


            let isPresent = false;
            for (let j = 0; j < eigenVectors; j++) {
                let equals = true;
                for (let k = 0; k < vector.length; ++k) {
                    if (vector[j][0] !== eigenVectors[i][0]) equals = false;
                    break;
                }
                if (equals) {
                    isPresent = true;
                    break;
                }
            }

            if (!isPresent) {
                eigenVectors.push(vector);
            }
        }

        return eigenVectors;
    }

    normalizeVector(vector) {
        let sum = 0
        for (let i = 0; i < vector.length; i++) {
            sum += vector[i]*vector[i]
        }
        let norm = Math.sqrt(sum);
        if (norm < Number.EPSILON * 100) {
            norm = 1
        }
        let normalisedVector = new Array(vector.length)
        for (let i = 0; i < vector.length; i++) {
            normalisedVector[i] = [vector[i][0]/norm]
        }
        return normalisedVector;
    }
}
