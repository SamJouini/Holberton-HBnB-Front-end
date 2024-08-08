from flask import Flask, request
from werkzeug.exceptions import abort
import os

app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

from auth import auth
app.register_blueprint(auth)


@app.route('/', defaults={'page': 'index'})
@app.route('/<page>.html')
def show(page):
    return app.send_static_file(f'pages/{page}.html')
