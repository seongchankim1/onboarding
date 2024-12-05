import React from "react";

export default function PatchDetail({
                                        selectedPost,
                                        handleTransition,
                                        handleShowList,
                                        selectedSection,
                                        handleSelectAgent,
                                    }) {
    return (
        selectedPost && selectedPost.notes && selectedPost.notes.length > 0 ? (
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
        )
    );
}
