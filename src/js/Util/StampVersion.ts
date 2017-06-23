import * as PropertyBag from "./PropertyBag";

export default class StampVersion {
    private template = "<span class='ms-metadata {1}'>{0}</span>";

    /**
     * Stamps version in the specified container
     *
     * @param container DOM container
     * @param versionKey Prop bag key
     * @param additionalClassNames Additional class names
     */
    public stamp(container: string, versionKey: string, additionalClassNames = []): void {
        this.getVersion(versionKey)
            .then(v => {
                const _container = document.getElementById(container);
                if (_container) {
                    _container.innerHTML = String.format(this.template, v, additionalClassNames.join(" "));
                }
            });
    }

    /**
     * Get version from web property bag
     *
     * @param versionKey Prop bag key
     */
    public getVersion = (versionKey: string): Promise<string> => new Promise<string>((resolve, reject) => {
        PropertyBag.GetAllProperties()
            .then(props => {
                let e = Object.keys(props.get_fieldValues()).filter(key => key === versionKey);
                if (e.length === 1) {
                    resolve(props.get_item(versionKey));
                } else {
                    reject();
                }
            })
            .catch(reject);
    })
}
