import React from "react";

export default function PatchList({
                                      versions,
                                      handleSelectVersion,
                                      handleTransition,
                                      versionPage,
                                      setVersionPage,
                                      totalVersionPages
                                  }) {
    const safeVersions = versions || [];

    return (
        <div className="space-y-6">
            {safeVersions.length > 0 ? (
                safeVersions.map((v) => (
                    <div
                        key={v.version}
                        className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer"
                        onClick={() => handleTransition(() => handleSelectVersion(v.version))}
                    >
                        <h2 className="text-xl font-semibold">{v.version}</h2>
                        <p className="text-gray-400 text-sm italic">
                            총 {v.totalCount}개의 노트
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">버전을 찾을 수 없습니다.</p>
            )}

            {totalVersionPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => setVersionPage(Math.max(versionPage - 1, 0))}
                        disabled={versionPage === 0}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                        이전
                    </button>
                    {Array.from({ length: totalVersionPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-lg ${
                                versionPage === index ? "bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                            }`}
                            onClick={() => setVersionPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setVersionPage(Math.min(versionPage + 1, totalVersionPages - 1))}
                        disabled={versionPage === totalVersionPages - 1}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}
