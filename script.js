const perguntas = [
  {
    pergunta: "Quantos toques sao permitidos no volei?",
    opcoes: ["4", "2", "3", "Apenas 1"],
    resposta: 2
  },
  {
    pergunta: "Quantas pessoas sao necessarias para montar um time?",
    opcoes: ["2", "4", "5", "6"],
    resposta: 3
  },
  {
    pergunta: "Quantas pessoas sao necessarias para jogar uma partida de vôlei?",
    opcoes: ["4", "12", "8", "10"],
    resposta: 1
  },
  {
    pergunta: "Quanto tempo um jogador tem para sacar após o árbitro apitar?",
    opcoes: ["8", "6", "5", "O tempo que quiser"],
    resposta: 0
  },
  {
    pergunta: "Existem cartoes no volei?",
    opcoes: ["Sim", "Nao"],
    resposta: 0
  }
];

const LETRAS = ["A", "B", "C", "D"];

let indiceAtual = 0;
let pontuacao = 0;
const respostasDadas = [];

const perguntaEl = document.getElementById('pergunta');
const opcoesEl = document.getElementById('opcoes');
const contadorEl = document.getElementById('contador');
const setsEl = document.getElementById('sets');
const quizBox = document.getElementById('quiz-box');
const resultadoBox = document.getElementById('resultado-box');
const pontuacaoEl = document.getElementById('pontuacao');
const mensagemEl = document.getElementById('mensagem');
const btnReiniciar = document.getElementById('btn-reiniciar');

function criarSets() {
  setsEl.innerHTML = '';
  perguntas.forEach(() => {
    setsEl.appendChild(document.createElement('span'));
  });
}

function atualizarSets() {
  const marcadores = setsEl.children;
  for (let i = 0; i < marcadores.length; i++) {
    marcadores[i].className = '';
    if (respostasDadas[i] === true) {
      marcadores[i].classList.add('acertou');
    } else if (respostasDadas[i] === false) {
      marcadores[i].classList.add('errou');
    } else if (i === indiceAtual) {
      marcadores[i].classList.add('atual');
    }
  }
}

function carregarPergunta() {
  const atual = perguntas[indiceAtual];
  contadorEl.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  perguntaEl.textContent = atual.pergunta;
  opcoesEl.innerHTML = '';

  atual.opcoes.forEach((opcao, index) => {
    const btn = document.createElement('button');
    btn.className = 'opcao-btn';
    btn.innerHTML = `<span class="letra">${LETRAS[index]}</span><span>${opcao}</span>`;
    btn.addEventListener('click', () => selecionarResposta(index));
    opcoesEl.appendChild(btn);
  });

  atualizarSets();
}

function selecionarResposta(indiceEscolhido) {
  const atual = perguntas[indiceAtual];
  const botoes = document.querySelectorAll('.opcao-btn');
  const acertou = indiceEscolhido === atual.resposta;

  botoes.forEach(btn => btn.disabled = true);

  if (acertou) {
    botoes[indiceEscolhido].classList.add('correta');
    pontuacao++;
  } else {
    botoes[indiceEscolhido].classList.add('errada');
    botoes[atual.resposta].classList.add('correta');
  }

  respostasDadas[indiceAtual] = acertou;
  atualizarSets();

  setTimeout(() => {
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  }, 1100);
}

function mostrarResultado() {
  quizBox.classList.add('escondido');
  resultadoBox.classList.remove('escondido');
  pontuacaoEl.textContent = `${pontuacao} / ${perguntas.length}`;

  if (pontuacao === perguntas.length) {
    mensagemEl.textContent = "Perfeito! Você manda bem nas regras do vôlei.";
  } else if (pontuacao >= Math.ceil(perguntas.length / 2)) {
    mensagemEl.textContent = "Mandou bem! Só afiar um pouco mais.";
  } else {
    mensagemEl.textContent = "Vale a pena rever as regras do jogo!";
  }
}

btnReiniciar.addEventListener('click', () => {
  indiceAtual = 0;
  pontuacao = 0;
  respostasDadas.length = 0;
  resultadoBox.classList.add('escondido');
  quizBox.classList.remove('escondido');
  carregarPergunta();
});

criarSets();
carregarPergunta();