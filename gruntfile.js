'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cdnUrl: 'http://cdn1.ccf-china.com/',
    localCdnRoot: '/usr/local/var/www/cdn.ccf-china.com/assets',
    localCdnRootDev: '/usr/local/var/www/cdn.ccf-china.com/assets/public',
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' //添加banner
      },
      build: {
        files: [{
          expand: true,
          cwd: 'public/js/', //js目录下
          src: '**/*.js', //所有js文件
          dest: 'min/js/' //输出到此目录下
        }]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'public/css/', //css目录下
          src: '**/*.css', //所有css文件
          dest: 'min/css/' //输出到此目录下
        }]
      }
    },
    md5_plus: {
      options: {
        separator: '_',
        md5Length: '8',
        mapConfig: 'md5Map.json'
      },
      css: {
        files: [{
          expand: true,
          cwd: 'min/',
          src: 'css/**/*',
          dest: 'md5/'
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: 'min/',
          src: ['js/**/*', 'images/**/*'],
          dest: '<%= localCdnRoot%>/'
        }]
      },
      img: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['images/**/*'],
          dest: '<%= localCdnRoot%>/'
        }]
      }
    },
    local2cdn: {
      options: {
        prefix: '<%= cdnUrl %>',
        maps: grunt.file.readJSON('md5Map.json')
      },
      css: {
        files: [{
          expand: true,
          cwd: 'md5/css/',
          src: '**/*.css',
          dest: '<%= localCdnRoot%>/css/'
        }]
      },
      xtpl: {
        files: [{
          expand: true,
          cwd: 'public/templates/',
          src: '**/*.xtpl',
          dest: 'views/'
        }]
      }
    },
    cdnify: {
      options: {
        base: '//cdn1.ccf-china.com/public/'
      },
      css: {
        files: [{
          expand: true,
          cwd: 'public/css/',
          src: '**/*.css',
          dest: '<%= localCdnRootDev %>/css/'
        }]
      },
      xtpls: {
        files: [{
          expand: true,
          cwd: 'public/templates/',
          src: '**/*.xtpl',
          dest: 'views/'
        }]
      }
    },
    rewrite: {
      quotes: {
        src: 'md5Map.json',
        editor: function(contents, filePath) {
          var md5Map = JSON.parse(contents);
          var key;
          for (key in md5Map) {
            md5Map[key] = key.substring(0, key.lastIndexOf('.')) + '_' + md5Map[key] + key.substring(key.lastIndexOf('.'));
          }
          return JSON.stringify(md5Map);
        }
      }
    },
    clean: {
      dist: {
        src: ['md5', 'min', 'md5Map.json', 'views', '<%= localCdnRoot%>/']
      },
      tmp: {
        src: ['tmp/**', 'md5/**']
      }
    },
    copy: {
      jsimgs: {
        expand: true,
        cwd: 'public/',
        src: ['js/**/*', 'images/**/*','favicon.ico'],
        dest: '<%= localCdnRootDev %>/'
      }
    },
    watch: {
      files: ['public/**/*'],
      tasks: ['copy', 'cdnify']
    }
  });

  grunt.loadNpmTasks('grunt-md5-plus');
  grunt.loadNpmTasks('grunt-local2cdn');
  grunt.loadNpmTasks('grunt-rewrite');
  grunt.loadNpmTasks('grunt-cdnify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.option('force', true);

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('prod', ['clean:dist', 'uglify', 'cssmin', 'md5_plus', 'rewrite', 'local2cdn', 'clean:tmp']);

}
