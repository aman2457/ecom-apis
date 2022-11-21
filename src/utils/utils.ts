export function throwError(name: string) {
    const err = new Error();
    err.name = name;
    throw err;
  }