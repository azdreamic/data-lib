import { ArrayProcessor, Filter, Order } from './array-processor';

describe('Array Processor', function () {

    it('initialize', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }]
        let result = ArrayProcessor<any>(arr);
        expect(result.get()).toBe(arr);
    });

    it('filterByKeyValue', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 2, value: 2 }];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('key', 2);
        expect(result.get()).toEqual(arr2);
    });

    it('filterByKeyValue contains', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }];
        const arr2 = [{ key: 1, value: '1246' }, { key: 2, value: '672' }];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('value', 2, Filter.Contains);
        expect(result.get()).toEqual(arr2);
    });

    it('filterByKeyValue endwith', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }];
        const arr2 = [{ key: 1, value: '1246' }];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('value', '46', Filter.EndWith);
        expect(result.get()).toEqual(arr2);
    });

    it('filterByKeyValue startwith', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }];
        const arr2 = [{ key: 2, value: '672' }];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('value', '6', Filter.StartsWith);
        expect(result.get()).toEqual(arr2);
    });

    it('filterByKeyValue equals', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }];
        const arr2 = [{ key: 2, value: '672' }];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('value', '672', Filter.Equal);
        expect(result.get()).toEqual(arr2);
    });

    it('filterByKeyValue unknown value', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }];
        const arr2 = [];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('value', '', Filter.Equal);
        expect(result.get()).toEqual(arr2);
    });

    it('filterByKeyValue unknown key', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }];
        const arr2 = [];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('prop', '', Filter.Equal);
        expect(result.get()).toEqual(arr2);
    });

    it('filterHasKey if has value', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }];
        const arr2 = [{ map: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).filterHasKey('map');
        expect(result.get()).toEqual(arr2);
    });

    it('filterHasKey if not has value', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }];
        const arr2 = [];
        let result = ArrayProcessor<any>(arr).filterHasKey('prop');
        expect(result.get()).toEqual(arr2);
    });

    it('mergeByKeyValue if has value', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }];
        const arr2 = [{ key: 1, value: '1246', newProp: 'value' }, { key: 2, value: '672' }, { map: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).mergeByKeyValue('key', 1, { newProp: 'value' });
        expect(result.get()).toEqual(arr2);
    });

    it('mergeByKeyValue if not has value', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }];
        const arr2 = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).mergeByKeyValue('key', 101, { newProp: 'value' });
        expect(result.get()).toEqual(arr2);
    });

    it('forEach each value', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }, { map: 2, value: 2 }];
        const arr2 = [];
        let result = ArrayProcessor<any>(arr).forEach((val, number) => {
            arr2.push(val);
        });
        expect(result.get()).toEqual(arr2);
    });

    it('forEach each index', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { map: 3, value: 3 }, { map: 2, value: 2 }];
        const arr2 = [];
        let result = ArrayProcessor<any>(arr).forEach((val, number) => {
            arr2.push(number);
        });
        expect(arr2).toEqual([0, 1, 2, 3]);
    });

    it('forEach each value return', function () {
        const arr = [{ key: 1, value: '1246' }, { key: 2, value: '672' }, { key: 3, value: 3 }, { key: 2, value: 2 }];
        const arr2 = [];
        let result = ArrayProcessor(arr).forEach((val, number) => {
            if (arr2.indexOf(val.key) === -1) {
                arr2.push(val.key);
            } else {
                return;
            }
        });
        expect(arr2).toEqual([1, 2, 3]);
    });

    it('transformModelByKeys method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).transformModelByKeys({ key: 'id' });
        expect(result.get()).toEqual(arr2);
    });

    it('map method with object', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 101 }, { key: 102 }, { key: 103 }];
        let result = ArrayProcessor<any>(arr).map((value, i) => {
            return { key: value.key + 100 };
        });
        expect(result.get()).toEqual(arr2);
    });

    it('map method with number', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [101, 102, 103];
        let result = ArrayProcessor<any>(arr).map((value, i) => {
            return value.key + 100;
        });
        expect(result.get()).toEqual(arr2);
    });

    it('getIndexByKeyValue method with number', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [101, 102, 103];
        let result = ArrayProcessor<any>(arr).getIndexByKeyValue('key', 2);
        expect(result).toEqual(1);
    });

    it('getIndexByKeyValue method with number', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [101, 102, 103];
        let result = ArrayProcessor<any>(arr).getIndexByKeyValue('key2', 2);
        expect(result).toEqual(-1);
    });

    it('deleteItemByIndex method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 1, value: 1 }, { key: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).deleteItemByIndex(1);
        expect(result.get()).toEqual(arr2);
    });

    it('deleteItemByKeyValue method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 1, value: 1 }, { key: 2, value: 2 }];
        let result = ArrayProcessor<any>(arr).deleteItemByKeyValue('key', 3);
        expect(result.get()).toEqual(arr2);
    });

    it('insertItem method at last', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 }];
        let result = ArrayProcessor<any>(arr).insertItem({ key: 4, value: 4 });
        expect(result.get()).toEqual(arr2);
    });

    it('insertItem method at index', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 0, value: 0 }, { key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).insertItem({ key: 0, value: 0 }, 0);
        expect(result.get()).toEqual(arr2);
    });

    it('insertItems method at last', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }];
        const arr2 = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 }];
        let result = ArrayProcessor<any>(arr).insertItems([{ key: 3, value: 3 }, { key: 4, value: 4 }]);
        expect(result.get()).toEqual(arr2);
    });

    it('insertItems method at index', function () {
        const arr = [{ key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 0, value: 0 }, { key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).insertItems([{ key: 0, value: 0 }, { key: 1, value: 1 }], 0);
        expect(result.get()).toEqual(arr2);
    });


    it('process method', function () {
        const arr = [{ key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{}, {}];
        let result = ArrayProcessor<any>(arr).process((ar) => {
            return [{}, {}];
        });
        expect(result.get()).toEqual(arr2);
    });

    it('getActualArray method', function () {
        const arr = [{ key: 2, value: 2 }, { key: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).process((ar) => {
            return [{}, {}];
        });
        expect(result.getActualArray()).toEqual(arr);
    });

    it('sortByKey method Ascending', function () {
        const arr = [{ key: 3, value: 3 }, { key: 1, value: 1 }, { key: 2, value: 2 },];
        const arr2 = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        let result = ArrayProcessor<any>(arr).sortByKey('key');
        expect(result.get()).toEqual(arr2);
    });

    it('sortByKey method Decending', function () {
        const arr = [{ key: 3, value: 3 }, { key: 1, value: 1 }, { key: 2, value: 2 },];
        const arr2 = [{ key: 3, value: 3 }, { key: 2, value: 2 }, { key: 1, value: 1 }];
        let result = ArrayProcessor<any>(arr).sortByKey('key', { order: Order.Descending });
        expect(result.get()).toEqual(arr2);
    });

    it('operateByKey method +', function () {
        const arr = [{ key: 3, value: 3 }, { key: 1, value: 1 }, { key: 2, value: 2 },];
        let result = ArrayProcessor<any>(arr).operateByKey('key', '+');
        expect(result).toEqual(6);
    });

    it('operateByKey method *', function () {
        const arr = [{ key: 3, value: 3 }, { key: 2, value: 1 }, { key: 2, value: 2 },];
        let result = ArrayProcessor<any>(arr).operateByKey('key', '*');
        expect(result).toEqual(12);
    });

    it('operateByKey method -', function () {
        const arr = [{ key: 3, value: 3 }, { key: 2, value: 1 }, { key: 2, value: 2 },];
        let result = ArrayProcessor<any>(arr).operateByKey('key', '-');
        expect(result).toEqual(-1);
    });

    it('operateByKey method /', function () {
        const arr = [{ key: 3, value: 3 }, { key: 2, value: 1 }, { key: 2, value: 2 },];
        let result = ArrayProcessor<any>(arr).operateByKey('key', '/');
        expect(result).toEqual(0.75);
    });

    it('groupBy method /', function () {
        const arr = [{ key: 3, value: 3 }, { key: 2, value: 1 }, { key: 2, value: 2 },];
        const arr2 = [
            [{ key: 3, value: 3 }],
            [{ key: 2, value: 1 }, { key: 2, value: 2 }]
        ];
        let result = ArrayProcessor<any>(arr).groupBy(e => e.key);
        expect(result).toEqual(arr2);
    });

    it('getFirstObject method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = { key: 2, value: 2 }
        let result = ArrayProcessor<any>(arr).filterByKeyValue('key', 2);
        expect(result.getFirstObject()).toEqual(arr2);
    });
});