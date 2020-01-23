# taks

Minimalistic ES7 async/await based task runner. 

Zero dependencies. It expects the consumer to provide all the necessary transforms, preserving full access to the original APIs and flexibility.

## Usage

Create a `task.js` file at the root of your project:

```js
const task = require('taks')

task('styles', async function () {
    await postcss('./entry.css', './dist/output.css')
})

task('scripts', async function () {
    await rollup('./entry.js', './dist/output.js')
})

task('build', async function () {
    task.parallel(['scripts', 'styles'])
})

task.run(process.argv[2])
```

Then run `node task build` to trigger the `build` task.

## Transforms

For a more complete example showing more complex usage of flow control, and implemenntation of [rollup](https://ghub.io/rollup), [postcss](https://ghub.io/postcss) and [uglify](https://ghub.io/uglify-es) transforms, see this [sample task.js file](https://gist.github.com/ricardobeat/606859bfcbfbdf84a030ec32382fe202).

This is the spiritual successor of [flour](http://ricardo.cc/cake-flour) and [cake-async](https://github.com/ricardobeat/cake-async) that originally used CoffeeScript and a bit of trickery to create `async` tasks back in 2013. Inspired by [taskr](https://github.com/lukeed/taskr).

## License

MIT Licensed (http://ricardo.mit-license.org)
