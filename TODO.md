### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| gulpfile.js | 24 | Find a more elegant way of doing this
| config/index.js | 34 | Decide whether CLI should override process.env
| config/tasks/process/webpack.js | 28 | Clean up entry creation
| source/static/app/pages/index.js | 12 | Decide where to put images that are referenced this way
| source/static/app/templates/base.scss | 17 | Decide where to put images that are referenced this way

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| build/tasks/build.js | 9 | Something is mutating the parallel task string values into object literals... Maybe the sequence task?
| config/tasks/document/todo.js | 7 | Ironically, the 'src' prop needs some work...
| source/static/app/templates/base.js | 7 | Remove unused variable reference? (Throws a JS Hint error)