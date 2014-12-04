module.exports = function(grunt){

    grunt.initConfig({
        uglify: {
            options: {
                sourceMap: true,
                mangle: false
            },
            app: {
                files: {
                    'public/js/dist/app.min.js': [
                        'public/js/lib/app.js',
                        'public/js/lib/app/**/*.js']
                }
            }
        },

        sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: 'public/style/sass/app',
                    src: ['**/*.scss'],
                    dest: 'public/style/dist/app',
                    ext: '.css'
                }]
            }
        },

        watch: {
            app_js: {
                files: ['public/js/lib/app.js', 'public/js/lib/app/**/*.js'],
                tasks: ['uglify:app']
            },
            app_sass: {
                files: ['public/style/sass/app/**/*.scss'],
                tasks: ['sass:app']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
};