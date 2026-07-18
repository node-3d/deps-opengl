@echo off
setlocal

if "%BUILD_PLATFORM%"=="" set BUILD_PLATFORM=x64
set BUILD_DIR=src\glew-build-%BUILD_PLATFORM%
set EXTRA_CMAKE_FLAGS=

if /I "%BUILD_PLATFORM%"=="ARM64" (
	set EXTRA_CMAKE_FLAGS=-DCMAKE_SHARED_LINKER_FLAGS=ucrt.lib
	powershell -NoProfile -Command "(Get-Content -Raw 'src\glew\build\cmake\CMakeLists.txt').Replace('-BASE:0x62AA0000', '-BASE:0x140000000') | Set-Content -NoNewline 'src\glew\build\cmake\CMakeLists.txt'" || exit /b 1
)

cmake -S src\glew\build\cmake -B %BUILD_DIR% -A %BUILD_PLATFORM% -DBUILD_UTILS=OFF -DBUILD_SHARED_LIBS=ON -DCMAKE_POLICY_VERSION_MINIMUM=3.5 %EXTRA_CMAKE_FLAGS% || exit /b 1
cmake --build %BUILD_DIR% --config Release --target glew || exit /b 1

copy /y %BUILD_DIR%\bin\Release\glew32.dll src\build\glew32.dll || exit /b 1
copy /y %BUILD_DIR%\lib\Release\glew32.lib src\build\glew32.lib || exit /b 1
