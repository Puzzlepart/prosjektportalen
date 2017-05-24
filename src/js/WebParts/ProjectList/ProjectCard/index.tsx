import * as React from "react";
import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardLocation,
    DocumentCardActivity,
    DocumentCardActions,
    DocumentCardType,
} from "office-ui-fabric-react/lib/DocumentCard";
import { ImageFit } from "office-ui-fabric-react/lib/Image";
import * as Util from "../../../Util";
import IProjectCardProps from "./IProjectCardProps";


const ProjectCard = ({ project, className, tileWidth, tileImageHeight, onClickHref, showProjectInfo }: IProjectCardProps): JSX.Element => {
    const [ManagerEmail = "", ManagerName = __("String_NotSet")] = project.Manager.split(" | ");
    const [OwnerEmail = "", OwnerName = __("String_NotSet")] = project.Owner.split(" | ");
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
                    previewImageSrc: project.Logo,
                    imageFit: ImageFit.cover,
                    accentColor: Util.stringToColour(project.Phase),
                    width: tileWidth,
                    height: tileImageHeight,
                },
            ]} />
            <DocumentCardTitle
                title={project.Title}
                shouldTruncate={true} />
            <DocumentCardLocation location={project.Phase || __("String_NotSet")} />
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
                        iconProps: { iconName: "AlignCenter" },
                        onClick: (ev: any) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            showProjectInfo(ev);
                        },
                        label: "Vis prosjektinfo",
                        ariaLabel: "Vis prosjektinfo",
                    },
                    ]}
                views={project.Views}
            />
        </DocumentCard>
    );
};

export default ProjectCard;
