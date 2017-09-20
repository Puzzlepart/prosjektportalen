/// <reference types="mocha" />
/// <reference types="sinon" />

import { expect } from "chai";
import * as Util from "../../Util";

describe("Util", () => {
    it("cleanSearchPropName should remove search postfix", () => {
        let cleanPropName = Util.cleanSearchPropName("AuthorOWSUSER");
        expect(cleanPropName).to.eq("Author");
    });
    it("encodeSpaces should replace spaces with %20", () => {
        let stringWithEncodedSpaces = Util.encodeSpaces("I am a developer");
        expect(stringWithEncodedSpaces).to.eq("I%20am%20a%20developer");
    });
    it("getSafeTerm should ensure get_label() can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ Label: "Developer", TermGuid: "24E81B26-0D72-4008-8435-82820BABF2CB", WssId: -1 });
        expect(safeTerm.get_label()).to.eq("Developer");
    });
    it("getSafeTerm should ensure get_termGuid() can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ Label: "Developer", TermGuid: "24E81B26-0D72-4008-8435-82820BABF2CB", WssId: -1 });
        expect(safeTerm.get_termGuid()).to.eq("24E81B26-0D72-4008-8435-82820BABF2CB");
    });
    it("getSafeTerm should ensure get_wssId() can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ Label: "Developer", TermGuid: "24E81B26-0D72-4008-8435-82820BABF2CB", WssId: -1 });
        expect(safeTerm.get_wssId()).to.eq(-1);
    });
    it("getSafeTerm should ensure Label can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
        expect(safeTerm.Label).to.eq("Developer");
    });
    it("getSafeTerm should ensure Label can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
        expect(safeTerm.Label).to.eq("Developer");
    });
    it("getSafeTerm should ensure TermGuid can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
        expect(safeTerm.TermGuid).to.eq("24E81B26-0D72-4008-8435-82820BABF2CB");
    });
    it("getSafeTerm should ensure WssId can be used on the object", () => {
        let safeTerm = Util.getSafeTerm({ get_label: () => "Developer", get_termGuid: () => "24E81B26-0D72-4008-8435-82820BABF2CB", get_wssId: () => -1 });
        expect(safeTerm.WssId).to.eq(-1);
    });
    it("getUrlHash should convert an url hash to an object", () => {
        let urlHashObject = Util.getUrlHash("value=2&key=5");
        expect(urlHashObject.value).to.eq("2");
    });
});
