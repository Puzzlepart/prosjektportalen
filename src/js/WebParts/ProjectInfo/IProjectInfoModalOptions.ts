import * as React from "react";
import { IModalProps } from "office-ui-fabric-react/lib/Modal";


interface IProjectInfoModalOptions extends IModalProps {
    headerClassName?: string;
    headerStyle?: React.CSSProperties;
    title?: string;
}

export default IProjectInfoModalOptions;
