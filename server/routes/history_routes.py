from flask import Blueprint, jsonify

history_bp = Blueprint('history_bp', __name__)

@history_bp.route('/Foo', methods=['GET'])
def c1():
    """Ruta de ejemplo."""
    return jsonify({"message": "Hola desde la ruta Foo!"})
