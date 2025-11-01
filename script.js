document.addEventListener("DOMContentLoaded", function () {
    // Chatbot interaction
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatbotResponse = {
        "hello": "Hi there! How can I assist you today?",
        "price": "Are you looking to negotiate the price? Let's discuss!",
        "buy": "Great! I would buy this product for you. Redirecting to payment...",
        "default": "I'm not sure about that. Can you rephrase?"
    };

    sendButton.addEventListener("click", function () {
        let userText = userInput.value.toLowerCase();
        chatBox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;

        let response = chatbotResponse[userText] || chatbotResponse["default"];
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;

        if (userText.includes("buy")) {
            setTimeout(() => {
                window.location.href = "payment.html";
            }, 2000);
        }
        userInput.value = "";
    });

    // Page navigation handling
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let page = this.getAttribute("data-page");
            loadPage(page);
        });
    });

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById("main-content").innerHTML = html;
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Cart functionality
    let cart = [];

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            let product = event.target.dataset.product;
            let price = event.target.dataset.price;
            cart.push({ product, price });
            updateCart();
        }
    });

    function updateCart() {
        let cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";
        cart.forEach(item => {
            cartItems.innerHTML += `<p>${item.product} - $${item.price}</p>`;
        });
    }
});
