import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PatchNoteCreate() {
    const navigate = useNavigate();
    const [newPatch, setNewPatch] = useState({
        title: "",
        date: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatch((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPatch.title && newPatch.date && newPatch.description) {
            // 패치노트를 게시판으로 전달
            navigate("/patch-notes", { state: { newPatch } });
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="p-6 border rounded-lg shadow-sm bg-white w-full max-w-md"
            >
                <h2 className="text-lg font-bold mb-4 text-center">새로운 패치노트 작성</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        제목
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={newPatch.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="패치 제목 입력"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        날짜
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={newPatch.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                    </label>
                    <textarea
                        name="description"
                        value={newPatch.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="패치 설명 입력"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    작성 완료
                </button>
            </form>
        </div>
    );
}

export default PatchNoteCreate;
