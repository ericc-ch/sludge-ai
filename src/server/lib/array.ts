/**
 * Splits an array into chunks of a specified size.
 *
 * @param {T[]} input - The array to be split into chunks.
 * @param {number} size - The size of each chunk.
 * @return {T[][]} An array of arrays, where each inner array represents a chunk of the input array.
 */
export const chunk = <T>(input: T[], size: number): T[][] => {
  return input.reduce<T[][]>((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
