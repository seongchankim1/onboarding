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
                            agentList && agentList.length > 0 ? (
                                <div
                                    className="grid gap-2"
                                    style={{
                                        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                                    }}
                                >
                                    {agentList.map((agent, index) => (
                                        <div
                                            key={`${agent.name}-${index}`}
                                            className="flex flex-col items-center p-2 bg-gray-800 rounded-md cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95"
                                            onClick={() => handleSelectAgent(agent.name)}
                                            style={{ height: "auto" }}
                                        >
                                            <div className="w-16 h-16 flex items-center justify-center mb-1">
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
                            <div className="space-y-6">
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
                                    ? patchData.map((note, index) => (
                                        <div
                                            key={`${note.id}-${index}`}
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
                                    : Object.entries(groupedPatches).map(([version, notes]) => (
                                        <div
                                            key={version}
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
                                    key={`${note.id}-${index}`}
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
                                    if (selectedSection === "agentUpdates") {
                                        handleSelectAgent(null);
                                    }
                                })
                            }
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
