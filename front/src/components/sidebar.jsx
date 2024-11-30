import React from "react";

export default function Sidebar({
                                    selectedSection,
                                    setSelectedSection,
                                    setViewList,
                                    isSubMenuOpen,
                                    setIsSubMenuOpen, // 부모로부터 전달받은 함수
                                }) {
    return (
        <aside className="w-1/5 bg-gradient-to-t from-red-900 to-gray-800 p-4 shadow-lg rounded-2xl my-6 mx-4">
            <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xl font-bold">V</span>
                </div>
                <h2 className="text-lg font-semibold mt-2">ValoPatch</h2>
            </div>
            <ul className="space-y-3">
                <li
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform ${
                        isSubMenuOpen ? "bg-red-700 scale-105 shadow-md" : "bg-gray-700 hover:bg-red-600"
                    }`}
                    onClick={() => setIsSubMenuOpen(!isSubMenuOpen)} // 클릭 이벤트 수정
                >
                    <div className="flex justify-between items-center">
                        <span>패치 관련</span>
                        <span
                            className={`transform transition-transform duration-300 ${
                                isSubMenuOpen ? "rotate-180" : ""
                            }`}
                        >
              ▼
            </span>
                    </div>
                </li>
                {isSubMenuOpen && (
                    <ul className="mt-2 space-y-2 pl-4">
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95 ${
                                selectedSection === "latestPatch" ? "bg-red-700 shadow-md" : ""
                            }`}
                            onClick={() => {
                                setSelectedSection("latestPatch");
                                setViewList(true);
                            }}
                        >
                            패치 내역
                        </li>
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95 ${
                                selectedSection === "upcomingPatch" ? "bg-red-700 shadow-md" : ""
                            }`}
                            onClick={() => {
                                setSelectedSection("upcomingPatch");
                                setViewList(true);
                            }}
                        >
                            패치 예정
                        </li>
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95 ${
                                selectedSection === "agentUpdates" ? "bg-red-700 shadow-md" : ""
                            }`}
                            onClick={() => {
                                setSelectedSection("agentUpdates");
                                setViewList(true);
                            }}
                        >
                            요원별 업데이트
                        </li>
                    </ul>
                )}
            </ul>
        </aside>
    );
}
