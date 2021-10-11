export const generateTicketNumber = () => {
    let d1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let d2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let num = Math.floor(1000 + Math.random() * 9000);

    return d1.concat("", d2).concat("", num.toString());
};
export const extractInitials = (/**@type{String} */ name) => {
    const tokenizedName = name.split(" ");
    const firstName = tokenizedName[0];
    const lastName = tokenizedName[tokenizedName.length - 1];
    const initials = firstName[0] + lastName[0];
    return initials;
};

export const getDateFromString = (dateString) => new Date(dateString).toLocaleDateString();

export const filterTicketList = (ticketList, columnId) => {
    return ticketList.filter((ticket) => ticket.status == columnId);
};

export const generatePieChartData = (ticketList, developerList) => {
    console.log("test", ticketList, developerList);
    const map = {};
    ticketList.forEach((ticket) => {
        const assignee = getAssigneeName(ticket, developerList);
        if (map[assignee]) {
            map[assignee] = map[assignee] + 1;
        } else {
            map[assignee] = 1;
        }
    });
    return map;
};

export const getAssigneeName = (ticket, userList) => {
    return userList.find((user) => user["_id"] == ticket.assignee).name;
};

export const generatePointsVsDate = (reportData) => {
    const map = {};
    Object.keys(reportData).forEach((date) => {
        map[date] = sumListOfObjectsBasisStoryPoints(reportData[date]);
    });
    return map;
};

export const generateIssuesVsDate = (reportData) => {
    const map = {};
    Object.keys(reportData).forEach((date) => {
        map[date] = reportData[date].length;
    });
    return map;
};

export const sumListOfObjectsBasisStoryPoints = (list) => {
    let sum = 0;
    list.forEach((obj) => {
        sum = sum + obj.storyPoints;
    });
    return sum;
};

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}
