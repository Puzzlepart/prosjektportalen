"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../../Resources");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
const IInitialViewProps_1 = require("./IInitialViewProps");
/**
 * Initial view
 */
class InitialView extends React.Component {
    /**
     * Constructor
     *
     * @param {IInitialViewProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = {
            comment: props.currentChecklistItem ? (props.currentChecklistItem.GtComment || "") : "",
        };
        this._onNextCheckPoint = this._onNextCheckPoint.bind(this);
        this._onCommentUpdate = this._onCommentUpdate.bind(this);
    }
    render() {
        if (!this.props.currentChecklistItem) {
            return null;
        }
        return (React.createElement("div", { className: this.props.className },
            React.createElement("h3", null, this.props.currentChecklistItem.Title),
            React.createElement("div", { style: { marginTop: 10 } },
                React.createElement(TextField_1.TextField, { onChanged: this._onCommentUpdate, placeholder: this.props.commentLabel, multiline: true, value: this.state.comment, resizable: false, style: { height: 100 } })),
            this.renderStatusOptions()));
    }
    /**
     * Render status options
     */
    renderStatusOptions() {
        const { isLoading, commentMinLength } = this.props;
        const { comment } = this.state;
        const isCommentValid = (comment.length >= commentMinLength) && /\S/.test(comment);
        const statusNotRelevantTooltipCommentEmpty = Resources_1.default.getResource("ProjectPhases_CheckpointNotRelevantTooltip_CommentEmpty");
        const statusNotRelevantTooltip = Resources_1.default.getResource("ProjectPhases_CheckpointNotRelevantTooltip");
        const statusStillOpenTooltipCommentEmpty = Resources_1.default.getResource("ProjectPhases_CheckpointStillOpenTooltip_CommentEmpty");
        const statusStillOpenTooltip = Resources_1.default.getResource("ProjectPhases_CheckpointStillOpenTooltip");
        const statusDoneTooltip = Resources_1.default.getResource("ProjectPhases_CheckpointDoneTooltip");
        const statusNotRelevant = Resources_1.default.getResource("Choice_GtChecklistStatus_NotRelevant");
        const statusStillOpen = Resources_1.default.getResource("Choice_GtChecklistStatus_StillOpen");
        const statusClosed = Resources_1.default.getResource("Choice_GtChecklistStatus_Closed");
        const statusOptions = [
            {
                text: statusNotRelevant,
                disabled: (isLoading || !isCommentValid),
                title: !isCommentValid ? statusNotRelevantTooltipCommentEmpty : statusNotRelevantTooltip,
                onClick: () => this._onNextCheckPoint(statusNotRelevant, comment),
            },
            {
                text: statusStillOpen,
                disabled: (isLoading || !isCommentValid),
                title: !isCommentValid ? statusStillOpenTooltipCommentEmpty : statusStillOpenTooltip,
                onClick: () => this._onNextCheckPoint(statusStillOpen, comment, false),
            },
            {
                text: statusClosed,
                disabled: isLoading,
                title: statusDoneTooltip,
                onClick: () => this._onNextCheckPoint(statusClosed, comment),
            }
        ];
        return (React.createElement("div", { style: { marginTop: 20, marginBottom: 25 } }, statusOptions.map((statusOpt, key) => (React.createElement("span", { key: key },
            React.createElement(Button_1.PrimaryButton, Object.assign({}, statusOpt)))))));
    }
    /**
    * Next checkpoint action
    *
    * @param {string} status Status value
    * @param {string} comment Comment value
    * @param {boolean} updateStatus Update status
    */
    _onNextCheckPoint(status, comment, updateStatus = true) {
        this.props.nextCheckPointAction(status, comment, true);
        this.setState({ comment: "" });
    }
    /**
    * On comment update
    *
    * @param {string} newValue New value
    */
    _onCommentUpdate(newValue) {
        this.setState({ comment: newValue });
    }
}
InitialView.defaultProps = IInitialViewProps_1.InitialViewDefaultProps;
exports.default = InitialView;
