(
	cd src
	
	rm -rf build
	rm -rf glew
	rm -rf glfw
	
	mkdir -p build
	git clone --depth 1 -b 3.4 https://github.com/glfw/glfw.git
)

node src/source-patches.js

unzip -qq src/glew-2.2.0.zip -d src
mv src/glew-2.2.0 src/glew
