from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/operacion/suma', methods=['POST'])
def suma():
	data = request.json
	try:
		num1 = float(data['num1'])
		num2 = float(data['num2'])
		resultado = num1 + num2
		return jsonify({
			'resultado': resultado
		}), 200
	except (KeyError, ValueError):
		return jsonify({'error': 'Invalid input'}), 400
	
@app.route('/operacion/resta', methods=['POST'])
def resta():
	data = request.json
	try:
		num1 = float(data['num1'])
		num2 = float(data['num2'])
		resultado = num1 - num2
		return jsonify({
			'resultado': resultado
		}), 200
	except (KeyError, ValueError):
		return jsonify({'error': 'Invalid input'}), 400
	

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=3000, debug=True)