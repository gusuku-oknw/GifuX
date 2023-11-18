import React, { useState } from 'react';
import { Div, Button, Textarea, Icon } from 'atomize'
import { SuccessNotification, WarningNotification, InfoNotification, AlertNotification } from './Notification';
import Login from './Login'; // Adjust the path according to your file structure

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isChatGPTLoading, setIsChatGPTLoading] = useState(false);
    const [isTweetLoading, setIsTweetLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const submitChatGPT = async () => {
        setIsChatGPTLoading(true); // Start loading
        try {
            const response = await fetch('/ChatGPT', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText }),
            });

            if (response.ok) {
                const data = await response.json();
                setResponseText(data.generated_text);
                setNotificationMessage("ChatGPTにより生成しました");
                setShowSuccess(true);
            } else {
                setShowWarning(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage("エラーが発生しました");
            setShowAlert(true);
        }
        setIsChatGPTLoading(false); // End loading
    };

    const submitTweet = async () => {
        setIsTweetLoading(true); // Start loading

        try {
            const response = await fetch('/tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: responseText }),
            });

            if (response.ok) {
                setNotificationMessage("ポストしました");
                setShowSuccess(true);
            } else {
                setShowWarning(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setNotificationMessage("エラーが発生しました");
            setShowAlert(true);
        }
        setIsTweetLoading(false); // End loading
    };

    const handleResponseChange = (event) => {
        setResponseText(event.target.value);
    };

    return (
        <Div m="3rem">
            {!isAuthenticated ? (
                // Render Login component when not authenticated
                <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            ) : (
                // Main content
                <main>
                <Textarea
                    placeholder="キーワードや文章を入力してください"
                    value={inputText}
                    onChange={handleInputChange}
                />
                <Div p="1rem" d="flex" justify="flex-end">
                    <Button
                        bg="success800"
                        onClick={submitChatGPT}
                        disabled={isChatGPTLoading}
                        prefix={
                            <Icon
                                name={isChatGPTLoading ? "Loading3" : "RightUp"}
                                pos="absolute"
                                top="50%"
                                right="1rem"
                                transform="translateY(-50%)"
                                size="18px"
                                color="white"
                                m={{ l: "0.5rem" }}
                            />
                        }
                        p={{ r: "3rem", l: "2rem" }}
                        m={{ b: "2rem" }}
                    >
                        生成
                    </Button>
                </Div>
                <Textarea
                    placeholder="ポストする文章です"
                    value={responseText}
                    onChange={handleResponseChange} // Add this line to enable editing
                />
                <Div p="1rem" d="flex" justify="flex-end">
                    <Button
                        onClick={submitTweet}
                        disabled={isTweetLoading}
                    >
                        {isTweetLoading ? "ポスト中..." : "ポスト"}
                    </Button>
                </Div>
                <SuccessNotification message={notificationMessage} isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
                <WarningNotification message={"Warning"} isOpen={showWarning} onClose={() => setShowWarning(false)} />
                <AlertNotification message={"エラー"} isOpen={showAlert} onClose={() => setShowAlert(false)} />
            </main>
                )};
        </Div>
    );
}

export default App;
