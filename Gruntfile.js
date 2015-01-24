module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    uglify: {
      my_target: {
         files: {
          'resources/js/base.min.js': [
            'resources/js/keyCodeController.js',
            'resources/js/keyboardController.js'
            ]
        }
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
         options: {                       // Target options
          optimizationLevel: 3

        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'resources/img/',                   // Src matches are relative to this path
          src: ['resources/img/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'resources/img/dist/'                  // Destination path prefix
        }]
      }
    },
    
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'resources/css/master.css': 'resources/css/master.scss',       // 'destination': 'source'
        }
      }
    },

    watch: {
      sass: {
        files: ['resources/css/*.scss'],
        tasks: ['sass']
      },
      /* watch and see if our javascript files change, or new packages are installed */
      js: {
        files: ['resources/js/*.js'],
        tasks: ['uglify']
      },
      /* watch our files for change, reload */
      livereload: {
        files: ['*.html', 'assets/css/*.css', 'assets/images/*', 'assets/js/{main.min.js, plugins.min.js}'],
        options: {
          livereload: true
        }
      },
    }

  });

  grunt.registerTask('default', ['imagemin:dynamic', 'watch']);

}