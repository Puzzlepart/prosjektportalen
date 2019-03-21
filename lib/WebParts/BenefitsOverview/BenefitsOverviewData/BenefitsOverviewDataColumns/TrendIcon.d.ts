/// <reference types="react" />
export interface ITrendIconProps {
    latestVal: number;
    latestPercentage: number;
    prevVal: number;
    shouldIncrease: boolean;
}
/**
 * TrendIcon
 */
declare const TrendIcon: (props: ITrendIconProps) => JSX.Element;
export default TrendIcon;
