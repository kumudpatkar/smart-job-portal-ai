import { useState } from "react";
import Editor from "@monaco-editor/react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function CodingInterview() {

  const [language, setLanguage] = useState("Java");

  const [difficulty, setDifficulty] = useState("Easy");

  const [topic, setTopic] = useState("Arrays");

  const [question, setQuestion] = useState(null);

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  // ============================
  // Generate Question
  // ============================

  const generateQuestion = async () => {

    try {

      setLoading(true);

      const { data } = await API.post(

        "/coding-interview/question",

        {

          language,

          difficulty,

          topic,

        }

      );

      setQuestion(data.question);

      setCode(data.question.starterCode || "");

      setResult(null);

    } catch (error) {

      console.log(error);

      alert("Unable to generate question.");

    }

    setLoading(false);

  };

  // ============================
  // Evaluate Code
  // ============================

  const evaluate = async () => {

    if (!question) {

      alert("Generate Question First");

      return;

    }

    try {

      setLoading(true);

      const { data } = await API.post(

        "/coding-interview/evaluate",

        {

          question,

          language,

          code,

        }

      );

      setResult(data.result);

    } catch (error) {

      console.log(error);

      alert("Evaluation Failed");

    }

    setLoading(false);

  };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">

          💻 AI Coding Interview

        </h1>

        {/* Controls */}

        <div className="grid md:grid-cols-4 gap-5">

          <select

            value={language}

            onChange={(e)=>setLanguage(e.target.value)}

            className="border p-3 rounded-xl"

          >

            <option>Java</option>

            <option>Python</option>

            <option>C++</option>

            <option>JavaScript</option>

          </select>

          <select

            value={difficulty}

            onChange={(e)=>setDifficulty(e.target.value)}

            className="border p-3 rounded-xl"

          >

            <option>Easy</option>

            <option>Medium</option>

            <option>Hard</option>

          </select>

          <select

            value={topic}

            onChange={(e)=>setTopic(e.target.value)}

            className="border p-3 rounded-xl"

          >

            <option>Arrays</option>

            <option>Strings</option>

            <option>Linked List</option>

            <option>Stack</option>

            <option>Queue</option>

            <option>Tree</option>

            <option>Graph</option>

            <option>DP</option>

          </select>

          <button

            onClick={generateQuestion}

            className="bg-blue-600 text-white rounded-xl"

          >

            Generate Question

          </button>

        </div>

        {/* Question */}

        {question && (

          <div className="bg-white shadow rounded-xl p-6 mt-8">

            <h2 className="text-2xl font-bold">

              {question.title}

            </h2>

            <p className="mt-4 whitespace-pre-wrap">

              {question.description}

            </p>

            <h3 className="font-bold mt-6">

              Constraints

            </h3>

            <p>{question.constraints}</p>

            <h3 className="font-bold mt-6">

              Example

            </h3>

            <p>

              <strong>Input:</strong>

              {question.exampleInput}

            </p>

            <p>

              <strong>Output:</strong>

              {question.exampleOutput}

            </p>

          </div>

        )}

        {/* Code Editor */}

        <div className="mt-8">

          <Editor

            height="500px"

            language={language.toLowerCase()}

            value={code}

            onChange={(value)=>setCode(value)}

            theme="vs-dark"

          />

        </div>

        <button

          onClick={evaluate}

          className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl"

        >

          Evaluate Code

        </button>

        {/* Result */}

        {result && (

          <div className="bg-white mt-10 rounded-xl shadow p-8">

            <h2 className="text-3xl font-bold mb-8">

              AI Evaluation

            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-blue-100 p-5 rounded">

                <h3>Overall Score</h3>

                <h1 className="text-4xl font-bold">

                  {result.score}

                </h1>

              </div>

              <div className="bg-green-100 p-5 rounded">

                <h3>Correctness</h3>

                <h1 className="text-4xl font-bold">

                  {result.correctness}

                </h1>

              </div>

              <div className="bg-purple-100 p-5 rounded">

                <h3>Code Quality</h3>

                <h1 className="text-4xl font-bold">

                  {result.codeQuality}

                </h1>

              </div>

            </div>

            <div className="mt-8">

              <h3 className="font-bold text-xl">

                Time Complexity

              </h3>

              <p>{result.timeComplexity}</p>

            </div>

            <div className="mt-5">

              <h3 className="font-bold text-xl">

                Space Complexity

              </h3>

              <p>{result.spaceComplexity}</p>

            </div>

            <div className="mt-8">

              <h3 className="font-bold">

                Strengths

              </h3>

              <ul className="list-disc ml-6">

                {result.strengths.map((item,index)=>(

                  <li key={index}>{item}</li>

                ))}

              </ul>

            </div>

            <div className="mt-8">

              <h3 className="font-bold">

                Improvements

              </h3>

              <ul className="list-disc ml-6">

                {result.improvements.map((item,index)=>(

                  <li key={index}>{item}</li>

                ))}

              </ul>

            </div>

            <div className="mt-8 bg-gray-100 rounded-xl p-5">

              <h3 className="font-bold">

                AI Feedback

              </h3>

              <p className="mt-2">

                {result.feedback}

              </p>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default CodingInterview;