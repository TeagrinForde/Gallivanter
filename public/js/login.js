const loginForm = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Login Failed');
        }    
    }
};

const signupForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#usernameSignup").value.trim();
    const email = document.querySelector("#emailSignup").value.trim();
    const password = document.querySelector("#passwordSignup").value.trim();

    if (username && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({username, email, password}),
            headers: { "Content-Type": "application/json"},
        });
        
        if(response.ok) {
            document.location.replace("/");
        } else {
            alert ("Login Failed");
        }
    }
};

document
    .querySelector(".loginForm")
    .addEventListener("submit", loginForm);

document
    .querySelector(".signupForm")
    .addEventListener("submit", signupForm);