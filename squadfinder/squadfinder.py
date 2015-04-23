from flask import Flask, render_template

app = Flask(__name__)

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