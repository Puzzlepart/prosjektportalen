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

/**
 * Project Card
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
                    imageFit: ImageFit.cover,
                    accentColor: Util.stringToColour(project.Phase),
                    width: tileWidth,
                    height: tileImageHeight,
                },
            ]} />
            <DocumentCardTitle
                title={project.Title}
                shouldTruncate={true} />
            <DocumentCardLocation location={project.Phase || Localization.getResource("String_NotSet")} />
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
