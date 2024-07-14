from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin
import os
import secrets
from flask_caching import Cache

cache = Cache()

def create_app():
    app = Flask(__name__,
                static_url_path='', 
                static_folder='../../client/build/')
    app.config['SECRET_KEY'] = secrets.token_hex(16)
    
    CORS(app)

    cred_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'serviceAccountKey.json')
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    app.db = firestore.client()

    app.config['CACHE_TYPE'] = 'simple'
    cache.init_app(app)

    from .api import main
    app.register_blueprint(main)

    return app
