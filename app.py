from flask import Flask, render_template, request, jsonify
from chatbot import get_chatbot_response

app = Flask(__name__, template_folder="templates")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/products")
def products():
    return render_template("product.html")

@app.route("/chatbot")
def chatbot():
    return render_template("chatbot.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    user_message = request.json.get("message")
    bot_response = get_chatbot_response(user_message)
    return jsonify({"reply": bot_response})

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')
