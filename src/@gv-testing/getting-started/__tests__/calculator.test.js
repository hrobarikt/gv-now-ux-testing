import { Calculator } from "../calculator";

describe('Test Calculator', () => {

	test('add should a + b', () => {
		const calculator = new Calculator();
		expect(calculator.add(1, 20)).toBe(21);
	});

	test('sub should a - b', () => {
		const calculator = new Calculator();
		expect(calculator.sub(5, 2)).toBe(3);
	});

	test('mul should a * b', () => {
		const calculator = new Calculator();
		expect(calculator.mul(4, 3)).toBe(12);
	});

	test('div should a / b', () => {
		const calculator = new Calculator();
		expect(calculator.div(15, 3)).toBe(5);
	});
});
