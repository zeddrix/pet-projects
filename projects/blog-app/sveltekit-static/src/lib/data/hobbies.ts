export interface Hobby {
  image: string;
  alt: string;
  description: string;
}

export const hobbies: Hobby[] = [
  {
    image: "/images/hobby-chinese.jpg",
    alt: "Chinese characters calligraphy",
    description:
      "I am currently learning Mandarin Chinese. I love this language!",
  },
  {
    image: "/images/hobby-guitar.jpg",
    alt: "Hands playing acoustic guitar",
    description:
      "I love playing guitar! I play a lot of songs: Original Songs from jw.org and also Kingdom Songs. I even groped some guitar tabs for these Kingdom Songs.",
  },
  {
    image: "/images/hobby-coding.jpg",
    alt: "Hands typing on a laptop keyboard",
    description:
      "Coding is one of my many hobbies. In fact, it is my profession.",
  },
];
