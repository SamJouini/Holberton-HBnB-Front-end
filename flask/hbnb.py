from flask import Flask, request
from werkzeug.exceptions import abort
import jwt
import os

app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

@app.route("/login", methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    user_id = authenticate(email, password)

    if user_id is not None:
        payload =  {"user_id": str(user_id)}
        token = jwt.encode(payload, app.config["SECRET_KEY"])
        return {"access_token": token}


    abort(401, "Utilisateur inconnu")
    """authentification de l'utilisateur = vérifier login + mdp existe
    construire la clé"""

def authenticate(email, password):
    if email == "sam@jouini.fr":
        return 1
    return None

@app.route('/login.html')
def login_page():
    return app.send_static_file('login.html')
