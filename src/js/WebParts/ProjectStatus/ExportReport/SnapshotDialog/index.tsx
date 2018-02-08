import * as React from "react";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import ISnapshotDialogProps from "./ISnapshotDialogProps";

const SnapshotDialog = (props: ISnapshotDialogProps) => {
    const fileExtension = props.report.FileLeafRef.split(".").pop().toLowerCase();
    return (
        <Dialog
            isOpen={true}
            type={DialogType.close}
            onDismiss={props.onDismiss}
            isBlocking={false}
            title={props.report.Title}
            containerClassName="pp-snapshot-dialog">
            <div id="snapshot-container">
                {fileExtension === "pdf"
                    ? <embed width="850" height="750" src={props.report.EncodedAbsUrl} type="application/pdf"></embed>
                    : <img src={props.report.EncodedAbsUrl}></img>
                }
            </div>
        </Dialog>
    );
};

export default SnapshotDialog;
