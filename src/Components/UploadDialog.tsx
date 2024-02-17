import { useState } from "react";
import { Modal } from "flowbite";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { uploadFiles } from "@/actions/chat";

const fileTypes = ["PDF", "TXT"];

export const UploadDialog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [fileList, setFileList] = useState<FileList | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);

  const onClickCancel = () => {
    // Close the modal
    const modal = new Modal(document.getElementById("uploadDocument"));
    modal.hide();
  };

  const onCLickUpload = () => {
    if (!fileList) {
      return;
    }
    // 👇 Create new FormData object and append files
    const data = new FormData();
    const files = fileList ? [...fileList] : [];
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    dispatch(uploadFiles(data));
  };

  const handleChange = (fileList: FileList) => {
    setFileList(fileList);
    setFiles(fileList ? [...fileList] : []);

    console.log("file:", fileList);
  };

  return (
    <div
      id="uploadDocument"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-5 rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Upload Files
            </h3>
            <button
              type="button"
              onClick={() => onClickCancel()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule={"evenodd"}
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <h2 className="text-gray-900 dark:text-white">File Uploader</h2>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-2 bg-white cursor-pointer rounded-xl hover:bg-slate-50 py-14">
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  multiple={true}
                />
              </div>
              <div>
                Files to upload: <br />
                <span className="font-semibold text-gray-500">
                  {files ? (
                    <ul className="pl-3">
                      {files.map((file) => (
                        <li className="list-disc" key={file.name}>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    " No files uploaded just yet"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-6 pt-0 space-x-2 roun ded-b">
            <button
              type="button"
              onClick={() => onClickCancel()}
              className="text-[#6366f1] bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-white bg-[#6366f1] hover:bg-[#4f46e5] hover:border-[#4f46e5] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-[#6366f1] text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 "
              onClick={() => onCLickUpload()}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
