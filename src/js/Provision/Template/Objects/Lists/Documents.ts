import RESOURCE_MANAGER from "../../../../@localization";
import { IList } from "sp-pnp-provisioning/lib/schema";

const Documents: IList = {
    Title: RESOURCE_MANAGER.getResource("Lists_Documents_Title"),
    Description: "",
    Template: 101,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
        ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C01",
    }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
        Title: RESOURCE_MANAGER.getResource("View_AllDocuments_DisplayName"),
        ViewFields: ["DocIcon", "LinkFilename", "GtProjectPhase", "Modified", "Editor"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default Documents;
