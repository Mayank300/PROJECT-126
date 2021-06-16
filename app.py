from classifier import getPrediction
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/predict-digit', methods=['POST'])
def predict_data():
    image = request.files.get('digit')
    prediction = getPrediction(image)
    return jsonify({
        'prediction': prediction
    }),200

if __name__ == '__main__':
    app.run(debug=True)