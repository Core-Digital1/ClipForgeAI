import React from 'react';
import Layout from './Layout';

function App() {
    return (
        <Layout currentPageName="Home">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <h1 className="text-4xl font-bold mb-4">Welcome to ClipForge AI</h1>
                <p className="text-lg">Turn Long Videos Into Viral Shorts</p>
            </div>
        </Layout>
    );
}

export default App;
