# Overview

This library is purpose of do array / object operation like merge, clone, loop and some other processes. We always confuse to choose the best practices, performance and maintaining the common source from different  developers.

This is very simple library written in typescript to resolve those conflicts. Since, it is written in typescript & npm combo will gave you extra feature like we can use it in typescript, javascript, angular, react and vuejs applications.

## Installing Packages

Install the package from npm library.

```

npm install @azdreamic/data-lib --save

```

## Sample Snippet to Use

```
import { ArrayProcessor } from '@azdreamic/data-lib';

const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];

let result = ArrayProcessor<{key:number,value:number}>(arr).filterByKeyValue('key', 2);

result.get();

```

## Array Processor

Array Processor is to process the array. We can perform the array operation with ease.

The below function are available to use.

Reference API Docs [link](./api/classes/_array_processor_array_processor_.arraycoreprocessor.html)


|   Function Name               |    Description                   | 
|-|-|
| deleteItemByIndex | To delete array item based on specified index.|
| deleteItemByKeyValue | To delete array item based on key and value.|
| filterByKeyValue | To filter an array items baded on key and value.|
| filterHasKey | To filter array items if has specified property.|
| forEach | To loop the each array.|
| get | To get final output after chained completed.|
| getActualArray | Get actual array from the after processed data from the instance.|
| getFirstObject | Return the first item of an array.|
| getIndexByKeyValue | To get the index number based on key and value.|
| groupBy | To group the array based on reviver logic.|
| insertItem | Add / insert item into an array.|
| insertItems | Add / Insert multiple items into an array.|
| map | Map is to transform object or modify the objects.|
| mergeByKeyValue | Merge object based on key & value.|
| operateByKey | This function used to perform the match calculation over the fields in array applicable for numbers
| process | Process is similar to for each but here you can get along with instance
| sortByKey | This function is to sort the array based on key
| transformModelByKeys | This function is used to transform one object model to another by passing field mapping

### Implementation Steps

**Step 1**

import the library

```

import { ArrayProcessor } from '@azdreamic/data-lib';

```

**Step 2**

Create the processor object based by passing array object to the array processor function.

```
let result = ArrayProcessor<{key:number,value:number}>(arr).filterByKeyValue('key', 2);
```

**Step 3**
Access the all methods continuos by using dot operator 

```
result.filterByKeyValue('key','value').sortByKey('key');
```

**Step 4**

Get the final result by using get function

```
result.get();
```

#### Example

```
import { ArrayProcessor } from '@azdreamic/data-lib';

const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];

let result = ArrayProcessor<{key:number,value:number}>(arr).filterByKeyValue('key', 2);

result.get();

```