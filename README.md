# Welcome to the Ditto Chat Game!

This is a chat-based game that tests your knowledge on a variety of topics, including Animals, Movies, Food, and People. The game is built using Flask, a Python web framework.

## How to Play

1. Click the 'Sign In' button if you already have an account, or click the "Sign up" button to create a new account.
2. On the sign-up page, enter your user ID and password. This will help us keep track of your progress and results.
3. Once you've signed up, you'll be taken to the starting page where you can choose a topic for your game by clicking "Game Start!".
4. In the chat view, you will be assigned a random word related to your chosen topic. Ask questions including the word 'it' to guess the answer and type it in the chat box.
5. After submitting your guess, we will let you know if it's correct or incorrect. You can continue playing to improve your score or try a new topic.
6. Finally, you can view your current and previous game results on the last page.

Good luck and have fun!

## How to Run Locally

To run the Ditto Chat Game locally on your machine, follow these steps:

1. Make sure you have Python installed. You can download Python from the official website: https://www.python.org/downloads/
2. Clone this repository to your local machine.
3. Open a terminal or command prompt and navigate to the project's directory.
4. Install the required dependencies by running the following command:
- pip install -r requirements.txt
5. Set up the database by running the following commands:
- flask db init
- flask db migrate
- flask db upgrade
6. Start the Flask development server:
- flask run
7. Open your web browser and visit http://localhost:5000 to access the Ditto Chat Game.

## Testing and Validation

The Ditto Chat Game includes a test suite to ensure its functionality is working correctly. <br />
There are two unit tests file for python and javascript which are in **static** folder. <br />
To run the tests, follow these steps:

### Unit Test
To run js test file type "jest" in command line.<br />
To run python test file run test.py file and see the result.<br />


### Selenium Test
To run selenium file, run selenium_test.py and see the result.<br />

## Development Resources

### Design and Function Draft

![Figma Draft](https://github.com/parky0113/CITS3403/assets/100020229/ff328d20-8a3c-466a-80be-a1ec51991f55)
[Figma Design Draft](https://www.figma.com/file/QwkL9qjIyTV8oICUC05j9J/Un?type=design&node-id=0%3A1&t=Q7yiG8tT4jCwJd6f-1)

### Libraries Used

- alembic==1.10.4
- blinker==1.6.2
- click==8.1.3
- colorama==0.4.6
- dnspython==2.3.0
- email-validator==2.0.0.post2
- Flask==2.3.2
- Flask-Migrate==4.0.4
- Flask-SQLAlchemy==3.0.3
- Flask-WTF==1.1.1
- greenlet==2.0.2
- idna==3.4
- is-disposable-email==1.0.0
- itsdangerous==2.1.2
- Jinja2==3.1.2
- Mako==1.2.4
- MarkupSafe==2.1.2
- SQLAlchemy==2.0.12
- typing_extensions==4.5.0
- Werkzeug==2.3.3
- WTForms==3.0.1
- wtforms-validators==1.0.0
