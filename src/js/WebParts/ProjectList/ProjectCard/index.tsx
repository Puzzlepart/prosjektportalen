import * as React from "react";
import __ from "../../../Resources";
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
    const previewImage = {
        previewImageSrc: props.project.Logo,
        imageFit: ImageFit.contain,
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
            <DocumentCardLocation location={props.project.Phase || __.getResource("String_NotSet")} />
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
