// src/components/ContentContainer.jsx
import React from "react";
import PatchDetail from "./PatchDetail.jsx";
import AgentList from "./AgentList.jsx";
import MapList from "./MapList.jsx";
import WeaponList from "./WeaponList.jsx";
import OtherList from "./OtherList.jsx"; // 기타 업데이트 리스트가 필요하면 유사하게 수정
import PatchList from "./PatchList.jsx";

export default function ContentContainer({
                                             viewList,
                                             selectedSection,
                                             selectedPost,
                                             versions,
                                             patchData,
                                             agentList,
                                             itemList,
                                             selectedAgent,
                                             selectedMap,
                                             selectedWeapon,
                                             selectedOther,
                                             isLoading,
                                             handleShowList,
                                             handleSelectAgent,
                                             handleSelectVersion,
                                             handleSelectMap,
                                             handleSelectWeapon,
                                             handleSelectOther,
                                             versionPage,
                                             setVersionPage,
                                             totalVersionPages,
                                             notePage,
                                             handleNotePageChange,
                                             totalNotePages,
                                             totalNotes,
                                             handleTransition,
                                             handleSelectNote
                                         }) {
    let title = "";
    if (selectedSection === "latestPatch") title = "패치 내역";
    else if (selectedSection === "upcomingPatch") title = "패치 예정";
    else if (selectedSection === "agentUpdates" && !selectedAgent) title = "요원별 업데이트";
    else if (selectedSection === "mapUpdates" && !selectedMap) title = "맵별 업데이트";
    else if (selectedSection === "weaponUpdates" && !selectedWeapon) title = "무기별 업데이트";
    else if (selectedSection === "otherUpdates" && !selectedOther) title = "기타 업데이트";

    return (
        <main className="flex-1 p-6">
            <div
                className={`bg-gray-900 p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-out transform ${
                    false ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
            >
                {isLoading ? (
                    <p className="text-gray-400 text-center">로딩 중...</p>
                ) : viewList ? (
                    <div>
                        {title && <h1 className="text-4xl font-bold text-red-400 mb-8">{title}</h1>}
                        {selectedSection === "agentUpdates" && !selectedAgent ? (
                            <AgentList handleSelectAgent={handleSelectAgent} />
                        ) : selectedSection === "agentUpdates" && selectedAgent ? (
                            <PatchDetail
                                notes={patchData}
                                handleTransition={handleTransition}
                                handleShowList={handleShowList}
                                selectedSection={selectedSection}
                                isAgentMode={true}
                                notePage={notePage}
                                handleNotePageChange={handleNotePageChange}
                                totalNotePages={totalNotePages}
                                totalNotes={totalNotes}
                            />
                        ) : selectedSection === "mapUpdates" && !selectedMap ? (
                            <MapList handleSelectMap={handleSelectMap} />
                        ) : selectedSection === "mapUpdates" && selectedMap ? (
                            <PatchDetail
                                notes={patchData}
                                handleTransition={handleTransition}
                                handleShowList={handleShowList}
                                selectedSection={selectedSection}
                                isAgentMode={true}
                                notePage={notePage}
                                handleNotePageChange={handleNotePageChange}
                                totalNotePages={totalNotePages}
                                totalNotes={totalNotes}
                            />
                        ) : selectedSection === "weaponUpdates" && !selectedWeapon ? (
                            <WeaponList handleSelectWeapon={handleSelectWeapon} />
                        ) : selectedSection === "weaponUpdates" && selectedWeapon ? (
                            <PatchDetail
                                notes={patchData}
                                handleTransition={handleTransition}
                                handleShowList={handleShowList}
                                selectedSection={selectedSection}
                                isAgentMode={true}
                                notePage={notePage}
                                handleNotePageChange={handleNotePageChange}
                                totalNotePages={totalNotePages}
                                totalNotes={totalNotes}
                            />
                        ) : selectedSection === "otherUpdates" && !selectedOther ? (
                            <OtherList handleSelectOther={handleSelectOther} />
                        ) : selectedSection === "otherUpdates" && selectedOther ? (
                            <PatchDetail
                                notes={patchData}
                                handleTransition={handleTransition}
                                handleShowList={handleShowList}
                                selectedSection={selectedSection}
                                isAgentMode={true}
                                notePage={notePage}
                                handleNotePageChange={handleNotePageChange}
                                totalNotePages={totalNotePages}
                                totalNotes={totalNotes}
                            />
                        ) : (
                            <PatchList
                                versions={versions}
                                handleSelectVersion={handleSelectVersion}
                                handleTransition={handleTransition}
                                versionPage={versionPage}
                                setVersionPage={setVersionPage}
                                totalVersionPages={totalVersionPages}
                            />
                        )}
                    </div>
                ) : (
                    <PatchDetail
                        selectedPost={selectedPost}
                        handleTransition={handleTransition}
                        handleShowList={handleShowList}
                        selectedSection={selectedSection}
                        isAgentMode={false}
                        notePage={notePage}
                        handleNotePageChange={handleNotePageChange}
                        totalNotePages={totalNotePages}
                        totalNotes={totalNotes}
                    />
                )}
            </div>
        </main>
    );
}
