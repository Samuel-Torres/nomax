declare namespace Cypress {
  interface Chainable<Subject = any> {
    nextImgFix(): Chainable<Subject>;
    dynamicMount(
      component: React.ReactNode,
      isUseRouterNeeded: boolean,
      isUseSessionNeeded: boolean
    ): Chainable<void>;
  }
}
