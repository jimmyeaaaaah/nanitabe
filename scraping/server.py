from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import get_recipe_ids, get_recipe_info_from_url

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/recipe/search', methods=['GET'])
def search_recipe():
    keyword = request.args.get('keyword', '')
    result_ids = get_recipe_ids(keyword.split(','))
    return jsonify({'ids':result_ids})

@app.route('/api/recipe/details', methods=['GET'])
def get_recipe_info():
    recipe_id = request.args.get('id', "")
    recipe_url = "https://www.kurashiru.com/recipes/"+recipe_id
    recipe_details = get_recipe_info_from_url(recipe_url)
    return jsonify(recipe_details)

if __name__ == '__main__':
    app.run(debug=True)