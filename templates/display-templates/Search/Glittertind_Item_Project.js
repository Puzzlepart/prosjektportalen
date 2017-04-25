/* Denne filen er knyttet til en HTML-fil med samme navn, og henter innhold fra den. Du kan ikke flytte, slette, gi nytt navn til eller gjør andre endringer i denne filen før tilknytningen mellom filene er fjernet. */

function DisplayTemplate_11a1a05051b14554b2087750650c8023(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_11a1a05051b14554b2087750650c8023.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Project.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':null, 'Title':null, 'GtProjectManagerOWSUSER':null, 'GtProjectOwnerOWSUSER':null, 'owstaxIdGtProjectPhase':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);

    var url = $getItemValue(ctx, "Path");
    var title = $getItemValue(ctx, "Title");
    var projectManager = $getItemValue(ctx, "GtProjectManagerOWSUSER");
    var projectOwner = $getItemValue(ctx, "GtProjectOwnerOWSUSER");
    var projectPhase = $getItemValue(ctx, "owstaxIdGtProjectPhase").defaultValueRenderer($getItemValue(ctx, "owstaxIdGtProjectPhase"));
ms_outHtml.push(''
,'        <div class="gt-projectItem">'
,'            <div class="gt-phaseIcon ms-metadata">'
,'                <span class="phaseLetter">', projectPhase ? projectPhase.substring(0,1) : "X" ,'</span>'
,'                <span class="projectPhase">', projectPhase || "Ingen fase" ,'</span>'
,'            </div>'
,'            <h2><a href="', url ,'">', title ,'</a></h2>'
,'            <div class="ms-metadata"><b>Prosjektleder:</b> ', !projectManager.isEmpty ? projectManager : "Ikke satt" ,'</div>'
,'            <div class="ms-metadata"><b>Prosjekteier:</b> ', !projectOwner.isEmpty ? projectOwner : "Ikke satt" ,'</div>'
,'        </div>'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_11a1a05051b14554b2087750650c8023() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Glittertind_Item_Project", DisplayTemplate_11a1a05051b14554b2087750650c8023);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Project.js", DisplayTemplate_11a1a05051b14554b2087750650c8023);
}
//

    //
}
RegisterTemplate_11a1a05051b14554b2087750650c8023();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Item_Project.js"), RegisterTemplate_11a1a05051b14554b2087750650c8023);
}