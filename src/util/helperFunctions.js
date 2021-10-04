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
