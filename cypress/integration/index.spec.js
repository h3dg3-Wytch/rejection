
describe('check index of application out', () => {
    it('should load', () => {
        cy.visit('/');

        cy.get('#rejectionForm').submit();

        cy.get('h1').should('contain', 1);
    });

    it('should go up by ten when rejected', () => {
        cy.get('#rejectionAskeeTextInput').type('Boss');
        cy.get('#rejectionQuestionTextInput').type('May I have a raise?');
        cy.get('#rejectionCheckboxInput').click();
        cy.get('button').click();

        cy.get('h1').should('contain', 11);
    });

    it('should have a blank form after selection', () => {

        cy.get('#rejectionAskeeTextInput').should('be.empty');
        cy.get('#rejectionQuestionTextInput').should('be.empty');
        cy.get('#rejectionCheckboxInput').should('be.empty');

    });
});