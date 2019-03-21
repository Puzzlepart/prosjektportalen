"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ChromeTitle_1 = require("../@Components/ChromeTitle");
class BaseWebPart extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {P} props Props
     * @param {S} initialState State
     */
    constructor(props, initialState) {
        super(props);
        this.state = initialState;
    }
    /**
     * Update state
     *
     * @param {S} updatedState Updated state
     */
    updateState(updatedState) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState(updatedState, () => {
                return;
            });
        });
    }
    /**
     * Render chrome
     *
     * @param {string} title Title
     * @param {HTMLElement} element Element to toggle
     * @param {string} key Storage key
     * @param {boolean} hideChrome Hide chrome
     */
    _renderChrome(title, element, key, hideChrome = false) {
        return (React.createElement(ChromeTitle_1.default, { title: title, toggleElement: {
                element,
                storage: {
                    key: key,
                    type: "localStorage",
                },
            }, hidden: hideChrome }));
    }
}
exports.default = BaseWebPart;
