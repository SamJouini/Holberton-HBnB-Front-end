from flask import Blueprint, request, current_app
import jwt


auth = Blueprint('auth', __name__)

@auth.route("/login", methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    user_id = authenticate(email, password)

    if user_id is not None:
        payload =  {"user_id": str(user_id)}
        token = jwt.encode(payload, current_app.config["SECRET_KEY"])
        return {"access_token": token}


    return "Utilisateur inconnu", 401
    """authentification de l'utilisateur = vérifier login + mdp existe
    construire la clé"""

def authenticate(email, password):
    if email == "sam@jouini.fr":
        return 1
    return None
