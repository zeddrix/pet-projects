export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "pet-projects/projects/blog-app/_app",
	assets: new Set(["images/about/original-wireframe.png","images/blog-django.jpg","images/blog-django.svg","images/blog-laptop.jpg","images/blog-pizza.jpg","images/hobby-chinese.jpg","images/hobby-coding.jpg","images/hobby-guitar.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.CV3-mFbj.js",app:"_app/immutable/entry/app.FL49ZHUz.js",imports:["_app/immutable/entry/start.CV3-mFbj.js","_app/immutable/chunks/28Sa0woH.js","_app/immutable/chunks/CkdSdq2q.js","_app/immutable/chunks/SNw2J97p.js","_app/immutable/chunks/D4N44O2P.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.FL49ZHUz.js","_app/immutable/chunks/CkdSdq2q.js","_app/immutable/chunks/DbAw6lnl.js","_app/immutable/chunks/D4N44O2P.js","_app/immutable/chunks/BOKhobN5.js","_app/immutable/chunks/D2YbNvBH.js","_app/immutable/chunks/Dku0QUC7.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
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
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/[id]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
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
