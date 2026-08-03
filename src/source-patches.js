import fs from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('src/glfw/src');

const replace = async (relativePath, before, after) => {
	const filePath = path.join(sourceRoot, relativePath);
	const source = await fs.readFile(filePath, 'utf8');
	if (source.includes(after)) {
		return;
	}
	if (!source.includes(before)) {
		throw new Error(`Unable to patch ${relativePath}`);
	}
	await fs.writeFile(filePath, source.replace(before, after));
};

await replace(
	'internal.h',
	`#define EGL_SURFACE_TYPE 0x3033
#define EGL_WINDOW_BIT 0x0004
#define EGL_RENDERABLE_TYPE 0x3040`,
	`#define EGL_SURFACE_TYPE 0x3033
#define EGL_PBUFFER_BIT 0x0001
#define EGL_WINDOW_BIT 0x0004
#define EGL_RENDERABLE_TYPE 0x3040`,
);

await replace(
	'internal.h',
	`#define EGL_SAMPLES 0x3031
#define EGL_OPENGL_ES_API 0x30a0`,
	`#define EGL_SAMPLES 0x3031
#define EGL_HEIGHT 0x3056
#define EGL_WIDTH 0x3057
#define EGL_OPENGL_ES_API 0x30a0`,
);

await replace(
	'internal.h',
	`typedef EGLSurface (APIENTRY * PFN_eglCreateWindowSurface)(EGLDisplay,EGLConfig,EGLNativeWindowType,const EGLint*);
typedef EGLBoolean (APIENTRY * PFN_eglMakeCurrent)(EGLDisplay,EGLSurface,EGLSurface,EGLContext);`,
	`typedef EGLSurface (APIENTRY * PFN_eglCreatePbufferSurface)(EGLDisplay,EGLConfig,const EGLint*);
typedef EGLSurface (APIENTRY * PFN_eglCreateWindowSurface)(EGLDisplay,EGLConfig,EGLNativeWindowType,const EGLint*);
typedef EGLBoolean (APIENTRY * PFN_eglMakeCurrent)(EGLDisplay,EGLSurface,EGLSurface,EGLContext);`,
);

await replace(
	'internal.h',
	`#define eglCreateContext _glfw.egl.CreateContext
#define eglDestroySurface _glfw.egl.DestroySurface`,
	`#define eglCreateContext _glfw.egl.CreateContext
#define eglCreatePbufferSurface _glfw.egl.CreatePbufferSurface
#define eglDestroySurface _glfw.egl.DestroySurface`,
);

await replace(
	'internal.h',
	`        PFN_eglCreateContext        CreateContext;
        PFN_eglDestroySurface       DestroySurface;`,
	`        PFN_eglCreateContext        CreateContext;
        PFN_eglCreatePbufferSurface CreatePbufferSurface;
        PFN_eglDestroySurface       DestroySurface;`,
);

await replace(
	'egl_context.c',
	`        // Only consider window EGLConfigs
        if (!(getEGLConfigAttrib(n, EGL_SURFACE_TYPE) & EGL_WINDOW_BIT))
            continue;`,
	`        // The null platform represents windows with EGL pbuffers.
        if (_glfw.platform.platformID == GLFW_PLATFORM_NULL)
        {
            if (!(getEGLConfigAttrib(n, EGL_SURFACE_TYPE) & EGL_PBUFFER_BIT))
                continue;
        }
        // Real native platforms need window EGLConfigs.
        else if (!(getEGLConfigAttrib(n, EGL_SURFACE_TYPE) & EGL_WINDOW_BIT))
            continue;`,
);

await replace(
	'egl_context.c',
	`    _glfw.egl.CreateContext = (PFN_eglCreateContext)
        _glfwPlatformGetModuleSymbol(_glfw.egl.handle, "eglCreateContext");
    _glfw.egl.DestroySurface = (PFN_eglDestroySurface)`,
	`    _glfw.egl.CreateContext = (PFN_eglCreateContext)
        _glfwPlatformGetModuleSymbol(_glfw.egl.handle, "eglCreateContext");
    _glfw.egl.CreatePbufferSurface = (PFN_eglCreatePbufferSurface)
        _glfwPlatformGetModuleSymbol(_glfw.egl.handle, "eglCreatePbufferSurface");
    _glfw.egl.DestroySurface = (PFN_eglDestroySurface)`,
);

await replace(
	'egl_context.c',
	`        !_glfw.egl.BindAPI ||
        !_glfw.egl.CreateContext ||
        !_glfw.egl.DestroySurface ||`,
	`        !_glfw.egl.BindAPI ||
        !_glfw.egl.CreateContext ||
        !_glfw.egl.CreatePbufferSurface ||
        !_glfw.egl.DestroySurface ||`,
);

await replace(
	'egl_context.c',
	`    native = _glfw.platform.getEGLNativeWindow(window);
    // HACK: ANGLE does not implement eglCreatePlatformWindowSurfaceEXT
    //       despite reporting EGL_EXT_platform_base
    if (_glfw.egl.platform && _glfw.egl.platform != EGL_PLATFORM_ANGLE_ANGLE)
    {
        window->context.egl.surface =
            eglCreatePlatformWindowSurfaceEXT(_glfw.egl.display, config, native, attribs);
    }
    else
    {
        window->context.egl.surface =
            eglCreateWindowSurface(_glfw.egl.display, config, native, attribs);
    }`,
	`    if (_glfw.platform.platformID == GLFW_PLATFORM_NULL)
    {
        EGLint pbufferAttribs[] =
        {
            EGL_WIDTH, window->null.width,
            EGL_HEIGHT, window->null.height,
            EGL_NONE
        };

        window->context.egl.surface =
            eglCreatePbufferSurface(_glfw.egl.display, config, pbufferAttribs);
    }
    else
    {
        native = _glfw.platform.getEGLNativeWindow(window);
        // HACK: ANGLE does not implement eglCreatePlatformWindowSurfaceEXT
        //       despite reporting EGL_EXT_platform_base
        if (_glfw.egl.platform && _glfw.egl.platform != EGL_PLATFORM_ANGLE_ANGLE)
        {
            window->context.egl.surface =
                eglCreatePlatformWindowSurfaceEXT(_glfw.egl.display, config, native, attribs);
        }
        else
        {
            window->context.egl.surface =
                eglCreateWindowSurface(_glfw.egl.display, config, native, attribs);
        }
    }`,
);
