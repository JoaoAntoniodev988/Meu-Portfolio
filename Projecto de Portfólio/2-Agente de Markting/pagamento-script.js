// 1. Capturar o valor enviado pela URL
const parametros = new URLSearchParams(window.location.search);
const valorCarga = parseFloat(parametros.get('valor'));

const txtTotal = document.getElementById('total-pagamento');

// Mostrar o valor formatado na tela
if (!isNaN(valorCarga)) {
    txtTotal.textContent = `AOA ${valorCarga.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
} else {
    // Caso alguém aceda à página sem digitar um valor
    window.location.href = 'painel.html';
}

// 2. Simular clique no envio do Multicaixa Express
document.getElementById('btn-pagar-express').addEventListener('click', function() {
    const telefone = document.getElementById('telefone-express').value;
    if(!telefone) {
        alert('Por favor, introduza o seu número do Multicaixa Express.');
        return;
    }
    alert(`📱 Solicitação enviada! Verifique o seu telemóvel (${telefone}) para confirmar o pagamento de AOA ${valorCarga.toLocaleString('pt-BR')}.`);
});

// 3. Simular envio do comprovativo manual
document.getElementById('form-comprovativo').addEventListener('submit', function() {
    alert('🎉 Comprovativo recebido com sucesso! O seu saldo será creditado assim que a transferência for confirmada no banco.');
    window.location.href = 'painel.html';
});