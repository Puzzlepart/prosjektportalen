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
const sp_1 = require("@pnp/sp");
const logging_1 = require("@pnp/logging");
const Config = require("./Config");
/**
 * Updates front page list views
 *
 * @param {string} phaseName Phase term name
 */
function UpdateFrontpageListViews(phaseName) {
    return __awaiter(this, void 0, void 0, function* () {
        const newViewQuery = String.format(Config.FRONTPAGE_LISTS_VIEQUERY, Config.PROJECTPHASE_FIELD, phaseName);
        const listsOnFrontpage = Config.FRONTPAGE_LISTS.filter(({ wpTitle }) => document.querySelector(`.ms-webpart-chrome-title .js-webpart-titleCell[title='${wpTitle}']`) !== null);
        try {
            const listViews = yield Promise.all(listsOnFrontpage.map(({ listTitle }) => sp_1.sp.web.lists.getByTitle(listTitle).views.get()));
            let updateViewsPromises = [];
            listViews.forEach((views, index) => {
                const list = sp_1.sp.web.lists.getByTitle(listsOnFrontpage[index].listTitle);
                const frontpageViews = views.filter(v => v.ServerRelativeUrl.indexOf(Resources_1.default.getResource("Project_WelcomePage")) !== -1);
                updateViewsPromises = [
                    ...updateViewsPromises,
                    frontpageViews.map(v => list.views.getById(v.Id).update({ ViewQuery: newViewQuery })),
                ];
            });
            yield Promise.all(updateViewsPromises);
            logging_1.Logger.log({ message: "(UpdateFrontpageListViews) Successfully updated front page list views", data: { phaseName, lists: Config.FRONTPAGE_LISTS }, level: 1 /* Info */ });
            return;
        }
        catch (err) {
            logging_1.Logger.log({ message: "(UpdateFrontpageListViews) Failed to update front page list views", data: { phaseName, lists: Config.FRONTPAGE_LISTS, err }, level: 1 /* Info */ });
            throw err;
        }
    });
}
exports.default = UpdateFrontpageListViews;
