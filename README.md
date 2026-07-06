# OpenGL binaries

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/%40node-3d%2Fdeps-opengl.svg)](https://badge.fury.io/js/@node-3d/deps-opengl)
[![Lint](https://github.com/node-3d/deps-opengl/actions/workflows/lint.yml/badge.svg)](https://github.com/node-3d/deps-opengl/actions/workflows/lint.yml)
[![Test](https://github.com/node-3d/deps-opengl/actions/workflows/test.yml/badge.svg)](https://github.com/node-3d/deps-opengl/actions/workflows/test.yml)

```console
npm install @node-3d/deps-opengl
```

This dependency package distributes **OpenGL**, **GLFW3** and **GLEW**
binaries through **npm** for **Node.js** addons.

* Platforms: Windows x64, Linux x64, Linux ARM64, macOS ARM64.
* Libraries: GLEW 2.2, GLFW 3.4, OpenGL.


## Usage

### JS Interface

See the [@node-3d/glfw public entrypoint](https://github.com/node-3d/glfw/blob/master/ts/index.ts).

See the [@node-3d/webgl public entrypoint](https://github.com/node-3d/webgl/blob/master/ts/index.ts).


### binding.gyp

See the [@node-3d/glfw binding.gyp](https://github.com/node-3d/glfw/tree/master/src/binding.gyp).

See the [@node-3d/webgl binding.gyp](https://github.com/node-3d/webgl/tree/master/src/binding.gyp).


### addon.cpp

See the [@node-3d/glfw native source](https://github.com/node-3d/glfw/blob/master/src/cpp/glfw-common.hpp).

See the [@node-3d/webgl native source](https://github.com/node-3d/webgl/blob/master/src/cpp/webgl.hpp).

Refer to [GLFW](https://www.glfw.org/documentation.html) and
[GLEW](http://glew.sourceforge.net/basic.html) official docs.


## Legal notice


### GLFW

[GLFW](http://www.glfw.org/index.html) is used under ZLIB license.
It is explicitly stated that GLFW can be used commercially in closed-source projects.
GLFW licensing information (a copy) is given in a [separate file](GLFW_ZLIB),
which also can be found on
[GLFW's official repository](https://github.com/glfw/glfw/blob/master/LICENSE.md).
The binaries are built with this
[GitHub Action](https://raw.githubusercontent.com/nigels-com/glew/master/.github/workflows/build.yml).


### GLEW

[GLEW](http://glew.sourceforge.net/) is used under it's own custom license.
It is explicitly stated that GLEW can be used commercially in closed-source projects.
GLEW licensing information (a copy) is given in a [separate file](GLEW_LICENSE),
which also can be found on
[GLEW's official repository](https://raw.githubusercontent.com/nigels-com/glew/master/LICENSE.txt).
The binaries are built with this
[GitHub Action](https://raw.githubusercontent.com/nigels-com/glew/master/.github/workflows/build.yml).


### OpenGL

End users, independent software vendors, and others writing code based on the OpenGL API
are free from licensing requirements. https://www.opengl.org/about/#11

---

The rest of this package is MIT licensed.
