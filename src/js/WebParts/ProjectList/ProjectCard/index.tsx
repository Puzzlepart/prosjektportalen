import * as React from "react";
import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardActivity,
    DocumentCardActions,
    DocumentCardLocation,
    DocumentCardType,
    ImageFit,
} from "office-ui-fabric-react";
import * as Util from "../../../Util";
import IProjectCardProps from "./IProjectCardProps";


const ProjectCard = ({ project, className, tileWidth, tileImageHeight, onClickHref, showProjectInfo }: IProjectCardProps): JSX.Element => {
    const [ManagerEmail = "", ManagerName = __("String_NotSet")] = project.GtProjectManagerOWSUSER.split(" | ");
    const [OwnerEmail = "", OwnerName = __("String_NotSet")] = project.GtProjectOwnerOWSUSER.split(" | ");
    const ManagerUserPhoto = Util.userPhoto(ManagerEmail);
    const OwnerUserPhoto = Util.userPhoto(OwnerEmail);
    return (
        <DocumentCard
            className={className}
            type={DocumentCardType.normal}
            onClickHref={onClickHref}
        >
            <DocumentCardPreview previewImages={[
                {
                    previewImageSrc: project.SiteLogo,
                    imageFit: ImageFit.cover,
                    accentColor: Util.stringToColour(project.RefinableString52),
                    width: tileWidth,
                    height: tileImageHeight,
                },
            ]} />
            <DocumentCardTitle
                title={project.Title}
                shouldTruncate={true} />
            <DocumentCardLocation
                location={project.RefinableString52 || __("String_NotSet")} />
            <DocumentCardActivity
                activity={__("SiteFields_GtProjectOwner_DisplayName")}
                people={[
                    {
                        name: OwnerName,
                        profileImageSrc: OwnerUserPhoto,
                    },
                ]}
            />
            <DocumentCardActivity
                activity={__("SiteFields_GtProjectManager_DisplayName")}
                people={[
                    {
                        name: ManagerName,
                        profileImageSrc: ManagerUserPhoto,
                    },
                ]}
            />
            <DocumentCardActions
                actions={
                    [{
                        icon: "AlignCenter",
                        onClick: (ev: any) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            showProjectInfo(ev);
                        },
                        label: "Vis prosjektinfo",
                        ariaLabel: "Vis prosjektinfo",
                    },
                    ]}
                views={project.ViewsLifeTime}
            />
        </DocumentCard>
    );
};

export default ProjectCard;
