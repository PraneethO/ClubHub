// Praneeth O - February 25, 2023
// ^ Just so you know who to blame when the code becomes a dumpster fire

// Code Changes Color When Switch to White Background
const logo = document.getElementById('logo');
const button = document.getElementById('sign-button-container')
const first = document.getElementById('first')

const scrollDistance =  .95 * first.scrollHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollDistance) {
    logo.style.color = 'black';
    button.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
    button.style.color = 'black'
  } else {
    logo.style.color = 'white';
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    button.style.color = 'white'
  }
});

var actionButton = document.getElementById("sign-button-container");
isLoggedIn();

function isLoggedIn() {
  const sessionId = getCookie('sessionId');

  if (!sessionId) {
    actionButton.innerHTML = "Join the Beta or Login";
    actionButton.onclick = () => {window.location.href="./pages/authentication/signUp.html"};
    return;
  }
  const expiryDate = new Date(getCookie('sessionIdExpires'));
  if (expiryDate <= new Date()) {
    actionButton.innerHTML = "Join the Beta or Login";
    actionButton.onclick = () => {window.location.href="./pages/authentication/signUp.html"};
    return;
  }
  actionButton.innerHTML = "Dashboard";
  actionButton.onclick = () => {window.location.href="./pages/dashboard.html"};
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
