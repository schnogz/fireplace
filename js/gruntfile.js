module.exports = function (grunt) {

    // Grunt configuration.
    grunt.initConfig({
        pkg: "package.json",

        // jsHint configuration
        jshint: {
            options: {
                "asi": false,
                "curly": true,
                "es3": true,
                "es5": false,
                "forin": true,
                "globalstrict": false,
                "indent": 4,
                "lastsemic": false,
                "scripturl": true,
                "smarttabs": false,
                "strict": false,
                "trailing": true,
                "undef": true,
                "unused": false,
                "white": false,
                "globals": {
                    "$": false,
                    "jQuery": false,
                    "angular": false,
                    "_": false,
                    "setTimeout": false,
                    "window": false,
                    "localStorage": false,
                    "location": false
                }
            },
            all: ['app/**/*.js', '!js/production/templates.js']
        },

        // grunt-watch configuration
        watch: {
            files: ['app/**/*.js', 'app/**/*.html'],
            tasks: ['clean:pre', 'ngtemplates:fireplace', 'concat', 'clean:post']
        },

        // ngTemplates configuration
        ngtemplates: {
            fireplace: {
                cwd: 'app',
                src: '**/*.html',
                dest: 'app/templates.js'
            }
        },

        // grunt-concat configuration
        concat: {
            fireplace: {
                files: {
                    'production.js': [ 'app/**/*.js' ]
                }
            }
        },

        // grunt-clean configuration
        clean: {
            pre: {
                options: {
                    force: true
                },
                src: ['production.js']
            },
            post: {
                options: {
                    force: true
                },
                src: ['app/templates.js']
            }
        },

        // karma configuration
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS'],
                singleRun: true,
                plugins: [
                    'karma-jasmine',
                    'karma-phantomjs-launcher'
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    require('grunt-loadnpmtasks').extend(grunt);

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // Default tasks to run
    grunt.registerTask('default', ['clean:pre', 'jshint', 'ngtemplates:fireplace', 'concat', 'karma', 'clean:post']);
};