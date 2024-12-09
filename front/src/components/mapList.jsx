import React from "react";

export default function MapList({ mapList, handleSelectMap, handleTransition }) {
    return (
        mapList && mapList.length > 0 ? (
            <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}
            >
                {mapList.map((item, index) => (
                    <div
                        key={`${item.name}-${index}`}
                        className="flex flex-col items-center p-2 bg-gray-800 rounded-md cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95"
                        onClick={() => handleTransition(() => handleSelectMap(item.name))}
                        style={{ height: "auto" }}
                    >
                        <div className="w-16 h-16 flex items-center justify-center mb-1">
                            <img
                                src={`/icons/map/${item.name.toLowerCase()}.png`}
                                alt={`${item.displayName} icon`}
                                className="w-full h-full object-contain rounded-full"
                            />
                        </div>
                        <span className="text-md text-center truncate">
                            {item.displayName}
                        </span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-400">맵 목록을 찾을 수 없습니다.</p>
        )
    );
}
