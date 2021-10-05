const { extractInitials } = require("src/util/helperFunctions");

describe("Utils functions tests", () => {
    it("should return initials", () => {
        expect(extractInitials("Sourav Disco Panda")).toBe("SP");
    });
    it("should return inital of first name in case single word is provided", () => {
        expect(extractInitials("Jyoti")).toBe("JJ");
    });
});
