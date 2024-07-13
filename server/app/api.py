from flask import Blueprint, request, jsonify, current_app, send_from_directory
# from flask_socketio import emit
import os

main = Blueprint('main', __name__, 
                static_url_path='', 
                static_folder='../../client/build/')

@main.route('/messages', methods=['GET'])
def get_messages():
    db = current_app.db
    messages_ref = db.collection('messages')
    docs = messages_ref.stream()
    messages = []
    for doc in docs:
        message = doc.to_dict()
        message['id'] = doc.id  # Include the document ID
        messages.append(message)
    return jsonify(messages)

@main.route('/messages', methods=['POST'])
def post_message():
    db = current_app.db
    data = request.get_json()
    messages_ref = db.collection('messages')
    messages_ref.add(data)
    return jsonify({"success": True})

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

@main.route("/", defaults={'path':''})
@main.route('/<path:path>')
def serve(path):
    if path != '' and os.path.exists(os.path.join(main.static_folder, path)):
        return send_from_directory(main.static_folder, path)
    else:
        return send_from_directory(main.static_folder, 'index.html')
    
# @main.route('/socket.io')
# def socketio():
#     return current_app.socketio