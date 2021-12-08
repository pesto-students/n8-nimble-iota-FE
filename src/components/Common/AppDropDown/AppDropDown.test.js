import React from "react";
import renderer from "react-test-renderer";
import AppDropDown from "src/components/Common/AppDropDown/AppDropDown";
it("ActiveMark renders correctly", () => {
    const tree = renderer.create(<AppDropDown />).toJSON();
    expect(tree).toMatchSnapshot();
});
