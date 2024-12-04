import React, { useState } from "react";

export default function ContentContainer({
                                             viewList,
                                             selectedSection,
                                             selectedPost,
                                             patchData,
                                             isLoading,
                                             handleShowList,
                                             handleSelectPatch,
                                         }) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTransition = (callback) => {
        setIsTransitioning(true);
        setTimeout(() => {
            callback();
            setIsTransitioning(false);
        }, 300); // 애니메이션 지속 시간
    };

    // 동일한 버전을 하나로 묶음
    const groupedPatches = patchData.reduce((groups, patch) => {
        if (!groups[patch.version]) {
            groups[patch.version] = [];
        }
        groups[patch.version].push(patch);
        return groups;
    }, {});

    return (
        <main className="flex-1 p-6">
            <div
                className={`bg-gray-900 p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-out transform ${
                    isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
            >
                {isLoading ? (
                    // 로딩 표시
                    <p className="text-gray-400 text-center">로딩 중...</p>
                ) : viewList ? (
                    // 패치 목록 보기
                    <div>
                        <h1 className="text-4xl font-bold text-red-400 mb-4">
                            {selectedSection === "latestPatch"
                                ? "패치 내역"
                                : selectedSection === "upcomingPatch"
                                    ? "패치 예정"
                                    : "요원별 업데이트"}
                        </h1>
                        <div className="space-y-6">
                            {Object.entries(groupedPatches).map(([version, notes]) => (
                                <div
                                    key={version}
                                    className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => handleTransition(() => handleSelectPatch({ version, notes }))}
                                >
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{version}</h2>
                                        <p className="text-gray-400 text-sm">
                                            날짜: {notes[0]?.date}
                                        </p>
                                    </div>
                                    <p className="text-gray-400 text-sm italic">
                                        총 {notes.length}개의 노트
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedPost ? (
                    // 선택된 패치 보기
                    <div>
                        <h1 className="text-4xl font-bold text-red-400 mb-4">{selectedPost.version}</h1>
                        <h2 className="text-gray-300 text-md italic" >
                            {selectedPost.notes[0]?.date || "날짜 정보 없음"}
                        </h2>
                        <p className="text-gray-400 text-md mb-6 italic">
                            총 {selectedPost.notes.length}개의 노트
                        </p>
                        <div className="space-y-6">
                            {selectedPost.notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="p-4 bg-gray-800 rounded-lg shadow-md flex items-start gap-4"
                                >
                                    {/* 에이전트 이미지 추가 */}
                                    <img
                                        src={`../../public/icons/character/${note.agent}.png`}
                                        alt={`${note.agent} icon`}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                    <div>
                                        <h2 className="text-gray-500 whitespace-pre-wrap italic mb-4">
                                            {note.comment}
                                        </h2>
                                        <p className="text-gray-200 whitespace-pre-wrap jua-regular">
                                            {note.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="mt-6 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg shadow-lg"
                            onClick={() => handleTransition(handleShowList)}
                        >
                            목록으로 돌아가기
                        </button>
                    </div>
                ) : (
                    // 항목이 없을 경우
                    <p className="text-gray-300">항목을 선택하세요.</p>
                )}
            </div>
        </main>
    );
}
