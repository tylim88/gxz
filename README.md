# gxz

[![npm](https://img.shields.io/npm/v/gxz)](https://www.npmjs.com/package/gxz) [![GitHub](https://img.shields.io/github/license/tylim88/gxz?color=blue)](https://github.com/tylim88/gxz/blob/master/LICENSE) [![dependencies](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=dependencies&query=%24.dependencies.count&url=https%3A%2F%2Fapi.npmutil.com%2Fpackage%2Fgxz)](https://www.npmjs.com/package/gxz?activeTab=dependencies) [![circleci](https://circleci.com/gh/tylim88/gxz.svg?style=shield)](https://app.circleci.com/pipelines/github/tylim88/gxz) [![codecov](https://codecov.io/gh/tylim88/gxz/branch/master/graph/badge.svg?token=IUUC7E1RTW)](https://codecov.io/gh/tylim88/gxz)

🦋 Function Composer with deep typing.

## Installation

```bash
npm i gxz
```

## 🎵 Usage

This composer guarantee the return type of `n` callback match the parameter type of `n+1` callback.

Every callback should only have one parameter, ts will warn you if you have more than one or 0 parameters.

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
