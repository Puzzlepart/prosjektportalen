/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_6aff6d5116b842a095ce6e76a1bac874(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_6aff6d5116b842a095ce6e76a1bac874.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Project_details.js';
  ctx['DisplayTemplateData']['TemplateType']='Base';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults', 'Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

var url = $getItemValue(ctx, "Path");
var title = $getItemValue(ctx, "Title");
var projectManager = $getItemValue(ctx, "GtProjectManagerOWSUSER");
var projectOwner = $getItemValue(ctx, "GtProjectOwnerOWSUSER");
var projectPhase = $getItemValue(ctx, "owstaxIdGtProjectPhase").toString();
var created = new Date($getItemValue(ctx, "Created").inputValue).format("dd MMM yyyy");
var createdTime = new Date($getItemValue(ctx, "Created").inputValue).format("dd MMM yyyy kl HH:mm:ss");
var projectGoals = $getItemValue(ctx, "GtProjectGoalsOWSMTXT").inputValue;
var projectGoalsTrimmed = Srch.U.getTrimmedString( projectGoals , 20);
var statusTime = $getItemValue(ctx, "GtStatusTimeOWSCHCS");
var statusRisk = $getItemValue(ctx, "GtStatusRiskOWSCHCS");
var statusBudget = $getItemValue(ctx, "GtStatusBudgetOWSCHCS");
var statusGains = $getItemValue(ctx, "GtStatusGainAchievementOWSCHCS");
var lastModified = $getItemValue(ctx, "LastModifiedTime");
var statusTimeCss = window.GT.GetStatusCssClass(statusTime.value);
var statusRiskCss = window.GT.GetStatusCssClass(statusRisk.value);
var statusBudgetCss = window.GT.GetStatusCssClass(statusBudget.value);
var statusGainsCss = window.GT.GetStatusCssClass(statusGains.value);
ms_outHtml.push(''
,'        <td>'
,'            <a href="', url ,'">'
,'                ', title ,''
,'            </a>'
,'		</td>'
,'		<td title="', projectGoals ,'">'
,'			', projectGoalsTrimmed ,''
,'		</td>'
,'		<td>'
,'			', projectOwner ,''
,'		</td>'
,'		<td>'
,'			', projectManager ,''
,'		</td>'
,'        <td class="', statusTimeCss ,'">'
,'            ', statusTime ,''
,'        </td>'
,'        <td class="', statusRiskCss ,'">'
,'            ', statusRisk ,''
,'        </td>'
,'        <td class="', statusBudgetCss ,'">'
,'            ', statusBudget ,''
,'        </td>'
,'        <td class="', statusGainsCss ,'">'
,'            ', statusGains ,''
,'        </td>'
,'        <td>'
,'            ', projectPhase ,''
,'        </td>'
,'		<td>'
,'			', lastModified ,''
,'		</td>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_6aff6d5116b842a095ce6e76a1bac874() {
  if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
    Srch.U.registerRenderTemplateByName("Glittertind_Item_Project_details", DisplayTemplate_6aff6d5116b842a095ce6e76a1bac874);
  }

  if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
    Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Project_details.js", DisplayTemplate_6aff6d5116b842a095ce6e76a1bac874);
  }
}
RegisterTemplate_6aff6d5116b842a095ce6e76a1bac874();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Project_details.js"), RegisterTemplate_6aff6d5116b842a095ce6e76a1bac874);
}