declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * @see VisitPage for implementation
     * Visits url and waits for page to be visible
     * e.g. cy.visitPage('jobs','job-search-page');
     */
    visitPage(url: string, componentToWait: string): Chainable<Element>;
  }
}
