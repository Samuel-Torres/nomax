import OnBoardingForm from "@/components/onBoardingForm/onBoardingForm";

describe("<HomePageHero />", () => {
  beforeEach(() => {
    cy.componentWithRouterMount(<OnBoardingForm />);
  });
  it("component renders & displays OnBoarding Header", () => {});
});
