import React from "react";

export default function ListView({ sectionData, onSelectPatch }) {
    return (
        <div>
            <h1 className="list-title">패치 목록</h1>
            <div className="list-container">
                {sectionData.map((patch) => (
                    <div
                        key={patch.id}
                        className="list-item"
                        onClick={() => onSelectPatch(patch)}
                    >
                        <h2>{patch.title}</h2>
                        <p>{patch.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
