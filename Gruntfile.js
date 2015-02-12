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
                        'app/public/js/lib/app.js',
                        'app/public/js/lib/app/**/*.js']
                }
            }
        },

        sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: 'app/public/style/sass/app',
                    src: ['**/*.scss'],
                    dest: 'app/public/style/dist/app',
                    ext: '.css'
                }]
            }
        },

        watch: {
            app_js: {
                files: ['app/public/js/lib/app.js', 'app/public/js/lib/app/**/*.js'],
                tasks: ['uglify:app']
            },
            app_sass: {
                files: ['app/public/style/sass/app/**/*.scss'],
                tasks: ['sass:app']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
};