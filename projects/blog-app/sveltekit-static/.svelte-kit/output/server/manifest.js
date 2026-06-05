export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "pet-projects/projects/blog-app/_app",
	assets: new Set([".DS_Store","images/.DS_Store","images/about/original-wireframe.png","images/blog-django.jpg","images/blog-laptop.jpg","images/blog-laptop.webp","images/blog-pizza.jpg","images/hobby-chinese.jpg","images/hobby-coding.jpg","images/hobby-guitar.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.DLzYuSdR.js",app:"_app/immutable/entry/app.DAO-ePak.js",imports:["_app/immutable/entry/start.DLzYuSdR.js","_app/immutable/chunks/BG9z-kpy.js","_app/immutable/chunks/D_dT1I5l.js","_app/immutable/chunks/H4Ce3rFx.js","_app/immutable/chunks/4PNl8qPg.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.DAO-ePak.js","_app/immutable/chunks/D_dT1I5l.js","_app/immutable/chunks/DyO6QDcf.js","_app/immutable/chunks/4PNl8qPg.js","_app/immutable/chunks/DXzRz310.js","_app/immutable/chunks/D0Iliwzd.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/pet-projects/projects/blog-app/","/pet-projects/projects/blog-app/about","/pet-projects/projects/blog-app/blog","/pet-projects/projects/blog-app/projects","/pet-projects/projects/blog-app/blog/1","/pet-projects/projects/blog-app/blog/2","/pet-projects/projects/blog-app/blog/3"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
