document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Capturar o valor de forma redundante (da URL ou do localStorage)
    const parametros = new URLSearchParams(window.location.search);
    let valorCarga = parseFloat(parametros.get('valor'));
    
    if (isNaN(valorCarga)) {
        valorCarga = parseFloat(localStorage.getItem('recargaPendenteAmbulante')) || 0;
    }

    const txtTotal = document.getElementById('total-pagamento');
    if (txtTotal && valorCarga > 0) {
        txtTotal.textContent = `AOA ${valorCarga.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    // 2. Controlar o envio do formulário real
    const formComprovativo = document.getElementById('form-comprovativo');

    if (formComprovativo) {
        formComprovativo.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Trava o recarregamento automático da página
            
            // Vamos buscar o saldo atual real da conta
            let saldoAtual = parseFloat(localStorage.getItem('saldoAmbulante')) || 0;
            
            // Somamos o valor desta recarga
            let novoSaldo = saldoAtual + valorCarga;
            
            // Gravamos de forma definitiva
            localStorage.setItem('saldoAmbulante', novoSaldo);
            
            // Limpamos a recarga temporária pendente
            localStorage.removeItem('recargaPendenteAmbulante');
            
            alert(`🎉 Sucesso! Recebemos a sua solicitação de recarga de AOA ${valorCarga.toLocaleString('pt-BR')}.\n\nO seu saldo foi atualizado com sucesso!`);
            
            // Só depois de salvar tudo com certeza absoluta é que mudamos de página
            window.location.href = 'painel.html';
        });
    }
});