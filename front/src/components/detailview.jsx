import React from "react";

export default function DetailView({ post, onBackToList }) {
    return (
        <div className="detail-view">
            <h1 className="detail-title">{post.title}</h1>
            <p className="detail-date">{post.date}</p>
            <p className="detail-content">{post.content}</p>
            <button onClick={onBackToList} className="back-button">
                목록으로 돌아가기
            </button>
        </div>
    );
}
