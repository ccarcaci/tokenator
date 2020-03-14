# tokenator: a Node.js tokenization library

[![License](eupl-1.2.svg)](https://opensource.org/licenses/EUPL-1.2)
[![<CircleCI>](https://circleci.com/gh/ccarcaci/tokenator.svg?style=shield)](<https://circleci.com/gh/ccarcaci/tokenator>)
![npm](https://img.shields.io/npm/v/@bitacode/tokenator?color=green)

**tokenator** is a simple to use library that rework a string splitting it to meaningful tokens.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Code Examples](#code-examples)

## Description

This library transforms a series of characters to tokens identified by input strings.

```
e.g.
"The itsy bitsy spider crawled up the water spout. | Down came the rain, and washed the spider out. | Out came the sun, and dried up all the rain, | and the itsy bitsy spider went up the spout again"

Splitting strings: spider, rain

Result tokens:
  > "The itsy bitsy "
  > "spider"
  > " crawled up the water spout. | Down came the "
  > "rain"
  > ", and washed the "
  > "spider"
  > " out. | Out came the sun, and dried up all the "
  > "rain"
  > ", | and the itsy bitsy "
  > "spider"
  > " went up the spout again"
```

## Installation

```bash
npm install tokenator
```

## Code Examples

The signatures of the available methods are:

```typescript
function tokenator(source: string, ...separators: string[]): string[]
function tokenatorStream(...separators: string[]): stream.Transform
```

Code examples could be consulted within the test folder:
- [tokenator examples](test/tokenator.test.js)
- [tokenatorStream examples](test/tokenatorStream.test.js)

These functions work over multiple separators, like in the example above.
The tokenatorStream() function creates a Transform stream. NodeJS Stream usage specification is available on the [NodeJS official documentation](https://nodejs.org/api/stream.html).
