declare namespace Cypress {
  interface Chainable<Subject = any> {
    nextImgFix(): Chainable<Subject>;
    componentWithRouterMount(component: React.ReactNode): Chainable<void>;
  }
}
