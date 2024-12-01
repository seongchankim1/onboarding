import React from "react";

export default function DetailView({ post, onBackToList }) {
    return (
        <div className="detail-view">
            <h1 className="detail-title">패치노트 상세</h1>
            <p className="detail-agent">요원: {post.agent}</p>
            <p className="detail-comment">코멘트: {post.comment}</p>
            <p className="detail-date">날짜: {post.date}</p>
            <p className="detail-content">내용: {post.content}</p>
            <button onClick={onBackToList} className="back-button">
                목록으로 돌아가기
            </button>
        </div>
    );
}
