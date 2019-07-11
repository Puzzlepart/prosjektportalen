export interface IBenefitsSearchResult {
    Path: string;
    Title: string;
    ListItemId: string;
    SiteTitle: string;
    WebId: string;
    ContentTypeID: string;
    GtDesiredValueOWSNMBR: string;
    GtMeasureIndicatorOWSTEXT: string;
    GtMeasurementUnitOWSCHCS: string;
    GtStartValueOWSNMBR: string;
    GtMeasurementValueOWSNMBR: string;
    GtMeasurementCommentOWSMTXT: string;
    GtMeasurementDateOWSDATE: string;
    GtGainsTurnoverOWSMTXT: string;
    GtGainsTypeOWSCHCS: string;
    GtPrereqProfitAchievementOWSMTXT: string;
    GtRealizationTimeOWSDATE: string;
    GtGainLookupId: string;
    RefinableString58: string; // Fallback for GtGainLookupId if alias is not set correctly
    GtMeasureIndicatorLookupId: string;
    RefinableString59: string; // Fallback for GtMeasureIndicatorLookupId if alias is not set correctly
    GtGainsResponsible: string;
    RefinableString70: string; // Fallback for GtGainsResponsible if alias is not set correctly
}
