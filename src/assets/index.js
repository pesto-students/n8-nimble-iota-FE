const assetURI = {
    LandingFeatures: "LandingFeatures.svg?alt=media&token=10c931cb-a373-4e15-98da-97a6e4497e7b",
    LandingMain: "LandingMain.svg?alt=media&token=94855d3c-4a7f-49f9-8a4c-653582daa65a",
    LandingPricing: "LandingPricing.svg?alt=media&token=9b9913f4-7554-45ea-ad17-4c5c5a87e86d",
    Logo: "Logo.svg?alt=media&token=d3c564b8-651c-4f6e-9273-a662a92aad0c",
    roundlogo: "roundlogo.svg?alt=media&token=d158cff0-ebe7-4c37-9ed5-07ff6dcb4918",
};
const assetMap = (imageRefName) => {
    // eslint-disable-next-line no-undef
    return process.env.REACT_APP_ASSETS_URL + assetURI[imageRefName];
};
export default assetMap;
