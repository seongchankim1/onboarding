import React from "react";

export default function PatchDetail({
                                        selectedPost,
                                        notes,
                                        handleTransition,
                                        handleShowList,
                                        selectedSection,
                                        isAgentMode = false,
                                        notePage,
                                        handleNotePageChange,
                                        totalNotePages
                                    }) {
    const detailNotes = isAgentMode ? (notes || []) : (selectedPost?.notes || []);
    const totalNotes = detailNotes.length;

    return totalNotes > 0 ? (
        <div>
            {!isAgentMode && (
                <h1 className="text-4xl font-bold text-red-400 mb-4">
                    {selectedPost?.version || "패치 노트"}
                </h1>
            )}

            {!isAgentMode && (
                <>
                    <h2 className="text-gray-300 text-md italic">
                        {detailNotes[0]?.date || "날짜 정보 없음"}
                    </h2>
                    <p className="text-gray-400 text-md mb-6 italic">
                        총 {totalNotes}개의 패치노트
                    </p>
                </>
            )}

            <div className="space-y-6">
                {detailNotes.map((note, index) => (
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
                            {isAgentMode && (
                                <p className="text-red-400 text-sm mb-1">
                                    {note.version} | {note.date}
                                </p>
                            )}
                            <h2 className="text-gray-500 whitespace-pre-wrap italic mb-4">
                                {note.comment}
                            </h2>
                            <p className="text-gray-200 whitespace-pre-wrap">
                                {note.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {totalNotePages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => handleNotePageChange(notePage - 1)}
                        disabled={notePage === 0}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                        이전
                    </button>
                    {Array.from({ length: totalNotePages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-lg ${
                                notePage === index ? "bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                            }`}
                            onClick={() => handleNotePageChange(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handleNotePageChange(notePage + 1)}
                        disabled={notePage === totalNotePages - 1}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            )}

            <button
                className="mt-6 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg shadow-lg"
                onClick={() =>
                    handleTransition(() => {
                        handleShowList();
                    })
                }
            >
                목록으로 돌아가기
            </button>
        </div>
    ) : (
        <p className="text-gray-300">노트를 불러오지 못했습니다.</p>
    );
}
