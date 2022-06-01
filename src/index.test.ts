import 'jest'
import gxz from './index'

describe('test gxz', () => {
	it('test output value', () => {
		function a(arg: number) {
			return arg === 1 ? 'hello' : 'world'
		}
		const b = (arg: string) => {
			return arg === 'hello'
		}
		const c = (arg: boolean) => {
			return arg ? 3 : 0
		}

		const d = (arg: number) => {
			return !!arg
		}

		expect(gxz(a, b)(0)).toBe(false)

		expect(gxz(a, b, c)(1)).toBe(3)

		expect(gxz(a, b, c, d)(0)).toBe(false)

		expect(gxz(a, b, c, d)(1)).toBe(true)
	})

	it('test failed typing', () => {
		;() => {
			gxz(
				//@ts-expect-error
				(arg: string) => {
					return 1
				},
				(arg: boolean) => {
					return 'a'
				}
			)
			gxz(
				(arg: string) => {
					return true
				},
				//@ts-expect-error
				(arg: boolean, arg2: string) => {
					return 'a'
				},
				(arg: string) => {
					return true
				}
			)

			gxz(
				(arg: string) => {
					return 1
				},
				(arg: number) => {
					return 'a'
				},
				//@ts-expect-error
				(arg: string) => {
					return true
				},
				(arg: number) => {
					return true
				}
			)

			gxz(
				//@ts-expect-error
				(arg: string) => {
					return 1
				}
			)
		}
	})
})
