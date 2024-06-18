function sendMail() {
    var templateParams = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value
    }

    emailjs.send('service_z1brq7x', 'template_x414mhb', templateParams).then(
        (response) => {
            alert("Message Sent!"),
            console.log('EMAIL SENT!', response.status, response.text);
        },
        (error) => {
            alert("Something went wrong. Please try again!"),
            console.log('FAILED...', error);
        },
      );

}