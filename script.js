class Calculator {
    constructor(firstMathTextElement, secondMathTextElement) {
        this.firstMathTextElement = firstMathTextElement
        this.secondMathTextElement = secondMathTextElement
        this.clear()
    }

    clear() {
           this.secondMath = ''
           this.firstMath = ''
           this.operation = undefined
    }

    delete() {
        this.secondMath = this.secondMath.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.secondMath.includes('.')) return
        this.secondMath = this.secondMath.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.secondMath === '') return
        if (this.firstMath !== '') {
            this.compute()
        }
            this.operation = operation
            this.firstMath = this.secondMath
            this.secondMath = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.firstMath)
        const current = parseFloat(this.secondMath)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break 
            case '*':
              computation = prev * current
              break 
            case '÷':
              computation = prev / current
              break
            default:
                return
        }
        this.secondMath = computation
        this.operation = undefined
        this.firstMath = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
         this.secondMathTextElement.innerText = 
         this.getDisplayNumber(this.secondMath)
         if (this.operation != null) {
         this.firstMathTextElement.innerText =
            `${this.getDisplayNumber(this.firstMath)} ${this.operation}`
         } else {
            this.firstMathTextElement.innerText = ''
         }   
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const firstMathTextElement = document.querySelector('[data-first-math]')
const secondMathTextElement = document.querySelector('[data-second-math]')

const calculator = new Calculator(firstMathTextElement, secondMathTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

