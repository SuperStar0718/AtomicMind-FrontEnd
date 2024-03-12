import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styles.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearHistory, uploadFiles } from "@/actions/chat";
import {
  HIDE_CITATION,
  LOAD_CHAT_HISTORY,
  SET_CHAT_HISTORY,
  SHOW_CITATION,
  UPDATE_CHAT_HISTORY,
  UPDATE_SOURCE_DOCUMENTS,
} from "@/actions/types";
import { toast } from "react-hot-toast";
import ScrollToBottom from "react-scroll-to-bottom";
import UserImage from "@/assets/images/user.png";
import BotImage from "@/assets/images/bot.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { loadUser, logoutAction } from "@/actions/auth";
import ClearHistory from "@/assets/images/removeHistory.svg";
import CloseButton from "@/assets/images/close.svg";
import Userprofile from "@/assets/images/user.svg";
import DeleteConfirmationModal from "@/Components/Modal/DeleteConfirmationModal";
import { TERipple } from "tw-elements-react";
import { Dropdown } from "flowbite";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Split from "@uiw/react-split";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import type { DropdownOptions, DropdownInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";

const fileTypes = ["PDF", "TXT"];
/**
 * Represents a message in the chat.
 */
export interface IMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const Content = ({ chat_history, type, name }) => {
  const baseURL = import.meta.env.VITE_BACKEND_API || "";
  const { userData, showCitation } = useSelector(
    (state: RootState) => state.auth
  );

  const [showModal, setShowModal] = useState(false);
  const [sourceDocuments, setSourceDocuments] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedDocument, setSelectedDocument] = useState<any>();
  const [isThinking, setIsThinking] = useState(false);
  const [rows, setRows] = useState(1);
  const UserMenu = useRef(null);
  const UserMenuButton = useRef(null);

  // const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
  const dispatch = useDispatch<AppDispatch>();
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [query, setQuery] = useState("");
  const textareaRef = useRef(null);
  const onClickLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutAction());
  };
  const onClickClearHisotry = () => {
    dispatch(
      clearHistory({ id: userData._id, type: type, name: name }, () => {
        dispatch({ type: LOAD_CHAT_HISTORY, payload: [] });
        setShowModal(false);
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey && rows < 5) {
      setRows(rows + 1);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [rows]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newLineCount = (e.target.value.match(/\n/g) || []).length;
    if (newLineCount > 5) {
      setRows(5);
    }  else  {
      setRows(newLineCount + 1);
    }
    setQuery(e.target.value);
  };

  const hideCitation = () => {
    dispatch({ type: HIDE_CITATION });
  };
  const handleChange = (file: File) => {
    const formData = new FormData();
    formData.append("id", userData._id);
    formData.append("file", file);
    formData.append("fileName", file.name);
    dispatch(
      uploadFiles(formData, () => {
        dispatch(loadUser());
      })
    );
  };

  const onClickDocument = (document) => {
    setSelectedDocument(document);
    dispatch({ type: SHOW_CITATION });
  };

  useEffect(() => {
    if (type == "folder") {
      const folder = userData.folders.find(
        (folder) => folder.folderName == name
      );
      if (folder) {
        setSelectedDocument({
          metadata: {
            source: "uploads/" + folder.documents[0],
            "loc.pageNumber": 1,
          },
        });
      }
      console.log("showcitation");
    } else if (type == "document") {
      const document = userData.documents.find((document) => document == name);
      if (document) {
        setSelectedDocument({
          metadata: {
            source: "uploads/" + document,
            "loc.pageNumber": 1,
          },
        });
      }
    }
  }, [name, type, userData]);

  const handleSubmit = async () => {
    setIsThinking(true);
    const req: { id: string; prompt: IMessage; type: string; name: string } = {
      id: userData._id,
      prompt: { role: "user", content: query },
      type: type,
      name: name,
    };
    if (type == "") {
      toast.error("Please select a document to chat with you.");
      return;
    }
    dispatch({ type: SET_CHAT_HISTORY, payload: req.prompt });
    dispatch({
      type: SET_CHAT_HISTORY,
      payload: { role: "assistant", content: "" },
    });
    setQuery("");
    setRows(1);


    // dispatch(generateResponse(req));
    const response = await fetch(baseURL + "api/chat/generateResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const reader = response.body.getReader();

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
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await streamReader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      try {
        const parsedValue = JSON.parse(value);
        console.log("parsedValue:", parsedValue.sourceDocuments);
        const isJsonObject =
          typeof parsedValue === "object" && parsedValue !== null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const hasMetadata = isJsonObject && "metadata" in parsedValue;
        setSourceDocuments(parsedValue.sourceDocuments);
        dispatch({
          type: UPDATE_SOURCE_DOCUMENTS,
          payload: parsedValue.sourceDocuments,
        });
      } catch (e) {
        // The string is not a valid JSON
        const text = value
          .replace(/\\n/g, "\n")
          .replace(/```$/, "")
          .replace("markdown", "");
        console.log("text:", text);

        dispatch({ type: UPDATE_CHAT_HISTORY, payload: text });
        console.log("sourceDocuments:", sourceDocuments);
      }
    }
    setIsThinking(false);
  };

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl: HTMLElement = UserMenu.current;

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = UserMenuButton.current;

    // Ensure elements are not null
    if (!$targetEl || !$triggerEl) {
      console.error("Elements not found");
      return;
    }

    // options with default values
    const options: DropdownOptions = {
      placement: "bottom",
      triggerType: "click",
      offsetSkidding: 0,
      offsetDistance: 0,
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      override: false,
    };

    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     * instanceOptions: optional
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dropdown: DropdownInterface = new Dropdown(
      $targetEl,
      $triggerEl,
      options,
      instanceOptions
    );
  }, []);

  return (
    <>
      <div className="relative w-full h-screen">
        <div>
          <div className="border-b-2 border-b-gray-300  w-full px-3 py-2 h-[48px] mt-[48px] md:mt-0 flex items-center justify-between">
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
                  {name
                    ? name
                    : type == "allDocuments"
                    ? "All Documents"
                    : "No File"}
                </span>
              </span>
            </div>
            <div className="flex flex-row">
              <TERipple rippleColor="white">
                <button
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={ClearHistory}
                    alt=""
                    className="h-[25px] w-[25px]"
                  />
                </button>
              </TERipple>
              {/* <!-- Modal --> */}
              <DeleteConfirmationModal
                showModal={showModal}
                setShowModal={setShowModal}
                onClickClearHisotry={onClickClearHisotry}
              />

              <img
                id="avatarButton"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-8 h-8 rounded-full cursor-pointer"
                src={Userprofile}
                alt="User Profile"
                ref={UserMenuButton}
              />

              <div
                id="userDropdown"
                ref={UserMenu}
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 w-fit"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white w-fit">
                  <div className="font-medium w-fit">{userData?.email}</div>
                </div>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={(e: React.MouseEvent) => onClickLogout(e)}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="p-splitter p-component p-splitter-horizontal"
            data-pc-name="splitter"
            data-pc-section="root"
          >
            <Split className="flex flex-row p-splitter-panel">
              <div
                style={{ width: "60%", minWidth: "30%" }}
                className="overflow-auto flex-auto flex flex-col md:h-[calc(100vh-48px)] h-[calc(100vh-96px)] justify-between"
              >
                <ScrollToBottom className="h-full overflow-auto">
                  {chat_history.length > 0 ? (
                    chat_history.map((chat, index) => {
                      return (
                        <div key={index}>
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
                              className={`min-h-[50px]   [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 px-4 ${
                                chat.role == "user"
                                  ? "bg-[#e8ebfa] flex-row-reverse rounded-tl-xl rounded-tr-[4px] rounded-b-xl"
                                  : "bg-[#f2f2f2] rounded-tr-xl rounded-tl-[4px] rounded-b-xl"
                              } ${
                                isThinking &&
                                chat.content == "" &&
                                chat.role == "assistant"
                                  ? "flex items-center"
                                  : ""
                              }`}
                            >
                              {isThinking &&
                              chat.content == "" &&
                              chat.role == "assistant" ? (
                                <div className="bouncing-loader">
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              ) : (
                                <ReactMarkdown
                                  key={index}
                                  remarkPlugins={[remarkGfm]}
                                >
                                  {chat.content}
                                </ReactMarkdown>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-row justify-center gap-5">
                            {chat.sourceDocuments &&
                              type != "document" &&
                              chat.sourceDocuments.map((document, index) => {
                                return (
                                  <div
                                    key={index}
                                    className=" max-w-[25%] border border-gray-300 border-opacity-70 rounded p-4"
                                  >
                                    <a
                                      onClick={() => onClickDocument(document)}
                                      className="text-base font-semibold break-words hover:cursor-pointer hover:underline"
                                    >
                                      {document.metadata.source.replace(
                                        "uploads/",
                                        ""
                                      )}
                                    </a>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })
                  ) : name == "" ? (
                    <div className="flex items-center justify-center h-full ">
                      <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        dropMessageStyle={{ backgroundColor: "red" }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full ">
                      <h2 className="text-black">AtomicMind</h2>
                      <p>Start conversation with this Folder</p>
                    </div>
                  )}
                </ScrollToBottom>

                <div className="flex items-center self-end justify-center w-full gap-3 p-2 border-t md:p-6">
                  <form
                    className="max-w-5xl flex flex-col flex-1 flex-grow relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]"
                  >
                    <textarea
                      ref={textareaRef}
                      id="question"
                      name="question"
                      className="py-3 pr-10 rounded-md outline-none"
                      value={query}
                      onChange={(e) => handleTextareaChange(e)}
                      autoComplete="off"
                      rows={rows}
                      placeholder="Type your question here"
                      style={{ resize: "none" }}
                      onKeyDown={handleKeyDown}
                    ></textarea>
                    <div className="absolute top-0 bottom-0 right-0">
                      <div className="flex items-end h-full py-3 pr-2">
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
              {showCitation && (
                <div
                  style={{ width: "40%", minWidth: "30%" }}
                  className="flex flex-col"
                >
                  <button className="p-2" onClick={() => hideCitation()}>
                    <img src={CloseButton} alt="" className="w-6 h-6" />
                  </button>
                  <div className="w-full">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                      <div className="mx-auto h-[100vh]">
                        <Viewer
                          fileUrl={`${baseURL}${selectedDocument.metadata.source}`}
                          plugins={[defaultLayoutPluginInstance]}
                          initialPage={
                            selectedDocument.metadata["loc.pageNumber"] - 1
                          }
                        />
                      </div>
                    </Worker>
                  </div>
                </div>
              )}
            </Split>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  chat_history: state.chat.chat_history,
  type: state.chat.type,
  name: state.chat.name,
});

const ConnectedContent = connect(mapStateToProps)(Content);

export default ConnectedContent;
