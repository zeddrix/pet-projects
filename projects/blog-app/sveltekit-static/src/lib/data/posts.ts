import type { BlogPost } from "$lib/types/blog";

export const posts: BlogPost[] = [
  {
    id: 1,
    title: "Currently Learning Django!",
    excerpt:
      "A couple of weeks ago, I was learning Python on zeddrix.com. And I am telling you, I really learned a lot!",
    author: "Zeddrix Fabian",
    datePosted: "March 14, 2020",
    image: "/images/blog-django.webp",
    body: "A couple of weeks ago, I was learning Python on zeddrix.com. And I am telling you, I really learned a lot! I was even able to create my own game using Python alone! But, after getting a hang of Python, I tried out learning its well-known framework, Django. And right now, as I type here on this blog post, I am currently working on a Django project. To be specific, a portfolio website. And I really thank you for reading this on your own time. Also, I am happy that you are because I really worked so hard to finish this portfolio website! By the way, I am also taking Zedd's course to learn Django on zeddrix.com. Please, I'll be glad for you to read all my other blog posts. I really hope you like this portfolio website! And again, thank you!",
  },
  {
    id: 2,
    title: "Making My Home-Made Pizza",
    excerpt:
      "Pizza dough is a yeasted dough which requires active dry yeast, warm water, and a little time to rise.",
    author: "Zeddrix Fabian",
    datePosted: "March 10, 2020",
    image: "/images/blog-pizza.webp",
    body: `Pizza dough is a yeasted dough which requires active dry yeast, warm water, and a little time to rise. For this recipe, you'll need flour, salt, olive oil, and your favorite toppings. 1. In a large bowl, dissolve yeast and sugar in warm water. Let stand until creamy, about 10 minutes. 2. Stir salt and oil into the yeast mixture. Mix in flour one cup at a time. 3. Knead the dough on a lightly floured surface until smooth and elastic. 4. Place dough in a well-oiled bowl, cover with a damp cloth, and let rise until doubled, about 1 hour. 5. Preheat oven to 450 degrees F (230 degrees C). 6. Punch down the dough and form a tight ball. Allow to rest before shaping. 7. Roll out into a circle on a lightly floured counter. 8. Transfer to a pizza pan or baking sheet. 9. Spread sauce, cheese, and toppings. 10. Bake until crust is golden and cheese is bubbly. 11. Let cool slightly before slicing. 12. Serve with red pepper flakes if you like heat. 13. Store leftovers in the fridge. 14. Nutrition Calories: 1691 Fat: 65 grams Carbs: 211 grams Fiber: 12 grams Sugars: 60 grams Protein: 65 grams. 15. Enjoy!`,
  },
  {
    id: 3,
    title: "My Third Blog!",
    excerpt:
      "Welcome to my third post! I am still learning Django and enjoying every step of building this portfolio.",
    author: "Zeddrix Fabian",
    datePosted: "March 5, 2020",
    image: "/images/blog-laptop.webp",
    body: "Welcome to my third post! I am still learning Django and enjoying every step of building this portfolio. Writing these entries helps me remember what I figured out each week—from templates and static files to organizing my blog posts. If you are following along on zeddrix.com, keep going! The more you build, the more comfortable everything feels. Thanks for reading another update from my Django journey.",
  },
];

export function getPostById(id: number): BlogPost | undefined {
  return posts.find((post) => post.id === id);
}
