import { recursiveObject } from "../common/common";

/**
 * Library to process array
 * @example
 * const arr = new ObjectCoreProcessor<InterfaceModel>([{1:100},{2:200}]);
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


    /**
     * Function excutes the reviver for each key value pair
     * @param fn -  Reviver Function
     */
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

    /**
     * Function helps to clone object into different reference
     * @param deep - Specifies the deep cloning
     */
    public clone(deep = false): T {
        let obj: T = {} as T;
        if (deep === true) {
            obj = recursiveObject<T>(this.curData)
        } else {
            obj = Object.assign(obj, this.curData);
        }
        return obj;
    }

    /**
     * Function helps to clone deeply with different reference
     */
    public deepClone(): T {
        return this.clone(true);
    }

    /**
     * Function helps to merge the another object into current object and retrun value
     * @param value 
     */
    public merge<G>(value: G): T & G {
        return Object.assign(this.curData, value);
    }

    /**
     * Function used to achive custom activity and pipe more internal object
     * @param fn - reviver function to call with object 
     */
    public process(fn: (object: T, instance: this) => void): this {
        fn(this.curData, this);
        return this;
    }

    /**
     * Delete object value by namespace key
     * @param nameSpace - name space string or string array
     */
    public deleteByNS(nameSpace: string | string[]): this {
        let obj;
        let fNS = '';
        if (nameSpace instanceof Array) {
            obj = this.getByNS(nameSpace.slice(0, nameSpace.length - 1));
            fNS = nameSpace[nameSpace.length - 1];
        } else {
            const ns = nameSpace.split('.');
            obj = this.getByNS(ns.slice(0, ns.length - 1));
            fNS = ns[ns.length - 1];
        }
        delete obj[fNS];
        return this;
    }

    /**
     * Returns the value by spacifed name space 
     * @param nameSpace name space string or string array
     */
    public getByNS<G>(nameSpace: string | string[]): G {
        let val: T | G = this.curData;
        const ns = (typeof nameSpace === 'string' ? nameSpace.split('.') : nameSpace);
        for (const name of ns) {
            val = val[name];
            if (typeof val === 'undefined') { break; }
        }
        return val as G;
    }

    /**
     * Set the value by specified name space
     * @param nameSpace - name space
     * @param value - value
     */
    public setByNS<G>(nameSpace: string, value: G): this {
        let val: T | G = this.curData;
        const ns = nameSpace.split('.');
        let idx = 0;
        for (const name of ns.slice(0, ns.length - 1)) {
            if (val.hasOwnProperty(name) !== true) { val[name] = {}; val = val[name]; }
            else { val = val[name] };
            idx += 1;
        }
        val[ns[ns.length - 1]] = value;
        return this;
    }

    /**
     * Returns the specifed object
     */
    public get(): T {
        return this.curData;
    }
}

export function ObjectProcessor<T>(arr: T): ObjectCoreProcessor<T> {
    return new ObjectCoreProcessor<T>(arr);
}
