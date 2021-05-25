import React from "react";

const AppShell = ({ children }) => {
    return (
        <>
            <div className="flex">
                <div className="sm:w-64 px-4 sm:px-0 pt-6 bg-custom-color">
                    <div>Sidebar</div>
                </div>
                <div className="flex flex-col w-full border-l border-gray-200">
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <div>Navbar</div>
                    </div>
                    <div className="px-4 sm:px-8 py-2 bg-gray-100">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppShell;
