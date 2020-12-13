// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')

//catch and log these errors in CI
require('cypress-terminal-report/src/installLogsCollector')();

// This makes the test fail if the application will have any error (angular error, javascript error, any runtime error)
Cypress.on(`window:before:load`, (win) => {
  cy.stub(win.console, `error`, (msg) => {
    cy.log(`error message:${msg}`);
    // log to Terminal
    cy.now(`task`, `error`, msg);
    // log to Command Log & fail the test
    throw new Error(msg);
  });
});
