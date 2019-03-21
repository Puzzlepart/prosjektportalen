/// <reference types="react" />
import { IModalProps } from "office-ui-fabric-react/lib/Modal";
/**
 * For reasoning behind override, see https://github.com/OfficeDev/office-ui-fabric-react/issues/7874
 *
 */
declare module "office-ui-fabric-react/lib/Modal" {
    const Modal: React.StatelessComponent<IModalProps>;
}
