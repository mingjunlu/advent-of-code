# Day 1: Trebuchet?!

## Part 1

Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all **fifty stars** by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants **one star**. Good luck!

You try to ask why they can't just use a [weather machine](https://adventofcode.com/2015/day/1) ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a [trebuchet](https://en.wikipedia.org/wiki/Trebuchet) ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been **amended** by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific **calibration value** that the Elves now need to recover. On each line, the calibration value can be found by combining the **first digit** and the **last digit** (in that order) to form a single **two-digit number**.

For example:

```
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
```

In this example, the calibration values of these four lines are `12`, `38`, `15`, and `77`. Adding these together produces **`142`**.

Consider your entire calibration document. **What is the sum of all of the calibration values?**

### Solution

<!-- prettier-ignore-start -->
```ts
function resolvePuzzle(lines: string[]): number {
  return lines
    .map((line) => {
      const numberText = line.trim().replace(/[^0-9]/g, '');
      return Number(`${numberText.at(0)}${numberText.at(-1)}`);
    })
    .filter(Number.isInteger)
    .reduce((total, current) => total + current, 0);
}
```
<!-- prettier-ignore-end -->

## Part 2

Your calculation isn't quite right. It looks like some of the digits are actually **spelled out with letters**: `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, and `nine` **also** count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

```
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
```

In this example, the calibration values are `29`, `83`, `13`, `24`, `42`, `14`, and `76`. Adding these together produces **`281`**.

**What is the sum of all of the calibration values?**

### Attempt 1 (Failed)

<!-- prettier-ignore-start -->
```ts
function resolvePuzzle(lines: string[]): number {
  const digitWords = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const digitMap = new Map(
    digitWords.map((digit, index) => [digit, index + 1]),
  );
  const digitRegex = new RegExp(`[0-9]|${digitWords.join('|')}`, 'g');
  return lines
    .map((line) => {
      const digits = (line.trim().match(digitRegex) ?? []).map(
        (digitText) => digitMap.get(digitText) ?? Number(digitText),
      );
      return Number(`${digits.at(0)}${digits.at(-1)}`);
    })
    .filter(Number.isInteger)
    .reduce((total, current) => total + current, 0);
}
```
<!-- prettier-ignore-end -->

### Attempt 2 (Passed)

<!-- prettier-ignore-start -->
```ts
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function resolvePuzzle(lines: string[]): number {
  return lines
    .map((line) => {
      const digits = line
        .trim()
        .split(/([0-9])/)
        .filter((text) => text.length > 0)
        .flatMap((text) => {
          const number = Number(text);
          return isDigit(number) ? number : findAllDigits(text);
        });
      return Number(`${digits.at(0)}${digits.at(-1)}`);
    })
    .filter(Number.isInteger)
    .reduce((total, current) => total + current, 0);
}

function findAllDigits(text: string): Digit[] {
  return new Array<string>(text.length)
    .fill(text)
    .flatMap((text, index) => {
      const gibberish = text.slice(index);
      if (gibberish.startsWith('one')) return 1;
      if (gibberish.startsWith('two')) return 2;
      if (gibberish.startsWith('three')) return 3;
      if (gibberish.startsWith('four')) return 4;
      if (gibberish.startsWith('five')) return 5;
      if (gibberish.startsWith('six')) return 6;
      if (gibberish.startsWith('seven')) return 7;
      if (gibberish.startsWith('eight')) return 8;
      if (gibberish.startsWith('nine')) return 9;
      return [];
    });
}
function isDigit(value: number): value is Digit {
  return Number.isInteger(value) && value.toString().length === 1;
}
```
<!-- prettier-ignore-end -->

### Solution

<!-- prettier-ignore-start -->
```ts
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function resolvePuzzle(lines: string[]): number {
  return lines
    .map((line) => {
      const text = line.trim();
      return Number(`${findFirstDigit(text)}${findLastDigit(text)}`);
    })
    .filter(Number.isInteger)
    .reduce((total, current) => total + current, 0);
}

function findFirstDigit(text: string): Digit | undefined {
  const first = Number(text.at(0));
  if (isDigit(first)) return first;
  if (text.startsWith('one')) return 1;
  if (text.startsWith('two')) return 2;
  if (text.startsWith('three')) return 3;
  if (text.startsWith('four')) return 4;
  if (text.startsWith('five')) return 5;
  if (text.startsWith('six')) return 6;
  if (text.startsWith('seven')) return 7;
  if (text.startsWith('eight')) return 8;
  if (text.startsWith('nine')) return 9;
  return findFirstDigit(text.slice(1));
}
function findLastDigit(text: string): Digit | undefined {
  const last = Number(text.at(-1));
  if (isDigit(last)) return last;
  if (text.endsWith('one')) return 1;
  if (text.endsWith('two')) return 2;
  if (text.endsWith('three')) return 3;
  if (text.endsWith('four')) return 4;
  if (text.endsWith('five')) return 5;
  if (text.endsWith('six')) return 6;
  if (text.endsWith('seven')) return 7;
  if (text.endsWith('eight')) return 8;
  if (text.endsWith('nine')) return 9;
  return findLastDigit(text.slice(0, -1));
}
function isDigit(value: number): value is Digit {
  return Number.isInteger(value) && value.toString().length === 1;
}
```
<!-- prettier-ignore-end -->
