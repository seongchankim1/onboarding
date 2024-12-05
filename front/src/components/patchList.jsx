import React from "react";

export default function PatchList({
                                      selectedAgent,
                                      patchData,
                                      groupedPatches,
                                      handleSelectPatch,
                                      handleTransition,
                                      handleShowList,
                                  }) {
    return (
        <div className="space-y-6">
            {/* 요원 선택 후 돌아가기 버튼 추가 */}
            {selectedAgent && (
                <button
                    className="mb-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg shadow-lg"
                    onClick={() => handleTransition(() => handleShowList())}
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
                            handleTransition(() => handleSelectPatch({ version, notes }))
                        }
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{version}</h2>
                            <p className="text-gray-400 text-sm">날짜: {notes[0]?.date}</p>
                        </div>
                        <p className="text-gray-400 text-sm italic">
                            총 {notes.length}개의 노트
                        </p>
                    </div>
                ))}
        </div>
    );
}
