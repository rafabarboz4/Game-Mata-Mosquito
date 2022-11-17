var altura = 0
var largura = 0
var vidas = 3
var posicaoY = 0
var posicaoX = 0
var tempo = 10
var tempoCriarMosquito = 1000

document.getElementById('cronometro').innerHTML = tempo

function selecionarNivel() {
    // window.location.search serve para buscar o parametro selecionado, tudo que está a direita do interrogação.
    var nivel = window.location.search
    nivel.replace('?', '')
    switch (nivel) {
        case 'normal':
            tempoCriarMosquito = 1000
            break;
        case 'dificil':
            tempoCriarMosquito = 750
            break;
        case 'impossivel':
            tempoCriarMosquito = 550
            break;
    }
}
selecionarNivel()

var cronometro = setInterval(function(){
    // atributo inner é tudo que está dentro.
    tempo -= 1
    if(tempo === 0){
        clearInterval(cronometro)
        clearInterval(comecarGame)
        window.location.href = 'vitoriaGame.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }
},1000)

// Definindo a area do game.
function ajustarTamanhoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log('Redimencionamento foi atualizado! Altura: ' + altura + ' Largura: '+ largura)
}
ajustarTamanhoJogo()


// Corrigindo bug do mosquito fora do body.
function corrigindoPosicao() {
    if(posicaoY < 0){
        posicaoY += 100
    }
    if(posicaoX < 0){
        posicaoX += 100
    }
}

// Setando a posição randomica do mosquito.
function posicaoRandom(){
    posicaoY = Math.floor(Math.random() * altura) - 90
    posicaoX = Math.floor(Math.random() * largura) - 90
    corrigindoPosicao()
    console.log('O mosquito nasceu na altura: ' + posicaoY + ' Largura: ' + posicaoX)
}

// Setando classes de tamanho de forma randomicas do mosquito.
function tamanhoRandom(){
    var classe = Math.floor(Math.random() * 3)
    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

// Setando classes do de forma randomicas do mosquito.
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)
    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

// Criando a imagem mosquito no body.
function setandoMosquito() {
    removerMosquito()
    posicaoRandom()

    var mosquito = document.createElement('img')
    mosquito.src = 'Imagens/mosca.png'
    // Ao setar mais de uma classe em um elemento é necessario dar um espaços no retorno
    mosquito.className = tamanhoRandom() + ' ' +  ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    document.body.appendChild(mosquito)
    mosquito.id = 'mosquito'
    
    mosquito.onclick = function(){
        this.remove()
    }
}

function retirarVidas(){
    if(vidas === 0){
        window.location.href = 'gameOver.html'
    }else{
        document.getElementById('v'+ vidas).src = "Imagens/coracao_vazio.png"
        console.log('Usuário errou, resta: ' + vidas + ' vidas.')
        vidas--
    }
}
function removerMosquito() {
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        retirarVidas()
    }

}
var comecarGame = setInterval(function(){
    setandoMosquito()
},tempoCriarMosquito)