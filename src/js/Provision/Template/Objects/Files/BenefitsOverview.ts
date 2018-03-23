import RESOURCE_MANAGER from "../../../../Resources";
import { IFile } from "sp-pnp-provisioning/lib/schema";

const BenefitsOverview: IFile = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/SitePage_OneColumn.txt",
    Url: "BenefitsOverview.aspx",
    Overwrite: true,
    Properties: {
        Title: "Gevinstoversikt",
    },
    RemoveExistingWebParts: true,
    WebParts: [
        {
            Title: "Gevinstoversikt",
            Zone: "LeftColumn",
            Order: 0,
            Contents: {
                Xml: `<webParts>
    <webPart
        xmlns="http://schemas.microsoft.com/WebPart/v3">
        <metaData>
            <type name="Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />
            <importErrorMessage>Kan ikke importere denne webdelen.</importErrorMessage>
        </metaData>
        <data>
            <properties>
                <property name="Title" type="string">${RESOURCE_MANAGER.getResource("WebPart_BenefitsOverview_Title")}</property>
                <property name="ChromeType" type="chrometype">Default</property>
                <property name="ChromeState" type="chromestate">Normal</property>
                <property name="Content" type="string">&lt;div id="pp-benefitsoverview"&gt;&lt;/div&gt;</property>
            </properties>
        </data>
    </webPart>
</webParts>`,
            },
        },
    ],
};

export default BenefitsOverview;
