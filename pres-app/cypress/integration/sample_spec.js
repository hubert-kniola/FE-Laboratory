describe("My First Test", () => {
  it("Visits the Main Site", () => {
    cy.visit("http://ec2-3-82-245-56.compute-1.amazonaws.com:3000/");

    cy.contains("Zaloguj się").click();
  });
});
