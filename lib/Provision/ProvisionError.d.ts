export default class ProvisionError {
    message: string;
    source: string;
    errorTraceCorrelationId: string;
    errorTypeName: string;
    /**
     * Constructor
     *
     * @param {any} err Error
     * @param {string} source The source of the errror
     */
    constructor(err: any, source: string);
    /**
     * Parse error
     *
     * @param {any} err Error
     */
    private parseError;
}
