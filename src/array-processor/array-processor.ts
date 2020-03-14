
/**
 * Library to process array
 * @example
 * const arr = new ArrayCoreProcessor<InterfaceModel>([{1:100},{2:200}]);
 *
 */
export class ArrayCoreProcessor<T> {

    private actualArray: T[] = [];
    private curData: T[] = [];

    /**
     * Library to process array
     * @example
     * const arr = new ArrayCoreProcessor<InterfaceModel>([{1:100},{2:200}]);
     *
     */
    constructor(arr: T[]) {
        this.curData = this.actualArray = arr;
        return this;
    }

    /**
     * Filtering array by key and value pair
     * @param key - Key as string in object model.
     * @param value - Value Object to compare.
     */
    public filterByKeyValue(key: string, value: TObject, filterType?: Filter): this {
        switch (filterType) {
            case Filter.Contains:
                this.curData = this.curData.filter(e => e[key].toString().indexOf(value) !== -1);
                break;
            case Filter.EndWith:
                this.curData = this.curData.filter(e => e[key].toString().endsWith(value));
                break;
            case Filter.StartsWith:
                this.curData = this.curData.filter(e => e[key].toString().startsWith(value));
                break;
            default:
                this.curData = this.curData.filter(e => e[key] === value);
                break;
        }
        return this;
    }

    /**
     * Filter array that has key
     * @param key - Key as string in object model.
     */
    public filterHasKey(key: string): this {
        this.curData = this.curData.filter(e => e.hasOwnProperty(key));
        return this;
    }

    /**
     * Merging object by key value pair
     * @param key - Key as string in object model.
     * @param value - Value Object to compare.
     * @param obj - Merging object
     */
    public mergeByKeyValue(key: string, value: TObject, obj: T): this {
        const copyArray = this.curData;
        const val = this.filterByKeyValue(key, value).getFirstObject();
        if (val !== undefined) {
            Object.assign(val, obj);
        }
        this.curData = copyArray;
        return this;
    }

    /**
     * Loop the array
     * @param reviver - function called on each item
     */
    public forEach(reviver: (value: T, index: number) => void | boolean): this {
        let idx = 0;
        for (const item of this.curData) {
            const rtn = reviver(item, idx);
            if (rtn === true) {
                break;
                return this;
            }
            idx = idx + 1;
        }
        return this;
    }

    /**
     * Transforming object model into another model
     * @param fieldMap - Model mapping
     */
    public transformModelByKeys(fieldMap: { [key: string]: string }): this {
        for (const item of this.curData) {
            for (const key in item) {
                const mapKey = fieldMap[key];
                if (item.hasOwnProperty(key) && mapKey !== undefined) {
                    const value = item[key];
                    item[mapKey] = value;
                    delete item[key];
                }
            }
        }
        return this;
    }

    /**
     * Array mapping
     * @param reviver - Function called on each object
     */
    public map<G>(reviver: (value: T, index) => G): this {
        let idx = 0;
        for (const item of this.curData) {
            const v = reviver(Object.assign({}, item), idx);
            if (typeof v === 'object') {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        delete item[key];
                    }
                }
                Object.assign(item, v);
            } else {
                this.curData[idx] = v as any;
            }
            idx = idx + 1;
        }
        return this;
    }

    /**
     * Return indexOf Array
     * @param key- as string
     * @param key- as comparing value
     */
    getIndexByKeyValue(key: string, value: TObject): number {
        let index = -1;
        this.forEach((e, idx) => {
            if (e[key] === value) {
                index = idx;
                return false;
            }
        });
        return index;
    }

    /**
     * Delete item by index or pop item from array
     * @param index - Optional index
     * @param count - Optional number of items
     */
    deleteItemByIndex(index: number = this.curData.length - 1, count = 1): this {
        this.curData.splice(index, count);
        return this;
    }

    /**
     * Delete item by key and value
     * @param key - key as string
     * @param value - Compare value as object
     */
    deleteItemByKeyValue(key: string, value: TObject) {
        const index = this.getIndexByKeyValue(key, value);
        this.curData.splice(index);
        return this;
    }

    /**
     * Insert item by index or push into array
     * @param value - Object value
     * @param index - Optional index
     */
    insertItem(value: T, index?: number) {
        if (typeof index === 'undefined') {
            this.curData.push(value);
        } else {
            this.curData.splice(index, 0, value);
        }
        return this;
    }

    /**
     * Insert multiple item by index or push into array
     * @param value - Object value
     * @param index - Optional index
     */
    insertItems(value: T[], index?: number) {
        if (typeof index === 'undefined') {
            this.curData = this.curData.concat(value);
        } else {
            this.curData.splice(index, 0, ...value);
        }
        return this;
    }

    /**
     * Perform array action
     * @param reviver - function to process array function
     */
    public process(reviver: (array: T[], instance?: this) => T[]): this {
        this.curData = reviver(this.curData, this);
        return this;
    }

    /**
     * Return the Final array
     */
    public get(): T[] {
        return this.curData;
    }

    /**
     * Return actual array
     */
    public getActualArray(): T[] {
        return this.actualArray;
    }

    /**
     * Sorting Array
     * @param key - Keys as string
     * @param order - Ascending | Descending Order
     */
    public sortByKey(key: string, sortSetting = { order: Order.Ascending }): this {
        this.curData = this.curData.sort(this.simpleSort(key, sortSetting.order));
        return this;
    }

    /**
     * Simple Sorting Function
     */
    private simpleSort(key: string, order: Order): any {
        return (obj1: object, obj2: object) => {
            if (!obj1.hasOwnProperty(key) || !obj2.hasOwnProperty(key)) return 0;
            const comparison = ('' + obj1[key]).localeCompare('' + obj2[key]);
            return (order === Order.Descending ? comparison * -1 : comparison);
        };
    }

    /**
     * Perform the loop operation and return the number
     * @param key - Key string that need to calculate
     * @param op - Operator Identity
     */
    public operateByKey(key: string, op: '*' | '+' | '-' | '/'): number {
        let result;
        this.forEach((e, index) => {
            if (index === 0) {
                result = e[key];
                return;
            }
            switch (op) {
                case '+':
                    result = result + e[key];
                    break;
                case '-':
                    result = result - e[key];
                    break;
                case '*':
                    result = result * e[key];
                    break;
                case '/':
                    result = result / e[key];
                    break;
            }
        });
        return result;
    }

    /**
     * Grouping the array
     * @param getKey - reviver function
     */
    groupBy<K>(getKey: (item: T) => K) {
        const map = new Map<K, T[]>();
        this.forEach((item) => {
            const key = getKey(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return Array.from(map.values());
    }

    /**
     * Retruns the first object array
     */
    public getFirstObject(): T {
        return this.curData[0];
    }


}

type TObject = number | string | boolean | object | Date;

export enum Order {
    Ascending,
    Descending
}

export enum Filter {
    Contains,
    Equal,
    StartsWith,
    EndWith
}

export function ArrayProcessor<T>(arr: T[]): ArrayCoreProcessor<T> {
    return new ArrayCoreProcessor<T>(arr);
}
