export default class ProvisionError {
    public message: string;
    public source: string;
    public errorTraceCorrelationId: string;
    public errorTypeName: string;

    constructor(err: any, source: string) {
        this.parseError(err);
        this.errorTypeName = source;
    }

    private parseError(err) {
        if (err.hasOwnProperty("sender") && err.hasOwnProperty("args")) {
            const { args } = err;
            this.errorTraceCorrelationId = args.get_errorTraceCorrelationId();
            this.errorTypeName = args.get_errorTypeName();
            this.message = args.get_message();
        } else {
            if (typeof err === "string") {
                this.message = err;
            } else {
                this.message = "Unable to parse error details.";
            }
        }
    }
}
