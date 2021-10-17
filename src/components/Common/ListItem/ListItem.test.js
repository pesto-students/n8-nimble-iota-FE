import React from "react";
import renderer from "react-test-renderer";
import ListItem from "src/components/Common/ListItem/ListItem";
it("ListItem renders correctly", () => {
    const tree = renderer.create(<ListItem label="label" fullWidth={false} Component={"Hi"} />).toJSON();
    expect(tree).toMatchSnapshot();
});
