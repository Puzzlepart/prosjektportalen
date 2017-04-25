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

export const StatusFields = {
    GtStatusRisk: {
        Statuses: [
            {
                Value: "Lav",
                CssClass: "positive-status",
            },
            {
                Value: "Medium",
                CssClass: "neutral-status",
            },
            {
                Value: "Høy",
                CssClass: "negative-status",
            },
        ],
    },
    GtStatusBudget: {
        Statuses: [
            {
                Value: "Under budsjett",
                CssClass: "positive-status",
            },
            {
                Value: "På budsjett",
                CssClass: "neutral-status",
            },
            {
                Value: "Mindre overskridelser som kan tas igjen",
                CssClass: "neutral-status",
            },
            {
                Value: "Vet ikke",
                CssClass: "neutral-status",
            },
            {
                Value: "Over budsjett",
                CssClass: "negative-status",
            },
        ],
    },
    GtStatusTime: {
        Statuses: [
            {
                Value: "Foran plan",
                CssClass: "positive-status",
            },
            {
                Value: "På plan",
                CssClass: "neutral-status",
            },
            {
                Value: "Mindre forsinkelse som kan tas igjen",
                CssClass: "neutral-status",
            },
            {
                Value: "Forsinket",
                CssClass: "negative-status",
            },
        ],
    },
    GtStatusGainAchievement: {
        Statuses: [
            {
                Value: "Lav",
                CssClass: "negative-status",
            },
            {
                Value: "Medium",
                CssClass: "neutral-status",
            },
            {
                Value: "Høy",
                CssClass: "positive-status",
            },
        ],
    },
    GtStatusQuality: {
        Statuses: [
            {
                Value: "Lav",
                CssClass: "negative-status",
            },
            {
                Value: "Medium",
                CssClass: "neutral-status",
            },
            {
                Value: "Høy",
                CssClass: "positive-status",
            },
        ],
    },
};
