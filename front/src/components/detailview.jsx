import React from "react";

export default function DetailView({ post, onBackToList }) {
    return (
        <div className="detail-view">
            <h1 className="detail-title">패치노트 상세</h1>

            <button onClick={onBackToList} className="back-button">
                목록으로 돌아가기
            </button>
        </div>
    );
}
