export default new class StampVersion {
    private template = "<span class='ms-metadata {1}'>{0}</span>";

    /**
     * Stamps version in the specified container
     *
     * @param container DOM container
     * @param versionKey Prop bag key
     * @param additionalClassNames Additional class names
     */
    public stamp(container: string, versionKey: string, additionalClassNames = []): void {
        this.getVersion(versionKey).then(v => {
            document.getElementById(container).innerHTML = String.format(this.template, v, additionalClassNames.join(" "));
        }, _ => null);
    };

    /**
     * Get version from web property bag
     *
     * @param versionKey Prop bag key
     */
    private getVersion(versionKey: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            SP.SOD.executeOrDelayUntilScriptLoaded(() => {
                let ctx = SP.ClientContext.get_current(),
                    propBag = ctx.get_web().get_allProperties();
                ctx.load(propBag);
                ctx.executeQueryAsync(() => {
                    let e = Object.keys(propBag.get_fieldValues()).filter(key => key === versionKey);
                    if (e.length === 1) {
                        resolve(propBag.get_item(versionKey));
                    } else {
                        reject();
                    }
                }, reject);
            }, "sp.js");
        });
    }
};
