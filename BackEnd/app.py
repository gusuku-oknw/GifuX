import logging
from flask import Flask, render_template


app = Flask(__name__, static_folder="../FrontEnd/build/static", template_folder="../FrontEnd/build")

# ログレベルを設定
app.logger.setLevel(logging.DEBUG)  # 任意のログレベルを選択
# ログハンドラを追加
handler = logging.StreamHandler()
app.logger.addHandler(handler)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.debug = True
    app.run()
