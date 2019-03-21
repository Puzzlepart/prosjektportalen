"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../../../../Resources");
const ProgressIndicator_1 = require("office-ui-fabric-react/lib/ProgressIndicator");
//#endregion
/**
 * Changing phase view
 */
class ChangingPhaseView extends React.Component {
    /**
     * Constructor
     *
     * @param {IChangingPhaseViewProps} props Props
     */
    constructor(props) {
        super(props);
    }
    render() {
        let progressResKey;
        switch (this.props.newPhase.Type) {
            case "Gate":
                progressResKey = "ProjectPhases_ChangingGate";
                break;
            case "Default":
                progressResKey = "ProjectPhases_ChangingPhase";
                break;
        }
        const [progressLabel, progressDescription] = Resources_1.default.getResource(progressResKey).split(",");
        return (React.createElement(ProgressIndicator_1.ProgressIndicator, { label: progressLabel, description: String.format(progressDescription, this.props.newPhase.Name) }));
    }
}
ChangingPhaseView.displayName = "ChangingPhaseView";
exports.default = ChangingPhaseView;
