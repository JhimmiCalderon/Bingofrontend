// CustomBingoNumberGenerator.ts

/**
 * Clase para generar números aleatorios personalizados para un juego de Bingo.
 */
class CustomBingoNumberGenerator {
  private seed: number;

  /**
   * Constructor de la clase.
   * @param {number} seed - Semilla para la generación de números aleatorios. Por defecto, se utiliza el tiempo actual.
   */
  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  /**
   * Genera un número aleatorio utilizando la función seno sobre la semilla.
   * @private
   * @returns {number} - Número aleatorio entre 0 y 1.
   */
  private random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Obtiene un número aleatorio para una columna específica del juego de Bingo.
   * @param {string} column - Columna para la cual se genera el número (B, I, N, G, O).
   * @returns {number} - Número aleatorio para la columna especificada.
   */
  getRandomBingoNumber(column: string): number {
    let min = 1;
    let max = 15;

    // Establecer los rangos mínimos y máximos según la columna
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

    // Calcular y devolver un número aleatorio dentro del rango especificado
    return Math.floor(this.random() * (max - min + 1)) + min;
  }
}

export default CustomBingoNumberGenerator;
