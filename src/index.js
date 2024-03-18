// Manejo de Login
$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();

    // Verificar las credenciales
    if (email === "admin@mail.com" && password === "12345") {
      // Credenciales válidas, redirigir a la pantalla de wallet
      window.location.href = "./pages/menu.html";
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      alert("Usuario o contraseña invalido. Inténtalo de nuevo.");
    }
  });
});

// Manejo de saldo
$(document).ready(function () {
  // Inicializar balance desde localStorage o a 0 si no hay nada almacenado previamente
  let balance = parseFloat(localStorage.getItem("balance")) || 0;
  updateBalance();

  function updateBalance() {
    $("#balance").text(balance.toFixed(2));
  }

  $("#depositBtn").click(function () {
    let amount = parseFloat($("#amount").val());
    console.log(amount);
    if (!isNaN(amount) && amount > 0) {
      balance += amount; // Actualizar el balance primero
      console.log("valor balance: " + balance);
      localStorage.setItem("balance", balance); // Guardar el nuevo balance en localStorage
      updateBalance(); // Actualizar el balance en el menu principal
      alert("Depósito realizado!");
      window.location.href = "./menu.html";
    } else {
      alert("Monto inválido. Por favor ingrese un número positivo.");
    }
  });

  // Función de clic para el botón de retiro/envío
  $("#sendAmount").click(function () {
    let sendAmount = parseFloat($("#amount").val());
    if (!isNaN(sendAmount) && sendAmount > 0 && sendAmount <= balance) {
      balance -= sendAmount; // Actualizar el balance
      localStorage.setItem("balance", balance); // Actualizar el balance en localStorage
      updateBalance(); // Actualizar la visualización del balance
      $("#amount").val(""); // Limpiar el campo de entrada
      alert("Retiro exitoso!");
      window.location.href = "./menu.html";
    } else {
      alert("Cantidad no válida. Ingrese un número válido dentro de su saldo.");
    }
  });
});
