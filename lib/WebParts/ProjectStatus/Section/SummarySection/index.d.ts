/// <reference types="react" />
import ISummarySectionProps, { ISummarySectionStatusColumnsProps } from "./ISummarySectionProps";
export declare const SummarySectionStatusColumns: ({ sections }: ISummarySectionStatusColumnsProps) => JSX.Element;
declare const SummarySection: ({ title, titleUrl, sections, webUrl, style, propertiesLabel }: ISummarySectionProps) => JSX.Element;
export default SummarySection;
