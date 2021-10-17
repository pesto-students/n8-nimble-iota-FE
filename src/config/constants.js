export const colors = {
    tagRed: "#CC2E2E",
    tagBlue: "#111C56",
    ticketBorderRed: "#CC2E2E",
    ticketBorderGreen: "#4C9F5A",
    ticketBorderOrange: "#C37500",
    blackText: "#081F32",
    priorityHigh: "#CC2E2E",
    priorityMedium: "#C37500",
    priorityLow: "#3FAD4A",
    dragEventBackground: "#ebe7f9",
    droppableColumnBackground: "#F4F4F4",
};

export const fireStoreKeys = {
    positive: "positive",
    negative: "negative",
    neutral: "neutral",
    actions: "actions",
    collections: {
        retrospectives: "retrospectives",
    },
};

export const retroTypes = [
    {_id:1,name:"positive"},
    {_id:2,name:"negative"},
    {_id:3,name:"neutral"},
    {_id:4,name:"actions"}
]

export const sprintStatus = {
    closed: "closed",
    active: "active",
    upcoming: "upcoming",
};
