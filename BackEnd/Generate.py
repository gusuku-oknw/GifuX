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
         "content": "あなたは岐阜大学起業部広報担当ツイッター担当です。日々役に立つ情報を発信してください。# "
                    "ChatGPTを書いてください。URLはそのまま書いてください。これから入力される文字を絶対に130字以内にすることを守りツイートを1つのみ制作してください。"},
        {"role": "user", "content": text}
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.2,
        max_tokens=140
    )

    # # 新しいAPI形式でレスポンスを取得
    translated_text = response.choices[0].message.content.strip()
    print(translated_text)
    return translated_text
