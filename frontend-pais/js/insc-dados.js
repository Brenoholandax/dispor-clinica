const disciplinas = [ // dados ficticios para aparecerem
    {
        id: "aba",
        nome: "ABA",
        descricao: "Análise do Comportamento Aplicada, focada em reforço positivo e aprendizado estruturado.",
        profissional: "Dr. Ricardo Mendes",
        especialidade: "Especialista em Análise do Comportamento",
        foto: "Assets/Doutor-1.png" 
    },
    {
        id: "musicoterapia",
        nome: "Musicoterapia",
        descricao: "Utilização da música e seus elementos para facilitar a comunicação e expressão.",
        profissional: "Dra. Aline Souza",
        especialidade: "Musicoterapeuta Clínica",
        foto: "Assets/Doutora-1.png"
    },
    {
        id: "fisioterapia",
        nome: "Fisioterapia Motora",
        descricao: "Tratamento para melhorar a mobilidade, força e coordenação motora da criança.",
        profissional: "Dr. Marcos Oliveira",
        especialidade: "Fisioterapeuta Neurofuncional",
        foto: "Assets/Doutor-2.png"
    },
    {
        id: "fonoaudiologia",
        nome: "Fonoaudiologia",
        descricao: "Desenvolvimento da fala, linguagem e funções de mastigação e deglutição.",
        profissional: "Dra. Beatriz Costa",
        especialidade: "Fonoaudióloga Infantil",
        foto: "Assets/Doutora-2.png"
    },
    {
        id: "terapia-ocupacional",
        nome: "Terapia Ocupacional",
        descricao: "Auxílio na autonomia para atividades diárias e integração sensorial.",
        profissional: "Dra. Juliana Lima",
        especialidade: "Terapeuta Ocupacional",
        foto: "Assets/Doutora-3.png"
    },
    {
        id: "psicopedagogia",
        nome: "Psicopedagogia",
        descricao: "Intervenção nos processos de aprendizagem e dificuldades escolares.",
        profissional: "Dr. Carlos Eduardo",
        especialidade: "Psicopedagogo Clínico",
        foto: "Assets/Doutor-3.png"
    }
];
// ========================== Insc-Disiplinas ==========================
// Carrega os cards na tela
function renderizarDisciplinas() {
    const grid = document.getElementById('disciplinasGrid'); // pega a tablea onde os cards vão ficar
    grid.innerHTML = ''; // e limpa elas

    disciplinas.forEach(d => { // para cada disciplina, cria um card
        const card = document.createElement('div'); // cria um elemento div para o card
        card.className = 'card-disciplina'; // com essa classe ai
        card.innerHTML = ` 
            <h2>${d.nome}</h2>
            <p>${d.descricao}</p>
            <a href="Detalhe-Disciplina.html?id=${d.id}" class="btn-detalhes">Ver Detalhes</a>
        `; // e dentro da div coloca esses elementos ai em cima, que seus conteudos vem do const la de cima 
        grid.appendChild(card); // e depois adiciona o card criado na tabela
    });
}

// window.onload = renderizarDisciplinas; // Comentado para evitar conflito com dashboard.js

