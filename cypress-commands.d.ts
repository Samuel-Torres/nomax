declare namespace Cypress {
  interface Chainable<Subject = any> {
    nextImgFix(): Chainable<Subject>;
  }
}
