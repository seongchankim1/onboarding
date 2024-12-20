import React, { useState } from "react";

export default function Sidebar({ selectedSection, setSelectedSection, setViewList }) {
    const [isPatchSubOpen, setIsPatchSubOpen] = useState(false);
    const [isItemSubOpen, setIsItemSubOpen] = useState(false);

    return (
        <aside className="w-1/6 bg-gradient-to-t from-red-900 to-gray-800 p-4 shadow-lg rounded-2xl my-6 mx-4">
            <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xl font-bold">V</span>
                </div>
                <h2 className="text-lg font-semibold mt-2">ValoPatch</h2>
            </div>
            <ul className="space-y-3">

                {/* 패치노트 대분류 */}
                <li
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform ${isPatchSubOpen ? "bg-red-700 scale-105 shadow-md" : "bg-gray-700 hover:bg-red-600"}`}
                    onClick={() => setIsPatchSubOpen(!isPatchSubOpen)}
                >
                    <div className="flex justify-between items-center">
                        <span>패치노트</span>
                        <span className={`transform transition-transform duration-300 ${isPatchSubOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </div>
                </li>
                {isPatchSubOpen && (
                    <ul className="mt-2 space-y-2 pl-4">
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 ${selectedSection === "latestPatch" ? "bg-red-700 shadow-md" : ""}`}
                            onClick={() => { setSelectedSection("latestPatch"); setViewList(true); }}
                        >
                            최신 패치
                        </li>
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 ${selectedSection === "upcomingPatch" ? "bg-red-700 shadow-md" : ""}`}
                            onClick={() => { setSelectedSection("upcomingPatch"); setViewList(true); }}
                        >
                            패치 예정
                        </li>
                    </ul>
                )}

                {/* 항목별 패치 대분류 */}
                <li
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform ${isItemSubOpen ? "bg-red-700 scale-105 shadow-md" : "bg-gray-700 hover:bg-red-600"}`}
                    onClick={() => setIsItemSubOpen(!isItemSubOpen)}
                >
                    <div className="flex justify-between items-center">
                        <span>항목별 패치</span>
                        <span className={`transform transition-transform duration-300 ${isItemSubOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </div>
                </li>
                {isItemSubOpen && (
                    <ul className="mt-2 space-y-2 pl-4">
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 ${selectedSection === "agentUpdates" ? "bg-red-700 shadow-md" : ""}`}
                            onClick={() => { setSelectedSection("agentUpdates"); setViewList(true); }}
                        >
                            요원별 업데이트
                        </li>
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 ${selectedSection === "mapUpdates" ? "bg-red-700 shadow-md" : ""}`}
                            onClick={() => { setSelectedSection("mapUpdates"); setViewList(true); }}
                        >
                            맵별 업데이트
                        </li>
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 ${selectedSection === "weaponUpdates" ? "bg-red-700 shadow-md" : ""}`}
                            onClick={() => { setSelectedSection("weaponUpdates"); setViewList(true); }}
                        >
                            무기별 업데이트
                        </li>
                        <li
                            className={`p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600 ${selectedSection === "otherUpdates" ? "bg-red-700 shadow-md" : ""}`}
                            onClick={() => { setSelectedSection("otherUpdates"); setViewList(true); }}
                        >
                            기타 업데이트
                        </li>
                    </ul>
                )}
            </ul>
        </aside>
    );
}
