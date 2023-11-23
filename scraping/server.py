from flask import Flask, request, jsonify
from scraper import get_search_result

app = Flask(__name__)

@app.route('/api/search', methods=['GET'])
def search_recipe():
    keyword = request.args.get('keyword', '')
    print(type(keyword))
    result_urls = get_search_result(keyword.split(','))
    return jsonify({'urls':result_urls})

if __name__ == '__main__':
    app.run(debug=True)