// src/components/AgentList.jsx
import React from "react";
import { agentCategories } from "../data/agentCategories";
import { agentDisplayNames } from "../data/agentDisplayNames";

export default function AgentList({ handleSelectAgent }) {
    return (
        <div>
            {Object.entries(agentCategories).map(([category, agents]) => (
                <div key={category} className="mb-4">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">{category}</h3>
                    {/* Flexbox 레이아웃을 사용하여 유동적인 카드 배치 */}
                    <div className="flex flex-wrap gap-2">
                        {agents.map((agent) => (
                            <div
                                key={agent}
                                className="bg-gray-700 rounded-md cursor-pointer hover:bg-red-600 flex flex-col items-center p-2 transition-transform transform hover:scale-105 w-[120px]"
                                onClick={() => handleSelectAgent(agent)}
                            >
                                {/* 이미지 컨테이너 비율 유지 및 크기 조정 */}
                                <div className="w-12 h-12 aspect-square flex items-center justify-center mb-1">
                                    <img
                                        src={`/icons/agent/${agent.toLowerCase()}.png`}
                                        alt={agentDisplayNames[agent]}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {/* 텍스트 크기 조정 */}
                                <span className="text-center text-xs font-medium">{agentDisplayNames[agent]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
