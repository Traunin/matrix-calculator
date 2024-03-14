export default class Matrix {
    constructor(rowCount, colCount, isSquare = false, isAugmented = false) {
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.isSquare = isSquare;
        this.isAugmented = isAugmented;

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
        if (newRowCount > 0 && newRowCount <= 20 && newRowCount != this.rowCount) {
            this.matrix.length = newRowCount;
            this.kVector.length = newRowCount;

            for (let i = this.rowCount; i < newRowCount; i++) {
                this.matrix[i] = new Array(this.colCount).fill(0);
                this.kVector[i] = 0;
            }

            this.rowCount = newRowCount;

            return true //size changed
        }

        return false
    }

    setColCount(newColCount) {
        newColCount = parseInt(newColCount);
        if (newColCount > 0 && newColCount <= 20 && newColCount != this.colCount) {
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

            return true //size changed
        }

        return false
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
        this.matrix[rowIndex][colIndex] = parseFloat(newValue.target.value);
    }

    updateKVectorValue(rowIndex, newValue) {
        this.kVector[rowIndex] = parseFloat(newValue.target.value);
    }

    calculateDetetrminantRecursively() {
        this.determinant = this.calculateDeterminant(this.matrix, this.matrix.length);
        console.log(this.determinant)
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

    calculateSolutionsWithKrammer(matrix, kVector) {
        let result = {};
        let rowCount = matrix.length;
        let columnCount = matrix[0].length;
        let determinant = this.calculateDetetrminantRecursively(matrix);
        result.determinant = determinant;
        if (determinant == 0) {
            result.roots = [];
            return result;
        }

        let matrixForInsertingKVector = JSON.parse(JSON.stringify(this.matrix));


        let solutions = [];
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

            console.table(currentDeterminant, determinant);
            solutions[i] =
                Math.round((currentDeterminant / determinant) * 10000) / 10000;
        }

        result.solutions = solutions;
        return result;
    }

    multiplyMatrices(matrix1, matrix2) {
        let product = [];
        // Determine dimensions of matrices
        let complementSquareSize = matrix1.length;
        let productColCount = matrix1[0].length;
        let productRowCount = matrix2.length;

        console.table(matrix1);
        console.table(matrix2);

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
}
