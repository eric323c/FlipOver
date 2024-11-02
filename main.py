from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/favorites")
def favorites():
    return render_template("favorites.html")

@app.route("/search")
def search():
    return render_template("search.html")

@app.route("/local-connections")
def local_connections():
    return render_template("localconnections.html")

@app.route("/new-post")
def new_post():
    return render_template("new_post.html")

@app.route("/settings")
def settings():
    return render_template("settings.html")

if __name__ == "__main__":
    app.run(debug=True)

