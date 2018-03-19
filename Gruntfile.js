module.exports = function(grunt) {

  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat: {
	  options: {
		// 定义一个用于插入合并输出文件之间的字符
		separator: ';'
	  },
	  dist: {
		// 将要被合并的文件
		src: ['src/**/*.js'],
		// 合并后的JS文件的存放位置
		dest: 'dist/<%= pkg.name %>.js'
	  }
	},
	uglify: {
		batch: {
			expand : true,            //将占位符*展开 即使用占位符匹配文件名
			src: 'statics/core/*.js',       //压缩src目录及所有子目录下的js文件
			rename: function(dest, src){
				var folder = src.substring(0, src.lastIndexOf('/'));  
				var filename = src.substring(src.lastIndexOf('/'), src.length);  
				
				filename = filename.substring(0, filename.lastIndexOf('.')); 
				
				var fileresult= folder + filename + '.js';  
				//grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  

				return fileresult; 
			}
			//dest: '.',             //压缩文件存放到dist目录下的同名目录
			//ext: '.js',           //压缩文件的后缀名
        },
		staticjs: {
			expand : true,            //将占位符*展开 即使用占位符匹配文件名
			src: ['statics/js/*.js', '!statics/js/*.min.js'],       //压缩src目录及所有子目录下的js文件
			rename: function(dest, src){
				var folder = src.substring(0, src.lastIndexOf('/'));  
				var filename = src.substring(src.lastIndexOf('/'), src.length);  
				
				filename = filename.substring(0, filename.lastIndexOf('.')); 
				
				var fileresult= folder + filename + '.js';  
				//grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  

				return fileresult; 
			}
			//dest: '.',             //压缩文件存放到dist目录下的同名目录
			//ext: '.js',           //压缩文件的后缀名
        },
	},
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['uglify']);

};
