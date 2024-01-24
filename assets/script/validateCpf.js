class CPFConstructor {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cleanCPF', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfSent.replace(/\D+/g, ''),
    });
  }

  isRepeatedSequence() {
    return this.cleanCPF.charAt(0).repeat(11) === this.cleanCPF;
  }

  generateNewCPF() {
    const cpfWithoutLastDigits = this.cleanCPF.slice(0, -2);
    const lastDigitOne = CPFConstructor.generateDigit(cpfWithoutLastDigits);
    const lastDigitTwo = CPFConstructor.generateDigit(cpfWithoutLastDigits + lastDigitOne);

    this.newCPF = cpfWithoutLastDigits + lastDigitOne + lastDigitTwo;
  }

  static generateDigit(cpfWithoutLastDigits) {
    let total = 0;
    let reverse = cpfWithoutLastDigits.length + 1;

    for (let stringNumber of cpfWithoutLastDigits) {
      total += reverse * Number(stringNumber);
      reverse--;
    }

    const formulaDigit = 11 - (total % 11);
    return formulaDigit <= 9 ? String(formulaDigit) : '0';
  }

  validation() {
    if (!this.cleanCPF) return false;
    if (typeof this.cleanCPF !== 'string') return false;
    if (this.cleanCPF.length !== 11) return false;
    if (this.isRepeatedSequence()) return false;
    this.generateNewCPF();

    return this.newCPF === this.cleanCPF;
  }
}
