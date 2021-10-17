import React from "react";
import renderer from "react-test-renderer";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
it("Customtag renders correctly", () => {
    const tree = renderer.create(<CustomTag color="red" text="text" variant="outlined" />).toJSON();
    expect(tree).toMatchSnapshot();
});
