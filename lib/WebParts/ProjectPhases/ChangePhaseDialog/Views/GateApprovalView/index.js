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
const Resources_1 = require("../../../../../Resources");
const React = require("react");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const IGateApprovalViewProps_1 = require("./IGateApprovalViewProps");
const ChangePhaseDialogResult_1 = require("../../ChangePhaseDialogResult");
/**
 * Initial view
 */
class GateApprovalView extends React.Component {
    /**
     * Constructor
     *
     * @param {IGateApprovalViewProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = {};
        this._onSubmitReview = this._onSubmitReview.bind(this);
    }
    render() {
        return (React.createElement("div", { className: "inner" },
            React.createElement("h2", null, Resources_1.default.getResource("String_Approval")),
            this.state.review
                ? React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.large, label: this.getLoadingText() })
                : (React.createElement("div", null, this.getActions().map((buttonProps, index) => (React.createElement("div", { key: `GateApprovalView_Action_${index}`, style: { marginTop: 5 } },
                    React.createElement(Button_1.ActionButton, Object.assign({}, buttonProps, { style: { margin: 0 } })))))))));
    }
    /**
     * Get actions
     */
    getActions() {
        return [
            {
                text: Resources_1.default.getResource("String_Approved"),
                iconProps: { iconName: "Accept" },
                onClick: () => this._onSubmitReview(ChangePhaseDialogResult_1.default.Approved),
            },
            {
                text: Resources_1.default.getResource("String_ProvisionallyApproved"),
                iconProps: { iconName: "Warning" },
                onClick: () => this._onSubmitReview(ChangePhaseDialogResult_1.default.ProvisionallyApproved),
            },
            {
                text: Resources_1.default.getResource("String_Rejected"),
                iconProps: { iconName: "Error" },
                onClick: () => this._onSubmitReview(ChangePhaseDialogResult_1.default.Rejected),
            },
        ];
    }
    /**
     * Get loading text based on this.state.review
     */
    getLoadingText() {
        switch (this.state.review) {
            case ChangePhaseDialogResult_1.default.Approved: {
                return Resources_1.default.getResource("ProjectPhases_ApprovingPhaseChange");
            }
            case ChangePhaseDialogResult_1.default.ProvisionallyApproved: {
                return Resources_1.default.getResource("ProjectPhases_ProvisionallyApprovingPhaseChange");
            }
            case ChangePhaseDialogResult_1.default.Rejected: {
                return Resources_1.default.getResource("ProjectPhases_RejectingPhaseChange");
            }
        }
    }
    /**
     * On submit review
     *
     * @param {ChangePhaseDialogResult} review Review
     */
    _onSubmitReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ review });
            yield this.props.onChangePhaseDialogReturnCallback(review);
            this.props.onCloseDialog(null, true);
            this.setState({ review: null });
        });
    }
}
GateApprovalView.defaultProps = IGateApprovalViewProps_1.GateApprovalViewDefaultProps;
exports.default = GateApprovalView;
