/**
 * General Grunt setup
 */
'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: ["dist"],
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['*.html'], dest: 'dist/'},
                ]
            }
        },
        connect: {
            test: {
                port: 8000
            },

            develop: {
                options: {
                    port: 9001,
                    keepalive: true
                }
            },

            prod: {
                options: {
                    port: 8080,
                    keepalive: true,
                    base: 'dist'
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
                    src: '**/*.js',
                    dest: 'dist/js',
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
                    cssDir: 'dist/css'
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
                    dest: 'dist/img/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint', 'uglify']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            html: {
                files: ['*.html'],
            }
        }
    });

    // A task for development
    grunt.registerTask('dev', [
        'compass:dev'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'compass:build',
        'uglify',
        'imagemin'
    ]);

    grunt.registerTask('default', 'watch');
}
