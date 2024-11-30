import React, { useState } from "react"; // useState를 React에서 가져오기

export default function ContentContainer({ viewList, selectedSection, selectedPost, patchSections, handleShowList, handleSelectPatch }) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTransition = (callback) => {
        setIsTransitioning(true);
        setTimeout(() => {
            callback();
            setIsTransitioning(false);
        }, 300); // 애니메이션 지속 시간
    };

    return (
        <main className="flex-1 p-6">
            <div
                className={`bg-gray-900 p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-out transform ${
                    isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
            >
                {viewList ? (
                    // 패치 목록 보기
                    <div>
                        <h1 className="text-4xl font-bold text-red-400 mb-4">
                            {selectedSection === "latestPatch"
                                ? "패치 내역"
                                : selectedSection === "upcomingPatch"
                                    ? "패치 예정"
                                    : "요원별 업데이트"}
                        </h1>
                        <div className="space-y-4">
                            {patchSections[selectedSection].map((patch) => (
                                <div
                                    key={patch.id}
                                    className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => handleTransition(() => handleSelectPatch(patch))}
                                >
                                    <h2 className="text-xl font-semibold">{patch.title}</h2>
                                    <p className="text-gray-400 text-sm">{patch.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedPost ? (
                    // 선택된 패치 보기
                    <div>
                        <h1 className="text-4xl font-bold text-red-400 mb-4">{selectedPost.title}</h1>
                        <p className="text-gray-400 mb-4">{selectedPost.date}</p>
                        <p className="text-gray-200 whitespace-pre-wrap">{selectedPost.content}</p>
                        <button
                            className="mt-6 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg shadow-lg"
                            onClick={() => handleTransition(handleShowList)}
                        >
                            목록으로 돌아가기
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-300">항목을 선택하세요.</p>
                )}
            </div>
        </main>
    );
}
