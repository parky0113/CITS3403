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
    task = (chat,datetime.now(),str(g.user)[-2])
    cur.execute(sql, task)
    conn.commit()
    return cur.lastrowid

def clean_data(chat):
    emp = ""
    for c in chat:
        emp += c
    return emp
