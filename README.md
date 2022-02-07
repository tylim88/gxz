# gzx

[![npm](https://img.shields.io/npm/v/gxz)](https://www.npmjs.com/package/gxz) [![GitHub](https://img.shields.io/github/license/tylim88/gxz)](https://github.com/tylim88/gxz/blob/master/LICENSE) [![tylim88](https://circleci.com/gh/tylim88/gxz.svg?style=shield)](<[LINK](https://github.com/tylim88/gxz#gxz)>)

🦋 Function Composer with smarter typing.

🥰 0 dependency.

⛲️ Out of box typescript support.

🦺 Tested.

## Installation

```bash
npm i gxz
```

## 🎵 Usage

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

const composed = gxz(a, b)

composed(1) // true
composed(2) // false

// type checking
compose('a') // Argument of type 'string' is not assignable to parameter of type 'number'.
gxz(a, c) // Argument of type '(arg: number) => "hello" | "world"' is not assignable to parameter of type '"return type does not match the next argument type"'.
gxz(a) // Argument of type '(arg: number) => "hello" | "world"' is not assignable to parameter of type '"need at least 2 functions"'.
```
