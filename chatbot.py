import torch
import random
from nltk_utils import tokenize, bag_of_words
import json
from train import NeuralNet

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as f:
    intents = json.load(f)

data = torch.load("data.pth")
model = NeuralNet(data["input_size"], data["hidden_size"], data["output_size"]).to(device)
model.load_state_dict(data["model_state"])
model.eval()

all_words = data["all_words"]
tags = data["tags"]

def get_chatbot_response(sentence):
    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = torch.from_numpy(X).float().to(device)

    output = model(X)

    if output.dim() == 1:
        output = output.unsqueeze(0)

    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    for intent in intents["intents"]:
        if tag == intent["tag"]:
            return random.choice(intent['responses'])

    return "I'm not sure how to respond to that."
