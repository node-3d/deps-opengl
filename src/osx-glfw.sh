(
	cd src
	export MACOSX_DEPLOYMENT_TARGET=13.5

	cmake \
		-S glfw \
		-B glfw-build \
		-DBUILD_SHARED_LIBS=ON \
		-DGLFW_BUILD_EXAMPLES=OFF \
		-DGLFW_BUILD_TESTS=OFF \
		-DGLFW_BUILD_DOCS=OFF \
		-DCMAKE_OSX_ARCHITECTURES=x86_64 \
		-DCMAKE_OSX_DEPLOYMENT_TARGET=13.5 \
		-DCMAKE_SHARED_LINKER_FLAGS='-install_name "@rpath/glfw.dylib"'

	cmake --build glfw-build --config Release --target glfw

	mv glfw-build/src/libglfw.3.4.dylib build/glfw.dylib
)
