import * as React from "react";
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import ICreationModalProps from "./ICreationModalProps";

/**
 * Creation Modal
 */
const CreationModal = (props: ICreationModalProps) => {
    return (
        <Modal
            isOpen={true}
            isBlocking={props.isBlocking}
            isDarkOverlay={props.isDarkOverlay}
            containerClassName="pp-modal pp-creationModal">
            <div className="pp-modal-inner">
                <div className="pp-creationModalHeader ms-font-xl">{props.title}</div>
                <ProgressIndicator
                    label={props.progressLabel}
                    description={props.progressDescription} />
            </div>
        </Modal>
    );
};

export default CreationModal;
