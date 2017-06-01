export const RiskMatrix: any = [
    [
        {
            Value: "",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "Ubetydelig",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "Liten",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "Moderat",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "Alvorlig",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "Kritisk",
            Type: "Header",
            ClassName: "risk-header",
        },
    ],
    [
        {
            Value: "Svært høy",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 1,
            Probability: 5,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 2,
            Probability: 5,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 3,
            Probability: 5,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 4,
            Probability: 5,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 5,
            Probability: 5,
        },
    ],
    [
        {
            Value: "Høy",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 1,
            Probability: 4,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 2,
            Probability: 4,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 3,
            Probability: 4,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 4,
            Probability: 4,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 5,
            Probability: 4,
        },
    ],
    [
        {
            Value: "Middels",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 1,
            Probability: 3,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 2,
            Probability: 3,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 3,
            Probability: 3,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 4,
            Probability: 3,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "negative-cell",
            Consequence: 5,
            Probability: 3,
        },
    ],
    [
        {
            Value: "Lav",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 1,
            Probability: 2,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 2,
            Probability: 2,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 3,
            Probability: 2,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 4,
            Probability: 2,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 5,
            Probability: 2,
        },
    ],
    [
        {
            Value: "Svært lav",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 1,
            Probability: 1,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 2,
            Probability: 1,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 3,
            Probability: 1,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "positive-cell",
            Consequence: 4,
            Probability: 1,
        },
        {
            Value: "",
            Type: "Cell",
            ClassName: "neutral-cell",
            Consequence: 5,
            Probability: 1,
        },
    ],
];

export interface IStatusProperties {
    Value: string;
    CssClass: string;
    Color: string;
    Icon: any;
}

export interface IStatusFields {
    [key: string]: {
        Statuses: IStatusProperties[],
    };
}

export const StatusFields: IStatusFields = {
    GtStatusRisk: {
        Statuses: [
            {
                Value: "Lav",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: "Medium",
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: "Høy",
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusBudget: {
        Statuses: [
            {
                Value: "Under budsjett",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: "På budsjett",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: "Mindre overskridelser",
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: "Vet ikke",
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: "Over budsjett",
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusTime: {
        Statuses: [
            {
                Value: "Foran plan",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: "På plan",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: "Mindre forsinkelser",
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: "Forsinket",
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusGainAchievement: {
        Statuses: [
            {
                Value: "Lav",
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
            {
                Value: "Medium",
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: "Høy",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusQuality: {
        Statuses: [
            {
                Value: "Større avvik fra spesifikasjon",
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
            {
                Value: "Mindre avvik fra spesifikasjon",
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: "Ihht. spesifikasjon",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: "Bedre enn spesifikasjon",
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
        ],
    },
};
