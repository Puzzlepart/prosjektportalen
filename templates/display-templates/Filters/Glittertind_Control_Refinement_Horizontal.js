/* Denne filen er knyttet til en HTML-fil med samme navn, og henter innhold fra den. Du kan ikke flytte, slette, gi nytt navn til eller gjør andre endringer i denne filen før tilknytningen mellom filene er fjernet. */

function DisplayTemplate_4a13216eaa0f43139447b8bf7a17cb83(ctx) {
  var ms_outHtml = [];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_4a13216eaa0f43139447b8bf7a17cb83.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl'] = '~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fGlittertind_Control_Refinement_Horizontal.js';
  ctx['DisplayTemplateData']['TemplateType'] = 'Control';
  ctx['DisplayTemplateData']['TargetControlType'] = ['Refinement'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ms_outHtml.push('', ''
  );

  ctx.ClientControl.alternateRenderer = function (container, cntxt) { };
  ms_outHtml.push(''
    , '        <div class="ms-ref-ctrl horizontal" id="Refinement" name="Control">'
  );
  if (!$isNull(ctx.ClientControl)) {
    var rcs = ctx.ClientControl.get_selectedRefinementControls();
    if (!$isEmptyArray(rcs)) {
      for (var i = 0; i < rcs.length; i++) {
        var rc = rcs[i];
        if (!$isNull(rc)) {
          rc.containerId = ctx.ClientControl.get_nextUniqueId();
          ms_outHtml.push(''
            , '            <div class="ms-ref-refiner" id="', $htmlEncode(rc.containerId), '" name="Group" refinerName="', $htmlEncode(rc.propertyName), '"></div>'
          );
        }
      }
    }
    ms_outHtml.push(''
      , '            <div id="', ctx.ClientControl.get_emptyRefinementMessageId(), '" class="ms-disabled ms-hide">'
    );
    var emptyMessage = ctx.ClientControl.get_emptyMessage();
    if ($isEmptyString(emptyMessage)) {
      ms_outHtml.push(''
        , '                ', $htmlEncode(Srch.U.loadResource("rf_EmptyRefinement")), ''
      );
    }
    else {
      ms_outHtml.push(''
        , '                ', $htmlEncode(emptyMessage), ''
      );
    }
    ms_outHtml.push(''
      , '            </div>'
    );
  }
  ms_outHtml.push(''
    , '        </div>'
    , '    '
  );

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_4a13216eaa0f43139447b8bf7a17cb83() {

  if ("undefined" != typeof (Srch) && "undefined" != typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) == "function") {
    Srch.U.registerRenderTemplateByName("Glittertind_Control_Refinement_Horizontal", DisplayTemplate_4a13216eaa0f43139447b8bf7a17cb83);
  }

  if ("undefined" != typeof (Srch) && "undefined" != typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) == "function") {
    Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fGlittertind_Control_Refinement_Horizontal.js", DisplayTemplate_4a13216eaa0f43139447b8bf7a17cb83);
  }

}
RegisterTemplate_4a13216eaa0f43139447b8bf7a17cb83();
if (typeof (RegisterModuleInit) == "function" && typeof (Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fGlittertind_Control_Refinement_Horizontal.js"), RegisterTemplate_4a13216eaa0f43139447b8bf7a17cb83);
}