import Algebrite from 'algebrite'
import type { RationalRoot, Root } from '@/types/types'

export default class Matrix {
  rowCount: number
  colCount: number
  isSquare: boolean
  isAugmented: boolean
  determinant: number
  matrix: number[][]
  kVector: number[]

  constructor(
    rowCount: number,
    colCount: number,
    isSquare = false,
    isAugmented = false,
    matrix?: number[][],
  ) {
    this.rowCount = rowCount
    this.colCount = colCount
    this.isSquare = isSquare
    this.isAugmented = isAugmented
    this.determinant = 0

    this.matrix = []

    this.kVector = Array.from<number>({ length: rowCount }).fill(0)

    for (let i = 0; i < rowCount; i++) {
      this.matrix[i] = Array.from<number>({ length: colCount }).fill(0)
    }

    if (matrix !== undefined) {
      this.matrix = matrix
    }
  }

  addRow() {
    if (this.rowCount < 20) {
      this.matrix[this.rowCount] = Array.from<number>({ length: this.colCount }).fill(0)
      this.kVector[this.rowCount] = 0
      this.rowCount++
    }
  }

  removeRow() {
    if (this.rowCount > 1) {
      this.matrix.pop()
      this.kVector.pop()
      this.rowCount--
    }
  }

  addCol() {
    if (this.colCount < 20) {
      for (let i = 0; i < this.rowCount; i++) {
        this.matrix[i][this.colCount] = 0
      }

      this.colCount++

      if (this.isSquare) {
        this.addRow()
      }
    }
  }

  setRowCount(newRowCount: number) {
    if (
      newRowCount > 0 &&
      newRowCount <= 20 &&
      newRowCount !== this.rowCount
    ) {
      this.matrix.length = newRowCount
      this.kVector.length = newRowCount

      for (let i = this.rowCount; i < newRowCount; i++) {
        this.matrix[i] = Array.from<number>({ length: this.colCount }).fill(0)
        this.kVector[i] = 0
      }

      this.rowCount = newRowCount

      return true // size changed
    }

    return false
  }

  setColCount(newColCount: number) {
    if (
      newColCount > 0 &&
      newColCount <= 20 &&
      newColCount !== this.colCount
    ) {
      for (let i = 0; i < this.rowCount; i++) {
        this.matrix[i].length = newColCount
        for (let j = this.colCount; j < newColCount; j++) {
          this.matrix[i][j] = 0
        }
      }

      this.colCount = newColCount

      if (this.isSquare) {
        this.setRowCount(newColCount)
      }

      return true // size changed
    }

    return false
  }

  removeCol() {
    if (this.colCount > 1) {
      for (let i = 0; i < this.rowCount; i++) {
        this.matrix[i].pop()
      }
      this.colCount--

      if (this.isSquare) {
        this.removeRow()
      }
    }
  }

  updateCellValue(rowIndex: number, colIndex: number, newValue: number) {
    this.matrix[rowIndex][colIndex] = newValue
  }

  updateKVectorValue(rowIndex: number, newValue: number) {
    this.kVector[rowIndex] = newValue
  }

  updateMatrixFromString(newValue: string) {
    // Split the text into lines
    const lines = newValue.trim().split('\n')
    // Determine the dimensions of the matrix
    const rows = lines.length
    let cols = this.isSquare ? rows : 0
    // Determine the maximum column count among rows
    if (!this.isSquare) {
      cols = lines.reduce((maxCols, line) => {
        const rowCols = line.trim().split(/\s+/).length
        return Math.max(maxCols, rowCols)
      }, 0)
    }
    // Create a new 2D array for the matrix
    const matrix: number[][] = []
    const parsedRows = []
    // Parse the text and populate the matrix
    for (let i = 0; i < rows; i++) {
      matrix[i] = []

      const rowValues = lines[i].trim().split(/\s+/).map(Number.parseFloat)
      parsedRows[i] = rowValues
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = rowValues[j] || 0 // fill with 0 if no value
      }
      // Fill remaining columns with 0 if not square matrix
      if (!this.isSquare && cols > rowValues.length) {
        for (let k = rowValues.length; k < cols; k++) {
          matrix[i][k] = 0
        }
      }
    }
    // If isAugmented is true, calculate the kVector
    let kVector: number[] | undefined
    if (this.isAugmented) {
      kVector = Array.from<number>({ length: cols - 1 }).fill(0)
      for (let i = 0; i < rows; i++) {
        const kValue = this.isSquare ?
          parsedRows[i][matrix.length] :
            matrix[i].pop()
        if (kValue !== undefined) {
          kVector[i] = kValue
        }
      }
    }

    this.setMatrix(matrix, kVector)
  }

  getMatrixAsString() {
    let string = ''

    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.colCount; j++) {
        string += this.matrix[i][j]
        if (j < this.colCount - 1) {
          string += ' '
        }
      }

      if (this.isAugmented) {
        string += ' '
        string += this.kVector[i]
      }

      if (i < this.rowCount - 1) {
        string += '\n'
      }
    }

    return string
  }

  setMatrix(matrix: number[][], kVector?: number[]) {
    this.rowCount = matrix.length
    this.colCount = matrix[0].length
    this.matrix = matrix
    if (kVector != null) {
      this.kVector = kVector
    }
  }

  calculateDetetrminantRecursively(matrix?: number[][]) {
    if (matrix == null) {
      return this.calculateDeterminant(this.matrix, this.matrix.length)
    }

    return this.calculateDeterminant(matrix, matrix.length)
  }

  calculateDeterminant(matrix: number[][], order: number): number {
    if (order === 1) {
      return matrix[0][0]
    } else if (order === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]
    } else if (order === 3) {
      return (
        matrix[0][0] * matrix[1][1] * matrix[2][2] -
        matrix[0][0] * matrix[1][2] * matrix[2][1] -
        matrix[0][1] * matrix[1][0] * matrix[2][2] +
        matrix[0][1] * matrix[1][2] * matrix[2][0] +
        matrix[0][2] * matrix[1][0] * matrix[2][1] -
        matrix[0][2] * matrix[1][1] * matrix[2][0]
      )
    }

    const lowerOrderMatrix: number[][] = []
    // copying the array without the first row and the first column
    for (let i = 0; i < order - 1; i++) {
      lowerOrderMatrix[i] = []
      for (let j = 0; j < order - 1; j++) {
        lowerOrderMatrix[i][j] = matrix[i + 1][j + 1]
      }
    }

    let subtraction = -1 // adding or subtracting based on the position in the matrix
    let determinant =
      matrix[0][0] *
      this.calculateDeterminant(lowerOrderMatrix, order - 1)

    // shifting the excluded row
    for (let i = 0; i < order - 1; i++) {
      for (let j = 0; j < order - 1; j++) {
        lowerOrderMatrix[i][j] = matrix[i][j + 1]
      }
      determinant +=
        subtraction *
        matrix[i + 1][0] *
        this.calculateDeterminant(lowerOrderMatrix, order - 1)
      subtraction = -subtraction
    }

    return Math.round(determinant * 10000) / 10000
  }

  calculateSolutionsWithCramer() {
    const matrix = this.matrix
    const kVector = this.kVector

    const solutions = []
    const rowCount = matrix.length
    const columnCount = matrix[0].length
    const determinant = this.calculateDetetrminantRecursively(matrix)

    if (determinant === 0) {
      return { solutions: [], determinant: 0 }
    }

    const matrixForInsertingKVector = JSON.parse(JSON.stringify(this.matrix))

    // insert the kVector in every column one by one
    for (let i = 0; i < columnCount; i++) {
      if (i > 0) {
        for (let j = 0; j < rowCount; j++) {
          matrixForInsertingKVector[j][i - 1] = matrix[j][i - 1]
        }
      }

      for (let j = 0; j < rowCount; j++) {
        matrixForInsertingKVector[j][i] = kVector[j]
      }

      const currentDeterminant = this.calculateDetetrminantRecursively(
        matrixForInsertingKVector,
      )

      solutions[i] =
        Math.round((currentDeterminant / determinant) * 10000) / 10000
    }

    return { solutions, determinant }
  }

  static multiplyMatrices(matrix1: number[][], matrix2: number[][]) {
    const product: number[][] = []
    // Determine dimensions of matrices
    const complementSquareSize = matrix1.length
    const productColCount = matrix1[0].length
    const productRowCount = matrix2.length

    // Initialize product matrix with zeros
    for (let i = 0; i < productRowCount; i++) {
      product[i] = []
      for (let j = 0; j < productColCount; j++) {
        product[i][j] = 0
      }
    }

    // multiply
    for (let i = 0; i < productRowCount; i++) {
      // row
      for (let j = 0; j < productColCount; j++) {
        // col
        for (let k = 0; k < complementSquareSize; k++) {
          product[i][j] += matrix1[k][j] * matrix2[i][k]
        }
      }
    }

    return product
  }

  findInverseMatrix(): ({ determinant: number, inverseMatrix?: number[][] }) {
    const determinant = this.calculateDetetrminantRecursively()

    if (determinant === 0) {
      // unable to find because the determinant is zero
      return { determinant }
    }
    let algebraicComplementMatrix = Array.from<number[]>({ length: this.rowCount })
    if (this.rowCount === 1) {
      algebraicComplementMatrix = [[1]]
    } else {
      for (let i = 0; i < this.rowCount; i++) {
        algebraicComplementMatrix[i] = Array.from({ length: this.colCount })
        for (let j = 0; j < this.colCount; j++) {
          algebraicComplementMatrix[i][j] =
            this.findAlgebraicComplement(this.matrix, i, j)
        }
      }
    }

    const inverseMatrix = this.transposeMatrix(algebraicComplementMatrix)
    for (let i = 0; i < inverseMatrix.length; i++) {
      for (let j = 0; j < inverseMatrix[0].length; j++) {
        inverseMatrix[i][j] =
          Math.round((inverseMatrix[i][j] / determinant) * 10000) /
          10000
      }
    }

    return { determinant, inverseMatrix }
  }

  findAlgebraicComplement(matrix: number[][], row: number, col: number) {
    const minorMatrix = Array.from<number[]>({ length: matrix.length - 1 })
    for (let i = 0; i < minorMatrix.length; i++) {
      minorMatrix[i] = Array.from({ length: matrix[0].length - 1 })
      for (let j = 0; j < matrix.length; j++) {
        minorMatrix[i][j] =
          matrix[i + (i >= row ? 1 : 0)][j + (j >= col ? 1 : 0)]
      }
    }

    return (
      this.calculateDetetrminantRecursively(minorMatrix) *
      ((row + col) % 2 ? -1 : 1)
    )
  }

  transposeMatrix(matrix: number[][]) {
    const transposedMatrixRowCount = matrix[0].length
    const transposedMatrixColCount = matrix.length

    const transposedMatrix = Array.from<number[]>({ length: transposedMatrixRowCount })
    for (let i = 0; i < transposedMatrixRowCount; i++) {
      transposedMatrix[i] = Array.from<number>({ length: transposedMatrixColCount })
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        transposedMatrix[j][i] = matrix[i][j]
      }
    }

    return transposedMatrix
  }

  findSolutionsWithInverseMatrix() {
    const { determinant, inverseMatrix } = this.findInverseMatrix()
    if (determinant === 0) {
      return { determinant: 0 }
    }

    const kVectorMatrix = Array.from<number[]>({ length: this.kVector.length })
    for (let i = 0; i < this.kVector.length; i++) {
      kVectorMatrix[i] = [this.kVector[i]]
    }

    const solution = Matrix.multiplyMatrices(
      kVectorMatrix,
      inverseMatrix!,
    )

    const solutions = []

    for (let i = 0; i < solution.length; i++) {
      solutions[i] = solution[i][0]
    }

    return {
      determinant,
      solutions,
    }
  }

  copyMatrix(matrix?: number[][]) {
    const originalMatrix = matrix === undefined ? this.matrix : matrix
    const rows = originalMatrix.length
    if (rows === 0) {
      return []
    }
    const cols = originalMatrix[0].length

    const matrixCopy = Array.from<number[]>({ length: rows })

    for (let i = 0; i < rows; i++) {
      matrixCopy[i] = Array.from({ length: cols })
      for (let j = 0; j < cols; j++) {
        matrixCopy[i][j] = originalMatrix[i][j]
      }
    }

    return matrixCopy
  }

  roundToDecimalPlace(number: number, precision: number) {
    return (
      Math.round(
        (number + Number.EPSILON * Math.sign(number)) * 10 ** precision,
      ) /
      10 ** precision
    )
  }

  solveWithGaussElimination() {
    const { rowEchelonMatrix, rowEchelonkVector } =
      this.convertMatrixToRowEchelonForm()

    this.convertToDiagonalFromRowEchelon(
      rowEchelonMatrix,
      rowEchelonkVector,
    )

    const rows = rowEchelonMatrix.length
    const cols = rowEchelonMatrix[0].length

    const roots: Root[] = []

    for (let i = 0; i < Math.min(rows, cols); i++) {
      if (rowEchelonMatrix[i][i] <= Number.EPSILON * 100) {
        roots[i] = { k: 'R' }
        continue
      }

      roots[i] = {
        k: `${this.roundToDecimalPlace(rowEchelonkVector[i], 4)}`,
        rationalSubtraction: {},
      }

      for (let j = i + 1; j < cols; j++) {
        if (Math.abs(rowEchelonMatrix[i][j]) > Number.EPSILON * 100) {
          const subtractionCoefficient = Math.abs(
            this.roundToDecimalPlace(rowEchelonMatrix[i][j], 4),
          )

          if (roots[i].k !== 'R') {
            (roots[i] as RationalRoot).rationalSubtraction[`${j + 1}`] =
            (Math.sign(-rowEchelonMatrix[i][j]) === -1 ?
              ' - ' :
              ' + ') +
              (subtractionCoefficient === 1 ? '' : subtractionCoefficient)
          }
        }
      }
    }

    for (let i = rows; i < cols; i++) {
      roots[i] = { k: 'R' }
    }

    return roots
  }

  convertMatrixToRowEchelonForm(matrix?: number[][], kVector?: number[]) {
    const rowEchelonMatrix = this.copyMatrix(matrix)
    const rowEchelonkVector =
      kVector === undefined ? [...this.kVector] : [...kVector]

    const rows = rowEchelonMatrix.length
    const cols = rowEchelonMatrix[0].length

    let pivotNumberI = 0
    let pivotNumberJ = 0

    while (pivotNumberI < rows && pivotNumberJ < cols) {
      // find a row with a maximum absolute value in the current column
      let rowWithMaxNumber = pivotNumberI
      let maxNumber = Math.abs(
        rowEchelonMatrix[pivotNumberI][pivotNumberJ],
      )

      for (let i = pivotNumberI + 1; i < rows; i++) {
        const checkingNumber = Math.abs(
          rowEchelonMatrix[i][pivotNumberJ],
        )
        if (checkingNumber > maxNumber) {
          maxNumber = checkingNumber
          rowWithMaxNumber = i
        }
      }

      if (Math.abs(maxNumber) <= Number.EPSILON * 100) {
        pivotNumberJ++
      } else {
        // swap rows so that the one with the largest absolut value is at the top
        if (rowWithMaxNumber !== pivotNumberI) {
          for (let j = pivotNumberJ; j < cols; j++) {
            const temp = rowEchelonMatrix[rowWithMaxNumber][j]
            rowEchelonMatrix[rowWithMaxNumber][j] =
              rowEchelonMatrix[pivotNumberI][j]

            rowEchelonMatrix[pivotNumberI][j] = temp
          }

          const temp = rowEchelonkVector[pivotNumberI]
          rowEchelonkVector[pivotNumberI] =
            rowEchelonkVector[rowWithMaxNumber]
          rowEchelonkVector[rowWithMaxNumber] = temp
        }

        for (let i = pivotNumberI + 1; i < rows; i++) {
          const factor =
            rowEchelonMatrix[i][pivotNumberJ] /
            rowEchelonMatrix[pivotNumberI][pivotNumberJ]
          rowEchelonMatrix[i][pivotNumberJ] = 0

          for (let j = pivotNumberJ + 1; j < cols; j++) {
            // subtract
            rowEchelonMatrix[i][j] =
              rowEchelonMatrix[i][j] -
              rowEchelonMatrix[pivotNumberI][j] * factor +
              Number.EPSILON
          }

          rowEchelonkVector[i] =
            rowEchelonkVector[i] -
            rowEchelonkVector[pivotNumberI] * factor +
            Number.EPSILON
        }
      }

      pivotNumberI++
      pivotNumberJ++
    }

    return { rowEchelonMatrix, rowEchelonkVector }
  }

  convertToDiagonalFromRowEchelon(matrix: number[][], kVector: number[]) {
    const rows = matrix.length
    const cols = matrix[0].length

    for (let i = 1; i < Math.min(rows, cols); i++) {
      if (Math.abs(matrix[i][i]) > Number.EPSILON * 100) {
        for (let j = i - 1; j >= 0; j--) {
          const factor = matrix[j][i] / matrix[i][i]
          kVector[j] =
            kVector[j] - kVector[i] * factor + Number.EPSILON
          matrix[j][i] = 0
          for (let k = i + 1; k < cols; k++) {
            matrix[j][k] =
              matrix[j][k] -
              matrix[i][k] * factor +
              Number.EPSILON
          }
        }
      }
    }

    for (let i = 0; i < Math.min(rows, cols); i++) {
      if (Math.abs(matrix[i][i]) > Number.EPSILON * 100) {
        kVector[i] = kVector[i] / matrix[i][i]
        for (let j = i + 1; j < cols; j++) {
          matrix[i][j] /= matrix[i][i]
        }
        matrix[i][i] = 1
      }
    }
  }

  getEigenvector() {
    const eigenvalues = this.getEigenvectorEquation()
    const eigenvectors: string[][][] = []
    eigenvalues.forEach((eigenvalue) => {
      const eigenvector = this.getEigenvectorFromEigenvalue(eigenvalue)
      eigenvectors.push(eigenvector)
    },
    )
    const eigenpairs = []
    for (let i = 0; i < eigenvectors.length; i++) {
      eigenpairs.push({
        eigenvalue: eigenvalues[i],
        eigenvector: eigenvectors[i],
      })
    }
    return eigenpairs
  }

  getEigenvectorEquation() {
    const stringMatrix = this.getAlphaStringsMatrix(this.matrix)
    const determinatEquation = this.getDeterminantFormula(
      stringMatrix,
      stringMatrix.length,
    )

    const eigenvalues: string[] = Algebrite.nroots(
      Algebrite.simplify(determinatEquation),
    )
      .toString()
      .replace(/[[\]]|\.\.\./g, '')
      .split(',')
    console.log('before', eigenvalues)
    // get rid of complex roots
    return eigenvalues.filter((val) => !val.includes('i'))
  }

  getDeterminantFormula(matrix: string[][], order: number) {
    if (order === 1) {
      return `${matrix[0][0]}`
    } else if (order === 2) {
      return `${matrix[0][0]}*${matrix[1][1]}-${matrix[1][0]}*${matrix[0][1]}`
    } else if (order === 3) {
      return (
        `${matrix[0][0]} * ${matrix[1][1]} * ${matrix[2][2]}` +
        `- ${matrix[0][0]} * ${matrix[1][2]} * ${matrix[2][1]}` +
        `- ${matrix[0][1]} * ${matrix[1][0]} * ${matrix[2][2]}` +
        `+ ${matrix[0][1]} * ${matrix[1][2]} * ${matrix[2][0]}` +
        `+ ${matrix[0][2]} * ${matrix[1][0]} * ${matrix[2][1]}` +
        `- ${matrix[0][2]} * ${matrix[1][1]} * ${matrix[2][0]}`
      )
    }

    const lowerOrderMatrix: string[][] = []
    // copying the array without the first row and the first column
    for (let i = 0; i < order - 1; i++) {
      lowerOrderMatrix[i] = []
      for (let j = 0; j < order - 1; j++) {
        lowerOrderMatrix[i][j] = matrix[i + 1][j + 1]
      }
    }

    let subtraction = -1 // adding or subtracting based on the position in the matrix
    let determinant: string = `${matrix[0][0]} * (${this.getDeterminantFormula(
      lowerOrderMatrix,
      order - 1,
    )})`

    // shifting the excluded row
    for (let i = 0; i < order - 1; i++) {
      for (let j = 0; j < order - 1; j++) {
        lowerOrderMatrix[i][j] = matrix[i][j + 1]
      }
      determinant +=
        `${subtraction === 1 ? '+' : '-'
        }${matrix[i + 1][0]} * (${this.getDeterminantFormula(
          lowerOrderMatrix,
          order - 1,
        )})`
      subtraction = -subtraction
    }

    return determinant
  }

  getAlphaStringsMatrix(matrix: number[][]) {
    const matrixSize = matrix.length
    const stringMatrix = Array.from<string[]>({ length: matrixSize })
    for (let i = 0; i < matrixSize; i++) {
      stringMatrix[i] = Array.from({ length: matrixSize })

      for (let j = 0; j < matrixSize; j++) {
        if (i === j) {
          stringMatrix[i][j] = `(${this.floatToDivisionString(
            matrix[i][j],
          )}-x)`
        } else {
          stringMatrix[i][j] = `${this.floatToDivisionString(
            matrix[i][j],
          )}`
        }
      }
    }

    return stringMatrix
  }

  countDecimals(value: number) {
    if (value % 1 !== 0) {
      return value.toString().split('.')[1].length
    }
    return 0
  }

  floatToDivisionString(value: number) {
    const decimalPlaces = this.countDecimals(value)
    if (decimalPlaces === 0) {
      return `(${value})`
    }
    const factor = 10 ** decimalPlaces
    return `(${value * factor}/${factor})`
  }

  getEigenvectorFromEigenvalue(stringEigenvalue: string) {
    const eigenvalue = Number.parseFloat(stringEigenvalue)
    const size = this.matrix.length
    const matrixForSubtraction = this.copyMatrix(this.matrix)
    for (let i = 0; i < size; i++) {
      matrixForSubtraction[i][i] -= eigenvalue
    }
    const rowEchelonForm = this.convertMatrixToRowEchelonForm(
      matrixForSubtraction,
      Array.from<number>({ length: size }).fill(0),
    )

    console.log(eigenvalue, rowEchelonForm)
    return this.parseMatrixIntoEigenvector(rowEchelonForm.rowEchelonMatrix)
  }

  parseMatrixIntoEigenvector(rowEchelonMatrix: number[][]) {
    const size = rowEchelonMatrix.length
    const eigenvectorComponents = []

    for (let i = 0; i < size; i++) {
      if (rowEchelonMatrix[i][i] <= Number.EPSILON * 100) {
        eigenvectorComponents[i] = [`x${i + 1}`]
        continue
      }
      let eigenvectorComponent = ''

      for (let j = i + 1; j < size; j++) {
        if (Math.abs(rowEchelonMatrix[i][j]) > Number.EPSILON * 100) {
          const subtractionCoefficient = Math.abs(
            this.roundToDecimalPlace(rowEchelonMatrix[i][j], 4),
          )

          eigenvectorComponent +=
            `${(Math.sign(-rowEchelonMatrix[i][j]) === -1 ?
              ' - ' :
              ' + ') +
              (subtractionCoefficient === 1 ?
                '' :
                subtractionCoefficient)
            }x${j + 1}`
        }
      }

      if (
        eigenvectorComponent.charAt(1) === '-' &&
        eigenvectorComponent.charAt(2) === ' '
      ) {
        eigenvectorComponent = eigenvectorComponent.replace(' - ', '-')
      }

      if (
        eigenvectorComponent.charAt(1) === '+' &&
        eigenvectorComponent.charAt(2) === ' '
      ) {
        eigenvectorComponent = eigenvectorComponent.replace(' + ', '')
      }

      eigenvectorComponent = eigenvectorComponent || '0'
      eigenvectorComponents[i] = [eigenvectorComponent]
    }
    return eigenvectorComponents
  }
}
