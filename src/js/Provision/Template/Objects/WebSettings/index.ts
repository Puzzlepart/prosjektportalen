import { IWebSettings } from "sp-pnp-provisioning/lib/schema";

const WebSettings: IWebSettings = {
    WelcomePage: "SitePages/ProjectHome.aspx",
    SiteLogo: `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/pp/img/ICO-Site-Project-11.png`,
};

export default WebSettings;
