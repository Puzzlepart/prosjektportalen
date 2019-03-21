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
const Resources_1 = require("../Resources");
const Util = require("../Util");
const Config = require("./Config");
const jsom_ctx_1 = require("jsom-ctx");
const ProjectPhasesData_1 = require("../WebParts/ProjectPhases/ProjectPhasesData");
/**
 * Get site pages library
 *
 * @param {SP.ClientContext} ctx Client context
 */
const GetProjectPropertiesList = (ctx) => {
    const projectPropertiesList = ctx.get_web().get_lists().getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"));
    return projectPropertiesList;
};
/**
 * Get Project Properties item - item with ID=1 in Properties-list
 *
 * @param {SP.ClientContext} ctx Client context
 * @param {boolean} loadClientObject Should the client object be loaded
 */
const GetProjectPropertiesItem = (ctx, loadClientObject = false) => {
    const projectPropertiesList = ctx.get_web().get_lists().getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"));
    const projectPropsItem = projectPropertiesList.getItemById(1);
    if (loadClientObject) {
        ctx.load(projectPropsItem);
    }
    return projectPropsItem;
};
/**
 * Updates welcome page with a new phase
 *
 * @param {string} phaseName Phase term name
 * @param {string} phaseGuid Phase term GUID
 * @param {string} phaseFieldName Phase field name
 */
exports.UpdateProjectPhase = (phaseName, phaseGuid, phaseFieldName) => new Promise((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const ctx = SP.ClientContext.get_current();
        const projectPropertiesList = GetProjectPropertiesList(ctx);
        const projectPropertiesItem = GetProjectPropertiesItem(ctx);
        Util.setTaxonomySingleValue(ctx, projectPropertiesList, projectPropertiesItem, phaseFieldName, phaseName, phaseGuid);
        ctx.executeQueryAsync(resolve, reject);
    });
});
/**
 * Get welcome page field values
 */
exports.GetProjectPropertiesPageFieldValues = () => new Promise((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const projectProperties = GetProjectPropertiesItem(ctx, true);
        ctx.executeQueryAsync(() => {
            resolve(projectProperties.get_fieldValues());
        }, reject);
    });
});
/**
 * Get current project phase
 */
exports.GetCurrentProjectPhase = () => new Promise((resolve, reject) => {
    Util.getClientContext(_spPageContextInfo.webAbsoluteUrl).then(ctx => {
        const projectPropertiesItem = GetProjectPropertiesItem(ctx, true);
        ctx.executeQueryAsync(() => {
            let phaseFieldValue = projectPropertiesItem.get_item(Config.PROJECTPHASE_FIELD);
            if (phaseFieldValue) {
                resolve(new ProjectPhasesData_1.PhaseModel().initSafe(phaseFieldValue));
            }
            else {
                resolve(null);
            }
        }, reject);
    });
});
/**
 * Get requested project phase
 */
function GetRequestedProjectPhase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsomCtx = yield jsom_ctx_1.CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
            const projectPropertiesItem = GetProjectPropertiesItem(jsomCtx.clientContext, true);
            yield jsom_ctx_1.ExecuteJsomQuery(jsomCtx, [{ clientObject: projectPropertiesItem }]);
            return projectPropertiesItem.get_item("GtRequestedPhase");
        }
        catch (err) {
            throw err;
        }
    });
}
exports.GetRequestedProjectPhase = GetRequestedProjectPhase;
/**
 * Get phase iterations
 */
function GetPhaseIterations() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsomCtx = yield jsom_ctx_1.CreateJsomContext(_spPageContextInfo.webAbsoluteUrl);
            const projectPropertiesItem = GetProjectPropertiesItem(jsomCtx.clientContext, true);
            yield jsom_ctx_1.ExecuteJsomQuery(jsomCtx, [{ clientObject: projectPropertiesItem }]);
            return projectPropertiesItem.get_item("GtPhaseIterations");
        }
        catch (err) {
            throw err;
        }
    });
}
exports.GetPhaseIterations = GetPhaseIterations;
