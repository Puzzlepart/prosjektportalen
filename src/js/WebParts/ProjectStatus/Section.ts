export interface ISection {
    Title: string;
    Icon: string;
}

export class Section implements ISection {
    public Title: string;
    public Icon: string;

    constructor(title: string, icon: string) {
        this.Title = title;
        this.Icon = icon;
    }
}