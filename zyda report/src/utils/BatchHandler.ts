export type Iterator<T> = {
  next(): void;
  current(): T;
  isEnd(): boolean;
};

export type ArrayIterator<T> = Iterator<T> & {
  params: T[];
  pointer: number;
};

export const createArrayIterator = <T>(array: T[]): ArrayIterator<T> => {
  return {
    params: array,
    pointer: 0,
    next() {
      this.pointer += 1;
    },
    current() {
      return this.params[this.pointer];
    },
    isEnd() {
      return this.pointer >= this.params.length;
    },
  };
};

export type IncrementIterator = Iterator<number> & {
  start: number;
  end?: number;
  increment: number;
  position: number;
};

export const createIncrementIterator = (
  increment: number,
  start: number,
  end?: number
): IncrementIterator => {
  return {
    increment: increment,
    start: start,
    end: end,
    position: start,
    next() {
      this.position += increment;
    },
    current() {
      return this.position;
    },
    isEnd() {
      if (this.end === undefined) return false;
      return this.position > this.end;
    },
  };
};

export const batchRequestHandler = async <T, R>(
  batchSize: number,
  iterator: Iterator<T>,
  fetchingFunc: (params: T) => Promise<R>,
  breakingFunc?: (data: R) => boolean
) => {
  const result: R[] = [];

  let stop = false;
  while (!iterator.isEnd() && !stop) {
    const batchPromises = [];

    for (let i = 0; i < batchSize; i++) {
      if (iterator.isEnd()) break;
      batchPromises.push(fetchingFunc(iterator.current()));
      iterator.next();
    }

    const responses = await Promise.all(batchPromises);

    for (const response of responses) {
      if (breakingFunc && breakingFunc(response)) {
        stop = true;
      }
      result.push(response);
    }
  }
  if (breakingFunc) return result.filter((response) => !breakingFunc(response));
  return result;
};
