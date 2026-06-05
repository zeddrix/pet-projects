export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "pet-projects/projects/blog-app/_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.YU1N8q7v.js",app:"_app/immutable/entry/app.DCpVFex6.js",imports:["_app/immutable/entry/start.YU1N8q7v.js","_app/immutable/chunks/DSEOBwUp.js","_app/immutable/chunks/RwmTlb80.js","_app/immutable/chunks/Cdg5uNHR.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.DCpVFex6.js","_app/immutable/chunks/RwmTlb80.js","_app/immutable/chunks/CfSEqjbv.js","_app/immutable/chunks/CJb77jV1.js","_app/immutable/chunks/DEkGS8XT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/pet-projects/projects/blog-app/","/pet-projects/projects/blog-app/post/1","/pet-projects/projects/blog-app/post/2","/pet-projects/projects/blog-app/post/3"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
