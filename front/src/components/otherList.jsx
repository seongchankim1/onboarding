import React from "react";

export default function OtherList({ otherList, handleSelectOther, handleTransition }) {
    return (
        otherList && otherList.length > 0 ? (
            <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}
            >
                {otherList.map((item, index) => (
                    <div
                        key={`${item.name}-${index}`}
                        className="flex flex-col items-center p-2 bg-gray-800 rounded-md cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95"
                        onClick={() => handleTransition(() => handleSelectOther(item.name))}
                        style={{ height: "auto" }}
                    >
                        <div className="w-16 h-16 flex items-center justify-center mb-1">
                            <img
                                src={`/icons/other/${item.name.toLowerCase()}.png`}
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
            <p className="text-gray-400">기타 목록을 찾을 수 없습니다.</p>
        )
    );
}
