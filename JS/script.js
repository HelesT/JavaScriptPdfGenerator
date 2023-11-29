function gerarPDF(){

{//VARIAVEIS GLOBAIS
  var idPaciente = document.getElementById('idUsuario');
  var ImagemRecusa;
}

{//OBTEM O ARQUIVO DE IMAGEM
  $.ajax({
    type: 'GET',
    url: 'PHP/obterDados.php',
    dataType: 'json',
    data: {
        id: idPaciente.value
    },
    success: (data) => {
        data.forEach((item) => {
          ImagemRecusa = item.assinatura_recusa;
        })
        console.log("sucesso 1");
    }
  })
}

{//CHAMAR gerarPDF2 EM 1 SEGUNDO
  setTimeout(() => {
    gerarPDF2();
  }, 1000);
}

  function gerarPDF2(){//OBTEM OS DADOS E GERA O PDF
    new Vue({
      el: "#app",
      vuetify: new Vuetify(),
      data() {//DADOS DO PDF
        return {
          additionalInfo: "",
          imageBase64: ImagemRecusa,
        };
      },
      created() {//FUNÇÕES DO PDF
        this.obterDados();
      },
      methods: {
        obterDados(){//OBTEM DADOS DE TEXTO E ADICIONA AO additionalInfo
  
          $.ajax({
            type: 'GET',
            url: 'PHP/obterDados.php',
            dataType: 'json',
            data: {
                id: idPaciente.value
            },
            success: (data) => {
                data.forEach((item) => {
                  this.additionalInfo += item.cpf_paciente;
                  //this.additionalInfo += "" + item.exemplo + "\n";
                })
            }
          })
  
          setTimeout(() => {
            this.generatePDF();
          }, 1000);
        },

        generatePDF(){//GERA O PDF
          const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "letter",
          });
    
          const lines = this.additionalInfo.split('\n');
          const lineHeight = 12 / 72;
          const pageHeight = 11;
          let y = 1;
    
          lines.forEach(line => {
            if (y + lineHeight > pageHeight) {
              doc.addPage();
              y = 1;
            }
    
            doc.setFontSize(12);
            doc.text(line, 0.5, y);
            y += lineHeight;
          });
    
          // Adiciona a imagem no final do PDF
          const imgProps = doc.getImageProperties(this.imageBase64);
          const imgWidth = 2; // Largura da imagem em polegadas
          const imgHeight = imgProps.height * imgWidth / imgProps.width;
    
          doc.addPage();
          doc.addImage(this.imageBase64, 'JPEG', 0.5, 0.5, imgWidth, imgHeight);
    
          doc.save("Ficha_de_Bombeiro.pdf");
        },
      },
    });
  }
}

//Definir Tamanho e Estilo da Fonte:
//doc.setFontSize(16); // Define o tamanho da fonte para 16 pontos
//doc.setFont("times", "italic"); // Define a fonte para Times Italic
//doc.setFontType("bold"); // Define o estilo da fonte para negrito

//Definir Cor do Texto:
//doc.setTextColor(255, 0, 0); // Define a cor do texto para vermelho (RGB)

//Adicionar Texto ao PDF:
//doc.text("Texto do PDF", 10, 20); // Adiciona texto na posição (10, 20)

//Adicionar Retângulos e Formas:
//doc.rect(10, 30, 50, 20); // Adiciona um retângulo na posição (10, 30) com largura 50 e altura 20
//doc.triangle(60, 30, 80, 30, 70, 50, "FD"); // Adiciona um triângulo
//doc.circle(100, 40, 10); // Adiciona um círculo na posição (100, 40) com raio 10

//Adicionar Imagens ao PDF:
//const imgData = "data:image/jpeg;base64,/9j/4AAQSk..."; // URL da imagem ou dados base64
//doc.addImage(imgData, "JPEG", 10, 10, 50, 50); // Adiciona uma imagem na posição (10, 10) com largura 50 e altura 50

//Adicionar Quebras de Página:
//doc.addPage(); // Adiciona uma nova página ao PDF

//Adicionar Links:
//doc.textWithLink("Clique aqui", 10, 20, { url: "https://www.exemplo.com" }); // Adiciona um link na posição (10, 20)

//Definir Cor de Fundo:
//doc.setFillColor(200, 220, 255); // Define a cor de fundo para azul claro (RGB)
//doc.rect(10, 30, 50, 20, "F"); // Adiciona um retângulo com cor de fundo

//-------------------------------------------------------------------------------------------------------------------------------------