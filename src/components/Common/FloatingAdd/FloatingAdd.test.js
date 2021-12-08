import React from "react";
import renderer from "react-test-renderer";
import FloatingAdd from "src/components/Common/FloatingAdd/FloatingAdd";
it("FloatingAdd disabled renders correctly", () => {
    const tree = renderer.create(<FloatingAdd loading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});
it("FloatingAdd renders correctly", () => {
    const tree = renderer.create(<FloatingAdd loading={false} />).toJSON();
    expect(tree).toMatchSnapshot();
});
