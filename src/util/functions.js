export const extractInitials = (/**@type{String} */ name) => {
    const tokenizedName = name.split(" ");
    const firstName = tokenizedName[0];
    const lastName = tokenizedName[tokenizedName.length - 1];
    const initials = firstName[0] + lastName[0];
    return initials;
};
