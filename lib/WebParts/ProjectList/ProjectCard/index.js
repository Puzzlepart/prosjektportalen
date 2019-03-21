"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../Resources");
const DocumentCard_1 = require("office-ui-fabric-react/lib/DocumentCard");
const Image_1 = require("office-ui-fabric-react/lib/Image");
const Util = require("../../../Util");
/**
 * Project Card
 *
 * @param {IProjectCardProps} props Props
 */
const ProjectCard = (props) => {
    const fallbackIconProps = { iconName: "History", styles: { root: { fontSize: 50, color: "rgb(51, 51, 51)", opacity: 0.5 } } };
    const previewImage = {
        previewImageSrc: props.project.Logo,
        previewIconProps: props.project.Logo ? null : fallbackIconProps,
        imageFit: Image_1.ImageFit.contain,
        accentColor: Util.stringToColour(props.project.Phase),
        width: props.tileWidth,
        height: props.tileImageHeight,
    };
    return (React.createElement(DocumentCard_1.DocumentCard, { className: props.className, type: DocumentCard_1.DocumentCardType.normal, onClickHref: props.onClickHref },
        React.createElement(DocumentCard_1.DocumentCardPreview, { previewImages: [previewImage] }),
        React.createElement(DocumentCard_1.DocumentCardTitle, { title: props.project.Title, shouldTruncate: false }),
        React.createElement(DocumentCard_1.DocumentCardLocation, { location: props.project.Phase || Resources_1.default.getResource("String_NotSet") }),
        React.createElement(DocumentCard_1.DocumentCardActivity, { activity: props.fields["GtProjectOwner"], people: [props.project.getOwner()] }),
        React.createElement(DocumentCard_1.DocumentCardActivity, { activity: props.fields["GtProjectManager"], people: [props.project.getManager()] }),
        React.createElement(DocumentCard_1.DocumentCardActions, { actions: [{
                    iconProps: { iconName: "AlignCenter" },
                    onClick: e => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.showProjectInfo(e);
                    },
                },
            ] })));
};
exports.default = ProjectCard;
