import { should } from "chai";
import AuthForm from "../../../src/components/authForm/authForm";

describe("<AuthForm>", () => {
  beforeEach(() => {
    cy.nextImgFix();
    const loginError: string = "";
    cy.mount(<AuthForm error={loginError} />);
  });

  it("it renders & displays 'Login' header", () => {
    cy.get<HTMLHeadingElement>("[data-test=formHeading]")
      .should("be.visible")
      .and("have.text", "Login");
  });

  it("all elements on login form render correctly", () => {
    const loginError: string = "";
    cy.mount(<AuthForm error={loginError} />);

    // both inputs render to the screen with their associated labels:
    cy.get<HTMLInputElement>("[data-test=loginEmailInput]").should(
      "be.visible"
    );
    cy.get<HTMLInputElement>("[data-test=loginPasswordInput]").should(
      "be.visible"
    );

    // both buttons render to screen w/ associated text:
    cy.get<HTMLButtonElement>("[data-test=loginSubmitButton]")
      .should("have.text", "Login")
      .and("have.attr", "disabled");
    cy.get<HTMLButtonElement>("[data-test=googleButton]").should(
      "have.text",
      "Login with Google"
    );

    // Check that Google Button Image renders on screen:
    cy.get<HTMLImageElement>("[data-test=googleImage]")
      .should("be.visible")
      .and(([img]) => {
        expect(img.naturalWidth).to.equal(512);
      });

    // check that labels render on form:
    cy.get<HTMLLabelElement>("[data-test=loginFormLabel]")
      .should("be.visible")
      .and((el) => {
        const labelElements: HTMLLabelElement[] = [...el.get()];
        expect(labelElements[0].textContent).to.equal("Email");
        expect(labelElements[1].textContent).to.equal("Password");
      });

    // span text renders correctly:
    cy.get<HTMLSpanElement>("[data-test=authFormToggle]")
      .should("be.visible")
      .and("have.text", "Don't have an account? Click Here to Sign up.");
  });

  it("Auth Form Toggle is functioning as intended", () => {
    // initiates on Login Form:
    cy.get<HTMLHeadingElement>("[data-test=formHeading]").should(
      "have.text",
      "Login"
    );

    // Toggle is clicked and switches to Register Form State:
    cy.get<HTMLSpanElement>("[data-test=authFormToggle]").click();
    cy.get<HTMLHeadingElement>("[data-test=formHeading]").should(
      "have.text",
      "Register"
    );

    // Toggle is clicked while in register state & switches back to Login State:
    cy.get<HTMLSpanElement>("[data-test=authFormToggle]").click();
    cy.get<HTMLHeadingElement>("[data-test=formHeading]").should(
      "have.text",
      "Login"
    );
  });

  it("all element on register form render correctly", () => {
    // switch to registration state:
    cy.get<HTMLSpanElement>("[data-test=authFormToggle]").click();

    // email input renders correctly with label:
    cy.get<HTMLInputElement>("[data-test=registerEmail]").should("be.visible");
    cy.get<HTMLLabelElement>("[data-test=regEmailLabel]").should(
      "have.text",
      "Email"
    );

    // password input renders correctly with label & validation text:
    cy.get<HTMLInputElement>("[data-test=registerPassword]").should(
      "be.visible"
    );
    cy.get<HTMLLabelElement>("[data-test=regPasswordLabel]").should(
      "have.text",
      "Password"
    );
    cy.get<HTMLParagraphElement>("[data-test=passwordValidation]").should(
      (els) => {
        const elementArray: HTMLParagraphElement[] = [...els.get()];
        expect(elementArray.length).to.equal(3);
      }
    );

    // passwordConfirmation input renders correctly with label & validation text:
    cy.get<HTMLInputElement>("[data-test=registerPasswordConfirmation]").should(
      "be.visible"
    );
    cy.get<HTMLLabelElement>("[data-test=regPasswordConfirmationLabel]").should(
      "have.text",
      "Confirm Password"
    );
    cy.get<HTMLParagraphElement>(
      "[data-test=passwordConfirmationValidation]"
    ).should((els) => {
      const elementArray: HTMLParagraphElement[] = [...els.get()];
      expect(elementArray.length).to.equal(3);
    });

    // submit button renders & is disabled:
    cy.get<HTMLButtonElement>("[data-test=registerFormSubmit]").should(
      "be.disabled"
    );

    // span element renders correctly:
    cy.get<HTMLSpanElement>("[data-test=authFormToggle]")
      .should("be.visible")
      .and("have.text", "Already have an account? Click Here to Login.");
  });

  it("when invalid email & invalid(short) password submit button remains disabled:", () => {
    cy.get<HTMLInputElement>("[data-test=loginEmailInput]").type(
      "firstgmail.com"
    );
    cy.get<HTMLInputElement>("[data-test=loginPasswordInput]").type("1234");
    cy.get<HTMLInputElement>("[data-test=loginSubmitButton]").should(
      "be.disabled"
    );
  });

  it("when valid email & invalid(short) password submit button remains disabled:", () => {
    cy.get<HTMLInputElement>("[data-test=loginEmailInput]").type(
      "first@gmail.com"
    );
    cy.get<HTMLInputElement>("[data-test=loginPasswordInput]").type("1234");
    cy.get<HTMLInputElement>("[data-test=loginSubmitButton]").should(
      "be.disabled"
    );
  });

  it("when valid email & invalid password (incorrect pw entered) submit button is enabled", () => {
    cy.get<HTMLInputElement>("[data-test=loginEmailInput]").type(
      "first@gmail.com"
    );
    cy.get<HTMLInputElement>("[data-test=loginPasswordInput]").type(
      "1234sdceccs"
    );
    cy.get<HTMLInputElement>("[data-test=loginSubmitButton]").should(
      "not.be.disabled"
    );
  });

  it("register form password & passwordConfirmation validation text turn from red to green when requirements are met", () => {
    // switch to register form state:
    cy.get<HTMLSpanElement>("[data-test=authFormToggle]").click();

    // All of the p tags should be red due to failing validation requirements:
    cy.get<HTMLParagraphElement>("[data-test=passwordValidation]").then(
      (elements) => {
        const passwordArray: HTMLParagraphElement[] = elements.toArray();
        passwordArray.forEach((el) => {
          expect(el.className).to.contain("fail");
          cy.wrap(el).should("have.css", "color").and("eq", "rgb(255, 87, 51)");
        });
      }
    );

    cy.get<HTMLParagraphElement>("[data-test=passwordValidation]").then(
      (elements) => {
        const passwordConfirmationArray: HTMLParagraphElement[] =
          elements.toArray();
        passwordConfirmationArray.forEach((el) => {
          expect(el.className).to.contain("fail");
          cy.wrap(el).should("have.css", "color").and("eq", "rgb(255, 87, 51)");
        });
      }
    );

    // That when all p tag meet password requirements color turns green:
    cy.get<HTMLInputElement>("[data-test=registerPassword]").type("Password1!");
    cy.get<HTMLInputElement>("[data-test=registerPasswordConfirmation]").type(
      "Password1!"
    );

    cy.get<HTMLParagraphElement>("[data-test=passwordValidation]").then(
      (elements) => {
        const passwordArray: HTMLParagraphElement[] = elements.toArray();
        passwordArray.forEach((el) => {
          expect(el.className).to.contain("pass");
          cy.wrap(el).should("have.css", "color").and("eq", "rgb(94, 162, 93)");
        });
      }
    );

    cy.get<HTMLParagraphElement>("[data-test=passwordValidation]").then(
      (elements) => {
        const passwordConfirmationArray: HTMLParagraphElement[] =
          elements.toArray();
        passwordConfirmationArray.forEach((el) => {
          expect(el.className).to.contain("pass");
          cy.wrap(el).should("have.css", "color").and("eq", "rgb(94, 162, 93)");
        });
      }
    );
  });
});
