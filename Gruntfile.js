module.exports = function(grunt) {

	var globalConfig = {
		src: 'src',
		dest: 'dev',
		dist : "dist",
		dev : '.devServer',
		timestamp: grunt.template.today('mm-dd_HHMM'),
		jsTestDir : './src/test/js' 
	};

	grunt.initConfig({
		globalConfig : globalConfig,
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			tests : ['<%= globalConfig.jsTestDir %>/src/*.js', '${jsTestDir}tests/*.js'],
			src : ['<%= globalConfig.jsTestDir %>/src/*.js', '#{jsTestDir}/tests/*.js']
		},
		qunit: {
			all: ['#{jsTestDir}/tests/*.html']
		},
		 watch: {
			files: [
				'<%= globalConfig.jsTestDir %>/tests/*.js', 
				'<%= globalConfig.jsTestDir %>/tests/*.html', 
				'<%= globalConfig.jsTestDir %>/specs/*.js', 
				'<%= globalConfig.jsTestDir %>/src/*.js'
				],
			tasks: ['jasmine', 'sync:main' ]
		},
		sync: {
			main: {
				files: [{
				  src: [ '<%= globalConfig.jsTestDir %>/src/**' ],
				  dest: '<%= globalConfig.jsTestDir %>/bin/',
				}]
			}
		},
		jasmine : {
			src : '<%= globalConfig.jsTestDir %>/src/**/*.js',
			options : {
				specs : '<%= globalConfig.jsTestDir %>/specs/**/*.js'
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-sync');
grunt.loadNpmTasks('grunt-contrib-jasmine');

grunt.registerTask('default', 'jasmine');


};

