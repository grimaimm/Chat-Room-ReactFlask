from flask import Blueprint, request, jsonify, current_app, send_from_directory
# from flask_socketio import emit
from app import cache
import os
# ==========================================================================================================

main = Blueprint('main', __name__, 
                static_url_path='', 
                static_folder='../../client/build/')

# Cache key
CACHE_KEY = 'cached_messages'

@main.route('/messages/api', methods=['GET'])
@cache.cached(timeout=86400, key_prefix=CACHE_KEY)
def dev_get_messages():
    cached_messages = cache.get(CACHE_KEY)
    if cached_messages:
        return jsonify(cached_messages)

    db = current_app.db
    messages_ref = db.collection('messages')
    docs = messages_ref.stream()
    
    messages = []
    for doc in docs:
        message = doc.to_dict()
        message['id'] = doc.id
        messages.append(message)

    cache.set(CACHE_KEY, messages)
    return jsonify(messages)

@main.route('/messages/api', methods=['POST'])
def dev_post_message():
    db = current_app.db
    data = request.get_json()
    messages_ref = db.collection('messages')
    messages_ref.add(data)
    cache.delete(CACHE_KEY)
    return jsonify({"success": True})


# Endpoint Development GET
# @main.route('/messages/api', methods=['GET'])
# def dev_get_messages():
#     db = current_app.db
#     messages_ref = db.collection('messages')
#     docs = messages_ref.stream()
#     messages = []
#     for doc in docs:
#         message = doc.to_dict()
#         message['id'] = doc.id
#         messages.append(message)
#     return jsonify(messages)

# Endpoint Development POST
# @main.route('/messages/api', methods=['POST'])
# def dev_post_message():
#     db = current_app.db
#     data = request.get_json()
#     messages_ref = db.collection('messages')
#     messages_ref.add(data)
#     return jsonify({"success": True})


# ==========================================================================================================

# Endpoint Production POST
# @main.route('/messages', methods=['POST'])
# def post_message():
#     db = current_app.db
#     data = request.get_json()
#     messages_ref = db.collection('messages')
#     messages_ref.add(data)
#     return jsonify({"success": True})

# Endpoint Production GET
# @main.route('/messages', methods=['GET'])
# def get_messages():
#     db = current_app.db
#     messages_ref = db.collection('messages')
#     docs = messages_ref.stream()
#     messages = []
#     for doc in docs:
#         message = doc.to_dict()
#         message['id'] = doc.id
#         messages.append(message)
#     return jsonify(messages)

# ==========================================================================================================

@main.route("/", defaults={'path':''})
@main.route('/<path:path>')
def serve(path):
    if path != '' and os.path.exists(os.path.join(main.static_folder, path)):
        return send_from_directory(main.static_folder, path)
    else:
        return send_from_directory(main.static_folder, 'index.html')
    
# ==========================================================================================================

# @main.route('/messages', methods=['GET'])
# def get_messages():
#     db = current_app.db
#     messages_ref = db.collection('messages')
#     docs = messages_ref.stream()
#     messages = []
#     for doc in docs:
#         messages.append(doc.to_dict())
#     return jsonify(messages)

# @main.route('/messages', methods=['POST'])
# def post_message():
#     db = current_app.db
#     data = request.get_json()
#     messages_ref = db.collection('messages')
#     messages_ref.add(data)
#     return jsonify({"success": True})

# ==========================================================================================================

# @main.route('/socket.io')
# def socketio():
#     return current_app.socketio