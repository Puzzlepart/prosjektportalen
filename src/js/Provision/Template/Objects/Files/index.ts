import { IFile } from "sp-pnp-provisioning/lib/schema";
import ProjectHome from "./ProjectHome";
import BenefitsOverview from "./BenefitsOverview";
import ProjectStatus from "./ProjectStatus";
import Nofilter from "./Nofilter";
import Assigned from "./Assigned";
import MoM from "./MoM";

export default function Files(language: number): IFile[] {
    return [
        ProjectHome(language),
        Nofilter(language),
        Assigned(language),
        MoM(language),
        BenefitsOverview(language),
        ProjectStatus(language),
    ];
}


