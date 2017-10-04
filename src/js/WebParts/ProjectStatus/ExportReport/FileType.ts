export enum FileType {
    png,
    pdf,
}

export interface IFileTypeButton {
    save: string;
    isSaved: string;
    saving: string;
    icon?: string;
}
