new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      heading: "Ficha de Bombeiro",
      name: "",
      age: "",
      position: "",
      skills: "",
      address: "",
      emergencyContact: "",
      additionalInfo: "", // Nova coluna de informações
    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });

      doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);

      const content = [
        `Nome: ${this.name}`,
        `Idade: ${this.age}`,
        `Cargo: ${this.position}`,
        `Habilidades:`,
        `${this.skills}`,
        `Endereço:`,
        `${this.address}`,
        `Contato de Emergência:`,
        `${this.emergencyContact}`,
      ];

      const additionalColumn = [
        `Outras Informações:`,
        `${this.additionalInfo}`,
      ];

      doc.setFont("helvetica").setFontSize(12);
      let textY = 1.5;
      content.forEach((line) => {
        doc.text(line, 0.5, textY, { align: "left", maxWidth: 7 });
        textY += 0.2;
      });

      // Ajuste a posição da coluna adicional para a esquerda e inicie na mesma altura que as outras informações
      textY = 1.5;
      additionalColumn.forEach((line) => {
        doc.text(line, 5, textY, { align: "left", maxWidth: 7 });
        textY += 0.2;
      });

      doc.setFont("times").setFontSize(11).setFontStyle("italic").text(
        "Ficha de Bombeiro gerada pelo sistema",
        0.5,
        doc.internal.pageSize.height - 0.5
      );

      doc.save("Ficha_de_Bombeiro.pdf");
    },
  },
});
