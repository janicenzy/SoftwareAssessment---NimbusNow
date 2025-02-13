const form = document.querySelector("form");

function sendEmail() {
    Email.send({
        Host : "smtp.mailendo.com",
        Username : "janice.nzey2@gmail.com",
        Password : "2C076183E84C45C93884ED24842A669CCC4F",
        To : "janice.nzey2@gmail.com",
        From : "janice.nzey2@gmail.com",
        Subject : "New Contact Form Newsletter",
        Body : "Name: " + document.getElementById("name").value
            + "<br> Email: " + document.getElementById("email").value
            + "<br> Phone: " + document.getElementById("phone").value
            + "<br> Subject: " + document.getElementById("subject").value
            + "<br> Message: " + document.getElementById("message").value
    }).then(
      message => Swal.fire({
          title: "You stormed through it quick!",
          text: "Welcome to the NimbusNow community!",
          icon: "success"
      })
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        } else {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
        }
    }

    
    let allFilled = true; 
    items.forEach(item => {
        if (item.value === "") {
            allFilled = false; 
        }
    });

    
    if (allFilled) {
        sendEmail();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs(); 
});


const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("keyup", () => {
        if (item.value !== "") {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
        } else {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
    });
});
