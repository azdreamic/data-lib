import { ArrayProcessor } from './array-processor';

describe('Array Processor', function () {

    it('get method', function () {
        const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }]
        let result = ArrayProcessor<any>(arr);
        expect(result.get()).toBe(arr);
    });

});