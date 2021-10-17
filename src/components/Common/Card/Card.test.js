import React from "react";
import renderer from "react-test-renderer";
import CardCustom from "src/components/Common/Card/Card";
it("Card renders correctly", () => {
    const tree = renderer
        .create(
            <CardCustom>
                <div>Hi</div>
            </CardCustom>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
