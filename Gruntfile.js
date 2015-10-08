module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        ts: {
            default: {
                files: [{src: ["typescript/eventpage.ts"], dest: "bin/"},
                        { src: ['typescript/tab/tabpage.ts', 'typescript/tab/popup.ts', 'typescript/tab/messaging.ts', 'typescript/tab/mousecap.ts', 'typescript/tab/extractwords.ts' ], dest: "bin/kl.js"}],
                options: {
                    target: "es5",
                    fast: 'never',
                    noImplicitAny: 'true',
                    suppressImplicitAnyIndexErrors: 'true',
                }
            }

        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['typescript/*.ts', 'typescript/*.map', 'html/*'],
                        dest: 'bin/'
                    },
                ]
            },
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: true,

                    // specify config file
                    config: '../conf/tsd.json',

                    // experimental: options to pass to tsd.API
                    opts: {
                        // props from tsd.Options
                    }
                }
            }
        },
        run: {
            dev : {
                cmd: 'google-chrome',
                args: [
                    '--load-extension=bin/',
                    'test/test1.html'
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default', ["ts", "copy:main"]);
    grunt.registerTask('rundev', ["run:dev"]);
    grunt.loadNpmTasks('grunt-karma');



};