import { useRef, useState } from "react";
import axios from "axios";
import { promptList } from "../data/promptList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Report from "../components/Report";
import ProgressBar from "../components/ProgressBar";
import chatGPTbox from "../components/chatGPTbox";
import ApiKeyForm from "../components/ApiKeyForm";

export default function Home() {
  const inputRef = useRef();
  const apiKeyRef = useRef();
  const [content, setContent] = useState({});
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const [apikey, setApikey] = useState(false);

  const chatGPT = async (text) => {
    try {
      const url = "https://api.openai.com/v1/completions";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      };
      const data = {
        model: "text-davinci-003",
        prompt: text,
        max_tokens: 4000,
        temperature: 1.0,
      };

      const response = await axios.post(url, data, { headers });

      console.log(data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(apiKeyRef.current.value);

    setApikey(apiKeyRef.current.value);
  };

  const handleSubmit = async (e) => {
    setContent({});
    console.log(selectedPrompts);
    e.preventDefault();
    setLoading(true);
    setProgress(10);
    const topic = inputRef.current.value;
    let output = {};
    for (let i = 0; i < selectedPrompts.length; i++) {
      const prompt = selectedPrompts[i].replace("[topic]", topic);

      const response = await chatGPT(prompt);
      output[prompt] = response["choices"][0]["text"];
      setProgress((i + 1) * (100 / selectedPrompts.length));
    }

    setProgress(100);

    setTimeout(() => {
      setContent(output);
      setLoading(false);
    }, 500);

    console.log(output);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (selectedPrompts.includes(value)) {
      setSelectedPrompts(selectedPrompts.filter((p) => p !== value));
    } else {
      setSelectedPrompts([...selectedPrompts, value]);
    }
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setIsSelectAllChecked(checked);
    if (checked) {
      setSelectedPrompts(promptList.map((prompt) => prompt.prompt));
    } else {
      setSelectedPrompts([]);
    }
  };

  return (
    <div className="min-h-screen flex  flex-col justify-between">
      <Header />

      <main className="w-full flex items-center justify-center">
        {apikey ? (
          <div className="flex flex-col items-center">
            {loading ? (
              <ProgressBar progress={progress} />
            ) : (
              <>
                <form className="w-full max-w-4xl my-5" onSubmit={handleSubmit}>
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      ref={inputRef}
                      className="appearance-none bg-transparent border-none w-full
               text-gray-700 mr-3 py-1 px-2 
               leading-tight focus:outline-none"
                      type="text"
                      placeholder="Write your topic"
                      aria-label="topic"
                    />
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700
               border-teal-500 hover:border-teal-700 text-sm border-4
                text-white py-1 px-2 rounded"
                      type="submit"
                    >
                      Generate!
                    </button>
                  </div>
                  <div className="bg-slate-50 p-5 mt-10">
                    <p className="text-2xl font-medium mb-5">
                      Select the options you want to search:{" "}
                    </p>
                    <div>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        className="mx-4 h-4 w-4"
                        checked={isSelectAllChecked}
                      />
                      <span className="text-lg">Select All</span>
                    </div>
                    {promptList.map((item, index) => (
                      <div
                        key={index}
                        className="border-bottom border-b-slate-300 p-2"
                      >
                        <input
                          value={item.prompt}
                          type="checkbox"
                          className="mx-4 h-4 w-4"
                          onChange={handleChange}
                          checked={selectedPrompts.includes(item.prompt)}
                        />
                        <span className="text-lg">{item.render}</span>
                      </div>
                    ))}
                  </div>
                </form>
              </>
            )}

            {content ? <Report content={content} /> : <></>}
          </div>
        ) : (
          <div className="flex flex-col  items-center justify-center">
            <h2 className="my-5 text-2xl">
              To start paste your OPEN AI API KEY
            </h2>

            <p className="my-5">
              you can get your own key from
              <a className="text-teal-600 font-bold" href="https://openai.com/">
                {" "}
                OPEN AI WEBSITE
              </a>
            </p>

            <form
              className="w-full flex border border-teal-500 p-5  max-w-4xl my-5"
              onSubmit={handleLogin}
            >
              <input
                className="appearance-none bg-transparent  w-full
               text-gray-700 mr-3 py-1 px-2 
               border-bottom border-b-teal-500
               leading-tight focus:outline-none"
                type="text"
                ref={apiKeyRef}
                placeholder="Paste you api key..."
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700
               border-teal-500 hover:border-teal-700 text-sm border-4
                text-white py-1 px-2 rounded"
              >
                {" "}
                Set api Key
              </button>
            </form>

            <chatGPTbox />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
