# Day 3: Gear Ratios

## Part 1

You and the Elf eventually reach a [gondola lift](https://en.wikipedia.org/wiki/Gondola_lift) station; he says the gondola lift will take you up to the **water source**, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can **add up all the part numbers** in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently **any number adjacent to a symbol**, even diagonally, is a "part number" and should be included in your sum. (Periods (`.`) do not count as a symbol.)

Here is an example engine schematic:

```
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```

In this schematic, two numbers are **not** part numbers because they are not adjacent to a symbol: `114` (top right) and `58` (middle right). Every other number is adjacent to a symbol and so **is** a part number; their sum is **`4361`**.

Of course, the actual engine schematic is much larger. **What is the sum of all of the part numbers in the engine schematic?**

### Solution

<!-- prettier-ignore-start -->
```ts
function calculateSum(lines: string[]): number {
  const partNumbers = lines.flatMap((line, y, allLines) => {
    return line
      .trim()
      .split('')
      .flatMap((character, x) => {
        const isSymbol = /[^A-Za-z0-9.]/.test(character);
        if (!isSymbol) {
          return [];
        }
        const partNumbersOnPreviousLine = deduplicate(
          [
            findPartNumber(allLines[y - 1], x - 1), // Top left
            findPartNumber(allLines[y - 1], x), // Top
            findPartNumber(allLines[y - 1], x + 1), // Top right
          ].filter(isNumber),
        );
        const partNumbersOnCurrentLine = deduplicate(
          [
            findPartNumber(allLines[y], x - 1), // Left
            findPartNumber(allLines[y], x + 1), // Right
          ].filter(isNumber),
        );
        const partNumbersOnNextLine = deduplicate(
          [
            findPartNumber(allLines[y + 1], x - 1), // Bottom left
            findPartNumber(allLines[y + 1], x), // Bottom
            findPartNumber(allLines[y + 1], x + 1), // Bottom right
          ].filter(isNumber),
        );
        const partNumbers = [
          ...partNumbersOnPreviousLine,
          ...partNumbersOnCurrentLine,
          ...partNumbersOnNextLine,
        ];
        return partNumbers;
      });
  });
  return partNumbers.reduce((total, current) => total + current, 0);
}

function deduplicate<Type>(values: Type[]) {
  return [...new Set<Type>(values)];
}
function findPartNumber(
  text?: string,
  index?: number,
): number | undefined {
  if (text === undefined || index === undefined) {
    return undefined;
  }
  const trimmedText = text.trim();
  if (!Number.isInteger(Number(trimmedText[index]))) {
    return undefined;
  }
  let [startIndex, endIndex] = [index, index];
  for (let i = index; i >= 0; i--) {
    const head = Number(trimmedText.at(i));
    if (!Number.isInteger(head)) {
      break;
    }
    startIndex = i;
  }
  for (let j = index; j <= trimmedText.length; j++) {
    const tail = Number(trimmedText.at(j));
    if (!Number.isInteger(tail)) {
      break;
    }
    endIndex = j;
  }
  return Number(trimmedText.slice(startIndex, endIndex + 1));
}
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
```
<!-- prettier-ignore-end -->

## Part 2

The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A **gear** is any `*` symbol that is adjacent to **exactly two part numbers**. Its **gear ratio** is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

```
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```

In this schematic, there are **two** gears. The first is in the top left; it has part numbers `467` and `35`, so its gear ratio is `16345`. The second gear is in the lower right; its gear ratio is `451490`. (The `*` adjacent to `617` is **not** a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces **`467835`**.

**What is the sum of all of the gear ratios in your engine schematic?**

### Solution

<!-- prettier-ignore-start -->
```ts{6-8,36-38,41,42,44}
function calculateSum(lines: string[]): number {
  const gearRatios = lines.flatMap((line, y, allLines) => {
    return line
      .trim()
      .split('')
      .map((character, x) => {
        const isGear = character === '*';
        if (!isGear) {
          return [];
        }
        const partNumbersOnPreviousLine = deduplicate(
          [
            findPartNumber(allLines[y - 1], x - 1), // Top left
            findPartNumber(allLines[y - 1], x), // Top
            findPartNumber(allLines[y - 1], x + 1), // Top right
          ].filter(isNumber),
        );
        const partNumbersOnCurrentLine = deduplicate(
          [
            findPartNumber(allLines[y], x - 1), // Left
            findPartNumber(allLines[y], x + 1), // Right
          ].filter(isNumber),
        );
        const partNumbersOnNextLine = deduplicate(
          [
            findPartNumber(allLines[y + 1], x - 1), // Bottom left
            findPartNumber(allLines[y + 1], x), // Bottom
            findPartNumber(allLines[y + 1], x + 1), // Bottom right
          ].filter(isNumber),
        );
        const partNumbers = [
          ...partNumbersOnPreviousLine,
          ...partNumbersOnCurrentLine,
          ...partNumbersOnNextLine,
        ];
        if (partNumbers.length !== 2) {
          return [];
        }
        return partNumbers;
      })
      .filter((partNumbers) => partNumbers.length > 0)
      .map(([first, second]) => Number(first) * Number(second));
  });
  return gearRatios.reduce((total, current) => total + current, 0);
}

function deduplicate<Type>(values: Type[]) {
  return [...new Set<Type>(values)];
}
function findPartNumber(
  text?: string,
  index?: number,
): number | undefined {
  if (text === undefined || index === undefined) {
    return undefined;
  }
  const trimmedText = text.trim();
  if (!Number.isInteger(Number(trimmedText[index]))) {
    return undefined;
  }
  let [startIndex, endIndex] = [index, index];
  for (let i = index; i >= 0; i--) {
    const head = Number(trimmedText.at(i));
    if (!Number.isInteger(head)) {
      break;
    }
    startIndex = i;
  }
  for (let j = index; j <= trimmedText.length; j++) {
    const tail = Number(trimmedText.at(j));
    if (!Number.isInteger(tail)) {
      break;
    }
    endIndex = j;
  }
  return Number(trimmedText.slice(startIndex, endIndex + 1));
}
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
```
<!-- prettier-ignore-end -->
