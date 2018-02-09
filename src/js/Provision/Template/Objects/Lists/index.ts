import { IList } from "sp-pnp-provisioning/lib/schema";
import SitePages from "./SitePages";
import PhaseChecklist from "./PhaseChecklist";
import Information from "./Information";
import Stakeholders from "./Stakeholders";
import CommunicationPlan from "./CommunicationPlan";
import Milestones from "./Milestones";
import ProjectLog from "./ProjectLog";
import ProjectDeliveries from "./ProjectDeliveries";
import Uncertainties from "./Uncertainties";
import Tasks from "./Tasks";
import MeetingCalendar from "./MeetingCalendar";
import Documents from "./Documents";
import ProjectStatus from "./ProjectStatus";
import BenefitsAnalysis from "./BenefitsAnalysis";
import ChangeAnalysis from "./ChangeAnalysis";
import BenefitsFollowup from "./BenefitsFollowup";


export default function Lists(language: number): IList[] {
    return [
        SitePages(language),
        PhaseChecklist(language),
        Information(language),
        Stakeholders(language),
        CommunicationPlan(language),
        Milestones(language),
        ProjectLog(language),
        ProjectDeliveries(language),
        Uncertainties(language),
        Tasks(language),
        MeetingCalendar(language),
        Documents(language),
        ProjectStatus(language),
        BenefitsAnalysis(language),
        ChangeAnalysis(language),
        BenefitsFollowup(language),
    ];
}
