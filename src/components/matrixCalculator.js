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
                return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
            } else if (order == 3) {
                return matrix[0][0] * matrix[1][1] * matrix[2][2] -
                       matrix[0][0] * matrix[1][2] * matrix[2][1] -
                       matrix[0][1] * matrix[1][0] * matrix[2][2] +
                       matrix[0][1] * matrix[1][2] * matrix[2][0] +
                       matrix[0][2] * matrix[1][0] * matrix[2][1] -
                       matrix[0][2] * matrix[1][1] * matrix[2][0];
            }
            
            let lowerOrderMatrix = [];
            // copying the array without the first row and the first column
            for (let i = 0; i < order - 1; i++) {
                lowerOrderMatrix[i] = []
                for (let j = 0; j < order-1; j++) {
                    lowerOrderMatrix[i][j] = matrix[i+1][j+1]
                }
            }
            
            let subtraction = -1;   // adding or subtracting based on the `
            let determinant = matrix[0][0] * this.calculateDeterminant(lowerOrderMatrix, order - 1);
    
            // shifting the excluded row
            for (let i = 0; i < order - 1; i++) {
                for (let j = 0; j < order - 1; j ++) {
                    lowerOrderMatrix[i][j] = matrix[i][j+1]
                }
                determinant += subtraction * matrix[i + 1][0] * this.calculateDeterminant(lowerOrderMatrix, order - 1);
                subtraction = -subtraction;
            }
    
            return determinant;

        
        }
    }
}