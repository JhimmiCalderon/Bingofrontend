// CustomBingoNumberGenerator.ts
class CustomBingoNumberGenerator {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  private random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  getRandomBingoNumber(column: string): number {
    let min = 1;
    let max = 15;

    switch (column) {
      case 'B':
        min = 1;
        max = 15;
        break;
      case 'I':
        min = 16;
        max = 30;
        break;
      case 'N':
        min = 31;
        max = 45;
        break;
      case 'G':
        min = 46;
        max = 60;
        break;
      case 'O':
        min = 61;
        max = 75;
        break;
      default:
        break;
    }

    return Math.floor(this.random() * (max - min + 1)) + min;
  }
}

export default CustomBingoNumberGenerator;
