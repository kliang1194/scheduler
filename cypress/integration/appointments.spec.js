describe("Appointments", () => {
  beforeEach(() => {
    //Request cypress to get /api/debug/rest //
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    //Enters the name of the student//
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //Selects an interviewer//
    cy.get("[alt='Sylvia Palmer']").click();
    //clicks the save button//
    cy.contains("Save").click();

    //Shows the student and interviewer names within an element that has the ".appointment__card--show" class//
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //Clicks on the "Edit" button//
    cy.get("[alt=Edit]").first().click({ force: true });

    //Clears the student name, types a new student name, clicks on an interviewer//
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    //Saves the new information//
    cy.contains("Save").click();

    //Shows the student and interviewer names within the element//
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    //Click on delete button//
    cy.get("[alt=Delete]").click({ force: true });
    //Click on confirm to delete//
    cy.contains("Confirm").click();
    //Check to see if deleting animation displays//
    cy.contains("Deleting").should("exist");
    //Check to see if deleting animation stops//
    cy.contains("Deleting").should("not.exist");
    //Check to see if the student name does not exist in the appointment slot anymore//
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
