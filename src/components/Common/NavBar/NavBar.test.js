import React from "react";
import renderer from "react-test-renderer";
import NavBar from "src/components/Common/NavBar/NavBar";
it("NavBar renders correctly", () => {
    const tree = renderer
        .create(<NavBar onLogin={() => {}} onLogout={() => {}} onProfileClick={() => {}} onRegister={() => {}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
