

export function recursiveArray(arr) {
    const newArray = [];
    for (const item of arr) {
        newArray.push(recursiveObject(item));
    }
    return newArray;
}

export function recursiveObject<T>(resObj): T {
    const keys = Object.keys(resObj);
    let idx = 0;
    const obj: T = {} as T;
    for (const key of keys) {
        const value = resObj[key];
        if (value instanceof Array) {
            obj[key] = recursiveArray(value);
        } else if (value instanceof Date) {
            obj[key] = new Date(value);
        } else if (typeof value === 'object') {
            obj[key] = recursiveObject(value);
        } else {
            obj[key] = value;
        }
        idx = ++idx;
    }
    return obj;
}