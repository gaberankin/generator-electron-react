var generators = require('yeoman-generator');

var TemplateReplacements = {
	appName: null,
	cssName: null,
	jsClassName: null,
	jsVarName: null

};

module.exports = generators.Base.extend({
	prompting: function () {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'name',
			message : 'Application name (your controller\'s name and css classes will be derived from this)',
			default : this.appname // Default to current folder name
		}, function (answers) {
			TemplateReplacements.appName = answers.name;
			TemplateReplacements.cssName = toCssSafe(answers.name);
			TemplateReplacements.jsClassName = toJsSafe(answers.name)+'App';
			TemplateReplacements.jsVarName = toJsSafe(answers.name).toLowerCase();
			this.log(TemplateReplacements);
			done();
		}.bind(this));
	},
	packageJson: function(){
		var defaultJson = {
			name: TemplateReplacements.cssName,	//the css name is going to be the safest.  users may enter invalid names in the prompt, and npm doesnt like spaces :(
			scripts: {
				start : "node_modules/.bin/electron dist/js/main.js"
			}
		};
		if(this.fs.exists(this.destinationPath('package.json'))) {
			this.fs.extendJSON(this.destinationPath('package.json'), defaultJson);
		} else {
			this.fs.writeJSON(this.destinationPath('package.json'), defaultJson);
		}
	},
	templates: function(){

		this.fs.copyTpl(
			this.templatePath('gulpfile.js'),
			this.destinationPath('gulpfile.js'),
			TemplateReplacements
		);
		this.fs.copyTpl(
			this.templatePath('src/index.jade'),
			this.destinationPath('src/index.jade'),
			TemplateReplacements
		);
		/* CSS */
		this.fs.copyTpl(
			this.templatePath('src/styles/main.scss'),
			this.destinationPath('src/styles/main.scss'),
			TemplateReplacements
		);
		this.directory('src/styles/vendor', 'src/styles/vendor');


		/* JS */
		var jsFiles = [
			'src/js/app.jsx',
			'src/js/main.js',
			'src/js/actions/index.js',
			'src/js/components/index.js',
			'src/js/components/AlertDialog.jsx',
			'src/js/components/LoadingDialog.jsx',
			'src/js/constants/ActionTypes.js',
			'src/js/containers/App.jsx',
			[
				'src/js/containers/AppContainer.jsx.template',
				'src/js/containers/'+TemplateReplacements.jsClassName+'.jsx'
			],
			'src/js/helpers/debounce.js',
			'src/js/helpers/escapeHtml.js',
			'src/js/helpers/throttle.js',
			'src/js/reducers/index.js',
			[
				'src/js/reducers/appreducer.js.template',
				'src/js/reducers/'+TemplateReplacements.jsVarName+'.js'
			],
		];
		for(var i = 0, l = jsFiles.length; i < l; i++) {
			if(typeof jsFiles[i] === 'string') {
				this.fs.copyTpl(this.templatePath(jsFiles[i]), this.destinationPath(jsFiles[i]), TemplateReplacements);
			} else if(jsFiles[i] instanceof Array) {
				this.fs.copyTpl(this.templatePath(jsFiles[i][0]), this.destinationPath(jsFiles[i][1]), TemplateReplacements);
			}
		}


	},
	installNpmDependencies: function () {
		var devDeps = ["babel-core", "babel-preset-es2015", "babel-preset-react",
			"babel-preset-stage-2", "electron-prebuilt", "gulp",
			"gulp-babel", "gulp-changed", "gulp-jade", "gulp-sass"];
		var deps = ["react", "react-bootstrap", "react-dom", "react-redux",
			"redux", "redux-thunk"];
		this.npmInstall(devDeps, { 'saveDev': true });
		this.npmInstall(deps, { 'save': true });
	}
});


var toJsSafe = function(name) {
	//camel-casing
	var modifiedName = name.trim().replace(/([a-zA-Z])[^a-zA-Z0-9_]+([a-zA-Z])/g, function(match, p1, p2){
		return p1+p2.toUpperCase();
	});
	//remove non-variable-safe characters
	modifiedName = modifiedName.replace(/[^a-zA-Z0-9_]+/g, '');
	//capitalize first character if it begins with a letter (there are better ways to do this)
	modifiedName = modifiedName.replace(/^([a-z])(.*)$/, function(match, p1, p2) {
		return p1.toUpperCase()+p2;
	});
	//if it doesn't begin with a letter, prepend 'Electron';
	modifiedName = modifiedName.replace(/^([^A-Z].*)$/, function(match, p1){
		return 'Electron' + p1;
	});
	if(modifiedName === '') {
		return 'Electron';
	}
	return modifiedName;
};

var toCssSafe = function(name) {
	//remove non-css-safe characters
	var modifiedName = name.trim().toLowerCase().replace(/[^a-zA-Z0-9\-]+/g, '-');
	//remove duplicate dashes
	while(modifiedName.indexOf('--') !== -1) {
		modifiedName = modifiedName.replace(/--/g, '-');
	}
	//if it doesn't begin with a letter, prepend 'electron-app';
	modifiedName = modifiedName.replace(/^([^a-zA-Z].*)$/, function(match, p1){
		return 'electron-app' + p1;
	});

	if(modifiedName === '') {
		return 'electron-app';
	}
	return modifiedName;
};
