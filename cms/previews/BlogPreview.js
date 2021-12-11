import React from "react";

const CategoryPreview = ({ entry }) => {
    const title = entry.getIn(["data", "title"]);

    return (
        <div className="min-h-screen p-16 bg-gray-900 text-white">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8 md:mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default CategoryPreview;
