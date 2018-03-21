import * as React from "react";
import { LogLevel, Logger } from "sp-pnp-js";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import IChartCreationModalProps from "./IChartCreationModalProps";
import IChartCreationModalState from "./IChartCreationModalState";

const LOG_TEMPLATE = "(ChartCreationModal) {0}: {1}";

export default class ChartCreationModal extends React.Component<IChartCreationModalProps, IChartCreationModalState> {
    /**
     * Constructor
     *
     * @param {IChartCreationModalProps} props Props
     */
    constructor(props: IChartCreationModalProps) {
        super(props);
        Logger.log({
            message: String.format(LOG_TEMPLATE, "Constructor", "Initializing component <ChartCreationModal />."),
            data: { props },
            level: LogLevel.Info,
        });
        this._onModelChanged = this._onModelChanged.bind(this);
    }

    /**
     * Renders the <ChartCreationModal /> component
     */
    public render(): React.ReactElement<IChartCreationModalProps> {
        return (
            <Modal
                isOpen={true}
                containerClassName="pp-modal"
                onDismiss={this.props.onDismiss}>
                <div className="pp-modal-inner">
                    <div className="ms-font-xl">Opprett ny graf</div>
                    <div>
                        <TextField
                            placeholder="Rekkefølge"
                            defaultValue="100"
                            onChanged={value => this._onModelChanged("GtChOrder", value)} />
                        <TextField
                            placeholder="Tittel"
                            onChanged={value => this._onModelChanged("Title", value)} />
                        <TextField placeholder="Undertekst" />
                        <Dropdown
                            placeHolder="Graftype"
                            options={[
                                { key: "bar", text: "Bar" },
                                { key: "column", text: "Column" },
                                { key: "pie", text: "Pie" },
                            ]}
                            onChanged={opt => this._onModelChanged("GtChOrder", opt.key)} />
                        <Dropdown
                            placeHolder="Stabling"
                            options={[
                                { key: "normal", text: "Normal" },
                                { key: "percent", text: "Prosent" },
                            ]}
                            onChanged={opt => this._onModelChanged("PzlChStacking", opt.key)} />
                        <TextField placeholder="Tittel (Y-akse)" />
                        <TextField placeholder="Min (Y-akse)" />
                        <TextField placeholder="Max (Y-akse)" />
                        <TextField placeholder="Intervall (Y-akse)" />
                        <TextField placeholder="Verdisuffiks" />
                        <Toggle label="Vis merkelapp" />
                        <Toggle label="Vis gjennomsnitt" />
                        <Toggle label="Vis elementvelger" />
                        <DefaultButton
                            text="Opprett"
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            style={{ margin: 0 }} />
                    </div>
                </div>
            </Modal>
        );
    }

    private _onModelChanged(propertyName: string, value: string | number) {
        console.log(propertyName, value);
    }
}

export {
    IChartCreationModalProps,
    IChartCreationModalState,
};

