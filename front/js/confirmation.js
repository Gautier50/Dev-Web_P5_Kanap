// On bascule vers la page de confirmation
if (document.URL.includes("confirmation.html")) {
  // Confirmation du numéro de commande
  const orderId = new URL(window.location.href).searchParams.get("id");

  let productOrder = () => {
    // On récupère l'orderId (numéro de commande) depuis le DOM //
    const idSelector = document.getElementById("orderId");
    idSelector.innerHTML = orderId;
  };
  productOrder();

  // On vide le Local Storage après avoir validé la commande //
  localStorage.clear();
}
