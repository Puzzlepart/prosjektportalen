import __ from "../../../../Resources";
import { IList } from "sp-js-provisioning/lib/schema";

const Documents: IList = {
    Title: __.getResource("Lists_Documents_Title"),
    Description: "",
    Template: 101,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{ ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C01" }],
    AdditionalSettings: { EnableVersioning: true },
    Views: [{
        Title: __.getResource("View_AllDocuments_DisplayName"),
        ViewFields: ["DocIcon", "LinkFilename", "GtProjectPhase", "Modified", "Editor"],
        AdditionalSettings: {
            RowLimit: 30,
            Paged: true,
            ViewQuery: "",
        },
    }],
};

export default Documents;
