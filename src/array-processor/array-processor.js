"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/**
 * Library to process array
 * @example
 * const arr = new ArrayCoreProcessor<InterfaceModel>([{1:100},{2:200}]);
 *
 */
var ArrayCoreProcessor = /** @class */ (function () {
    /**
     * Library to process array
     * @example
     * const arr = new ArrayCoreProcessor<InterfaceModel>([{1:100},{2:200}]);
     *
     */
    function ArrayCoreProcessor(arr) {
        this.actualArray = [];
        this.curData = [];
        this.curData = this.actualArray = arr;
        return this;
    }
    /**
     * Filtering array by key and value pair
     * @param key - Key as string in object model.
     * @param value - Value Object to compare.
     */
    ArrayCoreProcessor.prototype.filterByKeyValue = function (key, value, filterType) {
        switch (filterType) {
            case Filter.Contains:
                this.curData = this.actualArray.filter(function (e) { return e[key].indexOf(value) !== -1; });
                break;
            case Filter.EndWith:
                this.curData = this.actualArray.filter(function (e) { return e[key].endsWith(value); });
                break;
            case Filter.StartsWith:
                this.curData = this.actualArray.filter(function (e) { return e[key].startSwith(value); });
                break;
            default:
                this.curData = this.actualArray.filter(function (e) { return e[key] === value; });
                break;
        }
        return this;
    };
    /**
     * Filter array that has key
     * @param key - Key as string in object model.
     */
    ArrayCoreProcessor.prototype.filterHasKey = function (key) {
        this.curData = this.actualArray.filter(function (e) { return e.hasOwnProperty(key); });
        return this;
    };
    /**
     * Merging object by key value pair
     * @param key - Key as string in object model.
     * @param value - Value Object to compare.
     * @param obj - Merging object
     */
    ArrayCoreProcessor.prototype.mergeByKeyValue = function (key, value, obj) {
        var val = this.filterByKeyValue(key, value)[0];
        Object.assign(val, obj);
        return this;
    };
    /**
     * Loop the array
     * @param reviver - function called on each item
     */
    ArrayCoreProcessor.prototype.forEach = function (reviver) {
        var idx = 0;
        for (var _i = 0, _a = this.curData; _i < _a.length; _i++) {
            var item = _a[_i];
            var rtn = reviver(item, idx);
            if (rtn === false) {
                break;
                return this;
            }
            idx = idx + 1;
        }
        return this;
    };
    /**
     * Transforming object model into another model
     * @param fieldMap - Model mapping
     */
    ArrayCoreProcessor.prototype.transformModelByKeys = function (fieldMap) {
        for (var _i = 0, _a = this.curData; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    var value = item[key];
                    item[fieldMap[key]] = value;
                    delete item[key];
                }
            }
        }
        return this;
    };
    /**
     * Array mapping
     * @param reviver - Function called on each object
     */
    ArrayCoreProcessor.prototype.map = function (reviver) {
        var idx = 0;
        for (var _i = 0, _a = this.curData; _i < _a.length; _i++) {
            var item = _a[_i];
            var v = Object.assign({}, reviver(item, idx));
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    delete item[key];
                }
            }
            Object.assign(item, v);
            idx = idx + 1;
        }
        return this;
    };
    /**
     * Return indexOf Array
     * @param key- as string
     * @param key- as comparing value
     */
    ArrayCoreProcessor.prototype.getIndexByKeyValue = function (key, value) {
        var index = -1;
        this.forEach(function (e, idx) {
            if (e[key] === value) {
                index = idx;
                return false;
            }
        });
        return index;
    };
    /**
     * Delete item by index or pop item from array
     * @param index - Optional index
     * @param count - Optional number of items
     */
    ArrayCoreProcessor.prototype.deleteItemByIndex = function (index, count) {
        if (index === void 0) { index = this.curData.length - 1; }
        if (count === void 0) { count = 1; }
        this.curData = this.curData.splice(index, count);
        return this;
    };
    /**
     * Delete item by key and value
     * @param key - key as string
     * @param value - Compare value as object
     */
    ArrayCoreProcessor.prototype.deleteItemByKeyValue = function (key, value) {
        var index = this.getIndexByKeyValue(key, value);
        this.curData = this.curData.splice(index);
        return this;
    };
    /**
     * Insert item by index or push into array
     * @param value - Object value
     * @param index - Optional index
     */
    ArrayCoreProcessor.prototype.insertItem = function (value, index) {
        if (typeof index === 'undefined') {
            this.curData.push(value);
        }
        else {
            this.curData = this.curData.splice(index, 0, value);
        }
    };
    /**
     * Insert multiple item by index or push into array
     * @param value - Object value
     * @param index - Optional index
     */
    ArrayCoreProcessor.prototype.insertItems = function (value, index) {
        var _a;
        if (typeof index === 'undefined') {
            this.curData = this.curData.concat(value);
        }
        else {
            this.curData = (_a = this.curData).splice.apply(_a, __spreadArrays([index, 0], value));
        }
    };
    /**
     * Perform array action
     * @param reviver - function to process array function
     */
    ArrayCoreProcessor.prototype.process = function (reviver) {
        reviver(this.curData, this);
        return this;
    };
    /**
     * Return the Final array
     */
    ArrayCoreProcessor.prototype.get = function () {
        return this.curData;
    };
    /**
     * Return actual array
     */
    ArrayCoreProcessor.prototype.getActualArray = function () {
        return this.actualArray;
    };
    /**
     * Sorting Array
     * @param key - Keys as string
     * @param order - Ascending | Descending Order
     */
    ArrayCoreProcessor.prototype.sortByKey = function (key, order) {
        if (order === void 0) { order = Order.Ascending; }
        this.curData.sort(this.simpleSort(key, order));
        return this;
    };
    /**
     * Simple Sorting Function
     */
    ArrayCoreProcessor.prototype.simpleSort = function (key, order) {
        return function (obj1, obj2) {
            if (order === Order.Descending) {
                return obj2[key].localeCompare(obj1[key]);
            }
            else {
                return obj1[key].localeCompare(obj2[key]);
            }
        };
    };
    /**
     * Perform the loop operation and return the number
     * @param key - Key string that need to calculate
     * @param op - Operator Identity
     */
    ArrayCoreProcessor.prototype.operateByKey = function (key, op) {
        var result = 0;
        this.forEach(function (e) {
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
    };
    /**
     * Grouping the array
     * @param getKey - reviver function
     */
    ArrayCoreProcessor.prototype.groupBy = function (getKey) {
        var map = new Map();
        this.forEach(function (item) {
            var key = getKey(item);
            var collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        });
        return Array.from(map.values());
    };
    /**
     * Retruns the first object array
     */
    ArrayCoreProcessor.prototype.getFirstObject = function () {
        return this.curData[0];
    };
    return ArrayCoreProcessor;
}());
exports.ArrayCoreProcessor = ArrayCoreProcessor;
var Order;
(function (Order) {
    Order[Order["Ascending"] = 0] = "Ascending";
    Order[Order["Descending"] = 1] = "Descending";
})(Order = exports.Order || (exports.Order = {}));
var Filter;
(function (Filter) {
    Filter[Filter["Contains"] = 0] = "Contains";
    Filter[Filter["Equal"] = 1] = "Equal";
    Filter[Filter["StartsWith"] = 2] = "StartsWith";
    Filter[Filter["EndWith"] = 3] = "EndWith";
})(Filter = exports.Filter || (exports.Filter = {}));
function ArrayProcessor(arr) {
    return new ArrayCoreProcessor(arr);
}
exports.ArrayProcessor = ArrayProcessor;
