import { ObjectCoreProcessor, ObjectProcessor } from './object-processor';

describe('Array Processor', function () {

    it('initialize', function () {
        const arr = { key: 3, value: 3 }
        let result = ObjectProcessor<any>(arr);
        expect(result.get()).toBe(arr);
    });

    
    
});