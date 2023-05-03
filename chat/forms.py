from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField
from wtforms.validators import DataRequired, Length, Email, EqualTo

class UserCreateForm(FlaskForm):
    username = StringField('User ID', validators=[DataRequired(), Length(min=3, max=25)])
    password1 = PasswordField('Passwword', validators=[
        DataRequired(), EqualTo('password2', 'Passwords are not same.')])
    password2 = PasswordField('Passweord Check', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField("Sign-Up")

class UserLoginForm(FlaskForm):
    username = StringField('User ID', validators=[DataRequired(), Length(min=3, max=25)])
    password = PasswordField('Password', validators=[DataRequired()])