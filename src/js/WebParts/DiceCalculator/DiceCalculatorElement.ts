export default class DiceCalculatorElement {
    public elements: string;
    public selection?: string;
    public score: number;
    public fieldNames: string[];

    /**
     * Constructor
     *
     * @param {string} elements Elements
     * @param {string} fieldName Field name
     * @param {number} score Score
     */
    constructor(elements: string, fieldName: string, score = 0) {
        this.elements = elements
        this.selection = ''
        this.score = score
        this.fieldNames = [fieldName, `${fieldName}Score`]
    }
}
