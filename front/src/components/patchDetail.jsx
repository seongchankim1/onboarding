// src/components/PatchDetail.jsx
import React from "react";
import { agentDisplayNames } from "../data/agentDisplayNames";
import { mapDisplayNames } from "../data/mapDisplayNames";
import { weaponDisplayNames } from "../data/weaponDisplayNames";

export default function PatchDetail({
                                        selectedPost,
                                        notes,
                                        handleTransition,
                                        handleShowList,
                                        selectedSection,
                                        isAgentMode = false,
                                        notePage,
                                        handleNotePageChange,
                                        totalNotePages,
                                        totalNotes,
                                        isLoading
                                    }) {
    let detailNotes = [];
    let totalCount = totalNotes || 0;

    console.log("PatchDetail render:", { isAgentMode, selectedPost, notes, totalCount });

    if (isAgentMode) {
        // agent/map/weapon/other 모드
        detailNotes = notes || [];
        if (!totalCount) totalCount = detailNotes.length;
    } else {
        // byVersion 모드
        if (selectedPost && selectedPost.notes) {
            detailNotes = selectedPost.notes;
            if (!totalCount) totalCount = selectedPost.totalElements || detailNotes.length;
        }
    }

    const hasNotes = detailNotes && detailNotes.length > 0;

    if (isLoading) {
        return <p className="text-gray-400">로딩 중...</p>;
    }

    // 아이콘 로딩 로직 수정
    const getIconPaths = (note) => {
        console.log("Note data for icon:", note); // 디버깅용 로그
        let paths = [];
        if (!isAgentMode) {
            // byVersion 모드: agent, map, weapon, other 아이콘 모두 표시
            if (note.agent) {
                paths.push(`/icons/agent/${note.agent.toLowerCase()}.png`);
            }
            if (note.map) {
                paths.push(`/icons/map/${note.map.toLowerCase()}.png`);
            }
            if (note.weapon) {
                paths.push(`/icons/weapon/${note.weapon.toLowerCase()}.png`);
            }
            if (note.other) {
                paths.push(`/icons/other/${note.other.toLowerCase()}.png`);
            }
            if (paths.length === 0) {
                paths.push(`/icons/agent/unknown.png`);
            }
        } else {
            // agentUpdates, mapUpdates, weaponUpdates, otherUpdates 모드
            if (selectedSection === "agentUpdates" && note.agent) {
                paths.push(`/icons/agent/${note.agent.toLowerCase()}.png`);
            }
            if (selectedSection === "mapUpdates" && note.map) {
                paths.push(`/icons/map/${note.map.toLowerCase()}.png`);
            }
            if (selectedSection === "weaponUpdates" && note.weapon) {
                paths.push(`/icons/weapon/${note.weapon.toLowerCase()}.png`);
            }
            if (selectedSection === "otherUpdates" && note.other) {
                paths.push(`/icons/other/${note.other.toLowerCase()}.png`);
            }
            if (paths.length === 0) {
                paths.push(`/icons/agent/unknown.png`);
            }
        }
        return paths;
    };

    // 한글 이름 매핑 함수
    const getDisplayName = (type, name) => {
        switch (type) {
            case "agent":
                return agentDisplayNames[name] || name;
            case "map":
                return mapDisplayNames[name] || name;
            case "weapon":
                return weaponDisplayNames[name] || name;
            case "other":
                return name; // 기타 항목은 한글 매핑이 필요 없다면 그대로 반환
            default:
                return name;
        }
    };

    return hasNotes ? (
        <div>
            {!isAgentMode && (
                <h1 className="text-4xl font-bold text-red-400 mb-4">
                    {selectedPost?.version || "패치 노트"}
                </h1>
            )}

            {!isAgentMode && detailNotes[0] && (
                <>
                    <h2 className="text-gray-300 text-md italic">
                        {new Date(detailNotes[0]?.patchDate).toLocaleString() || "날짜 정보 없음"}
                    </h2>
                    <p className="text-gray-400 text-md mb-6 italic">
                        총 {totalCount}개의 패치노트
                    </p>
                </>
            )}

            {isAgentMode && (
                <p className="text-gray-400 text-md mb-6 italic">
                    총 {totalCount}개의 패치노트
                </p>
            )}

            <div className="space-y-6">
                {detailNotes.map((note, index) => (
                    <div
                        key={`${note.id}-${index}`}
                        className="p-4 bg-gray-800 rounded-lg shadow-md flex items-start gap-4"
                    >
                        <div className="flex space-x-2">
                            {getIconPaths(note).map((path, idx) => (
                                <img
                                    key={idx}
                                    src={path}
                                    alt={getDisplayName(getIconType(path), path.split("/")[2].split(".")[0].toUpperCase())}
                                    className="w-24 h-24 object-contain"
                                />
                            ))}
                        </div>
                        <div className="flex flex-col">
                            {isAgentMode && (
                                <p className="text-red-400 text-sm mb-1">
                                    {note.version} | {new Date(note.patchDate).toLocaleString()}
                                </p>
                            )}
                            <h2 className="text-gray-500 whitespace-pre-wrap italic mb-2">
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
                            className={`px-4 py-2 rounded-lg ${notePage === index ? "bg-red-700" : "bg-gray-700 hover:bg-gray-600"}`}
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

// Helper function to determine the type based on the icon path
const getIconType = (path) => {
    if (path.includes("/agent/")) return "agent";
    if (path.includes("/map/")) return "map";
    if (path.includes("/weapon/")) return "weapon";
    if (path.includes("/other/")) return "other";
    return "unknown";
};
