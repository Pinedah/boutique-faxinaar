
import time
import os
import re
import pandas as pd
import numpy as np

def load_dataset():
    path = "BOUTIQUE_FAXINAAR/"
    filename = "boutiquefaxinaar.csv"
    df = pd.read_csv(path + filename)
    return df

def generate_html_div(product):
    category = product["CATEGORIA"]
    imgName = str(product["NOMBRE IMAGEN"]).strip().replace("_", "") + '.png'
    alt = product["NOMBRE"] + "-" + product["CATEGORIA"]
    name = product["NOMBRE"]
    description = product["DESCRIPCION"]
    price = product["PRECIO"]

    div = f'''
    <div class="producto-card" data-categoria="{category}">
        <div class="producto-imagen">
            <img src="img/products/{imgName}" alt="{alt}">
        </div>
        <div class="producto-info">
            <h4>{name}</h4>
            <p class="descripcion">{description}</p>
            <p class="precio">${str(float(price))}</p>
            <button class="btn-comprar">Realizar Pedido</button>
        </div>
    </div>
    '''
    return div

if __name__ == "__main__":
    df = load_dataset()

    html = ''
    for _, row in df.iterrows():
        # print(generate_html_div(row))
        html += generate_html_div(row)

    print(html)
