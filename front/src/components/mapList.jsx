// src/components/MapList.jsx
import React from "react";
import { mapCategories } from "../data/mapCategories";
import { mapDisplayNames } from "../data/mapDisplayNames";

export default function MapList({ handleSelectMap }) {
    return (
        <div>
            {Object.entries(mapCategories).map(([category, maps]) => (
                <div key={category} className="mb-6">
                    <h3 className="text-xl font-semibold text-red-400 mb-3">{category}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {maps.map((map) => (
                            <div
                                key={map}
                                className="bg-gray-700 rounded-md cursor-pointer hover:bg-red-600 flex flex-col items-center p-2 transition-transform transform hover:scale-105"
                                onClick={() => handleSelectMap(map)}
                            >
                                <div className="w-full aspect-video flex items-center justify-center mb-1">
                                    <img
                                        src={`/icons/map/${map.toLowerCase()}.png`}
                                        alt={mapDisplayNames[map]}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-center text-xs font-medium">{mapDisplayNames[map]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
