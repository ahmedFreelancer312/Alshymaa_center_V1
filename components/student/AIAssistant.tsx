"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaFilePdf, FaPaperPlane, FaTrash } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import Loading from "../ui/loading";

type IFile = {
  fileCode: string;
  fileName: string;
  courseCode: string;
  courseName: string;
  fileUrl: string;
  createdAt: string;
};

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export default function AIAssistantPage() {
  const [files, setFiles] = useState<IFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get("/api/student/files");
        setFiles(data.files);
        setError("");
        setLoading(false);

        if (data.files.length === 0) {
          setError("No files found. Please upload your study materials.");
        } else {
          setSelectedFile(data.files[0]);
          addMessage({
            text: `Hello! I'm Ahmed Seddiq AI Bot. You've selected "${data.files[0].fileName}". Ask me anything about this document.`,
            sender: "ai",
          });
        }
      } catch (error) {
        setError("Failed to fetch files. Please try again later.");
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (message: Omit<Message, "timestamp" | "id"> & { timestamp?: Date }) => {
    const newId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setMessages((prev) => [
      ...prev,
      {
        ...message,
        id: newId,
        timestamp: message.timestamp || new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedFile) return;

    addMessage({
      text: inputMessage,
      sender: "user",
    });

    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/student/ai-question", {
        fileUrl: selectedFile.fileUrl,
        question: inputMessage,
      });

      addMessage({
        text: res.data.result,
        sender: "ai",
      });
    } catch (error) {
      console.error("Error getting AI answer:", error);
      addMessage({
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    if (selectedFile) {
      addMessage({
        text: `Let's start fresh. You're still working with "${selectedFile.fileName}". What would you like to know?`,
        sender: "ai",
      });
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString("en-US", options);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-center mb-8 p-6 bg-white rounded-xl shadow-md">
          <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-lg">
            <RiRobot2Line className="text-3xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">UniBot AI</h1>
            <p className="text-blue-600 text-sm text-center font-medium">Your intelligent learning companion</p>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Files List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaFilePdf className="text-red-500 mr-3" />
                Your Study Materials
              </h2>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {files.length > 0 ? (
                  files.map((file) => (
                    <div
                      key={file.fileCode}
                      onClick={() => {
                        setSelectedFile(file);
                        addMessage({
                          text: `Now working with "${file.fileName}". Ask me anything about this document.`,
                          sender: "ai",
                        });
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedFile?.fileCode === file.fileCode
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start">
                        <FaFilePdf
                          className={`text-red-500 mt-1 mr-3 flex-shrink-0 ${
                            selectedFile?.fileCode === file.fileCode ? "text-red-600" : ""
                          }`}
                        />
                        <div className="flex-grow">
                          <h3
                            className={`font-medium ${
                              selectedFile?.fileCode === file.fileCode ? "text-blue-600" : "text-gray-700"
                            }`}
                          >
                            {file.fileName}
                          </h3>
                          <div className="text-xs mt-1 space-y-1">
                            <p
                              className={`${
                                selectedFile?.fileCode === file.fileCode ? "text-blue-500" : "text-gray-500"
                              }`}
                            >
                              {file.courseName} ({file.courseCode})
                            </p>
                            <p className="text-gray-400 text-xs">Uploaded: {formatDate(file.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No files available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected File Info */}
            {selectedFile && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{selectedFile.fileName}</h2>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      <p>
                        <span className="font-medium">Course:</span> {selectedFile.courseName} ({selectedFile.courseCode})
                      </p>
                      <p>
                        <span className="font-medium">Uploaded:</span> {formatDate(selectedFile.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition"
                      onClick={() => setSelectedFile(null)}
                    >
                      Change Document
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center"
                      onClick={clearConversation}
                    >
                      <FaTrash className="mr-1" /> Clear Chat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[500px]">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <RiRobot2Line className="text-xl mr-3" />
                  <h3 className="font-semibold">StudyGenius AI Chat</h3>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearConversation}
                    className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded flex items-center"
                  >
                    <FaTrash className="mr-1" /> Clear
                  </button>
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <RiRobot2Line className="text-4xl mb-4 opacity-30" />
                    <p>Start a conversation about {selectedFile?.fileName || "your document"}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200 text-gray-800"
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            {message.sender === "ai" && <RiRobot2Line className="text-blue-500 mr-2" />}
                            <span className="text-xs opacity-70">{formatDate(message.timestamp)}</span>
                          </div>
                          <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 text-gray-800 max-w-[80%] rounded-lg p-3">
                          <div className="flex items-center mb-1">
                            <RiRobot2Line className="text-blue-500 mr-2" />
                            <span className="text-xs opacity-70">{formatDate(new Date())}</span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="relative">
                  <textarea
                    rows={2}
                    placeholder={`Ask about ${selectedFile?.fileName || "the document"}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition pr-12"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!selectedFile || !inputMessage.trim() || isLoading}
                    className={`absolute right-3 bottom-3 p-2 rounded-lg transition ${
                      selectedFile && inputMessage.trim() && !isLoading
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
