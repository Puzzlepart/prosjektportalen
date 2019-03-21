/// <reference types="sharepoint" />
import IChecklistItem from "./IChecklistItem";
export default class PhaseModel {
    Index: number;
    Id: string;
    TaxonomyHiddenListId: number;
    Name: string;
    WssId?: number;
    PhaseLevel?: string;
    ShowOnFrontpage?: boolean;
    ShowPhaseText?: boolean;
    IsIncremental?: boolean;
    Type: string;
    SubText: string;
    PhaseLetter: string;
    Checklist: {
        stats: {
            [key: string]: number;
        };
        items: IChecklistItem[];
        defaultViewUrl: string;
    };
    /**
     * Constructor
     */
    constructor();
    /**
     * Init from SP.Taxonomy.Term
     *
     * @param {SP.Taxonomy.Term} term Taxonomy term
     * @param {boolean} gatesEnabled Gates enabled
     */
    initFromSpTaxonomyTerm(term: SP.Taxonomy.Term, gatesEnabled: boolean): PhaseModel;
    /**
    * Initialize safe using utility function getSafeTerm
    *
    * @param {any} termValue Term value
    */
    initSafe(termValue: any): PhaseModel;
    /**
     * Initialize checklist property
     */
    private initChecklist;
}
