import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styles.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { uploadFiles } from "@/actions/chat";
import { SET_QUERY } from "@/actions/types";
import { toast } from "react-hot-toast";
import ScrollToBottom from "react-scroll-to-bottom";
import UserImage from "@/assets/images/user.png";
import BotImage from "@/assets/images/bot.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const fileTypes = ["PDF", "TXT"];
/**
 * Represents a message in the chat.
 */
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export const Content = () => {
  const baseURL = import.meta.env.VITE_BACKEND_API || "";

  const dispatch = useDispatch<AppDispatch>();
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const [query, setQuery] = useState("");
  const [file, setFile] = useState<File>(null);

  const handleChange = (file: File) => {
    console.log("file:", file);
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    dispatch(uploadFiles(formData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = {
      prompt: query,
      file: file?.name,
    };
    if (!file) {
      toast.error("Please upload a file");
    } else {
      dispatch({ type: SET_QUERY, payload: { question: query } });

      const userInput: Message = { role: "user", content: query };
      setQuery("");

      const updatedChatHistory = [...chatHistory, userInput];
      setChatHistory(updatedChatHistory);
      // dispatch(generateResponse(req));
      const response = await fetch(baseURL + "api/chat/generateResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const reader = response.body.getReader();
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "assistant", content: "" },
      ]);
      let receivedText = "";
      const stream = new ReadableStream({
        async start(controller) {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // Convert the Uint8Array to a string
            receivedText += new TextDecoder("utf-8").decode(value);
            // Process each message (assuming messages are separated by double newlines)
            const parts = receivedText.split("\n\n");
            receivedText = parts.pop(); // Last part might be incomplete; keep it for next round

            parts.forEach((part) => {
              const match = part.match(/^data: (.*)$/);
              if (match) {
                // Remove quote symbols from start and end of the string
                const messageWithoutQuotes = match[1]
                  .trim()
                  .replace(/^"|"$/g, "");
                controller.enqueue(messageWithoutQuotes);
              }
            });
          }
          controller.close();
          reader.releaseLock();
        },
      });
      const streamReader = stream.getReader();
      while (true) {
        const { done, value } = await streamReader.read();
        if (done) {
          reader.releaseLock();
          break;
        }
        console.log("value:", value);
        const text = value
          .replace(/\\n/g, "\n")
          .replace(/```$/, "")
          .replace("markdown", "");
        setChatHistory((prev) => {
          console.log("prev:", prev);
          // If there are messages, update the last one
          return prev.map(
            (msg, index) =>
              index === prev.length - 1
                ? { ...msg, content: msg.content + text } // Update the last message
                : msg // Keep all other messages unchanged
          );
        });
        // Assuming the stream is sending text data
        // const text = new TextDecoder('utf-8').decode(value);
        // console.log("text:",text);

        // const response = JSON.parse(value);
        // console.log('event:', response);
      }

      // setChatHistory(updatedChatHistory)
      // updatedChatHistory.push({ role: 'assistant', content: '' });
    }
  };
  // useEffect(() => {
  //   const eventSource = new EventSource(baseURL + 'api/chat/generateResponse');
  //   eventSource.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     console.log('event:', response);

  //   }
  // },[])

  return (
    <>
      <div className="relative w-full h-screen">
        <div>
          <div className="border-b w-full px-3 py-2 h-[48px] mt-[48px] md:mt-0 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium md:text-base">
              <h3 className="hidden md:block">Conversation with</h3>
              <span
                className="p-tag p-component bg-[#6366f1] text-white cursor-pointer  h-[26px] flex justify-between items-center py-[0.2rem] px-[0.7rem]  border rounded-lg border-[#6366f1] hover:bg-[#4f46e5]"
                data-pc-name="tag"
                data-pc-section="root"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="file-zipper"
                  className="items-center h-3 mr-2 svg-inline--fa fa-file-zipper fa-sm"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM96 48c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm-6.3 71.8c3.7-14 16.4-23.8 30.9-23.8h14.8c14.5 0 27.2 9.7 30.9 23.8l23.5 88.2c1.4 5.4 2.1 10.9 2.1 16.4c0 35.2-28.8 63.7-64 63.7s-64-28.5-64-63.7c0-5.5 .7-11.1 2.1-16.4l23.5-88.2zM112 336c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z"
                  ></path>
                </svg>
                <span
                  className="flex items-center justify-center w-full h-full text-xs center text-"
                  data-pc-section="value"
                >
                  {file && file.name ? file.name : "No File"}
                </span>
              </span>
            </div>
          </div>
          <div
            className="p-splitter p-component p-splitter-horizontal"
            data-pc-name="splitter"
            data-pc-section="root"
          >
            <div
              className="p-splitter-panel"
              role="presentation"
              data-pc-name=""
              data-pc-section="root"
            >
              <div className="overflow-auto flex flex-col md:h-[calc(100vh-48px)] h-[calc(100vh-96px)] justify-between">
                <ScrollToBottom className="h-full overflow-auto">
                  {chatHistory.length > 0 ? (
                    chatHistory.map((chat, index) => {
                      return (
                        <div
                          key={index}
                          className={`flex items-start p-5 ${
                            chat.role == "user" ? " flex-row-reverse " : ""
                          }`}
                        >
                          <div className="min-w-fit">
                            <img
                              height="50"
                              width="50"
                              src={`${
                                chat.role == "user" ? UserImage : BotImage
                              }`}
                            />
                          </div>
                          <div
                            className={`min-h-[50px] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 p-4 ${
                              chat.role == "user"
                                ? "bg-[#e8ebfa] flex-row-reverse rounded-tl-xl rounded-tr-[4px] rounded-b-xl"
                                : "bg-[#f2f2f2] rounded-tr-xl rounded-tl-[4px] rounded-b-xl"
                            }`}
                          >
                            <ReactMarkdown
                              key={index}
                              remarkPlugins={[remarkGfm]}
                            >
                              {chat.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-full ">
                      <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        dropMessageStyle={{ backgroundColor: "red" }}
                      />
                    </div>
                  )}
                </ScrollToBottom>

                <div className="flex items-center self-end justify-center w-full gap-3 p-2 border-t md:p-6">
                  <form
                    className="max-w-5xl flex flex-col flex-1 flex-grow relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <input
                      id="question"
                      name="question"
                      type="text"
                      className="py-3 pr-10 rounded-md outline-none"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoComplete="off"
                    />
                    <div className="absolute top-0 bottom-0 right-0">
                      <div className="flex items-center h-full pr-2">
                        <button
                          aria-label="Send Question"
                          className="flex"
                          type="submit"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="paper-plane"
                            className="w-5 h-5 svg-inline--fa fa-paper-plane fa-lg text-[#6366f1]"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                            ></path>
                          </svg>
                          <span className="p-button-label p-c">&nbsp;</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
