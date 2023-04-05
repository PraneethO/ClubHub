// ! Event Listener for Student Form

var studentBox = document.getElementById("SerrorBox");

document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
      username: document.getElementById('Susername').value,
      password: document.getElementById('Spassword').value,
      grade: document.getElementById('Sgrade').value,
      zip: document.getElementById('Szipcode').value,
      role: true,
      industry: "null"
    }

    fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if(response.status == 201) {
            window.location.href="../dashboard.html";
        } else if(response.status == 400) {
            companyBox.display = "block";
            companyBox.border = "2px solid white";
            companyBox.padding = "5px";
            studentBox.innerHTML = "All fields are required!"
        } else if(response.status == 409) {
            companyBox.display = "block";
            companyBox.border = "2px solid white";
            companyBox.padding = "5px";
            studentBox.innerHTML = "Username already found! Why don't you login?"
        } else {
            companyBox.display = "block";
            companyBox.border = "2px solid white";
            companyBox.padding = "5px";
            studentBox.innerHTML = "Internal Server Erorr. Contact us"
        }      
    });
    
    
    return false;
  })


// ! Event Listener for Company 

var companyBox = document.getElementById("CerrorBox");

document.getElementById("company-form").addEventListener("submit", function(event) {
event.preventDefault();

const formData = {
    username: document.getElementById('Cname').value,
    password: document.getElementById('Cpassword').value,
    grade: 9999,
    zip: document.getElementById('Czipcode').value,
    role: false,
    industry: document.getElementById('Cindustry').value
}

fetch('http://localhost:8000/users', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
    'Content-Type': 'application/json'
    }
})
    .then(response => {
        if(response.status == 201) {
            window.location.href = "../dashboard.html";
        } else if(response.status == 400) {
            companyBox.display = "block";
            companyBox.border = "2px solid white";
            companyBox.padding = "5px";
            companyBox.innerHTML = "All fields are required!"
        } else if(response.status == 409) {
            companyBox.display = "block";
            companyBox.border = "2px solid white";
            companyBox.padding = "5px";
            companyBox.innerHTML = "Username already found! Why don't you login?"
        } else {
            companyBox.display = "block";
            companyBox.border = "2px solid white";
            companyBox.padding = "5px";
            companyBox.innerHTML = "Internal Server Erorr. Contact us"
        }
    });

return false;
})