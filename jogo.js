var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search //recupera os parametros da url index.html
nivel = nivel.replace('?','')

if(nivel === 'normal') {
    //1500
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    //1000
    criaMosquitoTempo = 1000
} else if (nivel === 'chuckNorris') {
    //750
    criaMosquitoTempo = 750
}

function ajustarTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustarTamanhoPalcoJogo()

//cronometro
var cronometro = setInterval(function() {
    
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro) //limpa e encerra a execucao
        clearInterval(criaMosquito) //limpa e encerra a execucao
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }

}, 1000)

function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        //controle dos pontos de vida
        if (vidas>3) {
            //redireciona para a pagina de game over
            window.location.href = 'fim_de_jogo.html'
        }
        else {
            //cria a string dinamicamente, concatenando 2 elementos. Muito foda!
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }
    }
    
    //define um valor aleatorio dentro dos limites de largura e altura
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //tratamento com operadores ternarios para valores < 0
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    var mosquito = document.createElement('img')

    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    mosquito.onclick = function() {
        //faz referencia e remove o proprio elemento html que executa a funcao
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'// o proprio return interrompe a execucao

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'// o proprio return interrompe a execucao

        case 1:
            return 'ladoB'
    }
}