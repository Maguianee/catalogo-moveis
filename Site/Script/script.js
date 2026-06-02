function carregaritens() {
    fetch('/catalogo')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('container-catalogo');
            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = '<p class="vazio">Nenhum item ainda</p>';
                return;
            }

            // O loop loop passa por cada móvel vindo do banco
            data.forEach(item => {
                // Criamos o card individual do móvel
                const card = document.createElement('div');
                card.className = 'moveil-card'; // Cada móvel ganha essa classe

                // A formatação do preço precisa acontecer AQUI DENTRO do loop:
                const precoFormatado = Number(item.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                card.innerHTML = `
                            <h3>${item.nome_item}</h3>
                            <p class="descricao">${item.descricao}</p>
                            <p class="preco">${precoFormatado}</p>
                            <button class="btn-excluir" onclick="excluirItem(${item.id})">Excluir</button>
                        `;
                container.appendChild(card);
            });
        })
        .catch((err) => {
            console.error(err);
            document.getElementById('container-catalogo').innerHTML =
                '<p class="erro">Erro ao carregar itens</p>';
        });
}

function excluirItem(id) {
    if (confirm("Tem certeza que deseja excluir este móvel do catálogo?")) {
        fetch(`/excluir/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    alert("Móvel excluído com sucesso!");
                    carregaritens(); // Recarrega a lista atualizada
                } else {
                    alert("Erro ao excluir o item.");
                }
            })
            .catch(err => {
                console.error("Erro na requisição:", err);
                alert("Não foi possível se comunicar com o servidor.");
            });
    }
}

carregaritens();