const { createApp } = Vue;

createApp({
    
    data() {
        return {
            display: '0', // Valor inicial exibido na calculadora
            numeroAtual: null, // Número que está atualmente sendo inserido na calculadora
            numeroAnterior: null, // Número que estava sendo exibido antes de pressionar um operador
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
                this.lidarOperador(botao); // Lidar com os operadores 
            } else if (botao === '.') {
                this.lidarDecimal(); // Lidar com o ponto decimal
            } else {
                this.lidarNumero(botao); // Lidar com os números
            }
        },
        // Função para lidar com a pressão de um operador
        lidarOperador(botao) {
            if (!this.aguardandoOperacao) {
                if (this.operador !== null) {
                    this.lidarIgual(); // Se já houver um operador, calcular o resultado atual antes de continuar
                } else {
                    this.numeroAnterior = parseFloat(this.display); // Atualizar o número anterior antes de prosseguir
                }
                this.operador = botao;
                this.aguardandoOperacao = true;
            } else {
                this.operador = botao; // Se estivermos esperando uma nova operação, apenas atualize o operador
            }
        },
        // Função para lidar com a pressão de um número
        lidarNumero(numero) {
            if (this.aguardandoOperacao) {
                this.display = numero; // Se estivermos esperando uma nova operação, substituir o número exibido
                this.aguardandoOperacao = false; // Indicar que não estamos mais esperando uma nova operação
            } else if (this.display === '0') {
                this.display = numero; // Se o número exibido for 0, substituir pelo novo número
            } else {
                this.display += numero; // Adicionar o número pressionado ao número exibido
            }
        },
        // Função para lidar com a pressão do ponto decimal
        lidarDecimal() {
            if (!this.display.includes('.')) {
                this.display += '.'; // Adicionar um ponto decimal se ainda não houver um
            }
        },
        // Função para lidar com a pressão do botão de igual
        lidarIgual() {
            if (this.operador && !this.aguardandoOperacao) {
                const operacao = this.numeroAnterior + ' ' + this.operador + ' ' + parseFloat(this.display);
                this.display = eval(operacao);
                this.numeroAtual = parseFloat(this.display); // Atualizar o número atual com o resultado
                this.numeroAnterior = this.numeroAtual; // Atualizar o número anterior com o resultado
                this.operador = null;
                this.aguardandoOperacao = true;
            }
        },
        // Função para lidar com a pressão do botão de limpar 
        lidarClear() {
            this.display = '0'; // Resetar a exibição para 0
            this.numeroAtual = null; // Limpar o número atual
            this.numeroAnterior = null; // Limpar o número anterior
            this.operador = null; // Limpar o operador
            this.aguardandoOperacao = false; // Indicar que não estamos esperando uma nova operação
        }
    }
}).mount("#app"); 
