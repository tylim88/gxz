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

		expect(gxz(a, b)(0)).toBe(false)

		expect(gxz(a, b, c)(1)).toBe(3)

		expect(gxz(a, b, c)(0)).toBe(0)
	})

	it('test typing', () => {
		expect(
			gxz(
				//@ts-expect-error
				(arg: string) => {
					return 1
				},
				(arg: boolean) => {
					return 'a'
				}
			)
		).not.toThrow()
		expect(
			gxz(
				//@ts-expect-error
				(arg: string) => {
					return 1
				},
				(arg: boolean) => {
					return 'a'
				}
			)
		).not.toThrow()
	})
})
