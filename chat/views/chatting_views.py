from flask import Blueprint, render_template

from chat.models import chatting

bp = Blueprint('chatting', __name__, url_prefix='/chatting')


@bp.route('/list/')
def _list():
    chatting_list = chatting.query.order_by(chatting.id.desc())
    return render_template('chatting/chatting_list.html', chatting_list=chatting_list)


@bp.route('/content/<int:chatting_id>/')
def content(chatting_id):
    info = chatting.query.get(chatting_id)
    return render_template('chatting/chatting_content.html', info=info)