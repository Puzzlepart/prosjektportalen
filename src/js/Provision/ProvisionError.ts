export default class ProvisionError {
    public Message: string;
    public Source: string;
    public ErrorTraceCorrelationId: string;
    public ErrorTypeName: string;

    constructor(err: any, source: string) {
        this.parseError(err);
        this.Source = source;
    }

    private parseError(err) {
        if (err.hasOwnProperty("sender") && err.hasOwnProperty("args")) {
            const { args } = err;
            this.ErrorTraceCorrelationId = args.get_errorTraceCorrelationId();
            this.ErrorTypeName = args.get_errorTypeName();
            this.Message = args.get_message();
        } else {
            if (typeof err === "string") {
                this.Message = err;
            } else {
                this.Message = "Unable to parse error details.";
            }
        }
    }
}
