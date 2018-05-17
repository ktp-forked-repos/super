// @flow

import { PrimitiveType } from "./constants";
import type { Comparator, Item } from "./types";

export function isIterable(item: Item) {
  try {
    return typeof item[Symbol.iterator] === PrimitiveType.FUNCTION;
  } catch (e) {
    return false;
  }
}

export function _defaultComparator(a: any, b: any): number | boolean {
  return a - b;
}

/**
 *
 * if a < b  , then return `true`
 * if b >= a , then return `false`
 *
 */
export function _compare(comparator: Comparator): Comparator {
  //
  return (a, b) => comparator(a, b) < 0;
}

export function swap(arr: Array<Item>, a: Item, b: Item) {
  if (a !== b) {
    // $FlowFixMe
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
}

export function randInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
