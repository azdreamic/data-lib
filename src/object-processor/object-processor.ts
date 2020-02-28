
/**
 * Library to process array
 * @example
 * const arr = new ArrayCoreProcessor<InterfaceModel>([{1:100},{2:200}]);
 *
 */
export class ObjectCoreProcessor<T> {

    private actualArray: T;
    private curData: T;

    /**
     * Library to process array
     * @example
     * const arr = new ObjectCoreProcessor<InterfaceModel>({1:100,2:200});
     *
     */
    constructor(arr: T) {
        this.curData = this.actualArray = arr;
    }

    public forEach(fn: (key: string, value: Object, index: number) => void): this {
        const keys = Object.keys(this.curData);
        let idx = 0;
        for (const key of keys) {
            if (this.curData.hasOwnProperty(key)) {
                const value = this.curData[key];
                fn(key, value, idx);
            }
            idx = ++idx;
        }
        return this;
    }

    private recursiveArray(arr) {
        const newArray = [];
        for (const item of arr) {
            newArray.push(this.recursiveObject(item));
        }
        return newArray;
    }

    private recursiveObject(resObj): T {
        const keys = Object.keys(resObj);
        let idx = 0;
        const obj: T = {} as T;
        for (const key of keys) {
            const value = resObj[key];
            if (value instanceof Array) {
                obj[key] = this.recursiveArray(value);
            } else if (typeof value === 'object') {
                obj[key] = this.recursiveObject(value);
            } else {
                obj[key] = value;
            }
            idx = ++idx;
        }
        return obj;
    }

    public clone(deep = false): T {
        let obj: T;
        if (deep === true) {
            obj = this.recursiveObject(this.curData)
        } else {
            obj = Object.assign(obj, this.curData);
        }
        return obj;
    }

    public deepClone(): T {
        return this.clone(true);
    }

    public get(): T {
        return this.curData;
    }

    public delete(nameSpace: string | string[]): this {
        if (nameSpace instanceof Array) {
            for (const curname of nameSpace) {
                delete this.curData[curname];
            }
        } else {
            delete this.curData[nameSpace];
        }
        return this;
    }

    public add<G>(key: string, value: G): this {
        this.curData[key] = value;
        return this;
    }

    public getByNS<G>(nameSpace: string): G {
        let val = this.curData[nameSpace];
        return val;
    }

    public setByNS<G>(nameSpace: string, value: G): this {
        this.curData[nameSpace] = value;
        return this;
    }

}

export function ObjectProcessor<T>(arr: T): ObjectCoreProcessor<T> {
    return new ObjectCoreProcessor<T>(arr);
}
