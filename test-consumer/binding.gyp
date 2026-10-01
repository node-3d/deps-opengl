{
	'variables': {
		'dep_bin': '<!(node -p "require(\'@node-3d/deps-opengl\').bin")',
		'dep_include': '<!(node -p "require(\'@node-3d/deps-opengl\').include")',
		'bin': '<!(node -p "require(\'@node-3d/addon-tools\').getBin()")',
	},
	'targets': [{
		'target_name': 'consumer',
		'sources': ['consumer.cpp'],
		'include_dirs': ['<(dep_include)'],
		'library_dirs': ['<(dep_bin)'],
		'conditions': [
			['OS=="linux"', { 'libraries': ["-Wl,-rpath,'$$ORIGIN/../../node_modules/@node-3d/deps-opengl/<(bin)'", '<(dep_bin)/libglfw.so.3', '<(dep_bin)/libGLEW.so.2.2', '<(dep_bin)/libGL.so', '<(dep_bin)/libXrandr.so'] }],
			['OS=="mac"', { 'defines': ['GL_SILENCE_DEPRECATION'], 'libraries': ['-Wl,-rpath,@loader_path/../../node_modules/@node-3d/deps-opengl/<(bin)', '<(dep_bin)/libglfw.3.dylib', '<(dep_bin)/glew.dylib'] }],
			['OS=="win"', { 'libraries': ['glfw3dll.lib', 'glew32.lib', 'opengl32.lib'] }],
		],
	}],
}
