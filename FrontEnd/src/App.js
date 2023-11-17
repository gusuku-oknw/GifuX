import React, { useState } from 'react';
import { Div, Button, Textarea } from 'atomize'
import { SuccessNotification, WarningNotification, InfoNotification, AlertNotification } from './Notification';

function App() {
    const [tweetText, setTweetText] = useState('');
    const [ChatGPTText, setChatGPTText] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleTweetChange = (event) => {
        setTweetText(event.target.value);
    };

    const submitTweet = async () => {
        try {
            const response = await fetch('/tweet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: tweetText }),
            });

            if (response.ok) {
                setShowSuccess(true);
            } else {
                setShowWarning(true);
            }
        } catch (error) {
            setShowAlert(true);
        }
    };

    const submitChatGPT = async () => {
        try {
            const response = await fetch('/ChatGPT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: ChatGPTText }),
            });

            if (response.ok) {
                const data = await response.json();
                setTweetText(data.generated_text); // Update the tweetText state
                setShowSuccess(true);
            } else {
                setShowWarning(true);
            }
        } catch (error) {
            setShowAlert(true);
        }
    };


    return (
        <Div m="3rem">
            <header>
                <Div　p="1rem">
                    chatGPTを使用したツイートをしよう
                </Div>
            </header>
            <main>
                <Textarea
                    placeholder="キーワードや文章を入力してください"
                    value={ChatGPTText}
                    onChange={handleTweetChange}
                />
                <Div p="1rem" d="flex" justify="flex-end">
                    <Button
                        bg="success800"
                        onClick={submitChatGPT}>
                        生成
                    </Button>
                </Div>
                <Textarea
                    placeholder={"ポストする文章です"}
                    value={tweetText}
                    onChange={handleTweetChange}
                />
                <Div p="1rem" d="flex" justify="flex-end">
                    <Button
                        onClick={submitTweet}>
                        ポスト
                    </Button>
                </Div>
                <SuccessNotification message={"ツイートしました"} isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
                <WarningNotification message={"Warning"} isOpen={showWarning} onClose={() => setShowWarning(false)} />
                <InfoNotification message={""}　isOpen={showInfo} onClose={() => setShowInfo(false)} />
                <AlertNotification message={"エラー"}　isOpen={showAlert} onClose={() => setShowAlert(false)} />
            </main>
        </Div>
    );
}

export default App;
