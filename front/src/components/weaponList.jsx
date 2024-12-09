// src/components/WeaponList.jsx
import React from "react";
import { weaponCategories } from "../data/weaponCategories";
import { weaponDisplayNames } from "../data/weaponDisplayNames";

export default function WeaponList({ handleSelectWeapon }) {
    // 전체 카테고리를 좌우 두 그룹으로 나누기
    const categories = Object.entries(weaponCategories);
    const midpoint = Math.ceil(categories.length / 2);
    const leftCategories = categories.slice(0, midpoint);
    const rightCategories = categories.slice(midpoint);

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">무기별 업데이트</h3>
            <div className="flex flex-col lg:flex-row">
                {/* 왼쪽 컬럼 */}
                <div className="flex-1">
                    {leftCategories.map(([category, weapons]) => (
                        <div key={category} className="mb-6">
                            <h4 className="text-md font-semibold text-red-300 mb-2">{category}</h4>
                            {/* 유동적인 그리드 레이아웃 */}
                            <div className="flex flex-wrap gap-2">
                                {weapons.map((weapon) => (
                                    <div
                                        key={weapon}
                                        className="bg-gray-700 rounded-md cursor-pointer hover:bg-red-600 flex flex-col items-center p-2 transition-transform transform hover:scale-105 w-[120px]"
                                        onClick={() => handleSelectWeapon(weapon)}
                                    >
                                        {/* 이미지 컨테이너 비율 유지 및 크기 조정 */}
                                        <div className="w-14 h-14 aspect-square flex items-center justify-center mb-1">
                                            <img
                                                src={`/icons/weapon/${weapon.toLowerCase()}.png`}
                                                alt={weaponDisplayNames[weapon]}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {/* 텍스트 크기 조정 */}
                                        <span className="text-center text-xs font-medium">{weaponDisplayNames[weapon]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 가운데 세로줄 */}
                <div className="hidden lg:block w-px bg-gray-600 mx-4"></div>

                {/* 오른쪽 컬럼 */}
                <div className="flex-1">
                    {rightCategories.map(([category, weapons]) => (
                        <div key={category} className="mb-6">
                            <h4 className="text-md font-semibold text-red-300 mb-2">{category}</h4>
                            {/* 유동적인 그리드 레이아웃 */}
                            <div className="flex flex-wrap gap-2">
                                {weapons.map((weapon) => (
                                    <div
                                        key={weapon}
                                        className="bg-gray-700 rounded-md cursor-pointer hover:bg-red-600 flex flex-col items-center p-2 transition-transform transform hover:scale-105 w-[120px]"
                                        onClick={() => handleSelectWeapon(weapon)}
                                    >
                                        {/* 이미지 컨테이너 비율 유지 및 크기 조정 */}
                                        <div className="w-14 h-14 aspect-square flex items-center justify-center mb-1">
                                            <img
                                                src={`/icons/weapon/${weapon.toLowerCase()}.png`}
                                                alt={weaponDisplayNames[weapon]}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {/* 텍스트 크기 조정 */}
                                        <span className="text-center text-xs font-medium">{weaponDisplayNames[weapon]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
