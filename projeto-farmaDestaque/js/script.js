// Botão de confirmar para pegar as informações do usuário
document.getElementById("confirm-button").addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
  
    if (telefone.length !== 11) { //Define maximo de caracteres para telefone (11 digitos)
      document.querySelector(".error-message").textContent = "O telefone deve ter 11 dígitos.";
      return;
    }
  
    try { // Envia uma requisição POST para o servidor com os dados do usuário em formato JSON
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, telefone, cpf })
      });
  
      if (response.ok) {
        window.location.href = "avaliacao.html"; // Redireciona para a página de avaliação
      } else {
        const error = await response.json();
        document.querySelector(".error-message").textContent = error.message || "Erro ao cadastrar usuário.";
      }
    } catch (error) {
      console.error("Erro:", error);
      document.querySelector(".error-message").textContent = "Erro de conexão com o servidor.";
    }
  });

document.getElementById('clear-button').addEventListener('click', function() { //Seleciona e limpa os campos
  const formFields = document.querySelectorAll('#cadastro-form input, #cadastro-form textarea');
  
  formFields.forEach(field => {
    field.value = '';
  });
});
  