# gxz

[![npm](https://img.shields.io/npm/v/gxz)](https://www.npmjs.com/package/gxz) [![GitHub](https://img.shields.io/github/license/tylim88/gxz)](https://github.com/tylim88/gxz/blob/master/LICENSE) [![circleci](https://circleci.com/gh/tylim88/gxz.svg?style=shield)](<[LINK](https://github.com/tylim88/gxz#gxz)>) [![codecov](https://codecov.io/gh/tylim88/gxz/branch/master/graph/badge.svg?token=IUUC7E1RTW)](https://codecov.io/gh/tylim88/gxz)

🦋 Function Composer with deep typing.

🥰 0 dependency.

## Installation

```bash
npm i gxz
```

## 🎵 Usage

1. In this example, the return type of `a` is `number` and parameter type of `b` is number
2. So it is possible to compose `a` to `b`, but not the other way around
3. It is not possible to compose `c` to `a` but it is possible to compose `b` to `c` because `b` returns `boolean`

```ts
import gxz from 'gxz'

const a = (arg: number) => {
	return arg === 1 ? 'hello' : 'world'
}

const b = (arg: string) => {
	return arg === 'hello'
}

const c = (arg: boolean) => {
	return arg ? 100 : 0
}

const composed = gxz(a, b) // type of `composed` is (arg:number) => boolean

composed(1) // true
composed(2) // false

// type checking
composed('a') // Argument of type 'string' is not assignable to parameter of type 'number'.
gxz(a, c) // Argument of type '(arg: number) => "hello" | "world"' is not assignable to parameter of type '"return type does not match the next argument type"'.
gxz(a) // Argument of type '(arg: number) => "hello" | "world"' is not assignable to parameter of type '"need at least 2 functions"'.
```
