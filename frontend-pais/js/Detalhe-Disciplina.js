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

function irParaFormulario() {
    document.getElementById('inscricaoForm').scrollIntoView({ behavior: 'smooth' });
}

function enviarInscricao(event) {
    event.preventDefault();
    let valido = true;
    const campos = [
        { id: 'nomeResponsavel', erroId: 'erroNomeResponsavel', msg: 'Informe o nome do responsável.' },
        { id: 'nomeCrianca',     erroId: 'erroNomeCrianca',     msg: 'Informe o nome da criança.' },
        { id: 'telefone',        erroId: 'erroTelefone',        msg: 'Informe o telefone de contato.' },
        { id: 'turno',           erroId: 'erroTurno',           msg: 'Selecione o turno de preferência.' },
    ];
    campos.forEach(c => {
        const input = document.getElementById(c.id);
        const erro = document.getElementById(c.erroId);
        if (!input.value.trim()) {
            erro.textContent = c.msg;
            input.classList.add('campo-invalido');
            valido = false;
        } else {
            erro.textContent = '';
            input.classList.remove('campo-invalido');
        }
    });
    if (!valido) return;

    const btn = document.querySelector('.btn-enviar-form');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    setTimeout(() => {
        document.getElementById('disciplinaConfirmada').textContent = document.getElementById('nomeDisciplina').innerText;
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('sucessoInscricao').style.display = 'block';
        document.getElementById('inscricaoForm').scrollIntoView({ behavior: 'smooth' });
    }, 1200);
}

document.addEventListener('DOMContentLoaded', carregarDetalhes);