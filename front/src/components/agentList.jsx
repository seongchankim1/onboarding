import React from "react";

export default function AgentList({ agentList, handleSelectAgent, handleTransition }) {
    return (
        agentList && agentList.length > 0 ? (
            <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}
            >
                {agentList.map((agent, index) => (
                    <div
                        key={`${agent.name}-${index}`} // 고유한 값 설정
                        className="flex flex-col items-center p-2 bg-gray-800 rounded-md cursor-pointer hover:bg-red-600 transition-transform transform active:scale-95"
                        onClick={() => handleTransition(() => handleSelectAgent(agent.name))}
                        style={{ height: "auto" }}
                    >
                        <div className="w-16 h-16 flex items-center justify-center mb-1">
                            <img
                                src={`/icons/character/${agent.name.toLowerCase()}.png`}
                                alt={`${agent.koreanName} icon`}
                                className="w-full h-full object-contain rounded-full"
                            />
                        </div>
                        <span className="text-md text-center truncate">
                            {agent.koreanName}
                        </span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-400">요원 목록을 찾을 수 없습니다.</p>
        )
    );
}
