/* eslint-disable @typescript-eslint/no-explicit-any */
type IsOnlyOneParam<T extends (...args: any) => any> =
	Parameters<T>['length'] extends 1
		? T
		: (
				arg: `this callback can only has 1 param, currently it has ${Parameters<T>['length']}`
		  ) => ReturnType<T>

/* eslint-disable @typescript-eslint/no-explicit-any */
type IsMatch<
	X extends (...args: any) => any,
	Y extends (...args: any) => any
> = ReturnType<X> extends Parameters<Y>[0]
	? IsOnlyOneParam<X>
	: () => 'return type does not match the next argument type'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Compose<
	T extends ((...args: any) => any)[],
	Acc extends ((...args: any) => any)[] | undefined = undefined
> = T extends [infer X, infer Y, ...infer Rest]
	? X extends (...args: any) => any
		? Y extends (...args: any) => any
			? Rest extends []
				? Acc extends ((...args: any) => any)[]
					? [...Acc, IsMatch<X, Y>, Y]
					: [IsMatch<X, Y>, Y]
				: Rest extends ((...args: any) => any)[]
				? Compose<
						[Y, ...Rest],
						Acc extends ((...args: any) => any)[]
							? [...Acc, IsMatch<X, Y>]
							: [IsMatch<X, Y>]
				  >
				: ['this error is impossible']
			: ['this error is impossible']
		: ['this error is impossible']
	: ['need at least 2 functions']

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

/**
 * Functions Composer.
 * @param {...callback} args at least 2 callbacks, the n callback's return type must match the n+1 callback's parameter type.
 * @return return a callback: the parameter type is the parameter type of the first callback in args and the return type is the return type of the last callback in args.
 */

const gxz = <T extends ((...args: any) => any)[]>(
	...args: T extends never ? T : Compose<T>
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
