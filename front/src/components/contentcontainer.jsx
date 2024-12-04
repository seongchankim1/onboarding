import React, { useState } from "react";

export default function ContentContainer({
                                             viewList,
                                             selectedSection,
                                             selectedPost,
                                             patchData,
                                             isLoading,
                                             handleShowList,
                                             handleSelectPatch,
                                             agentList,
                                             handleSelectAgent,
                                             selectedAgent,
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
                    <div>
                        <h1 className="text-4xl font-bold text-red-400 mb-4">
                            {selectedSection === "latestPatch"
                                ? "패치 내역"
                                : selectedSection === "upcomingPatch"
                                    ? "패치 예정"
                                    : selectedAgent
                                        ? `${selectedAgent} 업데이트 목록`
                                        : "요원별 업데이트"}
                        </h1>

                        {selectedSection === "agentUpdates" && !selectedAgent ? (
                            // 요원 목록 보기 - 그리드 형태로 작게 렌더링
                            agentList && agentList.length > 0 ? (
                                <div
                                    className="grid gap-2"
                                    style={{
                                        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                                    }}
                                >
                                    {agentList.map((agent, index) => (
                                        <div
                                            key={`${agent.name}-${index}`} // 고유한 값 설정
                                            className="flex flex-col items-center p-2 bg-gray-800 rounded-md cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95"
                                            onClick={() => handleSelectAgent(agent.name)} // 요원 선택 시 해당 요원의 패치 데이터 가져오기
                                            style={{ height: "auto" }}
                                        >
                                            <div className="w-16 h-16 flex items-center justify-center mb-1">
                                                {/* 아이콘 이미지 추가 */}
                                                <img
                                                    src={`/icons/character/${agent.name.toLowerCase()}.png`}
                                                    alt={`${agent.koreanName} icon`}
                                                    className="w-full h-full object-contain rounded-full"
                                                />
                                            </div>
                                            <span className="text-md text-center truncate">
                                                {agent.koreanName}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">요원 목록을 찾을 수 없습니다.</p>
                            )
                        ) : (
                            // 최신 패치 또는 요원별 업데이트 목록 보기
                            <div className="space-y-6">
                                {/* 요원 선택 후 돌아가기 버튼 추가 */}
                                {selectedAgent && (
                                    <button
                                        className="mb-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg shadow-lg"
                                        onClick={() =>
                                            handleTransition(() => {
                                                handleSelectAgent(null);
                                                handleShowList();
                                            })
                                        }
                                    >
                                        돌아가기
                                    </button>
                                )}

                                {selectedAgent
                                    ? // 요원별 업데이트의 경우 모든 패치 표시
                                    patchData.map((note, index) => (
                                        <div
                                            key={`${note.id}-${index}`} // 노트 ID에 인덱스를 조합해 고유한 키로 사용
                                            className="p-4 bg-gray-800 rounded-lg shadow-md flex items-start gap-4"
                                        >
                                            <img
                                                src={`/icons/character/${note.agent.toLowerCase()}.png`}
                                                alt={`${note.agent} icon`}
                                                className="w-16 h-16 object-cover rounded-full"
                                            />
                                            <div>
                                                <h2 className="text-xl font-semibold text-red-400 mb-2">
                                                    {note.version}
                                                </h2>
                                                <h2 className="text-gray-500 whitespace-pre-wrap italic mb-4">
                                                    {note.comment}
                                                </h2>
                                                <p className="text-gray-200 whitespace-pre-wrap jua-regular">
                                                    {note.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                    : // 최신 패치와 업데이트 예정의 경우 목록 형태로 표시
                                    Object.entries(groupedPatches).map(([version, notes]) => (
                                        <div
                                            key={version} // 버전을 고유한 키로 사용
                                            className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer"
                                            onClick={() =>
                                                handleTransition(() =>
                                                    handleSelectPatch({ version, notes })
                                                )
                                            }
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
                        )}
                    </div>
                ) : selectedPost && selectedPost.notes && selectedPost.notes.length > 0 ? (
                    // 선택된 패치 보기
                    <div>
                        <h1 className="text-4xl font-bold text-red-400 mb-4">
                            {selectedPost.version || selectedPost.agentName}
                        </h1>
                        <h2 className="text-gray-300 text-md italic">
                            {selectedPost.notes[0]?.date || "날짜 정보 없음"}
                        </h2>
                        <p className="text-gray-400 text-md mb-6 italic">
                            총 {selectedPost.notes.length}개의 노트
                        </p>
                        <div className="space-y-6">
                            {selectedPost.notes.map((note, index) => (
                                <div
                                    key={`${note.id}-${index}`} // 노트 ID에 인덱스를 조합해 고유한 키로 사용
                                    className="p-4 bg-gray-800 rounded-lg shadow-md flex items-start gap-4"
                                >
                                    <img
                                        src={`/icons/character/${note.agent.toLowerCase()}.png`}
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
                            onClick={() =>
                                handleTransition(() => {
                                    handleShowList();
                                    // 요원 목록으로 돌아가도록 selectedAgent 초기화
                                    if (selectedSection === "agentUpdates") {
                                        handleSelectAgent(null); // 요원 선택 해제
                                    }
                                })
                            }
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
