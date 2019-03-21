"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../Resources");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
class BenefitMeasurementsModal extends React.PureComponent {
    render() {
        return (React.createElement(Modal_1.Modal, { isOpen: true, isDarkOverlay: true, onDismiss: this.props.onDismiss, containerClassName: "pp-modal", isBlocking: false },
            React.createElement("div", { style: { padding: 50 } },
                React.createElement("h2", { style: { marginBottom: 20 } }, this.props.indicator.title),
                React.createElement(DetailsList_1.DetailsList, { items: this.props.indicator.measurements, columns: this.props.columns, onRenderItemColumn: this.onRenderItemColumn }))));
    }
    onRenderItemColumn(item, _index, column) {
        const colValue = item[column.fieldName];
        switch (column.key) {
            case "achievementStr": {
                if (colValue) {
                    return (React.createElement("span", null,
                        React.createElement("span", null, colValue),
                        item.trendIconProps && React.createElement(Icon_1.Icon, Object.assign({}, item.trendIconProps))));
                }
                return null;
            }
        }
        return colValue;
    }
}
BenefitMeasurementsModal.defaultProps = {
    columns: [
        {
            key: "value",
            fieldName: "value",
            name: Resources_1.default.getResource("SiteFields_GtMeasurementValue_DisplayName"),
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: "achievementStr",
            fieldName: "achievementStr",
            name: Resources_1.default.getResource("String_AchievementOfObjectives"),
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: "dateStr",
            fieldName: "dateStr",
            name: Resources_1.default.getResource("SiteFields_GtMeasurementDate_DisplayName"),
            minWidth: 150,
        },
    ],
};
__decorate([
    Utilities_1.autobind
], BenefitMeasurementsModal.prototype, "onRenderItemColumn", null);
exports.default = BenefitMeasurementsModal;
