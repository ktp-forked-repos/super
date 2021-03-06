/**
 * @flow
 * @module super/math
 */

import { PrimitiveType } from "../../../shared/src/constants";

/**
 *
 * Math with superpowers! 💪
 *
 * @public
 *
 * @alias Math
 */
export const _Math = Object.create(Math);

/**
 * @public
 *
 * @desc Factorial
 *
 * @param {number} num - integral number
 * @returns {number} factorial of num
 */
_Math.factorial = function(num: number): number {
  if (num < 0) throw new Error("Factorial not defined for negative values");
  if (num === 0) return 1;
  return num * _Math.factorial(num - 1);
};

/**
 * @public
 *
 * @desc Greatest common divisor
 *
 * @param {number} numA - integral number
 * @param {number} numB - integral number
 * @returns {number} greatest common divisor of numA and numB
 */
_Math.gcd = function(numA: number, numB: number): number {
  if (numB === 0) return numA;
  return _Math.gcd(numB, numA % numB);
};

/**
 * @public
 *
 * @desc Least common multiple
 *
 * @param {number} numA - integral number
 * @param {number} numB - integral number
 * @returns {number} least common multiple of numA and numB
 */
_Math.lcm = function(numA: number, numB: number): number {
  if (numA === 0 && numB === 0) return 0;
  return numA * numB / _Math.gcd(numA, numB);
};

/**
 * @public
 *
 * @desc Random number
 *
 * @param {number} start - starting number (inclusive)
 * @param {number} stop - stopping number (exclusive)
 * @returns {number} random number between [start, stop)
 */
_Math.randrange = function(start: number, stop: number): number {
  if (typeof start === PrimitiveType.UNDEFINED) throw new Error("Missing required argument start");
  if (typeof stop === PrimitiveType.UNDEFINED) (start = 0), (stop = start);
  return Math.floor(Math.random() * (stop - start)) + start;
};

export { _Math as Math };
