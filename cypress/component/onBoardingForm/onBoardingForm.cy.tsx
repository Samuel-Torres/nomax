import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";

describe("<HomePageHero />", () => {
  beforeEach(() => {
    cy.dynamicMount(<OnBoardingForm />, true, true);
  });

  it("component renders & displays OnBoarding Header", () => {});
});
