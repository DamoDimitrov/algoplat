export class HelperFunctions {

  static getNumbersFromData(inputString: string): number[] {
    const regex = /-?\d+/g;
    const matches = inputString.match(regex);
    if (matches) {
      return matches.map(match => parseInt(match, 10));
    }
    return [];
  }
}
