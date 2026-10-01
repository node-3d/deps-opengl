#include <node_api.h>
#include <GL/glew.h>
#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>

napi_value probe(napi_env env, napi_callback_info) {
	napi_value result;
	napi_get_boolean(env, glfwGetVersionString() != nullptr && glewGetString(GLEW_VERSION) != nullptr, &result);
	return result;
}

napi_value init(napi_env env, napi_value exports) {
	napi_value function;
	napi_create_function(env, "probe", NAPI_AUTO_LENGTH, probe, nullptr, &function);
	napi_set_named_property(env, exports, "probe", function);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
