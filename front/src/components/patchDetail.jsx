import React, { useState, useEffect } from "react";

export default function PatchDetail({
                                        selectedPost,
                                        handleTransition,
                                        handleShowList,
                                        selectedSection,
                                        fetchData, // 부모 컴포넌트에서 전달된 fetchData
                                    }) {
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const [totalElements, setTotalElements] = useState(0); // 총 데이터 갯수
    const [notes, setNotes] = useState([]); // 현재 페이지의 노트 데이터

    // 선택된 노트 변경 또는 페이지 변경 시 데이터를 로드
    useEffect(() => {
        if (selectedPost) {
            fetchNotes(currentPage);
        }
    }, [currentPage, selectedPost]);

    // 데이터를 가져오는 함수
    const fetchNotes = async (page) => {
        try {
            console.log("Fetching notes for page:", page);
            const result = await fetchData(selectedSection, selectedPost?.agentName, page);

            if (result && result.content) {
                setNotes(result.content); // 노트 데이터 업데이트
                setTotalPages(result.totalPages || 1); // 총 페이지 수 업데이트
                setTotalElements(result.totalElements || 0); // 총 데이터 갯수 업데이트
            } else {
                console.error("Invalid response or no data.");
                setNotes([]);
            }
        } catch (error) {
            console.error("Error in fetchNotes:", error);
        }
    };

    // 페이지 버튼 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return selectedPost ? (
        <div>
            <h1 className="text-4xl font-bold text-red-400 mb-4">
                {selectedPost.version || selectedPost.agentName}
            </h1>
            <h2 className="text-gray-300 text-md italic">
                {selectedPost.notes?.[0]?.date || "날짜 정보 없음"}
            </h2>
            <p className="text-gray-400 text-md mb-6 italic">
                총 {totalElements}개의 패치노트
            </p>
            <div className="space-y-6">
                {notes.length > 0 ? (
                    notes.map((note, index) => (
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
                                <p className="text-gray-200 whitespace-pre-wrap">
                                    {note.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300">노트를 불러오지 못했습니다.</p>
                )}
            </div>

            {/* 페이지네이션 버튼 */}
            <div className="flex justify-center items-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                    이전
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === index ? "bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                    다음
                </button>
            </div>

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
        <p className="text-gray-300">항목을 선택하세요.</p>
    );
}
