
import React from 'react';

export function Colors({ onChangeGroupColor, board }) {
    return (
       <div className="color-container fade-in">
            {board.colors.map((color) => { return <div className={`color ${color.name}`} data-color={color.value} 
            onClick={onChangeGroupColor}></div> })}
        </div> 
    );
}
