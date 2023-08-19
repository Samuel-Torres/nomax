import React from "react";
import HomePageHero from "../../src/components/homePageHero/homePageHero";

describe("<HomePageHero />", () => {
  it("Home Page Hero Renders", () => {
    cy.fixture("homePageHero/homePageHero.json").then((homePageHeroData) => {
      // cy.intercept(homePageHeroData.heroImage, {
      //   fixture:
      //     "https://res.cloudinary.com/dvz91qyth/image/upload/v1689879602/Nomex/landing%20page%20assets/homePageHero/My_project-1_3_pt78yu.png",
      // }).as("heroImageRequest");

      // console.log("THE DATA: ", homePageHeroData);
      cy.mount(<HomePageHero {...homePageHeroData} />);
      // cy.wait("@heroImageRequest");
    });
  });
});
