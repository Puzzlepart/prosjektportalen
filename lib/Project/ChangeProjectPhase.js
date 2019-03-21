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
const Util = require("../Util");
const Resources_1 = require("../Resources");
const _1 = require("./");
/**
 * Change project phase
 *
 * @param {any} newPhase New phase
 * @param {boolean} useWaitDialog Should a wait dialog be used
 */
function ChangeProjectPhase(newPhase, useWaitDialog = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let [Title, Message] = Resources_1.default.getResource("ProjectPhases_ChangingPhase").split(",");
        let waitDlg = null;
        if (useWaitDialog) {
            waitDlg = new Util.WaitDialog(Title, String.format(Message, newPhase.Name), 120, 600);
            waitDlg.start(300);
        }
        try {
            yield _1.UpdateProjectPhase(newPhase.Name, newPhase.Id, _1.PROJECTPHASE_FIELD);
            yield Promise.all([
                _1.UpdateFrontpageListViews(newPhase.Name),
                _1.SetMetadataDefaultsForLibrary([{
                        fieldName: "GtProjectPhase",
                        fieldType: "Taxonomy",
                    },
                    {
                        fieldName: "GtProjectType",
                        fieldType: "TaxonomyMulti",
                    },
                    {
                        fieldName: "GtProjectServiceArea",
                        fieldType: "TaxonomyMulti",
                    },
                    {
                        fieldName: "GtProjectFinanceName",
                        fieldType: "Text",
                    },
                    {
                        fieldName: "GtProjectNumber",
                        fieldType: "Text",
                    },
                    {
                        fieldName: "GtArchiveReference",
                        fieldType: "Text",
                    }]),
                _1.EnsureLocationBasedMetadataDefaultsReceiverForLibrary(),
            ]);
            if (waitDlg) {
                waitDlg.close(null);
            }
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = ChangeProjectPhase;
