import SectionModel from "../../Section/SectionModel";
export default class PDFExport {
    private jspdf;
    private readonly MARGIN_LEFT;
    private readonly IMAGE_WIDTH;
    private sections;
    constructor(sections: SectionModel[], layout?: string, font?: string);
    /**
     * Generate blob
     */
    generateBlob(): Promise<Blob>;
    /**
     * Add project properties page
     */
    addProjectPropertiesPage(): Promise<void>;
    /**
     * Add status section
     */
    addStatusSection(): void;
    /**
     * Add page with list
     *
     * @param {SectionModel} section Section
     */
    addPageWithList(section: SectionModel): Promise<void>;
    /**
     * Add page with image
     *
     * @param {string} imageId Image id
     * @param {string} pageTitle Page title
     */
    addPageWithImage(imageId: string, pageTitle: string): Promise<void>;
    /**
    * Add project properties section
    *
    * @param {SectionModel} section Section
    */
    addProjectPropertiesSection(section: SectionModel): Promise<void>;
    /**
     * Add document title
     *
     * @param {string} value Value
     * @param {number} yPosition Y position
     * @param {number} xPosition X postion
     */
    private addDocumentTitle;
    /**
     * Add property
     *
     * @param {ITableColumn} column Table column
     * @param {string} value Value
     * @param {string} comment Comment
     * @param {number} yPosition Y position
     */
    private addProperty;
    /**
     * Add page title
     *
     * @param {string} value Value
     * @param {number} yPosition Y position
     * @param {number} xPosition X postion
     * @param {number} textColor Text color
     */
    private addPageTitle;
    /**
     * Create column
     *
     * @param {string} title Title
     * @param {string} key Key
     * @param {string} type Type (optional)
     */
    private createColumn;
    /**
     * Fetch data
     *
     * @param {SectionModel} section Section
     */
    private fetchDataForSection;
    /**
     * Fetch project data
     *
     * @param {IProject} project The project
     * @param {string} configListTitle Config list title
     */
    private fetchProjectData;
    /**
     * Fetch projects
     */
    private fetchProject;
    /**
     * Add image to canvas
     *
     * @param {any} canvas The canvas
     */
    private addImageToCanvas;
}
