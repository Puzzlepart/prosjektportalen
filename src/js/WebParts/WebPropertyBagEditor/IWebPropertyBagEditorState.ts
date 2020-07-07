import { IMessageBarProps } from 'office-ui-fabric-react/lib/MessageBar'
import { IBaseWebPartState } from '../@BaseWebPart'
import { ISettings } from '../../Settings'

export default interface IWebPropertyBagEditorState extends IBaseWebPartState {
    settings?: ISettings;
    options?: { [key: string]: string };
    isSaving?: boolean;
    statusMessage?: IMessageBarProps;
}
