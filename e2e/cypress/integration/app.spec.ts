/// <reference types="cypress"/>

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show todos", () => {
    cy.contains(/buy coffee.*not yet done/i);
    cy.contains(/write code.*not yet done/i);
    cy.contains(/get things done.*completed/i);
  });

  describe("when adding a todo", () => {
    let todoText: String;

    beforeEach(() => {
      todoText = new Date().toISOString();
      cy.get("input").type(`test todo ${todoText}`);
      cy.get("button").click();
    });

    it("shows the new todo as uncompleted", () => {
      cy.contains(new RegExp(`test todo ${todoText}\.*not yet done`, "i"));
    });
  });
});
