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
                Value: __("Choice_GtStatusRisk_Low"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusRisk_Medium"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusRisk_High"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusBudget: {
        Statuses: [
            {
                Value: __("Choice_GtStatusBudget_BelowBudget"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusBudget_OnBudget"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusBudget_SlighlyBehindBudget"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusBudget_UnknownBudget"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusBudget_OverBudget"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusTime: {
        Statuses: [
            {
                Value: __("Choice_GtStatusTime_AheadOfSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusTime_OnSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusTime_SmallDelay"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusTime_Delayed"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusGainAchievement: {
        Statuses: [
            {
                Value: __("Choice_GtStatusGainAchievement_AheadOfSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusGainAchievement_OnSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusGainAchievement_NotStarted"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusGainAchievement_MinorDelays"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusGainAchievement_BehindSchedule"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusQuality: {
        Statuses: [
            {
                Value: __("Choice_GtStatusQuality_LargeDeviation"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusQuality_SmallDeviation"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusQuality_AsExpected"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: __("Choice_GtStatusQuality_ExceedsExpectations"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
        ],
    },
};
