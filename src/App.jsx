import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImage(null);

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImage(data.image_url);
    } catch (err) {
      alert('Error generating image');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Pattern Generator 🎨</h1>
      <input
        type="text"
        placeholder="Enter a prompt, e.g., floral pattern with gold"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={!prompt || loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {image && (
        <div className="output">
          <img src={image} alt="Generated" />
          <a href={image} download="pattern.png">Download Image</a>
        </div>
      )}
    </div>
  );
}

export default App;
