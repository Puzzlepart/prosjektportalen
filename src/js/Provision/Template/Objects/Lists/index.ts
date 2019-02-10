import { IList } from "sp-js-provisioning/lib/schema";
import PhaseChecklist from "./PhaseChecklist";
import Information from "./Information";
import Stakeholders from "./Stakeholders";
import CommunicationPlan from "./CommunicationPlan";
import Milestones from "./Milestones";
import ProjectLog from "./ProjectLog";
import ProjectDeliveries from "./ProjectDeliveries";
import ProjectProperties from "./ProjectProperties";
import ResourceAllocation from "./ResourceAllocation";
import Uncertainties from "./Uncertainties";
import Tasks from "./Tasks";
import MeetingCalendar from "./MeetingCalendar";
import Documents from "./Documents";
import ProjectStatus from "./ProjectStatus";
import BenefitsAnalysis from "./BenefitsAnalysis";
import ChangeAnalysis from "./ChangeAnalysis";
import BenefitsFollowup from "./BenefitsFollowup";

const Lists: IList[] = [
    PhaseChecklist,
    Information,
    Stakeholders,
    CommunicationPlan,
    Milestones,
    ProjectLog,
    ProjectDeliveries,
    ProjectProperties,
    ResourceAllocation,
    Uncertainties,
    Tasks,
    MeetingCalendar,
    Documents,
    ProjectStatus,
    BenefitsAnalysis,
    ChangeAnalysis,
    BenefitsFollowup,
];

export default Lists;
