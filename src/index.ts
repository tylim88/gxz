/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Compose<T extends ((...args: any) => any)[]> = T extends [
	infer X,
	infer Y,
	...infer Rest
]
	? X extends (...args: any) => any
		? Y extends (...args: any) => any
			? ReturnType<X> extends Parameters<Y>[0]
				? Rest extends []
					? true
					: Rest extends ((...args: any) => any)[]
					? Compose<[Y, ...Rest]>
					: 'this error is impossible'
				: 'return type does not match the next argument type'
			: 'this error is impossible'
		: 'this error is impossible'
	: 'need at least 2 functions'

type GetFirstParam<T extends ((...args: any) => any)[]> = T extends [
	infer X,
	...infer Rest
]
	? X extends (...args: any) => any
		? Parameters<X>[0]
		: never
	: never

type GetLastReturn<T extends ((...args: any) => any)[]> = T extends [
	...infer Rest,
	infer X
]
	? X extends (...args: any) => any
		? ReturnType<X>
		: never
	: never

const gxz = <T extends ((...args: any) => any)[]>(
	...args: Compose<T> extends true ? T : Compose<T>[]
) => {
	const compose = (arg: any): any => {
		return (args as T).reduce((acc, item) => {
			return item(acc)
		}, arg)
	}

	return compose as (arg: GetFirstParam<T>) => GetLastReturn<T>
}
/* eslint-enable @typescript-eslint/ban-types */
/* eslint-enable @typescript-eslint/no-explicit-any */
export default gxz
