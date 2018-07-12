import { IBaseWebPartState } from "../@BaseWebPart";
import DeliveryElement from "./DeliveryElement";

export default interface IDeliveriesOverviewState extends IBaseWebPartState {
    items?: DeliveryElement[];
}
