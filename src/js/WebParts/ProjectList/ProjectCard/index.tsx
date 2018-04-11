import * as React from "react";
import RESOURCE_MANAGER from "../../../Resources";
import { DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardLocation, DocumentCardActivity, DocumentCardActions, DocumentCardType } from "office-ui-fabric-react/lib/DocumentCard";
import { ImageFit } from "office-ui-fabric-react/lib/Image";
import * as Util from "../../../Util";
import IProjectCardProps from "./IProjectCardProps";

/**
 * Project Card
 *
 * @param {IProjectCardProps} props Props
 */
const ProjectCard = (props: IProjectCardProps): JSX.Element => {
    const fallbackIconProps = { iconName: "History", styles: { root: { fontSize: 50, color: "rgb(51, 51, 51)", opacity: 0.5 } } };
    const previewImage = {
        previewImageSrc: props.project.Logo,
        previewIconProps: props.project.Logo ? null : fallbackIconProps,
        imageFit: ImageFit.cover,
        accentColor: Util.stringToColour(props.project.Phase),
        width: props.tileWidth,
        height: props.tileImageHeight,
    };
    return (
        <DocumentCard
            className={props.className}
            type={DocumentCardType.normal}
            onClickHref={props.onClickHref} >
            <DocumentCardPreview previewImages={[previewImage]} />
            <DocumentCardTitle title={props.project.Title} shouldTruncate={false} />
            <DocumentCardLocation location={props.project.Phase || RESOURCE_MANAGER.getResource("String_NotSet")} />
            <DocumentCardActivity
                activity={props.fields["GtProjectOwner"]}
                people={[props.project.getOwner()]} />
            <DocumentCardActivity
                activity={props.fields["GtProjectManager"]}
                people={[props.project.getManager()]} />
            <DocumentCardActions
                actions={
                    [{
                        iconProps: { iconName: "AlignCenter" },
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            props.showProjectInfo(e);
                        },
                    },
                    ]}
                views={props.project.Views}
            />
        </DocumentCard>
    );
};

export default ProjectCard;
