# Data Processor Library For TypeScript

![Release](https://github.com/SridharSathaSivam/data-lib/workflows/Release%20Build/badge.svg)
![Build](https://github.com/SridharSathaSivam/data-lib/workflows/Development%20Build/badge.svg)

This library is purpose of do array / object operation like merge, clone, loop and some other processes. We always confuse to choose the best practices, performance and maintaining the common source from deferent developers.

This is very simple library written in typescript to resolve those conflicts. Since, it is written in typescript & npm combo will gave you extra feature like we can use it in typescript, javascript, angular, react and vuejs applications.

## Installing Packages

Install the package from npm library.

```

npm install @azdreamic/data-lib --save

```

## Features

- Chaining / Pipes the process array fluently.
- TypeScript Supported
- Can use it various platforms( TypeScript, JavaScript, Angular, React and VueJS )

## Sample Snippet to Use

```
import { ArrayProcessor } from '@azdreamic/data-lib';

const arr = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }];

let result = ArrayProcessor<{key:number,value:number}>(arr).filterByKeyValue('key', 2);

result.get();

```

[StackBlitz Sample](https://stackblitz.com/edit/angular-xtzbrd)

## Documentation

- [Guide Documentation](https://sridharsathasivam.github.io/data-lib/)
- [Api Documentation](https://sridharsathasivam.github.io/data-lib/api)

## License

MIT [License](license)