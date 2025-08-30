// src/components/ToolAI.tsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormattedResponse } from "@/components/ui/FormattedResponse";
import { supabase } from "@/lib/supabase";
import {
  Loader2,
  ArrowLeft,
  ExternalLink,
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Github,
  FileText
} from "lucide-react";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;

type Tool = {
  id: string;
  name: string;
  description: string;
  website?: string;
  github?: string;
  documentation?: string;
  installation?: string;
  usage?: string;
  categories: string[];
  tags: string[];
  type?: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// New helper function to detect incomplete AI responses
function isResponseIncomplete(reply: string) {
  if (!reply) return true;
  const lowerReply = reply.toLowerCase();
  // Detect truncation by typical patterns or missing end marker
  return (
    lowerReply.endsWith("...") ||
    !lowerReply.includes("[end response]") ||
    lowerReply.trim().length < 50
  );
}

const ToolAI: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTool = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('tools')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        if (!data) throw new Error('Tool not found');

        setTool(data as Tool);

        setChat([{
          role: "assistant",
          content: `I can help you with **${data.name}** - ${data.description}. Here are some quick links:\n\n` +
            `${data.github ? `- [GitHub Repository](${data.github})\n` : ''}` +
            `${data.documentation ? `- [Documentation](${data.documentation})\n` : ''}` +
            `${data.website ? `- [Official Website](${data.website})\n` : ''}` +
            `\nWhat would you like to know about this tool?`,
          timestamp: new Date()
        }]);
      } catch (err) {
        console.error('Error fetching tool:', err);
        setError(err instanceof Error ? err.message : "Failed to load tool information");
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, aiLoading]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  const getToolContext = (tool: Tool) => {
    return `
# Tool Information
**Name**: ${tool.name}
**Description**: ${tool.description}
${tool.type ? `**Type**: ${tool.type}\n` : ''}
${tool.categories?.length ? `**Categories**: ${tool.categories.join(", ")}\n` : ''}
${tool.tags?.length ? `**Tags**: ${tool.tags.join(", ")}\n` : ''}

# Resource Links
${tool.github ? `- GitHub: ${tool.github}\n` : ''}
${tool.documentation ? `- Documentation: ${tool.documentation}\n` : ''}
${tool.website ? `- Website: ${tool.website}\n` : ''}

${tool.installation ? `## Installation\n${tool.installation}\n` : ''}
${tool.usage ? `## Basic Usage\n${tool.usage}\n` : ''}
`.trim();
  };

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessage(content);
      setTimeout(() => setCopiedMessage(null), 2000);
    } catch (err) {
      console.error('Failed to copy message');
    }
  };

  const askAI = async (question: string) => {
    if (!tool) return;
    setAiLoading(true);
    setError(null);

    try {
      const context = getToolContext(tool);
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content: `You are an expert cybersecurity tool assistant. Follow these rules:

1. ALWAYS format links as [display text](full_url)
2. Responses MUST be complete and fully finished – do NOT truncate, do not end mid-sentence or mid-code block.
3. Start every answer with a section heading (##)
4. Provide step-by-step instructions
5. Include code blocks for commands
6. Add a conclusion, and always end every answer with: [end response]

Tool Context:
${context}`
            },
            ...chat.filter(m => m.role === "assistant").slice(-5).map(m => ({
              role: m.role,
              content: m.content
            })),
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 8000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content;

      if (isResponseIncomplete(aiReply)) {
        // Retry asking the model to complete the response
        for (let retryCount = 0; retryCount < 2; retryCount++) {
          const followUpResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "openai/gpt-oss-120b",
              messages: [
                {
                  role: "system",
                  content: `Continue your previous answer. Remember to provide a complete response and end with: [end response]`,
                },
                {
                  role: "user",
                  content: "Please finish your previous response.",
                },
              ],
              max_tokens: 2000,
              temperature: 0.2,
            }),
          });

          if (followUpResponse.ok) {
            const followUpData = await followUpResponse.json();
            const followUpReply = followUpData.choices?.[0]?.message?.content;
            if (followUpReply && !isResponseIncomplete(followUpReply)) {
              setChat(prev => [
                ...prev,
                { role: "user", content: question, timestamp: new Date() },
                { role: "assistant", content: aiReply + "\n\n" + followUpReply, timestamp: new Date() },
              ]);
              setAiLoading(false);
              return;
            }
          }
        }
        // Fall back if retries fail
        setChat(prev => [
          ...prev,
          { role: "user", content: question, timestamp: new Date() },
          { role: "assistant", content: "I'm sorry, my response seems incomplete. Please ask again.", timestamp: new Date() },
        ]);
        setAiLoading(false);
        return;
      }

      setChat(prev => [
        ...prev,
        { role: "user", content: question, timestamp: new Date() },
        { role: "assistant", content: aiReply, timestamp: new Date() },
      ]);
    } catch (err) {
      console.error('AI Error:', err);
      setError("Failed to get AI response. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || aiLoading) return;
    askAI(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="text-red-400 mb-4">{error || "Tool not found"}</div>
        <Button asChild className="bg-white hover:bg-gray-200 text-black">
          <Link to="/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link to={`/tools/${tool.id}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  <Sparkles className="inline h-5 w-5 mr-2" />
                  {tool.name} AI Assistant
                </h1>
                <p className="text-sm text-gray-400 line-clamp-1">{tool.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {tool.github && (
                <Button asChild size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <a href={tool.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {tool.documentation && (
                <Button asChild size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <a href={tool.documentation} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {tool.website && (
                <Button asChild size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <a href={tool.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6 pb-24">
            {chat.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-black" />
                  </div>
                )}
                <div className={`max-w-3xl ${msg.role === "user" ? "order-2" : "order-1"}`}>
                  <div className={`rounded-2xl ${msg.role === "user"
                    ? "bg-white text-black px-6 py-4"
                    : "bg-gray-900 border border-gray-800"
                    }`}>
                    {msg.role === "assistant" ? (
                      <div className="p-6">
                        <FormattedResponse content={msg.content} />
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-800">
                          <span className="text-xs text-gray-500">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(msg.content)}
                            className="text-gray-500 hover:text-white h-6 px-2"
                          >
                            {copiedMessage === msg.content ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        {/* Optional retry button if response is incomplete */}
                        {isResponseIncomplete(msg.content) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => askAI("Please complete your last response")}
                            className="text-blue-500 hover:text-blue-700 h-6 px-2 mt-2"
                          >
                            Complete Response
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>{msg.content}</span>
                        <span className="text-xs opacity-70 ml-4">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center order-1">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {aiLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-black" />
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span className="text-gray-400">Analyzing {tool.name}...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask about ${tool.name} installation, usage, or features...`}
                  disabled={aiLoading}
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-2xl px-4 py-3 pr-12 focus:border-white focus:ring-white"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || aiLoading}
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 text-black rounded-xl h-8 w-8 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {error && (
              <div className="mt-2 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolAI;
