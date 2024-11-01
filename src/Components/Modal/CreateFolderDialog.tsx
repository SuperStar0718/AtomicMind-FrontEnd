import { useState } from "react";
import { Modal } from "flowbite";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { uploadFiles } from "@/actions/chat";
import { loadUser } from "@/actions/auth";

const fileTypes = ["PDF", "TXT"];

export const CreateFolderDialog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [fileList, setFileList] = useState<FileList | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [folderName, setFolderName] = useState<string>("");
  const [error, setError] = useState("");
  const [key, setKey] = useState(Math.random());

  const { userData } = useSelector((state: RootState) => state.auth);

  const onClickCancel = () => {
    setFolderName("");
    setFileList(null);
    setFiles(null);
    setKey(Math.random()); // Change the key, causing FileUploader to remount

    // Close the modal
    const modal = new Modal(document.getElementById("createFolder"));
    modal.hide();
  };

  const onClickUpload = () => {
    validateInput(folderName);
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    data.append("id", userData._id);
    data.append("folderName", folderName);
    const files = fileList ? [...fileList] : [];
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    dispatch(
      uploadFiles(data, () => {
        onClickCancel();
        dispatch(loadUser());
        setFolderName("");
        setFileList(null);
      })
    );
  };

  const handleChange = (fileList: FileList) => {
    setFileList(fileList);
    setFiles(fileList ? [...fileList] : []);

    console.log("file:", fileList);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFolderName(value);
    validateInput(folderName);
  };

  const validateInput = (value) => {
    // Example validation: input must not be empty
    if (!value.trim()) {
      setError("This field is required");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div
      id="createFolder"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center px-5 pt-3 rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Create Folder
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

          <div className="px-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Folder Name
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                error ? "border-red-500 border " : " border-black"
              }`}
              id="folderName"
              type="text"
              placeholder="New Folder"
              value={folderName}
              onChange={handleInputChange}
              required
            />
            {error && <p className="mt-1 text-xs text-red-500 ">{error}</p>}
          </div>
          <div className="p-6 ">
            <label className="text-sm font-semibold text-gray-700">
              File Uploader
            </label>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-2 py-6 bg-white cursor-pointer rounded-xl hover:bg-slate-50">
                <FileUploader
                  key={key}
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
              onClick={() => onClickUpload()}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
