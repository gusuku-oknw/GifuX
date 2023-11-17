// Light Notifications
import React, { useState } from 'react';
import { Div, Button, Notification, Icon } from "atomize";


function SuccessNotification({ message, isOpen, onClose }) {
    return (
        // Success
        <Notification
            bg="success100"
            textColor="success800"
            isOpen={isOpen}
            onClose={onClose}
            prefix={<Icon name="Success" color="success800" size="18px" m={{r: "0.5rem"}}/>}
        >
            {message}
        </Notification>
    );
}

function WarningNotification({ message, isOpen, onClose }) {
    return (
        // Warning
        <Notification
            bg="warning100"
            textColor="warning800"
            isOpen={isOpen}
            onClose={onClose}
            prefix={
                <Icon
                    name="Alert"
                    color="warning800"
                    size="18px"
                    m={{ r: "0.5rem" }}
                />
            }
        >
            {message}
        </Notification>
    );
}

function InfoNotification({ isOpen, onClose }) {
    return (
        // Info
        <Notification
            bg="info100"
            textColor="info800"
            isOpen={isOpen}
            onClose={onClose}
            prefix={
                <Icon
                    name="Info"
                    color="info800"
                    size="18px"
                    m={{r: "0.5rem"}}
                />
            }
        >
            This is a info message
        </Notification>
    );
}

function AlertNotification({ isOpen, onClose }) {
    return (
            // Alert
            <Notification
                bg="danger100"
                textColor="danger800"
                isOpen={isOpen}
                onClose={onClose}
                prefix={
                    <Icon
                        name="Close"
                        color="danger800"
                        size="18px"
                        m={{ r: "0.5rem" }}
                    />
                }
            >
                This is a alert message
            </Notification>
        );
}

export { SuccessNotification, WarningNotification, InfoNotification, AlertNotification };
