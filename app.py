import pandas as pd
from flask import Flask, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import os

# Cria uma aplicação Flask
app = Flask(__name__)

# Define a pasta de upload e as extensões permitidas
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'xlsx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Garante que a pasta de upload exista
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Função para verificar se o arquivo é permitido
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Rota para a página inicial
@app.route('/')
def home():
    return render_template('index.html')

# Rota para fazer o upload do arquivo
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return redirect(url_for('show_productivity', filename=filename))
    return redirect(request.url)

#ivity/<filename>')
def show_productivity(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    df = pd.read_excel(filepath, engine='openpyxl')
    
    # Base de usuários fornecida pelo usuário
    users = {
        'MÓVEL': [
            'N6104793', 'N5931955', 'N6173067', 'N6071740', 'N6172207', 'F204763'
        ],
        'EMPRESARIAL': [
            'N6088107', 'N5619600', 'N0189105', 'N5713690', 'N5802257', 'N5604148',
            'N5819183', 'N5926003', 'N5932064'
        ],
        'RESIDENCIAL': [
            'N0238475', 'N5923221', 'F160641', 'N5772086', 'N0239871', 'N5577565',
            'N5737414', 'N5972428', 'N6173055', 'N5932090', 'N0255801',
            'N4014011', 'N5923996'
        ]
    }
    
    # Separar dados por setor
    data_by_sector = {}
    for sector, user_ids in users.items():
        data_by_sector[sector] = df[df.iloc[:, 0].isin(user_ids)]
    
    return render_template('productivity.html', data_by_sector=data_by_sector)

# Executa a aplicação
if __name__ == '__main__':
    app.run(debug=True)
Arquivo HTML: index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload de Produtividade</title>
</head>
<body>
    <h1>Upload de Produtividade</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
</body>
</html>
