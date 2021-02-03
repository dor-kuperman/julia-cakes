import React, { Component } from 'react'
import './button.css'

const styles = [
    'btn--primary',
    'btn--outline'
]

const sizes = [
    'btn--mdeium',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = styles.includes(buttonStyle) ? buttonStyle : styles[0]
    const checkButtonSize = styles.includes(buttonSize) ? buttonSize : sizes[0]

    return (

        <button className={`btn ${checkButtonSize} btn ${checkButtonStyle}`} onClick={onClick}
            type={type}>
            { children}
        </button >
    )

}

