export default interface IRiskMatrixProps {
    viewQuery: string;
    listTitle?: string;
    postAction: boolean;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    viewQuery: "",
    listTitle: "Usikkerhet",
    postAction: false,
};
