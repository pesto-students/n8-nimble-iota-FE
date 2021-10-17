import { SprintStatusEnum } from "src/config/Enums.ts";
import { TicketStatusEnum } from "src/config/Enums.ts";

export const transformEnum = (enumObject) => {
    // This function converts enum to array of Objects. Eg [HIGH,MEDIUM] ----> [{_id:0,name: HIGH},{_id:1,name: MEDIUM}]
    const enunValues = Object.values(enumObject);
    return enunValues.map((e, index) => {
        return { _id: index, name: e };
    });
};

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

export const equalsIgnoreCase = (str1, str2) => {
    return str1.toLowerCase() === str2.toLowerCase();
};

export const filterBacklogTickets = (ticketList) => {
    return ticketList.length > 0
        ? ticketList.filter(
              (ticket) =>
                  ticket.status !== TicketStatusEnum.TODO &&
                  ticket.status !== TicketStatusEnum.INPROGRESS &&
                  ticket.status !== TicketStatusEnum.COMPLETE
          )
        : [];
};

export const filterScrumboardTickets = (ticketList, sprintId, columnId) => {
    console.log(sprintId);
    return ticketList.length > 0
        ? ticketList.filter(
              (ticket) =>
                  ticket.sprint == sprintId &&
                  ticket.status == columnId &&
                  (ticket.status === TicketStatusEnum.TODO ||
                      ticket.status === TicketStatusEnum.INPROGRESS ||
                      ticket.status === TicketStatusEnum.COMPLETE)
          )
        : [];
};

export const checkEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

export const getProjectFromProjectList = (projectList, projectId) => {
    if (projectList && projectList.length > 0 && projectId) {
        return projectList.find((project) => project._id === projectId);
    }
    return undefined;
};
export const getSprints = (projectList, projectId) => {
    //This method only returns active and upcoming sprints
    const project = getProjectFromProjectList(projectList, projectId);
    if (project) {
        const sprints = project.sprints;
        if (sprints.length > 0) {
            return sprints.filter((sprint) => sprint.status !== SprintStatusEnum.COMPLETED);
        }
    }
    return [];
};
