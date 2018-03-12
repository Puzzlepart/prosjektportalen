import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export interface ITrendIconProps {
    latestVal: number;
    latestPercentage: number;
    prevVal: number;
    shouldIncrease: boolean;
}

/**
 * TrendIcon
 */
const TrendIcon = (props: ITrendIconProps): JSX.Element => {
    if (props.prevVal !== undefined && props.prevVal !== null) {
        if (props.prevVal !== props.latestVal) {
            if (props.shouldIncrease && (props.prevVal > props.latestVal)) {
                if (props.latestPercentage >= 100) {
                    return (
                        <span>
                            <Icon iconName="StockDown" style={{ color: "red" }} />
                            <Icon iconName="Trophy" style={{ color: "gold" }} />
                        </span>
                    );
                }
                return (
                    <span>
                        <Icon iconName="StockDown" style={{ color: "red" }} />
                    </span>
                );
            }
            if (!props.shouldIncrease && (props.latestVal > props.prevVal)) {
                if (props.latestPercentage >= 100) {
                    return (
                        <span>
                            <Icon iconName="StockDown" style={{ color: "red" }} />
                            <Icon iconName="Trophy" style={{ color: "gold" }} />
                        </span>
                    );
                }
                return (
                    <span>
                        <Icon iconName="StockDown" style={{ color: "red" }} />
                    </span>
                );
            } else {
                if (props.latestPercentage >= 100) {
                    return (
                        <span>
                            <Icon iconName="StockUp" style={{ color: "green" }} />
                            <Icon iconName="Trophy" style={{ color: "gold" }} />
                        </span>
                    );
                }
                return (
                    <span>
                        <Icon iconName="StockUp" style={{ color: "green" }} />
                    </span>
                );
            }
        }
    } else if (props.latestPercentage >= 100) {
        return (
            <span>
                <Icon iconName="Trophy" style={{ color: "gold" }} />
            </span>
        );
    }
    return null;
};

export default TrendIcon;
