import os
from datetime import datetime
from dotenv import load_dotenv
import logging
from flask import Flask, render_template, request, jsonify
import tweepy

import Generate

load_dotenv()

app = Flask(__name__, static_folder="../FrontEnd/build/static", template_folder="../FrontEnd/build")

app.logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
app.logger.addHandler(handler)

CONSUMER_KEY = os.environ.get('APIKey')
CONSUMER_SECRET = os.environ.get('APIKeySecret')
ACCESS_TOKEN = os.environ.get('AccessToken')
ACCESS_SECRET = os.environ.get('AccessTokenSecret')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/ChatGPT', methods=['POST'])
def chat_gpt():
    try:
        content = request.json.get('text', f'Test content at {datetime.now()}')
        generated_text = Generate.generate_text(content)
        return jsonify({'generated_text': generated_text}), 200

    except Exception as e:
        app.logger.error(f"Error while generating text: {e}")
        return jsonify({'error': f"Error while generating text: {e}"}), 500


@app.route('/tweet', methods=['POST'])
def tweet():
    if not all([CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET]):
        return "Twitter API credentials are not set correctly.", 500

    try:
        client = tweepy.Client(
            consumer_key=CONSUMER_KEY,
            consumer_secret=CONSUMER_SECRET,
            access_token=ACCESS_TOKEN,
            access_token_secret=ACCESS_SECRET
        )

        tweet_content = request.json.get('text', f'Test Tweet at {datetime.now()}')
        client.create_tweet(text=tweet_content)
        return "Tweeted successfully!", 200
    except Exception as e:
        app.logger.error(f"Error while tweeting: {e}")
        return f"Error while tweeting: {e}", 500


if __name__ == '__main__':
    app.run(debug=True, port=2000)
