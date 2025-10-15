from flask import Blueprint
from controllers.file_controllers import first_prediction
file_bp = Blueprint('file_bp', __name__)

@file_bp.route('/csv/<string:model_type>', methods=['POST'])
def manage_data(model_type: str):
    return first_prediction(model_type)
