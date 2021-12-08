import React from "react";
import renderer from "react-test-renderer";
import AppButton from "src/components/Common/AppButton/AppButton";
it("ActiveMark renders correctly", () => {
    const tree = renderer.create(<AppButton>Button</AppButton>).toJSON();
    expect(tree).toMatchSnapshot();
});
