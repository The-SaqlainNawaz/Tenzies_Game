import React from "react";
import "./style.css"

export default function Die(prop) {
    const styles = {
        backgroundColor: prop.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="card" style={styles} onClick={prop.hold}>
            <h2>{prop.number}</h2>
        </div>
    )
}