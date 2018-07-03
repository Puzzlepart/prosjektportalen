export default class ProvisionError {
    public message: string;
    public source: string;
    public errorTraceCorrelationId: string;
    public errorTypeName: string;

    /**
     * Constructor
     *
     * @param {any} err Error
     * @param {string} source The source of the errror
     */
    constructor(err: any, source: string) {
        this.parseError(err);
        this.source = source;
    }

    /**
     * Parse error
     *
     * @param {any} err Error
     */
    private parseError(err: any) {
        if (typeof err === "object" && err.hasOwnProperty("sender") && err.hasOwnProperty("args")) {
            const { args } = err;
            this.errorTraceCorrelationId = args.get_errorTraceCorrelationId();
            this.errorTypeName = args.get_errorTypeName();
            this.message = args.get_message();
        } else if (typeof err === "object") {
            try {
                const errString = JSON.stringify(err);
                this.message = errString;
            } catch (e) {
                this.message = "Unable to parse error details.";
            }
        } else {
            if (typeof err === "string") {
                this.message = err;
            } else {
                this.message = "Unable to parse error details.";
            }
        }
    }
}
