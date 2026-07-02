// ==========================================================================
// 1. MAPEAMENTO DOS ELEMENTOS DO HTML (DOM)
// ==========================================================================
const txtSaldo = document.getElementById('saldo-atual');
const inputRecarga = document.getElementById('input-recarga');
const btnRecargar = document.getElementById('btn-recargar');
const formAnuncio = document.getElementById('form-anuncio');
const selectValorCampanha = document.getElementById('valor-campanha');

// Criamos uma variável na memória para controlar o saldo (começa em 0)
let saldoEmConta = 0;

// ==========================================================================
// ==========================================================================
// 2. NOVA LÓGICA DA CARTEIRA DIGITAL (REDIRECIONAR PARA PAGAMENTO)
// ==========================================================================
btnRecargar.addEventListener('click', function() {
    const valorDigitado = parseFloat(inputRecarga.value);

    // Verificação de segurança
    if (isNaN(valorDigitado) || valorDigitado <= 0) {
        alert('Por favor, insira um valor válido em AOA para carregar a sua carteira.');
        return;
    }

    // Enviamos o utilizador para a página de pagamento levando o valor no link
    window.location.href = `pagamento.html?valor=${valorDigitado}`;
});
// ==========================================================================
// 3. LÓGICA DO AGENTE DE MARKETING (VALIDAR E PUBLICAR CAMPANHA)
// ==========================================================================
formAnuncio.addEventListener('submit', function(evento) {
    // Evita que a página recarregue ao submeter o formulário (padrão do HTML)
    evento.preventDefault();

    // Pegamos o valor que a campanha selecionada custa (1490, etc)
    const custoCampanha = parseFloat(selectValorCampanha.value === "10" ? 1490 : selectValorCampanha.value === "30" ? 3500 : 5000);
    const nomeProduto = document.getElementById('nome-produto').value;

    // REGRA DE NEGÓCIO CRÍTICA: O usuário tem saldo para rodar o anúncio?
    if (saldoEmConta < custoCampanha) {
        alert(`Atenção! O seu saldo atual é insuficiente para esta campanha. Você precisa de pelo menos AOA ${custoCampanha.toLocaleString('pt-BR')} para promover o produto "${nomeProduto}".`);
        return;
    }

    // Se ele tiver saldo, descontamos o valor da conta
    saldoEmConta -= custoCampanha;

    // Atualizamos o saldo na tela
    txtSaldo.textContent = saldoEmConta.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    // Simulamos o sucesso
    alert(`🎉 Parabéns! O anúncio do seu produto "${nomeProduto}" foi otimizado pelo nosso Agente e enviado com sucesso para o Facebook e Instagram da região!`);
    
    // Limpamos o formulário para a próxima postagem
    formAnuncio.reset();
});