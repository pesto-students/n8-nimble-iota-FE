import React from "react";
import renderer from "react-test-renderer";
import Landing from "src/components/Common/Landing";
it("Landing Page renders correctly", () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
});
