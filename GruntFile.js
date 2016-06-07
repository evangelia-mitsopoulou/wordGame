module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {},
             libs: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js'              
                ],
                dest: 'dist/js/libs.js'
            },
            main: {
                src: [
                     'src/init.js',
                     'src/home/listWordsService.js',
                     'src/**/*.js',

                ],
                dest: 'dist/js/main.js'
            },
            css : {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'css/custom.css'
                ],
                dest : 
                    'dist/css/styles.css'
            }
        },
        watch: {
            files: [
                'src/**/*.js'
            ],


            tasks: ['concat']
        },
        jshint: {
            options: {
                curly: false,
                maxerr: 55,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    angular: true,
                    console: true
                },
                maxdepth: 3,
                maxparams: 4,
                undef: true,
                unused: true,
                evil: true,
                validthis: true,
                indent: 4
            },
            uses_defaults: [
                'src/**/*.js',
                ]

        },
        jscs : {
            src: [
                'src/**/*.js',
             ]
        },
            uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },

            build: {
                files: {
                    'dist/js/libs.min.js': ['dist/js/libs.js'],
                    'dist/js/main.min.js': ['dist/js/main.js']
                    /* 'dist/css/styles.min.js': ['dist/css/styles.css']*/
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};