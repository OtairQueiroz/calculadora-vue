const { createApp } = Vue;

createApp({
    // Declaração dos dados da aplicação Vue
    data() {
        return {
            display: '0', // Valor exibido na calculadora
            numeroAtual: null, // Número atual sendo inserido
            numeroAnterior: null, // Número anterior ao pressionar um operador
            operador: null, // Último operador pressionado
            aguardandoOperacao: false // Indica se estamos esperando uma nova operação após pressionar um operador
        };
    },
    methods: {
        // Função para lidar com o pressionar dos botões na calculadora
        lidarBotao(botao) {
            if (botao === 'AC') {
                this.lidarClear(); // Limpar a calculadora se for pressionado o botão AC
            } else if (botao === '=') {
                this.lidarIgual(); // Calcular o resultado se for pressionado o botão de igual
            } else if (['+', '-', '*', '/'].includes(botao)) {
                this.lidarOperador(botao); // Lidar com operadores
            } else {
                this.lidarNumero(botao); // Lidar com números
            }
        },
        // Função para lidar com a pressão de um operador
        lidarOperador(botao) {
            if (this.operador !== null && !this.aguardandoOperacao) {
                this.lidarIgual(); // Se já houver um operador e não estivermos esperando uma nova operação, calcular o resultado atual
            } else {
                this.numeroAnterior = parseFloat(this.display); // Armazenar o número atual como número anterior
            }
            this.operador = botao; // Armazenar o operador pressionado
            this.aguardandoOperacao = true; // Indicar que estamos esperando uma nova operação
            this.display = this.numeroAnterior !== null ? this.numeroAnterior + ' ' + this.operador : '0'; // Atualizar a exibição com o número anterior e o operador
        },
        // Função para lidar com a pressão de um número
        lidarNumero(numero) {
            if (this.aguardandoOperacao) {
                this.display = numero; // Se estivermos esperando uma nova operação, substituir o número exibido
                this.aguardandoOperacao = false; // Indicar que não estamos mais esperando uma nova operação
            } else if (this.display === '0') {
                this.display = numero; // Se o número exibido for 0, substituí-lo pelo novo número
            } else {
                this.display += numero; // Adicionar o número pressionado ao número exibido
            }
        },
        // Função para lidar com a pressão do botão de decimal
        lidarDecimal() {
            if (this.aguardandoOperacao) {
                this.display = '0.'; // Se estivermos esperando uma nova operação, exibir "0."
                this.aguardandoOperacao = false; // Indicar que não estamos mais esperando uma nova operação
            } else if (!this.display.includes('.')) {
                this.display += '.'; // Adicionar um ponto decimal se ainda não houver um
            }
        },
        // Função para lidar com a pressão do botão de igual
        lidarIgual() {
            if (this.operador && !this.aguardandoOperacao) {
                const operacao = this.numeroAnterior + ' ' + this.operador + ' ' + parseFloat(this.display); // Corrigido para parseFloat()
                this.display = eval(operacao); // Calcular o resultado da operação
                this.operador = null; // Limpar o operador após a operação ser concluída
                this.numeroAnterior = null; // Limpar o número anterior após a operação ser concluída
                this.aguardandoOperacao = true; // Indicar que estamos esperando uma nova operação após o resultado ser exibido
            }
        },
        // Função para lidar com a pressão do botão de limpar (AC)
        lidarClear() {
            this.display = '0'; // Resetar a exibição para 0
            this.numeroAtual = null; // Limpar o número atual
            this.numeroAnterior = null; // Limpar o número anterior
            this.operador = null; // Limpar o operador
            this.aguardandoOperacao = false; // Indicar que não estamos esperando uma nova operação
        }
    }
}).mount("#app"); // Montar a aplicação Vue no elemento HTML com o ID "app"
