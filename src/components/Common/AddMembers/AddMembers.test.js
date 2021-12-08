import React from "react";
import renderer from "react-test-renderer";
import AddMembers from "src/components/Common/AddMembers/AddMembers";
it("AddMembers renders correctly", () => {
    const tree = renderer.create(<AddMembers projectId="projectid" />).toJSON();
    expect(tree).toMatchSnapshot();
});
