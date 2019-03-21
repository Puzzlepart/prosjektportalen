"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const sp_1 = require("@pnp/sp");
const React = require("react");
const ReactDOM = require("react-dom");
const FormUtil = require("../FormUtils");
const RelatedLogElements_1 = require("./RelatedLogElements");
const _ = {
    NewForm: () => {
        //
    },
    EditForm: () => {
        //
    },
    DispForm: () => {
        const id = "pp-related-logelements";
        const lookupField = "GtProjectLogEventLookup";
        const container = FormUtil.insertFormContainer(id);
        sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_ProjectLog_Title")).items.filter(`${lookupField}Id eq ${GetUrlKeyValue("ID")}`).get().then(items => {
            ReactDOM.render((React.createElement(RelatedLogElements_1.default, { logElements: items })), container);
        });
    },
};
exports.default = _;
