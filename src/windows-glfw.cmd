@echo off
setlocal

if "%BUILD_PLATFORM%"=="" set BUILD_PLATFORM=x64
set BUILD_DIR=src\glfw-build-%BUILD_PLATFORM%

cmake -S src\glfw -B %BUILD_DIR% -A %BUILD_PLATFORM% -DBUILD_SHARED_LIBS=ON -DUSE_MSVC_RUNTIME_LIBRARY_DLL=ON -DGLFW_BUILD_EXAMPLES=OFF -DGLFW_BUILD_TESTS=OFF -DGLFW_BUILD_DOCS=OFF || exit /b 1
cmake --build %BUILD_DIR% --config Release --target glfw || exit /b 1

copy /y %BUILD_DIR%\src\Release\glfw3.dll src\build\glfw3.dll || exit /b 1
copy /y %BUILD_DIR%\src\Release\glfw3dll.lib src\build\glfw3dll.lib || exit /b 1
