export default {
    methods: {
        calculateDetetrminantRecursively(matrix) {
            //console.table(matrix);
            return this.calculateDeterminant(matrix, matrix.length);
        },

        calculateDeterminant(matrix, order) {
            if (order == 1) {
                return matrix[0][0];
            } else if (order == 2) {
                return (
                    matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]
                );
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
        },

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

            let matrixForInsertingKVector = [];

            for (let i = 0; i < rowCount; i++) {
                matrixForInsertingKVector[i] = [];
                for (let j = 0; j < columnCount; j++) {
                    matrixForInsertingKVector[i][j] = matrix[i][j]; // forgive me for I have sinned
                }
            }

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
                    Math.round((currentDeterminant / determinant) * 10000) /
                    10000;
            }

            result.solutions = solutions;
            return result;
        },

        multiplyMatrices(matrix1, matrix2) {
            let product = [];
            // Determine dimensions of matrices
            let complementSquareSize = matrix1.length;
            let productColCount = matrix1[0].length;
            let productRowCount = matrix2.length;

            console.table(matrix1)
            console.table(matrix2)
        
            // Initialize product matrix with zeros
            for (let i = 0; i < productRowCount; i++) {
                product[i] = [];
                for (let j = 0; j < productColCount; j++) {
                    product[i][j] = 0;
                }
            }
        
            // multiply
            for (let i = 0; i < productRowCount; i++) { //row
                for (let j = 0; j < productColCount; j++) { //col
                    for (let k = 0; k < complementSquareSize; k++) {
                        product[i][j] += matrix1[k][j] * matrix2[i][k];
                    }
                }
            }

            return product;
        }
    },
};
