### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| gulpfile.js | 27 | Find a more elegant way of doing this
| config/index.js | 34 | Decide whether CLI should override process.env
| config/tasks/process/webpack.js | 29 | Clean up entry creation
| config/tasks/process/webpack.js | 120 | Enable relative 'url' values in compiled CSS
| source/static/app/pages/index.js | 12 | Decide where to put images that are referenced this way
| source/static/app/templates/base.scss | 17 | Decide where to put images that are referenced this way

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| config/project.js | 53 | Prefix filename with has in order to distribute object requests across S3  partitions
| build/utils/sequencer.js | 9 | Something is mutating the parallel task string values into object literals... Maybe the sequence task?
| build/tasks/process/uncss.js | 59 | Bug goes away, bug comes back. Cannot run in parallel.
| config/tasks/document/todo.js | 7 | Ironically, the 'src' prop needs some work...
| config/tasks/process/webpack.js | 76 | Dry this up
| source/static/app/templates/base.js | 7 | Remove unused variable reference? (Throws a JS Hint error)