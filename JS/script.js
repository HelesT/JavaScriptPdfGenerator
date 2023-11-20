function obterDados() {
  $.ajax({
    type: 'GET',
    url: 'PHP/obterDados.php',
    dataType: 'json',
    success: function(data) {

      data.forEach(function(item) {
        alert(item.senha_cadastro);
      });
    }
  });
}



new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
       additionalInfo: 
`OLA MUNDO`

    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });

      // Divide o conteúdo em partes para acomodar em várias páginas
      const lines = this.additionalInfo.split('\n');
      const lineHeight = 12 / 72; // Altura de linha em polegadas
      const pageHeight = 11; // Altura da página em polegadas
      let y = 1; // Posição Y inicial

      lines.forEach(line => {
        // Verifica se a próxima linha cabe na página atual
        if (y + lineHeight > pageHeight) {
          // Adiciona uma nova página
          doc.addPage();
          y = 1;
        }

        // Adiciona a linha ao PDF
        doc.setFontSize(12);
        doc.text(line, 0.5, y);
        y += lineHeight;
      });

      // Salva o arquivo PDF com o nome 'Ficha_de_Bombeiro.pdf'
      doc.save("Ficha_de_Bombeiro.pdf");
    },
  },
});
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
/*
Certamente, para gerar um PDF com base nas informações inseridas no site, você pode usar a mesma abordagem,
mas agora integrando a geração do PDF com o evento final do seu site. Aqui está um exemplo de como você
pode fazer isso usando Vue.js:

HTML:
No seu arquivo HTML, adicione um botão ou qualquer elemento que você queira usar para acionar a geração do PDF.

<div id="app">
  <!-- Conteúdo do seu site aqui -->
  <button @click="generatePDF">Gerar PDF</button>
</div>
//-------------------------------------------------------------------------------------------------------------------------------------
Vue.js:
Agora, no seu código Vue.js, adicione o método generatePDF para criar o PDF com base nas informações do site.
Suponha que você tenha um objeto paciente com as informações do paciente, você pode incluir essas informações no PDF.

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      paciente: {
        nome: "Nome do Paciente",
        sexo: "Masculino",
        // Outras informações do paciente aqui
      },
    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF();
      
      // Adiciona informações do paciente ao PDF
      doc.setFontSize(12);
      doc.text(`Nome do Paciente: ${this.paciente.nome}`, 10, 10);
      doc.text(`Sexo: ${this.paciente.sexo}`, 10, 20);
      
      // Adiciona outras informações ao PDF conforme necessário
      
      // Salva o arquivo PDF com o nome 'Ficha_de_Paciente.pdf'
      doc.save("Ficha_de_Paciente.pdf");
    },
  },
});

Neste exemplo, quando o botão "Gerar PDF" é clicado, ele chama o método generatePDF, que cria um novo PDF usando jsPDF
e adiciona as informações do paciente ao PDF. Você pode adicionar outras informações da mesma forma.

Certifique-se de ajustar o conteúdo, o estilo e a formatação do PDF de acordo com suas necessidades específicas.
Além disso, você pode integrar este método com o evento final do seu site para garantir que o PDF seja gerado quando
o usuário concluir o processo no site.
*/

// imagem no pdf através do mediumblob
// ----------------------------------------------------
// 1.Recuperar a imagem do banco de dados
// Suponha que você tenha um método em seu servidor que recupere os dados da imagem do banco de dados. Por exemplo, em Node.js usando o MySQL:
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'seu-host',
//   user: 'seu-usuario',
//   password: 'sua-senha',
//   database: 'sua-base-de-dados'
// });

// connection.connect();

// const query = 'SELECT imagem FROM tabela WHERE id = ?';
// const id = 1; // Substitua isso pelo ID da imagem que você deseja recuperar

// connection.query(query, [id], (error, results) => {
//   if (error) throw error;

//   const imagemBlob = results[0].imagem; // Os dados da imagem em formato de buffer
//   // Agora você pode passar `imagemBlob` para o frontend ou convertê-lo em uma URL de dados
// });

// connection.end();
// --------------------------------------
// 2.Converter o blob em uma URL de dados:
// Você pode usar a função`btoa()`para converter os dados do blob em uma string base64 e, em seguida, criar uma URL de dados:
// const blobToDataURL = (blob) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

// // Suponha que `imagemBlob` seja o seu buffer de imagem recuperado do banco de dados
// blobToDataURL(imagemBlob).then((dataURL) => {
//   // `dataURL` agora contém a URL de dados da imagem que você pode usar no frontend
// });
// ------------------------------
// 3.Inserir a imagem no PDF:
// Se você estiver usando uma biblioteca como jsPDF para gerar o PDF, você pode adicionar a imagem usando a URL de dados:
// const doc = new jsPDF();

// // Suponha que `dataURL` seja a URL de dados da imagem que você recuperou anteriormente
// const img = new Image();
// img.onload = () => {
//   doc.addImage(img, 'JPEG', 10, 10, 50, 50); // Adiciona a imagem ao PDF
//   doc.save('arquivo.pdf');
// };
// img.src = dataURL;