import IChecklistItem from "./IChecklistItem";

export default interface IChecklistData {
    stats: { [key: string]: number };
    items: IChecklistItem[];
}
