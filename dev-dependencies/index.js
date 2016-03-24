var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	installNpmDependencies: function () {
		var devDeps = ["babel-core", "babel-preset-es2015", "babel-preset-react",
			"babel-preset-stage-2", "electron-prebuilt", "gulp",
			"gulp-babel", "gulp-changed", "gulp-jade", "gulp-sass"];
		this.npmInstall(devDeps, { 'saveDev': true });
	}
});
