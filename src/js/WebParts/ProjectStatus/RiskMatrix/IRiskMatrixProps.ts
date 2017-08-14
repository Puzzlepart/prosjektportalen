export default interface IRiskMatrixProps {
    viewQuery: string;
    listTitle?: string;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    viewQuery: "",
    listTitle: "Usikkerhet",
};
