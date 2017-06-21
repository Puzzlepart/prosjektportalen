import { IFile } from "sp-pnp-provisioning/lib/schema";
import  ProjectHome  from "./ProjectHome";
import BenefitsOverview  from "./BenefitsOverview";
import ProjectStatus from "./ProjectStatus";
import Nofilter from "./Nofilter";
import Assigned  from "./Assigned";
import MoM from "./MoM";

const Files: IFile[] = [
    ProjectHome,
    Nofilter,
    Assigned,
    MoM,
    BenefitsOverview,
    ProjectStatus,
];

export default Files;
