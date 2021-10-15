const priority = [
    {name: "HIGH",_id: 1},
    {name : "MEDIUM",_id: 2},
    {name : "LOW",_id: 3}
];

const ticketType = [
    {name: "USER_STORY",_id: 1},
    {name: "BUG",_id: 2}
];
const sprints = [
    {name:"SPRINT_1",_id: 1},
    {name: "SPRINT_2",_id: 2},
    {name : "SPRINT_3",_id: 3}
];

const ticketStatus = [
    {name:"TODO",_id: 1},
    {name: "INPROGRESS",_id: 2},
    {name : "COMPLETE",_id: 3},
    {name:"BACKLOG",_id: 4},
    {name:"POKER",_id: 4},
   
]

const ticketStatusEnum = [
    {name:"TODO",_id: 1},
    {name: "INPROGRESS",_id: 2},
    {name : "COMPLETE",_id: 3},
    {name:"BACKLOG",_id: 4},
    {name:"POKER",_id: 4},
   
]


const ticketConstants = {
    priority : priority,
    ticketType : ticketType,
    sprints: sprints,
    ticketStatus : ticketStatus
};



export default ticketConstants;