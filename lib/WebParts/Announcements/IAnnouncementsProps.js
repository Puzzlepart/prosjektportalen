"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsDefaultProps = {
    itemsCount: 5,
    itemsFilter: `Expires ge datetime'${new Date().toISOString()}'`,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    listClassName: "pp-simpleList spacing-s",
    modalContainerClassName: "pp-announcementsModalContainer",
    modalHeaderClassName: "ms-font-xxl",
    modalBodyClassName: "ms-font-l",
};
