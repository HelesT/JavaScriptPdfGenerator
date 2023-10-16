new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      heading: "Sample PDF Generator",
      moreText: [
        "Here are 10 lines of different foods:",
        "1. Pizza",
        "2. Sushi",
        "3. Burgers",
        "4. Pasta",
        "5. Tacos",
        "6. Ice Cream",
        "7. Steak",
        "8. Salad",
        "9. Ramen",
        "10. Chicken Wings",
      ],
    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });

      // text is placed using x, y coordinates
      doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      // create a line under heading
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      
      // Using array of sentences
      // Usando array de frases
      doc
      .setFont("helvetica")
      .setFontSize(12)
      .text(this.moreText, 0.5, 1.5, { align: "left", maxWidth: "7.5" });

      // Creating footer and saving file
      doc
        .setFont("times")
        .setFontSize(11)
        .setFontStyle("italic")
        .setTextColor(0, 0, 255)
        .text(
          "This is a simple footer located .5 inches from page bottom",
          0.5,
          doc.internal.pageSize.height - 0.5
        )
        .save(`${this.heading}.pdf`);
    },
  },
});
