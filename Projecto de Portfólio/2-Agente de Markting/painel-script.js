// ==========================================================================
// 1. MAPEAMENTO E INICIALIZAÇÃO DO ESTADO
// ==========================================================================
const txtSaldo = document.getElementById('saldo-atual');
const inputRecarga = document.getElementById('input-recarga');
const btnRecargar = document.getElementById('btn-recargar');
const formAnuncio = document.getElementById('form-anuncio');
const selectValorCampanha = document.getElementById('valor-campaign');

// Buscamos o valor da memória do navegador ou começamos em 0
let saldoEmConta = parseFloat(localStorage.getItem('saldoAmbulante')) || 0;

// DETETIVE DO PAINEL: Mostra no F12 quanto o painel conseguiu ler da memória
console.log("PAINEL LEU DO LOCALSTORAGE:", saldoEmConta);

// Forçamos a tela a exibir o valor atualizado assim que abre
if (txtSaldo) {
    txtSaldo.textContent = saldoEmConta.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// ==========================================================================
// 2. LOGICA DE ENVIAR PARA O PAGAMENTO (O que faltava encaixar aqui!)
// ==========================================================================
if (btnRecargar) {
    btnRecargar.addEventListener('click', function() {
        const valorDigitado = parseFloat(inputRecarga.value);

        if (isNaN(valorDigitado) || valorDigitado <= 0) {
            alert('Por favor, insira um valor válido em AOA para carregar a sua carteira.');
            return;
        }

        // 🔥 Guarda o valor da recarga pendente temporariamente na memória antes de mudar de página
        localStorage.setItem('recargaPendenteAmbulante', valorDigitado);

        // Avança para a página de pagamento passando o valor na URL
        window.location.href = `pagamento.html?valor=${valorDigitado}`;
    });
}

// ==========================================================================
// 3. O CORAÇÃO DO SITE: AGENTE DE IA COM HUMAN-IN-THE-LOOP
// ==========================================================================
const sectionPreview = document.getElementById('preview-campanha-ia');
const postTextoIa = document.getElementById('post-texto-ia');
const postImagemContainer = document.getElementById('post-imagem-container');
const txtSugestoesIa = document.getElementById('ia-sugestoes');

const btnAjustarIa = document.getElementById('btn-ajustar-ia');
const btnRejeitarAnuncio = document.getElementById('btn-rejeitar-anuncio');
const btnConfirmarPublicacao = document.getElementById('btn-confirmar-publicacao');

// Guardamos temporariamente os dados da campanha em progresso
let campanhaAtual = { nome: '', custo: 0 };

// Função que simula a IA criando textos persuasivos com base no produto e sugestões
function simularGeracaoDeTextoIA(nomeProduto, sugestaoPretendida = '') {
    const baseTextoStandard = `✨ PROMOÇÃO IMPERDÍVEL! ✨\n\nProcurando por ${nomeProduto} de alta qualidade com o melhor preço da região? Encontrou!\n\n📍 Atendendo diretamente aqui na nossa comunidade. Clique no link abaixo para fazer o seu pedido antes que o estoque termine! 🛍️`;
    
    if (sugestaoPretendida.toLowerCase().includes('divertido') || sugestaoPretendida.toLowerCase().includes('emoji')) {
        return `🔥 Alerta de TUDO DE BOM no seu feed! 🔥\n\nQuem avisa amigo é: você não está preparado para a perfeição que é este(a) ${nomeProduto}! 😂👇\n\nPeça já o seu e seja feliz. Atendimento rápido e regional! 🚀📦`;
    }
    if (sugestaoPretendida.toLowerCase().includes('promo') || sugestaoPretendida.toLowerCase().includes('desconto')) {
        return `🚨 SÓ HOJE: DESCONTO EXCLUSIVO! 🚨\n\nCompre o seu ${nomeProduto} com condições especiais de lançamento que você só encontra aqui! 📉💰\n\n🏃‍♂️ Corre e garante o teu pelo link patrocinado!`;
    }
    
    return baseTextoStandard;
}

// Ouvinte do formulário inicial - TOTALMENTE PROTEGIDO CONTRA NULL
if (formAnuncio) {
    formAnuncio.addEventListener('submit', function(evento) {
        evento.preventDefault();

        // 1. CAPTURA FLEXÍVEL DO SELECT DE PREÇO (Tenta um ID, se der null tenta o outro)
        const selectValor = document.getElementById('valor-campaign') || document.getElementById('valor') || document.querySelector('select');
        
        // 2. CAPTURA FLEXÍVEL DO NOME DO PRODUTO
        const inputProduto = document.getElementById('nome-produto') || document.getElementById('produto') || document.querySelector('input[type="text"]');

        // Se mesmo assim não encontrar os elementos na tela, avisa o desenvolvedor com calma
        if (!selectValor || !inputProduto) {
            alert("Erro de mapeamento: Garanta que os campos de texto e valor existem no HTML.");
            return;
        }

        // Captura os valores reais digitados pelo utilizador de forma segura
        const valorSelectStr = selectValor.value;
        const nomeProduto = inputProduto.value;

        // Trata o cálculo do custo baseado no que está selecionado no teu select da imagem screen02.jpg
        let custoCampanha = 1490; // Valor padrão inicial
        if (valorSelectStr.includes("30") || valorSelectStr.includes("3.500")) {
            custoCampanha = 3500;
        } else if (valorSelectStr.includes("50") || valorSelectStr.includes("5.000")) {
            custoCampanha = 5000;
        } else if (valorSelectStr === "10" || valorSelectStr === "30") {
            // Caso use os IDs antigos simplificados
            custoCampanha = parseFloat(valorSelectStr === "10" ? 1490 : valorSelectStr === "30" ? 3500 : 5000);
        }

        // 3. Validar se o usuário tem saldo ANTES do processo começar
        if (saldoEmConta < custoCampanha) {
            alert(`Atenção! Seu saldo atual é insuficiente. Você precisa de pelo menos AOA ${custoCampanha.toLocaleString('pt-BR')} para esta campanha.`);
            return;
        }

        // Guardamos o estado da campanha para o passo da IA
        campanhaAtual.nome = nomeProduto;
        campanhaAtual.custo = custoCampanha;

        // 4. Simular o processamento da IA
        const btnPublicarOriginal = document.getElementById('btn-publicar') || document.querySelector('button[type="submit"]');
        if (btnPublicarOriginal) {
            btnPublicarOriginal.textContent = "🧠 Inteligência Artificial processando...";
            btnPublicarOriginal.disabled = true;
        }

        // Capturar a imagem enviada para mostrar no mockup
        const fotoInput = document.getElementById('foto-produto') || document.querySelector('input[type="file"]');
        if (fotoInput && fotoInput.files && fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (postImagemContainer) {
                    postImagemContainer.style.backgroundImage = `url('${e.target.result}')`;
                }
            }
            reader.readAsDataURL(fotoInput.files[0]);
        }

        setTimeout(() => {
            // Gera o texto inicial da IA baseado no teu produto
            if (postTextoIa) {
                postTextoIa.textContent = simularGeracaoDeTextoIA(nomeProduto);
            }
            
            // Exibe o painel de aprovação/revisão e rola a tela até ele
            if (sectionPreview) {
                sectionPreview.style.display = "block";
                sectionPreview.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Reseta o botão original
            if (btnPublicarOriginal) {
                btnPublicarOriginal.textContent = "Publicar Anúncio Agora";
                btnPublicarOriginal.disabled = false;
            }
        }, 1500);
    });
}

// Botão de dar Sugestões para a IA recriar o texto
if (btnAjustarIa) {
    btnAjustarIa.addEventListener('click', function() {
        const sugestao = txtSugestoesIa.value;
        if(!sugestao) {
            alert('Digite alguma sugestão para a IA reescrever o texto.');
            return;
        }
        btnAjustarIa.textContent = "🤖 Reescrevendo anúncio...";
        setTimeout(() => {
            if (postTextoIa) {
                postTextoIa.textContent = simularGeracaoDeTextoIA(campanhaAtual.nome, sugestao);
            }
            btnAjustarIa.textContent = "Regerar com Sugestões";
            alert('✨ A IA processou as suas diretrizes e adaptou o anúncio!');
        }, 1200);
    });
}

// Botão de Rejeitar
if (btnRejeitarAnuncio) {
    btnRejeitarAnuncio.addEventListener('click', function() {
        if(confirm('Tem certeza de que deseja descartar esta criação? Nenhum valor será cobrado.')) {
            if (sectionPreview) sectionPreview.style.display = "none";
            formAnuncio.reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Botão de Confirmação e Desconto Real do Saldo
if (btnConfirmarPublicacao) {
    btnConfirmarPublicacao.addEventListener('click', function() {
        // Deduz o saldo
        saldoEmConta -= campanhaAtual.custo;
        if (txtSaldo) {
            txtSaldo.textContent = saldoEmConta.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }

        // 🔥 SALVAR O NOVO SALDO APÓS DESCONTO NA MEMÓRIA:
        localStorage.setItem('saldoAmbulante', saldoEmConta);

        alert(`🚀 SUCESSO ABSOLUTO!\nO anúncio foi aprovado e está rodando oficialmente!\n\nCusto debitado: AOA ${campanhaAtual.custo.toLocaleString('pt-BR')}`);
        
        if (sectionPreview) sectionPreview.style.display = "none";
        formAnuncio.reset();
        if (txtSugestoesIa) txtSugestoesIa.value = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}