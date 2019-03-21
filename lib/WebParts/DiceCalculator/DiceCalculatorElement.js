"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiceCalculatorElement {
    /**
     * Constructor
     *
     * @param {string} elements Elements
     * @param {string} fieldName Field name
     * @param {number} score Score
     */
    constructor(elements, fieldName, score = 0) {
        this.elements = elements;
        this.selection = "";
        this.score = score;
        this.fieldNames = [fieldName, `${fieldName}Score`];
    }
}
exports.default = DiceCalculatorElement;
