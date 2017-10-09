import RESOURCE_MANAGER from "localization";

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
