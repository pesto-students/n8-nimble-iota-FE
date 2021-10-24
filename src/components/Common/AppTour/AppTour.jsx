import React, { useContext } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Tour from "reactour";
import AppTourContext from "src/contexts/AppTourContext";
import PropTypes from "prop-types";


function AppTour(props) {
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);
  const { steps } = props;
  const TourContext = useContext(AppTourContext);
  return (
    <Tour
      steps={steps}
      isOpen={TourContext.isTourOpen}
      onRequestClose={() => TourContext.setIsTourOpen(false)}
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      disableInteraction={true}
    />
  );
}

AppTour.propTypes = {
  steps: PropTypes.object
};
export default AppTour;
