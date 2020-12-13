declare namespace Cypress {
  // tslint:disable-next-line: no-unused
  interface Chainable<Subject> {
    /**
     * Visits url and waits for page to be visible
     * e.g. cy.visitPage('jobs','job-search-page');
     */
    visitPage(url: string, componentToWait: string): Chainable<Element>;
  }
}

// looking for toasters in the page by the text of message and toasters attribute
Cypress.Commands.add('visitPage', function (url: string, componentToWait: string) {
  if (url === '/') {
    url = '';
  }
  if (url.includes('http')) {
    throw new Error(`URLS for VisitPage should not start with http, provided value: ${url}`);
  }
  // tslint:disable-next-line: ban
  cy.visit(`/${url}`);
  cy.get(componentToWait, { timeout: 5000 }).should('exist');
});
