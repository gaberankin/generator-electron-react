var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	installNpmDependencies: function () {
		var deps = ["react", "react-bootstrap", "react-dom", "react-redux",
			"redux", "redux-thunk"];
		this.npmInstall(deps, { 'save': true });
	}
});
