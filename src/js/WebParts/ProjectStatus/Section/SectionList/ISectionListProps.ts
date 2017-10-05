import ISectionListData from "../ISectionListData";

export default interface ISectionListProps extends React.HTMLAttributes<HTMLElement> {
    listData?: ISectionListData;
}
