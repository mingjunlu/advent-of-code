import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Advent of Code',
  description: 'My Solutions to Advent of Code',
  base: '/advent-of-code/',
  srcDir: 'src',
  themeConfig: {
    sidebar: [
      {
        text: '2023',
        items: [
          { text: 'Day 1: Trebuchet?!', link: '/2023/day-1' },
          { text: 'Day 2: Cube Conundrum', link: '/2023/day-2' },
          { text: 'Day 3: Gear Ratios', link: '/2023/day-3' },
          { text: 'Day 4: Scratchcards', link: '/2023/day-4' },
          { text: 'Day 5: If You Give A Seed A Fertilizer', link: '/2023/day-5' },
        ],
      },
    ],
    outline: 'deep',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mingjunlu/advent-of-code' },
    ],
  },
});
