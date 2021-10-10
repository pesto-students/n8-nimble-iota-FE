import React from "react";
import renderer from "react-test-renderer";
import ActiveMark from "src/components/Common/ActiveMark/ActiveMark";
it("ActiveMark renders correctly", () => {
    const tree = renderer.create(<ActiveMark />).toJSON();
    expect(tree).toMatchSnapshot();
});
