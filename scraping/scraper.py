import requests
from bs4 import BeautifulSoup
import re
import json

def get_recipe_ids(keywords):
    recipe_ids = []
    base_url = 'https://www.kurashiru.com/search'
    params = {'query': ' '.join(keywords)}
    response = requests.get(base_url, params=params)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    if soup == None:
        return
    try:
        script = soup.find('script', string=re.compile('window.__delyKurashiruEnvironment.ssrContext'))
        if script == None:
            return
        script_data = re.search(r'window\.__delyKurashiruEnvironment\.ssrContext\s*=\s*({.*?});', str(script))
        if script_data == None:
            return
        data = json.loads(script_data.group(1))
        if data == None:
            return
        recipes = data['state']['fetchMergedContentsSearchV2']['data']['data']
        for recipe in recipes:
            recipe_ids.append(recipe['id'])
    except Exception as e:
        return
    return recipe_ids



def get_html(url, params=None, headers=None):
    try:
        resp = requests.get(url, params=params, headers=headers)
        resp.encoding = 'utf8'
        soup = BeautifulSoup(resp.text, "html.parser")
        return soup
    except Exception as e:
        return None
        
def get_recipe_info_from_url(url):
    result = {}
    soup = get_html(url)
    
    try:
        script = soup.find('script', string=re.compile('window.__delyKurashiruEnvironment.ssrContext'))
        if script == None:
            return
        script_data = re.search(r'window\.__delyKurashiruEnvironment\.ssrContext\s*=\s*({.*?});', str(script))
        if script_data == None:
            return
        data = json.loads(script_data.group(1))
        if data == None:
            return
        attributes = data["state"]["fetchVideo"]["data"]["data"]["attributes"]
        ingredients = attributes["ingredients"]
        instructions = attributes["instructions"]

        result["recipe_id"] = data["state"]["fetchVideo"]["data"]["data"]["id"]
        result["recipe_name"] = attributes["title"]
        result["video_url"] = attributes["mp4-url"]
        result["img_small_url"] = attributes["thumbnail-square-small-url"]
        result["img_normal_url"] = attributes["thumbnail-square-normal-url"]
        result["img_large_url"] = attributes["thumbnail-square-large-url"]
        result["cooking_time"] = attributes["cooking-time"]
        result["introduction"] = attributes["introduction"]
        result["expense"] = attributes["expense"]
        result["serving"] = attributes["servings-size"]
        result["rating-count"] = attributes["rating-count"]
        result["calorie"] = attributes["calorie"]

        ingredient_list = []
        for ingredient in ingredients:
            if ingredient["type"] != "ingredients":
                continue
            ingredient_dic = {}
            ingredient_dic["ingredient_id"] = ingredient["id"]
            ingredient_dic["ingredient_title"] = ingredient["name"]
            ingredient_dic["ingredient_name"] = ingredient["actual-name"]
            ingredient_dic["ingredient_amount"] = ingredient["quantity-amount"]
            ingredient_list.append(ingredient_dic)
        result["ingredient_list"] = ingredient_list

        instruction_list = []
        for instruction in instructions:
            if instruction["type"] != "instructions":
                continue
            instruction_dic = {}
            instruction_dic["index"] = instruction["sort-order"]
            instruction_dic["body"] = instruction["body"]
            instruction_list.append(instruction_dic)
        result["instruction_list"] = instruction_list
    except Exception as e:
        return
    return result
