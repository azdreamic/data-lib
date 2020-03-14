import { ObjectCoreProcessor, ObjectProcessor } from './object-processor';

describe('Array Processor', function () {

    it('get method', function () {
        const arr = { key: 3, value: 3 }
        let result = ObjectProcessor<any>(arr);
        expect(result.get()).toBe(arr);
    });

    it('forEach method', function () {
        const arr = { key: 'name', value: 1, dt: new Date() }
        let result = ObjectProcessor<any>(arr);
        let newObj = {};
        result.forEach((key, val) => {
            newObj[key] = val;
        });
        expect(result.get()).toEqual(newObj);
    });

    it('clone method', function () {
        const arr = { key: 'name', value: 1, dt: new Date() }
        let result = ObjectProcessor<any>(arr);
        let newObj = result.clone();
        expect(result.get()).not.toBe(newObj);
        expect(result.get()).toEqual(newObj);
    });

    it('deepClone method', function () {
        const arr = { key: 'name', value: 1, dt: new Date(), deep: [{}, {}] }
        let result = ObjectProcessor<any>(arr);
        let newObj = result.deepClone();
        expect(result.get()).not.toBe(newObj);
        expect(result.get()).toEqual(newObj);
    });

    it('merge method', function () {
        const arr = { key: 'name', value: 1, dt: new Date(), deep: [{}, {}] }
        let result = ObjectProcessor<any>(arr);
        let newObj = result.merge<typeof arr>({ newProp: '' } as any);
        expect(arr).toBe(newObj);
        expect(result.get().hasOwnProperty('newProp')).toBe(true);
    });

    it('process method', function () {
        const arr = { key: 'name', value: 1, dt: new Date(), deep: [{}, {}] }
        let result = ObjectProcessor<any>(arr).process((obj, inst) => {
            inst.merge({ newProp: '1' });
        });
        expect(result.get().hasOwnProperty('newProp')).toBe(true);
    });

    it('deleteByNS method', function () {
        const arr = { key: 'name', value: 1, dt: new Date(), deep: { d1: 1, d2: 2, deep: { dd1: 1, dd2: 2 } } }
        const resultArr = { key: 'name', value: 1, dt: new Date(), deep: { d1: 1, d2: 2, deep: { dd2: 2 } } }
        let result = ObjectProcessor<any>(arr).deleteByNS('deep.deep.dd1');
        expect(result.get()).toEqual(resultArr);
    });

    it('getByNS method', function () {
        const arr = { key: 'name', value: 1, dt: new Date(), deep: { d1: 1, d2: 2, deep: { dd1: 11, dd2: 2 } } };
        let result = ObjectProcessor<any>(arr).getByNS('deep.deep.dd1');
        expect(result).toEqual(11);
    });

    it('getByNS method non existing object', function () {
        const arr = { key: 'name', value: 1, dt: new Date() };
        let result = ObjectProcessor<any>(arr).getByNS('deep.deep.dd1');
        expect(result).toEqual(undefined);
    });

    it('setByNS method non existing object', function () {
        const arr = { key: 'name', value: 1, dt: new Date() };
        const resArr = { key: 'name', value: 1, dt: new Date(), deep: { deep: { dd3: 33 } } };
        let result = ObjectProcessor<any>(arr).setByNS('deep.deep.dd3', 33);
        expect(result.get()).toEqual(resArr);
    });

    it('setByNS method existing object', function () {
        const arr = { key: 'name', value: 1, dt: new Date(), deep: { deep: { dd3: 33 } } };
        const resArr = { key: 'name', value: 1, dt: new Date(), deep: { deep: { dd3: 44 } } };
        let result = ObjectProcessor<any>(arr).setByNS('deep.deep.dd3', 44);
        expect(result.get()).toEqual(resArr);
    });

});