from flask import Flask, render_template
from flask.ext.navigation import Navigation
from flask.ext.login import LoginManager
from forms import LoginForm

app = Flask(__name__)
nav = Navigation(app)
login_manager = LoginManager()


nav.Bar('top', [
    nav.Item('Feed', 'feed'),
    nav.Item('Profile', 'profile'),
    nav.Item('About', 'about'),
    # nav.Item('Log In', 'login'),
])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/feed')
def feed():
    return render_template('feed.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")