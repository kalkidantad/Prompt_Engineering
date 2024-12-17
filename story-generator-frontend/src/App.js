import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [keywords, setKeywords] = useState("");
    const [genre, setGenre] = useState("Fantasy");
    const [tone, setTone] = useState("Lighthearted");
    const [length, setLength] = useState("Short");
    const [story, setStory] = useState("");
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/generate-story', {
                keywords: keywords.split(',').map((word) => word.trim()),
                genre,
                tone,
                length
            });
            setStory(response.data.story);
        } catch (error) {
            console.error('Error generating story:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
                <h1 className="text-2xl font-bold mb-4">Personalized Story Generator</h1>

                <label className="block mb-2">
                    Keywords (comma-separated):
                    <input
                        type="text"
                        className="w-full border rounded p-2 mt-1"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                </label>

                <label className="block mb-2">
                    Genre:
                    <select
                        className="w-full border rounded p-2 mt-1"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option>Fantasy</option>
                        <option>Sci-Fi</option>
                        <option>Romance</option>
                        <option>Mystery</option>
                    </select>
                </label>

                <label className="block mb-2">
                    Tone:
                    <select
                        className="w-full border rounded p-2 mt-1"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    >
                        <option>Lighthearted</option>
                        <option>Serious</option>
                        <option>Humorous</option>
                    </select>
                </label>

                <label className="block mb-2">
                    Length:
                    <select
                        className="w-full border rounded p-2 mt-1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    >
                        <option>Short</option>
                        <option>Medium</option>
                        <option>Long</option>
                    </select>
                </label>

                <button
                    onClick={generateStory}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Story'}
                </button>

                {story && (
                    <div className="mt-6 p-4 border rounded bg-gray-50">
                        <h2 className="text-xl font-bold mb-2">Your Story:</h2>
                        <p>{story}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;