"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Util = require("../../../Util");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
/**
 * Render item column
 *
 * @param {any} item The item
 * @param {number} index Index
 * @param {IDynamicPortfolioColumnConfig} column Column
 * @param {IDynamicPortfolioConfiguration} configuration Configuration
 * @param {Function} titleOnClick Title column on click
 */
const DynamicPortfolioItemColumn = (item, index, column, configuration, titleOnClick) => {
    let colValue = item[column.key];
    if (colValue) {
        if (colValue !== "" && (column.key.indexOf("OWSNMBR") !== -1 || column.key.indexOf("OWSCURR") !== -1)) {
            colValue = parseInt(colValue, 10);
        }
        switch (column.key) {
            case "Title": {
                return (React.createElement("a", { href: item.Path, onClick: titleOnClick }, colValue && colValue !== "DispForm.aspx" ? colValue : item.SiteTitle));
            }
            case "Path":
            case "URL": {
                return React.createElement("a", { href: item.Path }, colValue);
            }
        }
        switch (column.render) {
            case "Date": {
                return (React.createElement("span", null, colValue ? Util.dateFormat(colValue, "LL") : null));
            }
            case "Note": {
                return (React.createElement("span", { title: colValue }, colValue));
            }
            case "Currency": {
                let currValue = Util.toCurrencyFormat(colValue);
                return (React.createElement("span", { title: currValue }, currValue));
            }
            case "Status": {
                let fieldName = Util.cleanSearchPropName(column.fieldName);
                if (configuration.statusFields.hasOwnProperty(fieldName)) {
                    const [statusProperties] = configuration.statusFields[fieldName].statuses.filter(({ statusValue }) => colValue === statusValue);
                    if (statusProperties) {
                        return (React.createElement("span", null,
                            React.createElement(Icon_1.Icon, { iconName: statusProperties.statusIconName, style: { color: statusProperties.statusColor } }),
                            "  ",
                            colValue));
                    }
                }
                return (React.createElement("span", null, colValue));
            }
            case "URL": {
                let urlVals = colValue.split(",");
                return (React.createElement("a", { title: urlVals[1], href: urlVals[0] }, urlVals[1]));
            }
            case "Default": {
                return (React.createElement("span", { title: colValue }, colValue));
            }
            default: {
                return (React.createElement("span", { title: colValue }, colValue));
            }
        }
    }
    else {
        return null;
    }
};
exports.default = DynamicPortfolioItemColumn;
