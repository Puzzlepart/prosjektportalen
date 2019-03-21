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
const Resources_1 = require("../../../Resources");
const sp_1 = require("@pnp/sp");
const BenefitsOverviewDataColumns_1 = require("./BenefitsOverviewDataColumns");
const Benefit_1 = require("./Benefit");
const BenefitMeasurement_1 = require("./BenefitMeasurement");
const BenefitMeasurementIndicator_1 = require("./BenefitMeasurementIndicator");
//#endregion
/**
 * Fetches data based on selected data source (List or Search)
 *
 * @param {string} queryTemplate Query template
 * @param {boolean} showSiteTitleColumn Show site title column
 * @param {string} dataSourceName Data source name
 */
function fetchData(queryTemplate, showSiteTitleColumn, dataSourceName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let searchSettings = {
                Querytext: "*",
                QueryTemplate: queryTemplate,
                RowLimit: 500,
                SelectProperties: [
                    "Path",
                    "Title",
                    "ListItemId",
                    "SiteTitle",
                    "WebId",
                    "ContentTypeID",
                    "GtDesiredValueOWSNMBR",
                    "GtMeasureIndicatorOWSTEXT",
                    "GtMeasurementUnitOWSCHCS",
                    "GtStartValueOWSNMBR",
                    "GtMeasurementValueOWSNMBR",
                    "GtMeasurementCommentOWSMTXT",
                    "GtMeasurementDateOWSDATE",
                    "GtGainsResponsibleOWSUSER",
                    "GtGainsTurnoverOWSMTXT",
                    "GtGainsTypeOWSCHCS",
                    "GtPrereqProfitAchievementOWSMTXT",
                    "GtRealizationTimeOWSDATE",
                    "GtGainLookupId",
                    "GtMeasureIndicatorLookupId",
                    "GtGainsResponsible",
                ],
                TrimDuplicates: false,
            };
            if (dataSourceName) {
                const dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
                const [dataSource] = yield dataSourcesList.items.select("GtDpSearchQuery").filter(`Title eq '${dataSourceName}'`).get();
                searchSettings.QueryTemplate = dataSource.GtDpSearchQuery;
            }
            try {
                const results = (yield sp_1.sp.search(searchSettings)).PrimarySearchResults;
                const benefits = results
                    .filter(res => res.ContentTypeID.indexOf("0x0100B384774BA4EBB842A5E402EBF4707367") === 0)
                    .map(res => new Benefit_1.Benefit(res));
                const measurements = results
                    .filter(res => res.ContentTypeID.indexOf("0x01007A831AC68204F04AAA022CFF06C7BAA2") === 0)
                    .map(res => new BenefitMeasurement_1.BenefitMeasurement(res))
                    .sort((a, b) => b.date.getTime() - a.date.getTime());
                const indicators = results
                    .filter(res => res.ContentTypeID.indexOf("0x0100FF4E12223AF44F519AF40C441D05DED0") === 0)
                    .map(res => {
                    let _indicator = new BenefitMeasurementIndicator_1.BenefitMeasurementIndicator(res)
                        .setMeasurements(measurements)
                        .setBenefit(benefits);
                    return _indicator;
                })
                    .filter(i => i.benefit);
                const data = ({ items: indicators, columns: BenefitsOverviewDataColumns_1.GenerateColumns(showSiteTitleColumn) });
                return data;
            }
            catch (err) {
                throw err;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.fetchData = fetchData;
