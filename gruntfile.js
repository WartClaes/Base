/**
 * General Grunt setup
 */
'use strict';

var buildDir = 'build',
    port = 35729,
    lrSnippet = require('connect-livereload')({ port: port }),
    mountFolder = function( connect, dir ) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [buildDir, 'js/min'],
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['**/*.html', '!node_modules/**/*', '!build/**/*'],
                    dest: buildDir
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    src: ['js/vendor/*'],
                    dest: buildDir
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder(connect, './')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dist: {
                src: 'js/min/*.js',
                dest: buildDir + '/js/app.js',
            }
        },
        processhtml: {
            dist: {
                files: {
                    'build/index.html' : ['index.html']
                }
            }
        },
        jshint: {
            all: [
                'js/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    src: '*.js',
                    dest: 'js/min',
                    cwd: 'js'
                }]
            }
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                },
                files: 'sass/**/*.scss'
            },
            build: {
                options: {
                    config: 'config.rb',
                    outputStyle: 'compressed',
                    cssDir: buildDir + '/css'
                },
                files: 'sass/**/*.scss'
            }
        },
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: buildDir + '/img/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint', 'uglify']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            html: {
                files: ['*.html']
            },
            livereload: {
                options: {
                    livereload: port
                },
                files: ['css/**/*', 'js/**/*', '*.html'],
            }
        }
    });

    grunt.registerTask('dev', function() {
        grunt.task.run([
            'jshint',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean',
        'copy',
        'compass:build',
        'jshint',
        'uglify',
        'concat',
        'imagemin',
        'processhtml'
    ]);

    grunt.registerTask('default', 'dev');
}
