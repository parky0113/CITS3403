from flask import Blueprint, render_template, request, g
from datetime import datetime
from chat.models import chatting
from chat.static.sqlprocess import create_connection, insert_table
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
    chatting_list = chatting.query.order_by(chatting.id.desc())
    return render_template('chatting/chatting_list.html', chatting_list=chatting_list)


@bp.route('/content/<int:chatting_id>/')
def content(chatting_id):
    info = chatting.query.get(chatting_id)
    return render_template('chatting/chatting_content.html', info=info)
