

    function initMap() {

      var macc = {lat: -23.4442, lng: -46.919};

      var map = new google.maps.Map(

          document.getElementById('map'), {zoom: 15, center: macc});

      var marker = new google.maps.Marker({position: macc, map: map});

    }



  
  // Função para realizar a autenticação
function autenticar() {
  const token = 'd023f99f7597831a70ac3f88b168b23395d1012ba52680e9046e769d99217cc6';

  fetch(`http://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${token}`, {
    method: 'POST'
  })
    .then(response => response.text())
    .then(data => {
      if (data === 'true') {
        console.log('Autenticação realizada com sucesso!');
        //  fazer outras chamadas para a API Olho Vivo
      } else {
        console.error('Erro na autenticação. Verifique seu token de acesso.');
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

// Chama a função de autenticação ao carregar a página
autenticar();


// Função para fazer a chamada à API e exibir os resultados
function buscarLinhas(termosBusca) {
  // Construir a URL da chamada à API
  const apiUrl = 'http://api.olhovivo.sptrans.com.br/v2.1';
  const endpoint = '/Linha/Buscar';
  const queryString = `?termosBusca=${encodeURIComponent(termosBusca)}`;
  const url = apiUrl + endpoint + queryString;
  
  // Fazer a chamada GET para a API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Exibir os resultados
      exibirResultados(data);
    })
    .catch(error => {
      // Tratar erros
      console.error('Ocorreu um erro:', error);
    });
}


// Função para fazer a chamada à API e exibir os resultados
function buscarLinhas(termosBusca) {
  // Construir a URL da chamada à API
  const apiUrl = 'http://api.olhovivo.sptrans.com.br/v2.1';
  const endpoint = '/Linha/Buscar';
  const queryString = `?termosBusca=${encodeURIComponent(termosBusca)}`;
  const url = apiUrl + endpoint + queryString;
  
  // Configurar as credenciais de autenticação
  const token = 'd023f99f7597831a70ac3f88b168b23395d1012ba52680e9046e769d99217cc6'; 
  
  // Fazer a chamada GET para a API
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Exibir os resultados
      exibirResultados(data);
    })
    .catch(error => {
      // Tratar erros
      console.error('Ocorreu um erro:', error);
    });
}



// Função para exibir os resultados na tela
function exibirResultados(resultados) {
  const containerResultados = document.querySelector('#resultados');
  
  // Limpar o conteúdo existente
  containerResultados.innerHTML = '';
  
  // Verificar se há resultados
  if (resultados.length === 0) {
    containerResultados.textContent = 'Nenhum resultado encontrado.';
    return;
  }
  
  // Criar elementos HTML para cada resultado e adicioná-los ao container
  resultados.forEach(resultado => {
    const linha = document.createElement('div');
    linha.textContent = `Código: ${resultado.cl}, Letreiro: ${resultado.lt}, Sentido: ${resultado.sl}, Terminal Principal: ${resultado.tp}, Terminal Secundário: ${resultado.ts}`;
    containerResultados.appendChild(linha);
  });
}

// Obter referências para os elementos do HTML
const inputOrigem = document.querySelector('input[placeholder="Estou aqui..."]');
const inputDestino = document.querySelector('input[placeholder="Quero ir para..."]');
const botaoBuscar = document.querySelector('.botao-buscar');

// Adicionar um evento de clique ao botão de busca
botaoBuscar.addEventListener('click', () => {
  const termosBusca = inputOrigem.value + ' ' + inputDestino.value;
  buscarLinhas(termosBusca);
});













