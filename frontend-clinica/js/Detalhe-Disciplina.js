function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);// pega os parâmetros da URL
    const id = urlParams.get('id'); // pega o valor do parâmetro "id" da URL
    const disciplina = disciplinas.find(d => d.id === id); // procura a disciplina com o id correspondente na lista de disciplinas

    if (disciplina) { // se a disciplina for encontrada, preenche os detalhes na página
        document.getElementById('nomeDisciplina').innerText = disciplina.nome; // preenche o nome da disciplina
        document.getElementById('nomeProfissional').innerText = disciplina.profissional; // preenche o nome do profissional da disciplina
        document.getElementById('especialidadeProfissional').innerText = disciplina.especialidade; // preenche a especialidade do profissional da disciplina
                
        // Configura a foto se existir caminho, senão mantém o placeholder cinza
        const img = document.getElementById('fotoProfissional'); // pega a imagem do cara
        if (disciplina.foto) { // se a disciplina tiver um caminho de foto, preenche a imagem
            img.src = disciplina.foto; // define o caminho da imagem
            img.style.display = 'block'; // mostra a imagem
        }
    } else {
        window.location.href = 'Insc-Disciplinas.html'; // se a disciplina não for encontrada, redireciona para a página de disciplinas
    }
}

function irParaFormulario() { // função para rolar a página até o formulário de inscrição
    document.getElementById('inscricaoForm').scrollIntoView({ behavior: 'smooth' }); // rola a página suavemente até a seção do formulário de inscrição
}

window.onload = carregarDetalhes; // chama a função carregarDetalhes para preencher os detalhes 