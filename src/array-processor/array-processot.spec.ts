import { ArrayProcessor, Filter } from './array-processor';

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

    it('getFirstObject method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = { key: 2, value: 2 }
        let result = ArrayProcessor<any>(arr).filterByKeyValue('key', 2);
        expect(result.getFirstObject()).toEqual(arr2);
    });

    it('getFirstObject method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = { key: 2, value: 2 }
        let result = ArrayProcessor<any>(arr).filterByKeyValue('key', 2);
        expect(result.getFirstObject()).toEqual(arr2);
    });
});