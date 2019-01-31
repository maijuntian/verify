import React, {Component} from 'react';
import Toast from 'react-native-root-toast'

/**
 * 文本提示框
 */
export default function toast(text, duration = Toast.durations.SHORT, position = -80) {
    return Toast.show(text, {
        duration: duration,
        position: position,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor:"#282828",
        textColor:"#ffffff"
    });
}

export function hideToast(toast) {
    Toast.hide(toast)
}
