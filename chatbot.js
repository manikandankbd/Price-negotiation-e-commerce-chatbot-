document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        let userMessage = `<p><strong>You:</strong> ${message}</p>`;
        chatBox.innerHTML += userMessage;
        userInput.value = "";

        fetch("/get_response", {
            method: "POST",
            body: JSON.stringify({ message: message }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            let botMessage = `<p><strong>Bot:</strong> ${data.response}</p>`;
            chatBox.innerHTML += botMessage;

            if (data.response.includes("Redirecting to payment")) {
                setTimeout(() => {
                    window.location.href = "/checkout";
                }, 2000);
            }
        });
    }
});
