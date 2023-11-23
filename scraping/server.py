from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import get_search_result

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/search', methods=['GET'])
def search_recipe():
    keyword = request.args.get('keyword', '')
    print(keyword)
    result_urls = get_search_result(keyword.split(','))
    return jsonify({'urls':result_urls})

if __name__ == '__main__':
    app.run(debug=True)