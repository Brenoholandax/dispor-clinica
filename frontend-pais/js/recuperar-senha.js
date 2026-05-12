function enviarLinkRecuperacao() {

  const emailInput = document.getElementById("email"); // Pego o input com id "email" para validar o email inserido pelo usuário
  const mensagem = document.getElementById("mensagem-feedback"); // Pego o elemento onde a mensagem de feedback será exibida 

  const email = emailInput.value.trim(); // Pego o valor do input e removo espaços em branco no início e no final para garantir que a validação seja feita corretamente

  // Limpa classes anteriores
  mensagem.classList.remove("mensagem-sucesso", "mensagem-erro"); // Remove as classes de sucesso e erro para ter certeza que a prox mensagem não vai dar merda

  // Validação básica
  if (email === "") { // Verifica se o campo de email está vazio
    mensagem.style.display = "block"; //Faço a div de mensagem aparecer
    emailInput.style.marginBottom = "0px"; // Ajusta margem para 0 para dar espaço para a mensagem de erro
    mensagem.textContent = "Por favor, informe seu e-mail."; // Defino o texto da mensagem
    mensagem.classList.add("mensagem-erro"); // adiciono a classe de erro para car cor vermelha
    return;
  }

  // Validação de formato
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) { // Verifica se o email inserido tem um formato válido usando uma expressão regular 
    mensagem.style.display = "block"; //Faço a div de mensagem aparecer
    emailInput.style.marginBottom = "0px"; // Ajusta margem para 0 para dar espaço para a mensagem de erro
    mensagem.textContent = "E-mail inválido. Verifique o formato."; // Defino o texto da mensagem
    mensagem.classList.add("mensagem-erro");// adiciono a classe de erro para car cor vermelha
    return;
  }

  // Simulação de sucesso 
  mensagem.style.display = "block"; //Faço a div de mensagem aparecer
  emailInput.style.marginBottom = "0px"; // Ajusta margem para 0 para dar espaço para a mensagem de erro
  mensagem.textContent = "Link de recuperação enviado com sucesso!"; // Defino o texto da mensagem de sucesso
  mensagem.classList.add("mensagem-sucesso"); // adiciono a classe de sucesso para dar cor verde

  //limpar o campo
  emailInput.value = "";
}