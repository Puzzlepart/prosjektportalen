// requires jspdf and jspdf-autotable, due to issues with extentions it cannont be imported atm
declare var jsPDF: any;

const DoExport = (project) => {
    SP.SOD.registerSod("jspdf", `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/pp/js/jspdf.min.js`);
    SP.SOD.registerSod("jspdf.plugin.autotable", `${_spPageContextInfo.siteAbsoluteUrl}/SiteAssets/pp/js/jspdf.plugin.autotable.js`);
    SP.SOD.registerSodDep("jspdf.plugin.autotable", "jspdf");
    SP.SOD.executeFunc("jspdf", "jsPDF", () => {
        let doc = jsPDF("l");
        doc.setFontSize(22);
        doc.text(_spPageContextInfo.webTitle, 14, 20);
        doc.setFontSize(8);
        doc.text(_spPageContextInfo.webAbsoluteUrl, 14, 30);
        doc.save("Statusrapport.pdf");
    });
};

export default DoExport;
