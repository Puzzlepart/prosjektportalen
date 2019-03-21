"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../../../../Resources");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
//#endregion
/**
 * Changing phase view
 */
class ErrorInformationView extends React.Component {
    /**
     * Constructor
     *
     * @param {IErrorInformationViewProps} props Props
     */
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error }, Resources_1.default.getResource("ProjectPhases_ChangePhaseErrorMessage")));
    }
}
ErrorInformationView.displayName = "ErrorInformationView";
exports.default = ErrorInformationView;
