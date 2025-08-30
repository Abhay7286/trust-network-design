// src/components/ui/FormattedResponse.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

interface FormattedResponseProps {
  content: string;
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ node, href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children: React.ReactNode }) => (
            <code
              className={`${
                inline ? "bg-gray-700 px-1 py-0.5 rounded" : "block bg-gray-800 p-4 rounded my-2"
              } ${className || ""}`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ node, children, ...props }) => (
            <pre className="bg-gray-800 p-4 rounded my-2 overflow-x-auto" {...props}>
              {children}
            </pre>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="list-decimal pl-6 my-4" {...props}>
              {children}
            </ol>
          ),
          ul: ({ node, children, ...props }) => (
            <ul className="list-disc pl-6 my-4" {...props}>
              {children}
            </ul>
          ),
          blockquote: ({ node, children, ...props }) => (
            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4" {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedResponse;