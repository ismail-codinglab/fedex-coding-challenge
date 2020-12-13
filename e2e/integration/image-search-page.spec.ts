describe('image-search-page', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080); // desktop view
    cy.visitPage('/', 'app-image-search-page');
  });

  it('should show input and placeholder', function () {
    cy.findByTestId('search-input').should('be.visible');
    cy.findByTestId('search-placeholder').should('be.visible');
  });

  describe('Happy flow', () => {
    it('should display loading screen when searching for `test`', () => {
      cy.findByTestId('search-input').type('test');
      cy.findByTestId('search-loading').should('be.visible');
    });
    it('should display results when searching for `test`', () => {
      // we can't assume, we must know that the initial state has no results
      cy.findAllByTestId('search-result-item').should('not.exist');
      cy.findByTestId('search-input').type('test');
      cy.findAllByTestId('search-result-item').should('be.visible');
    });
    it('should show different results when going to next page', () => {
      cy.findByTestId('search-input').type('test');
      cy.findAllByTestId('search-result-item').should('be.visible');
      const imageSourceChain = cy.findAllByTestId('search-result-item').get('img').first().invoke('attr', 'src');
      cy.findByTestId('search-pagination').contains('2').click();
      imageSourceChain.then((imageSource: string) => {
        // expect different images
        cy.findAllByTestId('search-result-item').get('img').first().should('not.have.attr', 'src', imageSource);
      });
    });
  });

  describe('Non-happy flow', () => {
    it('should show no results found when searching for `FedexIsSmart`', () => {
      cy.findByTestId('search-input').type('FedexIsSmart');
      cy.findAllByTestId('search-empty-state').should('be.visible');
    });
    it('should show error message when searching for `badWords`', () => {
      cy.findByTestId('search-input').type('badWords');
      cy.findAllByTestId('search-error-badword').should('be.visible');
    });
  });
});
