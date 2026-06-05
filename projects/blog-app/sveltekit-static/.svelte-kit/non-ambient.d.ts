
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/about" | "/blog" | "/blog/[id]" | "/post" | "/post/[id]" | "/projects";
		RouteParams(): {
			"/blog/[id]": { id: string };
			"/post/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string | undefined };
			"/about": Record<string, never>;
			"/blog": { id?: string | undefined };
			"/blog/[id]": { id: string };
			"/post": { id?: string | undefined };
			"/post/[id]": { id: string };
			"/projects": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/blog" | `/blog/${string}` & {} | `/blog/${string}/` & {} | "/projects";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/images/.DS_Store" | "/images/about/original-wireframe.png" | "/images/blog-django.jpg" | "/images/blog-laptop.jpg" | "/images/blog-laptop.webp" | "/images/blog-pizza.jpg" | "/images/hobby-chinese.jpg" | "/images/hobby-coding.jpg" | "/images/hobby-guitar.jpg" | string & {};
	}
}