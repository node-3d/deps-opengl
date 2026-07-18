(
	cd src
	export MACOSX_DEPLOYMENT_TARGET=13.5
	(
		cd glew
		make \
			CFLAGS.EXTRA='-arch x86_64 -mmacosx-version-min=13.5' \
			LDFLAGS.EXTRA='-install_name "@rpath/glew.dylib" -arch x86_64 -mmacosx-version-min=13.5' \
			glew.lib
	)
	
	mv glew/lib/libGLEW.2.2.0.dylib build/glew.dylib
)
