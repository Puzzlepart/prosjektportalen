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
//#region Imports
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const ChangePhaseDialogResult_1 = require("../ChangePhaseDialogResult");
const Views_1 = require("../Views");
//#endregion
/**
 * Footer
 */
exports.Footer = ({ isLoading, currentView, gateApproval, activePhase, nextPhase, onChangeView, onChangePhaseDialogReturnCallback, onCloseDialog }) => {
    let actions = [];
    switch (currentView) {
        case Views_1.View.Initial:
            {
                actions.push({
                    text: Resources_1.default.getResource("String_Skip"),
                    disabled: isLoading,
                    onClick: () => {
                        onChangeView(gateApproval ? Views_1.View.GateApproval : Views_1.View.Confirm);
                    },
                });
            }
            break;
        case Views_1.View.Confirm:
            {
                if (activePhase && activePhase.IsIncremental) {
                    actions.push({
                        text: activePhase.Name,
                        disabled: isLoading,
                        onClick: () => __awaiter(this, void 0, void 0, function* () {
                            onChangeView(Views_1.View.ChangingPhase);
                            try {
                                yield onChangePhaseDialogReturnCallback(ChangePhaseDialogResult_1.default.Initial, activePhase.Name);
                                onCloseDialog(null, true);
                            }
                            catch (error) {
                                onChangeView(Views_1.View.ErrorInformation);
                            }
                        }),
                    }, {
                        text: nextPhase.Name,
                        disabled: isLoading,
                        onClick: () => __awaiter(this, void 0, void 0, function* () {
                            onChangeView(Views_1.View.ChangingPhase);
                            try {
                                yield onChangePhaseDialogReturnCallback(ChangePhaseDialogResult_1.default.Initial, nextPhase.Name);
                                onCloseDialog(null, true);
                            }
                            catch (error) {
                                onChangeView(Views_1.View.ErrorInformation);
                            }
                        }),
                    });
                }
                else {
                    actions.push({
                        text: Resources_1.default.getResource("String_Yes"),
                        disabled: isLoading,
                        onClick: () => __awaiter(this, void 0, void 0, function* () {
                            onChangeView(Views_1.View.ChangingPhase);
                            try {
                                yield onChangePhaseDialogReturnCallback(ChangePhaseDialogResult_1.default.Initial);
                                onCloseDialog(null, true);
                            }
                            catch (error) {
                                onChangeView(Views_1.View.ErrorInformation);
                            }
                        }),
                    });
                }
            }
            break;
        case Views_1.View.Summary:
            {
                actions.push({
                    text: Resources_1.default.getResource("String_MoveOn"),
                    disabled: isLoading,
                    onClick: () => {
                        onChangeView(gateApproval ? Views_1.View.GateApproval : Views_1.View.Confirm);
                    },
                });
            }
            break;
    }
    return (React.createElement(Dialog_1.DialogFooter, null,
        actions.map((buttonProps, index) => {
            return React.createElement(Button_1.PrimaryButton, Object.assign({ key: `FooterAction_${index}` }, buttonProps));
        }),
        React.createElement(Button_1.DefaultButton, { text: Resources_1.default.getResource("String_Close"), disabled: isLoading, onClick: onCloseDialog })));
};
