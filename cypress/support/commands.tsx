/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import * as ImageComponent from "next/image";
import MockNextRouter from "../utils/router";
import { SessionProvider } from "next-auth/react";
import * as nextAuthModule from "next-auth/react";

Cypress.Commands.add("nextImgFix", () => {
  const OriginalImageComponent = ImageComponent.default;

  Object.defineProperty(ImageComponent, "default", {
    configurable: true,
    // @ts-ignore
    value: (props) => {
      return <OriginalImageComponent {...props} unoptimized />;
    },
  });

  return undefined;
});

Cypress.Commands.add(
  "dynamicMount",
  (
    component: React.ReactNode,
    isUseRouterNeeded: boolean,
    isUseSessionNeeded: boolean
  ) => {
    if (isUseSessionNeeded && isUseRouterNeeded === false) {
      cy.intercept(
        "/api/auth/session",
        // Mocked session data that matches the shape you provided
        {
          expires: "2023-09-24T16:35:37.410Z",
          user: { email: "rillatube@gmail.com" },
        }
      ).as("getSession");
      cy.wait("@getSession");
    }

    let mountedComponent;

    if (isUseSessionNeeded === false && isUseRouterNeeded) {
      // Mount with MockNextRouter and SessionProvider
      cy.mount(
        <SessionProvider>
          <MockNextRouter>{component}</MockNextRouter>
        </SessionProvider>
      )
        .then((component) => {
          mountedComponent = cy.wrap(component);
        })
        .as("getSession");
      cy.wait("@getSession");
    }

    if (isUseSessionNeeded && isUseRouterNeeded) {
      cy.intercept(
        "/api/auth/session",
        // Mocked session data that matches the shape you provided
        {
          expires: "2999-09-24T16:35:37.410Z",
          user: { email: "rillatube@gmail.com" },
        }
      ).as("getSession");
      cy.mount(
        <SessionProvider>
          <MockNextRouter>{component}</MockNextRouter>
        </SessionProvider>
      )
        .then((component) => {
          mountedComponent = cy.wrap(component);
        })
        .as("getSession");
      cy.wait("@getSession");
      cy.intercept("GET", "/api/users/rillatube@gmail.com", {
        fixture: "user-data.json",
      }).as("userFetch");
    }

    return mountedComponent;
  }
);

export {};
