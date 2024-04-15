export default class Matrix {
    constructor(rowCount, colCount, isSquare = false, isAugmented = false) {
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
        let newVal = parseFloat(newValue.target.value);
        this.matrix[rowIndex][colIndex] = newVal ? newVal : 0;
    }

    updateKVectorValue(rowIndex, newValue) {
        this.kVector[rowIndex] = parseFloat(newValue.target.value);
    }

    updateMatrixFromString(newValue) {
        // Split the text into lines
        const lines = newValue.trim().split("\n");
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
        // Parse the text and populate the matrix
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            const rowValues = lines[i].trim().split(/\s+/).map(parseFloat);
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
                const kValue = matrix[i][matrix[i].length-1];
                kVector[i] = kValue;
            }
        }

        this.setMatrix(matrix, kVector);
    }

    getMatrixAsString() {
        let string = "";

        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                string += this.matrix[i][j];
                if (j < this.colCount - 1) {
                    string += " ";
                }
            }

            if (this.isAugmented) {
                string += " ";
                string += this.kVector[i];
            }

            if (i < this.rowCount - 1) {
                string += "\n";
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

        return {
            determinant: inverseMatrixResult.determinant,
            solution: Matrix.multiplyMatrices(
                kVectorMatrix,
                inverseMatrixResult.inverseMatrix
            ),
        };
    }
}
