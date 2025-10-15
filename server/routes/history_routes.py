from flask import Blueprint
from controllers.history_controllers import get_registers, get_unique 
history_bp = Blueprint('history_bp', __name__)

@history_bp.route('/history', methods=['GET'])
def registers():
    return get_registers()

@history_bp.route('/history/unique/<string:id>', methods=["GET"])
def registers_byid(id: str):
    return get_unique(id)

