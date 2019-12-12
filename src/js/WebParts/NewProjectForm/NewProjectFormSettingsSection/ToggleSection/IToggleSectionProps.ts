export default  interface IToggleSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    headerClassName?: string;
    options: any[];
    optLabelProp: string;
    optDefaultCheckedProp: string;
    onChanged: (opt: any, checked: boolean) => void;
    selected?: number[];
}
