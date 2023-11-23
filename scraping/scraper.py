import requests
from bs4 import BeautifulSoup
import re
import json

def get_search_result(keywords):
    recipe_urls = []
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
            recipe_urls.append('https://www.kurashiru.com/recipes/'+recipe['id'])
    except Exception as e:
        return
    return recipe_urls


# if __name__ == "__main__":
#     result = get_search_result(keywords)
#     print(result)