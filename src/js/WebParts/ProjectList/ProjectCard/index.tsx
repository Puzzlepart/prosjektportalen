import * as React from "react";
import RESOURCE_MANAGER from "../../../Resources";
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

/**
 * Project Card
 * If no logo is set, it most likely means the project item is from ppv1. In that case we're rendering a history logo.
 *
 * @param {IProjectCardProps} param0 Props
 */
const ProjectCard = ({ project, fields, className, tileWidth, tileImageHeight, onClickHref, showProjectInfo }: IProjectCardProps): JSX.Element => {
    return (
        <DocumentCard
            className={className}
            type={DocumentCardType.normal}
            onClickHref={onClickHref}
        >
            <DocumentCardPreview previewImages={[
                {
                    previewImageSrc: project.Logo,
                    previewIconProps: project.Logo ? null : { iconName: "History",  styles: { root: {fontSize: 50, color: "rgb(51, 51, 51)", opacity: 0.5}}},
                    imageFit: ImageFit.cover,
                    accentColor: Util.stringToColour(project.Phase),
                    width: tileWidth,
                    height: tileImageHeight,
                },
            ]} />
            <DocumentCardTitle
                title={project.Title}
                shouldTruncate={true} />
            <DocumentCardLocation location={project.Phase || RESOURCE_MANAGER.getResource("String_NotSet")} />
            <DocumentCardActivity
                activity={fields["GtProjectOwner"]}
                people={[
                    {
                        name: project.getOwnerDetails().Name,
                        profileImageSrc: project.getOwnerDetails().Photo,
                    },
                ]}
            />
            <DocumentCardActivity
                activity={fields["GtProjectManager"]}
                people={[
                    {
                        name: project.getManagerDetails().Name,
                        profileImageSrc: project.getManagerDetails().Photo,
                    },
                ]}
            />
            <DocumentCardActions
                actions={
                    [{
                        iconProps: { iconName: "AlignCenter" },
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            showProjectInfo(e);
                        },
                    },
                    ]}
                views={project.Views}
            />
        </DocumentCard>
    );
};

export default ProjectCard;
