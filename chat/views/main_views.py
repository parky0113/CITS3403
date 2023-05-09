from flask import Blueprint, render_template, request, g
from chat.models import chatting
from chat.static.chatprocess import create_connection, insert_table, clean_chat
from chat import db

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/')
def index():
    return render_template("index.html")


@bp.route('/topic')
def topic():
    return render_template('category.html')

@bp.route('/game', methods=['POST'])
def game():
    category = request.form['name']
    return render_template('gamechat.html', category = category)
    
@bp.route('/process-data', methods=['POST'])
def process_data():
    data = request.json['data']
    conn = create_connection("chat.db")
    with conn:
        insert_table(conn,data)
        return "1"

@bp.route('/list/')
def _list():
    chatting_list = chatting.query.filter_by(user_id = str(g.user)[-2])
    return render_template('chatting/chatting_list.html', chatting_list=chatting_list)


@bp.route('/content/<int:chatting_id>/')
def content(chatting_id):
    info = chatting.query.get(chatting_id)
    return render_template('chatting/chatting_log.html', info=info, clean_chat = clean_chat)
