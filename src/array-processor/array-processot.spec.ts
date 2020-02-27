import { ArrayProcessor } from './array-processor';

describe('Array Processor', function () {

    it('initialize', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }]
        let result = ArrayProcessor<any>(arr);
        expect(result.get()).toBe(arr);
    });

    it('filterByKeyValue method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = [{ key: 2, value: 2 }];
        let result = ArrayProcessor<any>(arr).filterByKeyValue('key', 2);
        expect(result.get()).toEqual(arr2);
    });

    it('getFirstObject method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];
        const arr2 = { key: 2, value: 2 }
        let result = ArrayProcessor<any>(arr).filterByKeyValue('key', 2);
        expect(result.getFirstObject()).toEqual(arr2);
    });
});