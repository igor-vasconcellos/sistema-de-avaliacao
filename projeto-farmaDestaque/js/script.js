const cadastroForm = document.getElementById("cadastro-form");
const confirmButton = document.getElementById("confirm-button");
const clearButton = document.getElementById("clear-button");

// function do cadastro
confirmButton.addEventListener("click", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const errorMessage = document.querySelector(".error-message");

  if (nome === "" || telefone === "") {
    errorMessage.textContent = "Nome e Telefone são obrigatórios.";
  } else {
    errorMessage.textContent = "";
    window.location.href = "avaliacao.html";
  }
});

// function que limpa os labels após clicar no btn "limpar dados"
clearButton.addEventListener("click", (event) => {
  event.preventDefault();

  cadastroForm.reset();
  const errorMessage = document.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.textContent = "";
  }
});

// function que faz o btn "cancelar" voltar para a página de cadastro
const cancelButton = document.getElementById("cancel-button");

cancelButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// verificação da seleção dos emojis
const emojis = document.querySelectorAll(".emoji img");
let emojiSelect = null;

emojis.forEach((emoji) => {
  emoji.addEventListener("click", (event) => {
    emojis.forEach((e) => e.classList.remove("selected"));

    event.target.classList.add("selected");
    emojiSelect = event.target.alt;
  });
});

// validação do botão de enviar {enviar a avaliação}
const sendButton = document.getElementById("send-button");
const avaliacaoErrorMessage = document.getElementById(
  "avaliacao-error-message"
);

sendButton.addEventListener("click", () => {
  const feedback = document.getElementById("feedback").value.trim();

  // validação se o usuário selecionou um emoji e preencheu o feedback
  if (!emojiSelecionado || feedback === "") {
    avaliacaoErrorMessage.textContent =
      "Por favor, selecione uma avaliação e descreva sua experiência.";
  } else {
    avaliacaoErrorMessage.textContent = "";

    // teste:
    alert("Obrigado pela sua avaliação!");
    document.getElementById("feedback").value = "";
    emojis.forEach((e) => e.classList.remove("selected"));
  }
});
