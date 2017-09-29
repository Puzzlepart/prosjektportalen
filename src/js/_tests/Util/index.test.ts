/// <reference types="mocha" />
/// <reference types="sinon" />

import { expect } from "chai";
import * as Util from "../../Util";

describe("Util", () => {
    describe("cleanSearchPropName", () => {
        it("should remove search postfix 'OWSUSER' from AuthorOWSUSER", () => {
            let cleanPropName = Util.cleanSearchPropName("AuthorOWSUSER");
            expect(cleanPropName).to.eq("Author");
        });
        it("should remove search postfix 'OWSMTXT' from ActionOWSMTXT", () => {
            let cleanPropName = Util.cleanSearchPropName("ActionOWSMTXT");
            expect(cleanPropName).to.eq("Action");
        });
        it("should remove search postfix 'OWSDATE' from ActivityDateOWSDATE", () => {
            let cleanPropName = Util.cleanSearchPropName("ActivityDateOWSDATE");
            expect(cleanPropName).to.eq("ActivityDate");
        });
        it("should remove search postfix 'OWSCHCS' from AgreementStatusOWSCHCS", () => {
            let cleanPropName = Util.cleanSearchPropName("AgreementStatusOWSCHCS");
            expect(cleanPropName).to.eq("AgreementStatus");
        });
        it("should remove search postfix 'OWSURLH' from AlternateThumbnailUrlOWSURLH", () => {
            let cleanPropName = Util.cleanSearchPropName("AlternateThumbnailUrlOWSURLH");
            expect(cleanPropName).to.eq("AlternateThumbnailUrl");
        });
    });
    describe("encodeSpaces", () => {
        it("should replace spaces with %20", () => {
            let stringWithEncodedSpaces = Util.encodeSpaces("I am a developer");
            expect(stringWithEncodedSpaces).to.eq("I%20am%20a%20developer");
        });
    });
    describe("getSafeTerm", () => {
        it("should ensure get_label() is available on the object", () => {
            let safeTerm = Util.getSafeTerm({ Label: "Developer", TermGuid: "24E81B26-0D72-4008-8435-82820BABF2CB", WssId: -1 });
            expect(safeTerm.get_label()).to.eq("Developer");
        });
        it("should ensure get_termGuid() is available on the object", () => {
            let safeTerm = Util.getSafeTerm({ Label: "Developer", TermGuid: "24E81B26-0D72-4008-8435-82820BABF2CB", WssId: -1 });
            expect(safeTerm.get_termGuid()).to.eq("24E81B26-0D72-4008-8435-82820BABF2CB");
        });
        it("should ensure get_wssId() is available on the object", () => {
            let safeTerm = Util.getSafeTerm({ Label: "Developer", TermGuid: "24E81B26-0D72-4008-8435-82820BABF2CB", WssId: -1 });
            expect(safeTerm.get_wssId()).to.eq(-1);
        });
        it("should ensure Label is available on the object", () => {
            let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
            expect(safeTerm.Label).to.eq("Developer");
        });
        it("should ensure TermGuid is available on the object", () => {
            let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
            expect(safeTerm.TermGuid).to.eq("24E81B26-0D72-4008-8435-82820BABF2CB");
        });
        it("should ensure WssId is available on the object", () => {
            let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
            expect(safeTerm.WssId).to.eq(-1);
        });
    });
    describe("getUrlHash", () => {
        it("should convert an url hash to an object", () => {
            let urlHashObject = Util.getUrlHash("value=2&key=5");
            expect(urlHashObject.value).to.eq("2");
        });
    });
    describe("dateFormat", () => {
        it("should return a formatted date", () => {
            global["_spPageContextInfo"] = { webLanguage: 1044 };
            let dateFormatted = Util.dateFormat("2017-09-21T07:26:33.304Z");
            expect(dateFormatted).to.eq("21. september 2017 kl. 09:26");
        });
    });
    describe("makeUrlRelativeToSite", () => {
        it("should make URL relative", () => {
            global["document"] = { location: { protocol: "https:", hostname: "prosjektportalen.sharepoint.com" } };
            let relativeUrl = Util.makeUrlRelativeToSite("https://prosjektportalen.sharepoint.com/sites/cdn");
            expect(relativeUrl).to.eq("/sites/cdn");
        });
    });
    describe("makeUrlAbsolute", () => {
        it("should make URL absolute", () => {
            global["document"] = { location: { protocol: "https:", hostname: "prosjektportalen.sharepoint.com" } };
            let absUrl = Util.makeUrlAbsolute("/sites/cdn");
            expect(absUrl).to.eq("https://prosjektportalen.sharepoint.com/sites/cdn");
        });
    });
    describe("generateStorageKey", () => {
        it("should generate key without web prefix", () => {
            let storageKeyWithoutWebPrefix = Util.generateStorageKey(["part1", "part2", "part3"], false);
            expect(storageKeyWithoutWebPrefix).to.eq("part1_part2_part3");
        });
        it("should generate key with web prefix", () => {
            global["_spPageContextInfo"] = { webServerRelativeUrl: "/sites/prosjektportalen" };
            let storageKeyWithWebPrefix = Util.generateStorageKey(["part1", "part2", "part3"]);
            expect(storageKeyWithWebPrefix).to.eq("sitesprosjektportalen_part1_part2_part3");
        });
    });
    describe("generateStorageKey", () => {
        it("should use 'kr' for language 1044", () => {
            global["_spPageContextInfo"] = { webLanguage: 1044 };
            let currencyFormat = Util.toCurrencyFormat("500");
            expect(currencyFormat).to.eq("kr 500");
        });
        it("should use '$' for language 1033", () => {
            global["_spPageContextInfo"] = { webLanguage: 1033 };
            let currencyFormat = Util.toCurrencyFormat("500");
            expect(currencyFormat).to.eq("$500");
        });
        it("should add spaces to separate thousands", () => {
            global["_spPageContextInfo"] = { webLanguage: 1044 };
            let currencyFormat = Util.toCurrencyFormat("500000");
            expect(currencyFormat).to.eq("kr 500 000");
        });
    });
    describe("percentage", () => {
        it("should return 50%", () => {
            let percentage = Util.percentage(0, 50, 100);
            expect(percentage).to.eq("50%");
        });
        it("should return 60%", () => {
            let percentage = Util.percentage(0, 60, 100);
            expect(percentage).to.eq("60%");
        });
        it("should return 70%", () => {
            let percentage = Util.percentage(0, 70, 100);
            expect(percentage).to.eq("70%");
        });
        it("should return 50", () => {
            let percentage = Util.percentage(0, 50, 100, false);
            expect(percentage).to.eq(50);
        });
        it("should return 60", () => {
            let percentage = Util.percentage(0, 60, 100, false);
            expect(percentage).to.eq(60);
        });
        it("should return 70", () => {
            let percentage = Util.percentage(0, 70, 100, false);
            expect(percentage).to.eq(70);
        });
        it("should return 44" , () => {
            let percentage = Util.percentage(10, 50, 100, false);
            expect(percentage).to.eq(44);
        });
        it("should return 43", () => {
            let percentage = Util.percentage(20, 50, 90, false);
            expect(percentage).to.eq(43);
        });
        it("should return 40", () => {
            let percentage = Util.percentage(30, 50, 80, false);
            expect(percentage).to.eq(40);
        });
    });
});
