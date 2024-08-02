from flask import Flask

app = Flask(__name__)

@app.route("/login", methods=['POST'])
def login():
    return "hi"
    """ récupérer le login & mdp dans la requete
    authentification de l'utilisateur = vérifier login + mdp existe
    construire la clé"""

@app.route('/login.html')
def login_page():
    return app.send_static_file('login.html')
