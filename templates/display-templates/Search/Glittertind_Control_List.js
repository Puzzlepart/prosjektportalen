/* Denne filen er knyttet til en HTML-fil med samme navn, og henter innhold fra den. Du kan ikke flytte, slette, gi nytt navn til eller gjør andre endringer i denne filen før tilknytningen mellom filene er fjernet. */

function DisplayTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb(ctx) {
    var ms_outHtml = [];
    var cachePreviousTemplateData = ctx['DisplayTemplateData'];
    ctx['DisplayTemplateData'] = new Object();
    DisplayTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb.DisplayTemplateData = ctx['DisplayTemplateData'];

    ctx['DisplayTemplateData']['TemplateUrl'] = '~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_List.js';
    ctx['DisplayTemplateData']['TemplateType'] = 'Control';
    ctx['DisplayTemplateData']['TargetControlType'] = ['Content Web Parts', 'SearchResults'];
    this.DisplayTemplateData = ctx['DisplayTemplateData'];

    ms_outHtml.push('', ''
        , ''
    );
    if (!$isNull(ctx.ClientControl) &&
        !$isNull(ctx.ClientControl.shouldRenderControl) &&
        !ctx.ClientControl.shouldRenderControl()) {
        return "";
    }
    ctx.ListDataJSONGroupsKey = "ResultTables";

    var noResultsClassName = "ms-srch-result-noResults ms-metadata";

    var shouldShowClearSearch = function (ctx) {
        return ctx.DataProvider && ctx.DataProvider.get_currentQueryState() && ctx.DataProvider.get_currentQueryState().k;
    }
    var ListRenderRenderWrapper = function (itemRenderResult, inCtx, tpl) {
        var iStr = [];
        iStr.push(itemRenderResult);
        return iStr.join('');
    }
    ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
    ms_outHtml.push(''
        , '<div class="gt-list-control">'
    );

    if (shouldShowClearSearch(ctx)) {
        ms_outHtml.push(''
            , '<div class="clear-search" onclick="window.location.hash = \'\'"><i class="ms-Icon ms-Icon--Clear" aria-hidden="true"></i>Nullstill søket</div>'
        );
    }

    ms_outHtml.push(ctx.RenderGroups(ctx));

    if (ctx.ClientControl.get_shouldShowNoResultMessage()) {
        ms_outHtml.push(''
            , '<div class="', noResultsClassName, '">Ingen prosjekter &#229; vise</div>'
        );
    }

    if (ctx.ClientControl.get_showPaging()) {
        var pagingInfo = ctx.ClientControl.get_pagingInfo();
        if (!$isEmptyArray(pagingInfo)) {
            ms_outHtml.push(''
                , '                        <ul id="Paging" class="ms-srch-Paging gt-srch-paging">'
            );
            for (var i = 0; i < pagingInfo.length; i++) {
                var pl = pagingInfo[i];
                if (!$isNull(pl)) {
                    var imagesUrl = GetThemedImageUrl('searchresultui.png');
                    if (pl.startItem == -1) {
                        var selfLinkId = "SelfLink_" + pl.pageNumber;
                        ms_outHtml.push(''
                            , '                                    <li id="PagingSelf"><a id="', $htmlEncode(selfLinkId), '">', $htmlEncode(pl.pageNumber), '</a></li>'
                        );
                    } else if (pl.pageNumber == -1) {
                        var iconClass = Srch.U.isRTL() ? "ms-srch-pagingNext" : "ms-srch-pagingPrev";
                        ms_outHtml.push(''
                            , '                                    <li id="PagingImageLink"><a id="PageLinkPrev" href="#" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled ms-verticalAlignMiddle" title="', $htmlEncode(pl.title), '" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem), ');return Srch.U.cancelEvent(event);">'
                            , '                                        <span class="ms-promlink-button-image">'
                            , '                                            <img src="', $urlHtmlEncode(imagesUrl), '" class="', $htmlEncode(iconClass), '" alt="', $htmlEncode(pl.title), '" />'
                            , '                                        </span>'
                            , '                                    </a></li>'
                        );
                    } else if (pl.pageNumber == -2) {
                        var iconClass = Srch.U.isRTL() ? "ms-srch-pagingPrev" : "ms-srch-pagingNext";
                        ms_outHtml.push(''
                            , '                                    <li id="PagingImageLink"><a id="PageLinkNext" href="#" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled ms-verticalAlignMiddle" title="', $htmlEncode(pl.title), '" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem), ');return Srch.U.cancelEvent(event);">'
                            , '                                        <span class="ms-promlink-button-image">'
                            , '                                            <img src="', $urlHtmlEncode(imagesUrl), '" class="', $htmlEncode(iconClass), '" alt="', $htmlEncode(pl.title), '" />'
                            , '                                        </span>'
                            , '                                    </a></li>'
                        );
                    } else {
                        var pageLinkId = "PageLink_" + pl.pageNumber;
                        ms_outHtml.push(''
                            , '                                    <li id="PagingLink"><a id="', $htmlEncode(pageLinkId), '" href="#" title="', $htmlEncode(pl.title), '" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem), ');return Srch.U.cancelEvent(event);">', $htmlEncode(pl.pageNumber), '</a></li>'
                        );
                    }
                }
            }
            ms_outHtml.push(''
                , '                        </ul>'
            );
        }
    }
    ms_outHtml.push(''
        , '</div>'
    );


    ctx['DisplayTemplateData'] = cachePreviousTemplateData;
    return ms_outHtml.join('');
}
function RegisterTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb() {
    if ("undefined" != typeof (Srch) && "undefined" != typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) == "function") {
        Srch.U.registerRenderTemplateByName("Glittertind_Control_List", DisplayTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb);
    }

    if ("undefined" != typeof (Srch) && "undefined" != typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) == "function") {
        Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_List.js", DisplayTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb);
    }
}
RegisterTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb();
if (typeof (RegisterModuleInit) == "function" && typeof (Srch.U.replaceUrlTokens) == "function") {
    RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_List.js"), RegisterTemplate_10f0539daa1845b9a7b0a88d9c7c2cbb);
}