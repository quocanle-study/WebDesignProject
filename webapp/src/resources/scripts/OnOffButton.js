//on off button
document.getElementById("toggleOnSale").addEventListener("change", function(event) {
    if (event.target.checked) {
      console.log("On sale is ON");
    } else {
      console.log("On sale is OFF");
    }
  });