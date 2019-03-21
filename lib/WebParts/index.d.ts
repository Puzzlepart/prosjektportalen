import ProjectList from "./ProjectList";
import ProjectInfo from "./ProjectInfo";
import ProjectPhases from "./ProjectPhases";
import NewProjectLink from "./NewProjectLink";
import Announcements from "./Announcements";
import LatestProjects from "./LatestProjects";
import QuickLinks from "./QuickLinks";
import DynamicPortfolio from "./DynamicPortfolio";
import BenefitsOverview from "./BenefitsOverview";
import ProjectStatus from "./ProjectStatus";
import ExperienceLog from "./ExperienceLog";
import WebPropertyBagEditor from "./WebPropertyBagEditor";
import NewProjectForm from "./NewProjectForm";
import RiskMatrix from "./RiskMatrix";
import DiceCalculator from "./DiceCalculator";
import ProjectStats from "./ProjectStats";
import WebPartComponent from "./WebPartComponent";
/**
 * Get webpart component by name
 *
 * @param {string} name Name of the component
 */
export declare const GetWebPartComponentByName: (name: string) => WebPartComponent<any>;
/**
 * Render the webparts
 */
export declare const RenderWebPartsOnPage: () => void;
export { ProjectList, ProjectInfo, ProjectPhases, NewProjectLink, Announcements, LatestProjects, QuickLinks, DynamicPortfolio, BenefitsOverview, ProjectStatus, ExperienceLog, WebPropertyBagEditor, NewProjectForm, RiskMatrix, DiceCalculator, ProjectStats, };
