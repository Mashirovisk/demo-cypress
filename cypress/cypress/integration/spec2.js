describe("Teste End-to-End", () => {
  it("Teste 1: Visita Página", () => {
    // Abre o site
    cy.visit("http://localhost:5000/");
  });

  it("Teste 2: Verifica item na página", () => {
    // Verifica se existe o livro desejado
    cy.get("[data-id=3]").should("contain.text", "Design Patterns");
  });

  it("Teste 3: Calcula Frete", () => {
    // Seleciona a terceira coluna do catálogo
    cy.get("[data-id=3]").within(() => {
      // Insere o CEP
      cy.get("input").type("10000-000");
      // Clica no botão Calcular Frete
      cy.contains("Calcular Frete").click();
      // Espera 2 segundos para o pop-up aparecer
      cy.wait(2000);
    });

    // Verifica se o pop-up mostra o valor do frete
    cy.get(".swal-text").contains("O frete é: R$");

    // Fecha o pop-up
    cy.get(".swal-button").click();
  });

  it("Teste 4: Compra do Livro", () => {
    // Seleciona o livro desejado e clica no botão Comprar
    cy.get("[data-id=3]").within(() => {
      cy.contains("Comprar").click();
      cy.wait(2000); // espera o pop-up aparecer
    });

    // Verifica se o pop-up mostra a mensagem de sucesso
    cy.get(".swal-text").contains("Sua compra foi realizada com sucesso");

    // Fecha o pop-up
    cy.get(".swal-button").click();
  });
});
