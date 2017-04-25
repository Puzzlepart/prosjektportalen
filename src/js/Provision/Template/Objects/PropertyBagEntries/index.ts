import { IPropertyBagEntry } from "sp-pnp-provisioning/lib/schema";

const PropertyBagEntries: IPropertyBagEntry[] = [{
    Key: "pp_version",
    Value: __VERSION,
    Overwrite: true,
    Indexed: true,
}];

export default PropertyBagEntries;
