import React, { useState } from 'react';
import { Div, Button, Textarea } from 'atomize'
import { SuccessNotification, WarningNotification, InfoNotification, AlertNotification } from './Notification';

function App() {
    const [tweetText, setTweetText] = useState('');
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

    return (
        <Div m="3rem">
            <header>
                <Div>
                    chatGPTを使用したツイートをしよう
                </Div>
            </header>
            <main>
                <Textarea
                    placeholder="What's happening?"
                    value={tweetText}
                    onChange={handleTweetChange}
                />
                <Div d="flex" justify="flex-end">
                    <Button onClick={submitTweet}>
                        Tweet
                    </Button>
                </Div>
                <SuccessNotification isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
                <WarningNotification isOpen={showWarning} onClose={() => setShowWarning(false)} />
                <InfoNotification isOpen={showInfo} onClose={() => setShowInfo(false)} />
                <AlertNotification isOpen={showAlert} onClose={() => setShowAlert(false)} />
            </main>
        </Div>
    );
}

export default App;
