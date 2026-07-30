"""Single-process launcher used by the monorepo `npm start`.
Runs the Flask app without the auto-reloader so it's easy to stop cleanly.
(You can still run `python app.py` directly for the reloader/dev mode.)
"""
from app import app

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)
