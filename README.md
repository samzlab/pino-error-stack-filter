# Pino error stack filter (pre-serializer)
![npm](https://img.shields.io/npm/v/pino-error-stack-filter)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/pino-error-stack-filter)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/samzlab/pino-error-stack-filter)

Filter out the endless error stack trace before [Pino](https://github.com/pinojs/pino) streams it out.

**Before:**
```
   err: {
      "type": "EagerLoadingError",
      "message": "Xmodel is associated to Ymodel using an alias. You must use the 'as' keyword to specify the alias within your include statement.",
      "stack":
          SequelizeEagerLoadingError: Xmodel is associated to Ymodel using an alias. You must use the 'as' keyword to specify the alias within your include statement.
              at Function._getIncludedAssociation (/path/to/your/project/node_modules/sequelize/lib/model.js:722:13)
              at Function._validateIncludedElement (/path/to/your/project/node_modules/sequelize/lib/model.js:614:53)
              at /path/to/your/project/node_modules/sequelize/lib/model.js:509:37
              at Array.map (<anonymous>)
              at Function._validateIncludedElements (/path/to/your/project/node_modules/sequelize/lib/model.js:504:39)
              at new Model (/path/to/your/project/node_modules/sequelize/lib/model.js:101:26)
              at new Xmodel (/path/to/your/project/models/xmodel.js:4:2)
              at Function.build (/path/to/your/project/node_modules/sequelize/lib/model.js:2145:12)
              at Function.create (/path/to/your/project/node_modules/sequelize/lib/model.js:2195:23)
              at Object.<anonymous> (/path/to/your/project/routes/something.js:37:40)
      "name": "SequelizeEagerLoadingError"
    }
    reqId: 1
```

**After:**
```
   err: {
      "type": "EagerLoadingError",
      "message": "Xmodel is associated to Ymodel using an alias. You must use the 'as' keyword to specify the alias within your include statement.",
      "stack":
              at new Xmodel (/path/to/your/project/models/xmodel.js:4:2)
              at Object.<anonymous> (/path/to/your/project/routes/something.js:37:40)
      "name": "SequelizeEagerLoadingError"
    }
    reqId: 1
```

## Installation

```
npm i pino-error-stack-filter --save
```

## Usage

With default options
```js
const pino = require('pino');
const errSerializer = require('pino-error-stack-filter');

// these are the default values
const errSerializerOptions = {
    keywords: [ 'node_modules', '(<anonymous>)' ],
    keepMessage: false
};

const logger = pino({
    level: 'error',
    prettyPrint: {
        colorize: true
    },
    serializers: {
        err: errSerializer(errSerializerOptions) // here we go
    }
});
```

## Options

| option | type | default | description |
| --- | ---- | --- | --- |
| keywords | `Array<String>` | `[ 'node_modules', '(<anonymous>)' ]` | list of words to filter a line |
| keepMessage | `Boolean` | `false` | whether to keep the first line which contains the exact same text as the `message` key |



## License

Copyright © 2020 SAMZLab

Licensed under the [MIT License](https://raw.githubusercontent.com/samzlab/pino-error-stack-filter/master/LICENSE).