export default class DiceCalculatorElement {
    elements: string;
    selection?: string;
    score: number;
    fieldNames: string[];
    /**
     * Constructor
     *
     * @param {string} elements Elements
     * @param {string} fieldName Field name
     * @param {number} score Score
     */
    constructor(elements: string, fieldName: string, score?: number);
}
