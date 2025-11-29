import React, { useState, useEffect, useRef } from "react";
import { Copy } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onSubmit,
  isAnalyzing,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lines, setLines] = useState<number[]>([1]);

  const detectFileExtension = (code: string): string => {
    const trimmed = code.trim();

    if (/import\s+React|console\.log|function\s*\(|=>/.test(trimmed))
      return "js";
    if (/def\s+|print\(|import\s+\w+/.test(trimmed)) return "py";
    if (/public\s+class|System\.out\.println/.test(trimmed)) return "java";
    if (/#include|int\s+main\s*\(/.test(trimmed)) return "cpp";
    if (/<?php/.test(trimmed)) return "php";

    return "txt"; // default
  };

  const extension = detectFileExtension(code);

  useEffect(() => {
    const lineCount = code.split("\n").length;
    setLines(Array.from({ length: lineCount }, (_, i) => i + 1));
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textareaRef.current!.selectionStart;
      const end = textareaRef.current!.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      onChange(newCode);

      // Move caret
      setTimeout(() => {
        textareaRef.current!.selectionStart =
          textareaRef.current!.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#151922] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-black/50">
      {/* Panel Header */}
      
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-[#1A1F2B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <h2 className="text-sm font-semibold text-gray-200">
            code.{extension}
          </h2>
        </div>
        <button
          className="text-gray-500 hover:text-gray-300 transition-colors"
          title="Copy Code"
        >
          <Copy size={16} />
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex relative font-mono text-sm overflow-hidden">
        {/* Line Numbers */}
        <div className="w-12 py-4 flex flex-col items-end pr-3 text-gray-600 bg-[#151922] select-none text-[13px] leading-[1.5rem]">
          {lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[#151922] text-gray-300 resize-none outline-none p-4 pl-2 leading-[1.5rem] w-full"
          spellCheck={false}
          placeholder="// Paste your code here for review..."
        />
      </div>

      {/* Action Bar */}
      <div className="p-5 border-t border-gray-800 bg-[#151922]">
        <button
          onClick={onSubmit}
          disabled={isAnalyzing || !code.trim()}
          className={`w-full py-3 rounded-lg font-medium text-white shadow-lg transition-all duration-200
            ${
              isAnalyzing || !code.trim()
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-purple-500/25 hover:from-blue-500 hover:to-purple-500 active:scale-[0.99]"
            }
          `}
        >
          {isAnalyzing ? "Analyzing..." : "Submit for Review"}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
