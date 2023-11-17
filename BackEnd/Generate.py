import os
from dotenv import load_dotenv

from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)


def generate_text(text):
    if not text.strip():
        print("ku")
        return ""

    messages = [
        {"role": "system",
         "content": "あなたは岐阜大学　起業部　広報担当　ツイッター担当です。日々役に立つ情報を発信してください。これから入力されるキーワードや文章を元にツイートのみを1つ制作してください。"},
        {"role": "user", "content": text}
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.2,
        max_tokens=50
    )

    # # 新しいAPI形式でレスポンスを取得
    translated_text = response.choices[0].message.content.strip()
    return translated_text
