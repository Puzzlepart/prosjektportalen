/* Denne filen er knyttet til en HTML-fil med samme navn, og henter innhold fra den. Du kan ikke flytte, slette, gi nytt navn til eller gjør andre endringer i denne filen før tilknytningen mellom filene er fjernet. */

function DisplayTemplate_2f1f63a42ec04ebd9617d985692edb45(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_2f1f63a42ec04ebd9617d985692edb45.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Erfaringslogg.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':null, 'Title':null, 'LastModifiedTime':null, 'LoggElement':['GtProjectLogTypeOWSCHCS'], 'MeldtAv':['GtProjectLogReporterOWSUSER'], 'Loggbeskrivelse':['GtProjectLogDescriptionOWSMTXT'], 'Ansvarlig':['GtProjectLogResponsibleOWSCHCS'], 'Konsekvens':['GtProjectLogConsequenceOWSMTXT'], 'Anbefaling':['GtProjectLogRecommendationOWSMTXT'], 'TilErfaringslogg':['GtProjectLogExperienceOWSBOOL'], 'Aktorer':['GtProjectLogActorsOWSCHCM'], 'PavirkerProdukt':['GtProjectLogProductLookup'], 'TilProsjektStyre':['GtProjectLogEventLookup'], 'crawltime':null, 'SPWebUrl':null, 'SiteTitle':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
,''
);

var myItem = {};
myItem.id = ctx.ClientControl.get_nextUniqueId();
myItem.url = $getItemValue(ctx, "Path");
myItem.title = $getItemValue(ctx, "Title");
myItem.crawltime = $getItemValue(ctx, "crawltime");
myItem.meldtAv = $getItemValue(ctx, "MeldtAv");
myItem.loggBeskrivelse = $getItemValue(ctx, "Loggbeskrivelse");
myItem.ansvarlig = $getItemValue(ctx, "Ansvarlig");
myItem.konsekvens = $getItemValue(ctx, "Konsekvens");
myItem.anbefaling = $getItemValue(ctx, "Anbefaling");
myItem.tilErfaringslogg = $getItemValue(ctx, "TilErfaringslogg");
myItem.aktorer = $getItemValue(ctx, "Aktorer");
if(myItem.aktorer !== undefined) {
	myItem.aktorer = myItem.aktorer.toString();
	myItem.aktorer = myItem.aktorer.substr(0,myItem.aktorer.length-2).split(";#").join(", ");
}

myItem.pavirkerProdukt = $getItemValue(ctx, "PavirkerProdukt");
myItem.tilProsjektStyre = $getItemValue(ctx, "TilProsjektStyre");
myItem.lastModified = $getItemValue(ctx, "LastModifiedTime");
myItem.parentWebUrl = $getItemValue(ctx, "SPWebUrl");
myItem.siteTitle = $getItemValue(ctx, "SiteTitle");

var trClass = 'erfaring';
if (ctx.CurrentItemIdx % 2 === 0) {
    trClass = trClass + ' ms-HoverBackground-bgColor';
}

ms_outHtml.push(''
,''
, '		<tr id="', myItem.id, '" class="', trClass,'">'
,'            <td>'
,'				<a href="', myItem.url ,'">', myItem.title ,'</a>'
,'			</td>'
,'			<td>'
,'				', myItem.siteTitle ,''
,'			</td>'
,'			<td>'
,'				', myItem.loggBeskrivelse ,''
,'			</td>'
,'			<td>'
,'				', myItem.ansvarlig ,''
,'			</td>'
,'			<td>'
,'				', myItem.konsekvens ,''
,'			</td>'
,'			<td>'
,'				', myItem.anbefaling ,''
,'			</td>'
,'			<td>'
,'				', myItem.aktorer ,''
,'			</td>'
,'		</tr>'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_2f1f63a42ec04ebd9617d985692edb45() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Glittertind_Item_Erfaringslogg", DisplayTemplate_2f1f63a42ec04ebd9617d985692edb45);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Erfaringslogg.js", DisplayTemplate_2f1f63a42ec04ebd9617d985692edb45);
}
//

    //
}
RegisterTemplate_2f1f63a42ec04ebd9617d985692edb45();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Erfaringslogg.js"), RegisterTemplate_2f1f63a42ec04ebd9617d985692edb45);
}