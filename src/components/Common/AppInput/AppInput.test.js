import React from "react";
import renderer from "react-test-renderer";
import AppInput from "src/components/Common/AppInput/AppInput";
it("ActiveMark renders correctly", () => {
    const tree = renderer.create(<AppInput />).toJSON();
    expect(tree).toMatchSnapshot();
});
