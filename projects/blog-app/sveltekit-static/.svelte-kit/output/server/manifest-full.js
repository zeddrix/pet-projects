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
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/post/[id]",
				pattern: /^\/post\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
