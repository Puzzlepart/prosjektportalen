export default class PhaseModel {
    public Id: string;
    public Name: string;
    public PhaseLevel: string;
    public ShowOnFrontpage: boolean;

    /**
     * Constructor
     *
     * @param {SP.Taxonomy.Term} term Term
     */
    constructor(term: SP.Taxonomy.Term) {
        this.Id = term.get_id().toString();
        this.Name = term.get_name();
        this.PhaseLevel = term.get_localCustomProperties().PhaseLevel;
        this.ShowOnFrontpage = term.get_localCustomProperties().ShowOnFrontpage !== "false";
    }

    /**
     * Get phase level class name
     *
     * @param {string} defaultClassName Default class name (if no phase level is specified)
     */
    public getPhasLevelClassName(defaultClassName = "unknown-phaselevel") {
        return this.PhaseLevel ? this.PhaseLevel.trim().toLowerCase() : defaultClassName;
    }

    /**
     * Get phase letter
     */
    public getPhaseLetter(): string {
        return this.Name[0];
    }
}
