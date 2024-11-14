// Variável para armazenar a nota selecionada
let notaSelecionada = null;

const emojis = document.querySelectorAll('.emoji');

emojis.forEach(emoji => { // Captura e Define um valor para cada emoji (Utilizando data-note)
  emoji.addEventListener('click', function() {
    // Atribui a nota selecionada ao valor do atributo data-note
    notaSelecionada = parseInt(emoji.getAttribute('data-note'));

    // Remove a classe 'selecionado' de todos os emojis
    emojis.forEach(e => e.classList.remove('selecionado')); 

    // Adiciona a classe 'selecionado' ao emoji clicado
    emoji.classList.add('selecionado');

    console.log("Nota selecionada:", notaSelecionada); // Exibe no console para depuração
  });
});

document.getElementById('send-button').addEventListener('click', function() { 
  // Verifica se foi selecionada uma nota
  if (notaSelecionada === null) {
    alert("Por favor, selecione uma nota.");
    return;
  }

  // Pega o valor do feedback
  const feedback = document.getElementById('feedback').value;

  // Armazena o id do usuário na sessão
  sessionStorage.setItem('usuarioId', 1);
  const usuarioId = sessionStorage.getItem('usuarioId'); // Gerando o Id do usuario

  // Envia os dados para o backend
  fetch('http://localhost:3000/api/avaliacoes', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuarioId: usuarioId,
      nota: notaSelecionada,
      feedback: feedback
    })
  })
  .then(response => response.json())
  .then(data => { // Resposta de sucesso
    console.log('Sucesso:', data);
    alert("Avaliação enviada com sucesso!");
    window.location.href = '../public/index.html'; // Redireciona após o envio
  })
  .catch((error) => { // Resposta de erro
    console.error('Erro:', error);
    alert("Erro ao enviar avaliação.");
  });
});
