# generator-electron-react
Yeoman generator for my personal electron projects

Currently, I have no plans to register this on npmjs.org.  If you want to use it (feel free), follow these steps:

 1. `git clone` the repository
 2. `cd` to the repository on your computer
 3. Tell npm about the generator by typing `npm link`

From there, you can use yeoman to scaffold an electron-react app by creating a folder for your project and typing `yo electron-react`.  It will prompt you for an application name, which is what it will use to generate the app's redux reducer and React container class.  Building the scaffoldded app is simple - make sure gulp is installed and just type `gulp`.

This was my first yeoman generator, so excuse oddities.

### What the generator does
The generator follows these steps:

 1. Prompts for application name (any string will work.  the input string will be sanitized for the JS reducer name and class name as well as the css names).
 2. Tries to add a package.json file to your directory.  If it already exists, it will try to add a scripts.start entry so you can run the app from `npm start`, as well as set an application name in the package.json file
 3. Processes and copies over the template files from the app/templates directory of this repository.  This includes the gulpfile.js.  __Note that I don't make any assumptions on whether the file already exists.__  this is probably a bad idea on my part, and I may adjust this later on to be friendlier
 4. Installs npm dependencies.  The dependency installation is run with the --save and --save-dev flags so they are added to the package.json file.

### The gulpfile
With gulp installed, the following commands are available:
 + `gulp js` - compiles all ES6 and JSX code into browser-safe code.
 + `gulp css` - processes the scss files in the src/styles directory
 + `gulp jade` - processes any jade template files in the src directory (it's unlikely you will need this if your markup is built with React).  I just used jade because I felt like it.  It doesn't bring any benefits to the project at this time.
 + `gulp watch:js` - starts a watch-loop which runs the `js` task whenever it sees that a js or jsx file is modified.
 + `gulp watch:css` - starts a watch-loop which runs the `css` task whenever it sees that a scss file is modified.
 + `gulp watch:jade` - starts a watch-loop which runs the `jade` task whenever it sees that a jade file is modified.
 + `gulp dist` - does the `js`, `css`, and `jade` tasks - __This task is the default behavior, so it can be run with just `gulp`__
