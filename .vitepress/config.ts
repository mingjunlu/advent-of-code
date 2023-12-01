import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Advent of Code',
  description: 'My Solutions to Advent of Code',
  srcDir: 'src',
  themeConfig: {
    sidebar: [
      {
        text: '2023',
        items: []
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mingjunlu/advent-of-code' },
    ],
  },
});
