import React from 'react'

export function Colors({onChangeGroupColor}) {

    return (
        <div className="color-container">
            <div className="color darkGreen" data-color="#037f4c" onClick={onChangeGroupColor}></div>
            <div className="color green" data-color="#00c875" onClick={onChangeGroupColor}></div>
            <div className="color yellowGreen" data-color="#9cd326" onClick={onChangeGroupColor}></div>
            <div className="color beige" data-color="#cab641" onClick={onChangeGroupColor}></div>
            <div className="color yellow" data-color="#ffcb00" onClick={onChangeGroupColor}></div>
            <div className="color darkPurple" data-color="#784bd1" onClick={onChangeGroupColor}></div>
            <div className="color purple" data-color="#a25ddc" onClick={onChangeGroupColor}></div>
            <div className="color turquoise" data-color="#0086BE" onClick={onChangeGroupColor}></div>
            <div className="color blue" data-color="#579bfc" onClick={onChangeGroupColor}></div>
            <div className="color lightBlue" data-color="#66ccff" onClick={onChangeGroupColor}></div>
            <div className="color darkRed" data-color="#bb3354" onClick={onChangeGroupColor}></div>
            <div className="color red" data-color="#e2445c" onClick={onChangeGroupColor}></div>
            <div className="color darkOrange" data-color="#ff642e" onClick={onChangeGroupColor}></div>
            <div className="color orange" data-color="#fdab3d" onClick={onChangeGroupColor}></div>
            <div className="color brown" data-color="#7f5347" onClick={onChangeGroupColor}></div>
            <div className="color grey" data-color="#c4c4c4" onClick={onChangeGroupColor}></div>
            <div className="color darkGrey" data-color="#808080" onClick={onChangeGroupColor}></div>
        </div>
    )
}
