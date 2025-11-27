const btn = document.getElementById("btn");
const input = document.getElementById("inputField");
const qrContainer = document.getElementById("qrcode");
const download = document.getElementById("download");
const share = document.getElementById("share");
const inputContainer = document.getElementById("before");
const componentContainer = document.getElementById("after");

let qrCode;
btn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a valid URL.");
    componentContainer.style.display = "none";
    inputContainer.style.display = 'flex'
  } else {
    componentContainer.style.display = "flex";
    inputContainer.style.display = 'none'

    qrContainer.innerHTML = "";

    qrCode = new QRCode(qrContainer, {
      text: text,
      width: 200,
      height: 200,
    });
  }
});
