async function enviarNome() {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem');
    
    if (nome) {
        try {
            const response = await fetch('https://seu-backend-railway.herokuapp.com/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome }),
            });

            const result = await response.json();
            if (response.ok) {
                mensagem.textContent = result.mensagem;
            } else {
                mensagem.textContent = 'Erro ao salvar o nome.';
            }
        } catch (error) {
            mensagem.textContent = 'Erro de conexão.';
        }
    } else {
        mensagem.textContent = 'Por favor, digite seu nome.';
    }
}
