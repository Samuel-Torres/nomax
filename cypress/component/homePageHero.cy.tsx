import React from "react";
import HomePageHero from "../../src/components/homePageHero/homePageHero";

describe("<HomePageHero />", () => {
  beforeEach(() => {
    cy.nextImgFix();
  });

  it("it renders & displays all images on the screen", () => {
    cy.fixture("homePageHero/homePageHero.json").then((homePageHeroData) => {
      cy.mount(<HomePageHero {...homePageHeroData} />);

      cy.get<HTMLImageElement>("[data-test=heroImg]")
        .should("be.visible")
        .should(([img]) => {
          expect(img.naturalWidth).to.equal(1080);
        });

      cy.get<HTMLImageElement>("[data-test=iconImg]")
        .should((el) => {
          expect(el).to.have.length(3);
        })
        .should(([images]) => {
          [images].forEach((img) => expect(img.naturalWidth).to.equal(512));
        });
    });
  });

  it("Hero header text is rendering correctly", () => {
    cy.fixture("homePageHero/homePageHero.json").then((homePageHeroData) => {
      cy.mount(<HomePageHero {...homePageHeroData} />);

      cy.get<HTMLHeadingElement>("[data-test=header]").then((header) =>
        expect(header.text()).to.equal(homePageHeroData.header)
      );
    });
  });

  it("Hero icon card texts are rendering correctly", () => {
    cy.fixture("homePageHero/homePageHero.json").then((homePageHeroData) => {
      cy.mount(<HomePageHero {...homePageHeroData} />);

      cy.get<HTMLHeadingElement>("[data-test=iconCardText]").should(
        (textElement) => {
          expect(textElement[0].textContent).to.equal(
            homePageHeroData.icons[0].text
          );
          expect(textElement[1].textContent).to.equal(
            homePageHeroData.icons[1].text
          );
          expect(textElement[2].textContent).to.equal(
            homePageHeroData.icons[2].text
          );
        }
      );
    });
  });
});
