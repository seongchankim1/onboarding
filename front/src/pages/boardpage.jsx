import React, { useState } from "react";

const posts = {
    latestPatch: {
        title: "최신 패치 내역",
        content: `
      - 네온: 에너지 충전 속도 20% 감소.
      - 제트: 블레이드 스톰 지속시간 감소.
      - 새로운 맵 '스펙터' 추가.
    `,
    },
    upcomingPatch: {
        title: "패치 예정",
        content: `
      - 신규 요원 출시 예정.
      - '스펙터' 맵 조정 테스트.
      - 게임 엔진 최적화 작업 진행 중.
    `,
    },
    agentUpdates: {
        title: "요원별 업데이트",
        content: `
      - 레이나: 힐량 조정.
      - 브림스톤: 스모크 지속시간 증가.
      - 킬조이: 터렛의 공격력 감소.
    `,
    },
};

export default function PatchNotesPage() {
    const [selectedPost, setSelectedPost] = useState(null); // 현재 표시할 포스트 상태

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex">
            {/* 사이드바 */}
            <aside className="w-1/5 bg-gradient-to-t from-red-900 to-gray-800 p-4 shadow-lg rounded-2xl my-6 mx-4">
                {/* 상단 로고 */}
                <div className="flex flex-col items-center mb-4">
                    <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xl font-bold">V</span> {/* 로고 예시 */}
                    </div>
                    <h2 className="text-lg font-semibold mt-2">발로란트</h2>
                </div>
                {/* 버튼 목록 */}
                <ul className="space-y-3">
                    <li
                        className={`p-3 rounded-xl cursor-pointer transition-transform duration-300 ${
                            selectedPost === "latestPatch" ? "bg-red-700 scale-105 shadow-md" : "bg-gray-700 hover:bg-red-600"
                        }`}
                        onClick={() => setSelectedPost("latestPatch")}
                    >
                        최신 패치 내역
                    </li>
                    <li
                        className={`p-3 rounded-xl cursor-pointer transition-transform duration-300 ${
                            selectedPost === "upcomingPatch" ? "bg-red-700 scale-105 shadow-md" : "bg-gray-700 hover:bg-red-600"
                        }`}
                        onClick={() => setSelectedPost("upcomingPatch")}
                    >
                        패치 예정
                    </li>
                    <li
                        className={`p-3 rounded-xl cursor-pointer transition-transform duration-300 ${
                            selectedPost === "agentUpdates" ? "bg-red-700 scale-105 shadow-md" : "bg-gray-700 hover:bg-red-600"
                        }`}
                        onClick={() => setSelectedPost("agentUpdates")}
                    >
                        요원별 업데이트
                    </li>
                </ul>
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 p-6">
                <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl">
                    {selectedPost ? (
                        <>
                            <h1 className="text-4xl font-bold text-red-400 mb-4">{posts[selectedPost].title}</h1>
                            <p className="text-gray-200 whitespace-pre-wrap">{posts[selectedPost].content}</p>
                        </>
                    ) : (
                        <p className="text-gray-300">왼쪽 메뉴에서 항목을 선택하여 내용을 확인하세요.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
