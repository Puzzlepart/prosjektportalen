import RESOURCE_MANAGER from "localization";

export const RiskMatrix: any = [
    [
        {
            Value: "",
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Insignificant"),
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Small"),
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Moderate"),
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Serious"),
            Type: "Header",
            ClassName: "risk-header",
        },
        {
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Critical"),
            Type: "Header",
            ClassName: "risk-header",
        },
    ],
    [
        {
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_VeryHigh"),
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
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_High"),
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
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Medium"),
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
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_Low"),
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
            Value: RESOURCE_MANAGER.getResource("RiskMatrix_Header_VeryLow"),
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
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusRisk_Low"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusRisk_Medium"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusRisk_High"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusBudget: {
        Statuses: [
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusBudget_BelowBudget"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusBudget_OnBudget"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusBudget_SlighlyBehindBudget"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusBudget_UnknownBudget"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusBudget_OverBudget"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusTime: {
        Statuses: [
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusTime_AheadOfSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusTime_OnSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusTime_SmallDelay"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusTime_Delayed"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusGainAchievement: {
        Statuses: [
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusGainAchievement_AheadOfSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusGainAchievement_OnSchedule"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusGainAchievement_NotStarted"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusGainAchievement_MinorDelays"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusGainAchievement_BehindSchedule"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
        ],
    },
    GtStatusQuality: {
        Statuses: [
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusQuality_LargeDeviation"),
                CssClass: "negative-status",
                Color: "#ea5c73",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusQuality_SmallDeviation"),
                CssClass: "neutral-status",
                Color: "#e9b359",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusQuality_AsExpected"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
            {
                Value: RESOURCE_MANAGER.getResource("Choice_GtStatusQuality_ExceedsExpectations"),
                CssClass: "positive-status",
                Color: "#2da748",
                Icon: "CircleFill",
            },
        ],
    },
};
