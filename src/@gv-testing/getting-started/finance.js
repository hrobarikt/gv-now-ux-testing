import { Calculator } from "./calculator";

export class Finance {

	/**
	 * Get your organization’s profit margin
	 * 
	 * @param {number} netIncome The total amount of sales you’ve generated
	 * @param {number} sales The total amount of sales you’ve generated
	 */
	calculateProfitMargin(netIncome, sales) {
		const calc = new Calculator();
		return calc.div(netIncome, sales);
	}
}
