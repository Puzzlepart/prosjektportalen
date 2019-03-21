import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";
export default interface IWebPropertyBagEditorProps extends IBaseWebPartProps {
    columns?: IColumn[];
}
export declare const WebPropertyBagEditorDefaultProps: Partial<IWebPropertyBagEditorProps>;
