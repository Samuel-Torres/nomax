import React from "react";
import HomePageHero from "../../src/components/homePageHero/homePageHero";

describe("<HomePageHero />", () => {
  beforeEach(() => {
    cy.nextImgFix();
  });
  it("Home Page Hero Renders", () => {
    cy.fixture("homePageHero/homePageHero.json").then((homePageHeroData) => {
      console.log("DATA: ", homePageHeroData);
      cy.mount(<HomePageHero {...homePageHeroData} />);
    });

    const image = cy.get("[data-test=heroImg]").should("be.visible");
    console.log("THE IMAGE: ", image);
  });
});
