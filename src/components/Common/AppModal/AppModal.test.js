import React from "react";
import renderer from "react-test-renderer";
import AppModal from "src/components/Common/AppModal/AppModal";
it("ActiveMark renders correctly", () => {
    const tree = renderer.create(<AppModal>Modal</AppModal>).toJSON();
    expect(tree).toMatchSnapshot();
});
