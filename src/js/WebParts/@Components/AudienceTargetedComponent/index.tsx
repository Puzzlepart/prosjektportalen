import * as React from "react";
import * as Util from "../../../Util";
import AudienceTargeting from "../../AudienceTargeting";
import IAudienceTargetedComponentProps from "./IAudienceTargetedComponentProps";
import IAudienceTargetedComponentState from "./IAudienceTargetedComponentState";

export default class AudienceTargetedComponent<P extends IAudienceTargetedComponentProps, S extends IAudienceTargetedComponentState> extends React.PureComponent<P, S> {
    /**
     * Constructor
     */
    constructor(props: P) {
        super(props);
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        if (this.props.audienceTargeting === AudienceTargeting.None) {
            this.setState({
                shouldRender: true,
            });
        } else {
            Util.doesUserMatchAudience(this.props.audienceTargeting).then(userMatchAudience => {
                if (userMatchAudience !== this.state.shouldRender) {
                    this.setState({
                        shouldRender: userMatchAudience,
                    });
                }
            });
        }
    }
}
