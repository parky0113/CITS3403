import sqlite3
from datetime import datetime
from flask import g

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except sqlite3.Error as e:
        print(e)

    return conn

def insert_table(conn, chat):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """
    chat = clean_data(chat)
    sql = ''' INSERT INTO chatting(content, create_date, user_id)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    dt_string = datetime.now().isoformat(sep=" ", timespec="seconds")
    task = (chat,dt_string,str(g.user)[-2])
    cur.execute(sql, task)
    conn.commit()
    return cur.lastrowid

def clean_data(chat):
    emp = ""
    for c in chat:
        emp += c
    return emp

def clean_chat(content):
    result = ""
    while any(item in content for item in ['*B', '*U']):
        if content[content.find("*")+1] == "B":
            parts = content.partition("*B")
            msg = f"""
            <div class="msg left-msg">

            <div class="msg-bubble">
                <div class="msg-info">
                <div class="msg-info-name">Ditto</div>
                </div>

                <div class="msg-text">{parts[0]}</div>
            </div>
            </div>

            """
            result += msg
            content = parts[2]
        else:
            parts = content.partition("*U")
            msg = f"""
            <div class="msg right-msg">

            <div class="msg-bubble">
                <div class="msg-info">
                <div class="msg-info-name">User</div>
                </div>

                <div class="msg-text">{parts[0]}</div>
            </div>
            </div>
            
            """
            result += msg
            content = parts[2]
    return result
