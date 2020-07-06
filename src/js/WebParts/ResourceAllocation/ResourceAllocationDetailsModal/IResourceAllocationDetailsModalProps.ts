import { IModalProps } from 'office-ui-fabric-react/lib/Modal'
import { ProjectResourceAllocation } from '../ResourceAllocationModels'

export default interface IResourceAllocationDetailsModalProps extends IModalProps {
    allocation?: ProjectResourceAllocation;
}
