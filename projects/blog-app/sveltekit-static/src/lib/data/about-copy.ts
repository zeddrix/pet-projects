export interface AboutSection {
  paragraphs: string[];
  wireframe?: {
    src: string;
    alt: string;
    caption: string;
  };
}

export const aboutSections: AboutSection[] = [
  {
    paragraphs: [
      "Back in 2020, this was the first django project that I've worked on. I learned so much about django, python, and bootstrap from this project. I even created a course about this on my website before at zeddrix.com to help other new devs learn about this too.",
      "I still remember how exciting it was to wire up models, views, and templates for the first time. Every small win felt huge—getting a post to show up on the home page, styling cards with Bootstrap, and finally seeing the blog come together in the browser. That hands-on loop of breaking things, reading docs, and fixing them again is what made Django click for me.",
      "The portfolio you are browsing now started as a simple idea on paper. I wanted a personal site with an about section, a projects area, and a blog where I could write about what I was learning. It was my way of documenting the journey while inviting others to follow along.",
    ],
  },
  {
    wireframe: {
      src: "/images/about/original-wireframe.webp",
      alt: "Hand-drawn 2020 wireframe sketch of Zedd Fabian's portfolio About page and blog layout",
      caption:
        "This is where the idea originated from hehe. I worked hard on drawing this you know :).",
    },
    paragraphs: [],
  },
  {
    paragraphs: [
      "Years later, I archived the original Django codebase inside this monorepo under django-original. That folder is preserved on purpose—you can still browse the real project history on GitHub. I did not want to lose where this all started.",
      "GitHub Pages cannot run a Django server, so a plain static copy of the Python app was never going to behave the same way online. To keep the demo alive inside my pet-projects playground, I rebuilt the look and feel with SvelteKit in sveltekit-static. It is static HTML and assets only, but it lets me showcase the site to you without needing a backend.",
      "If you are learning Django today, I hope this little time capsule encourages you. I was a beginner when I drew that sketch, and I am still learning—just on bigger projects now. Thanks for stopping by and reading a bit of the story behind this demo.",
    ],
  },
];
