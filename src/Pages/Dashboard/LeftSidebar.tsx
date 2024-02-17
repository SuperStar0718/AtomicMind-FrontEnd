import { Modal } from 'flowbite'
import { UploadDialog } from '@/Components/UploadDialog';


export const LeftSidebar = () => {
  
  const uploadDocument = () =>{
    const modal = new Modal(document.getElementById('uploadDocument'))
    modal.show()
  }


  
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50">
        <aside className="min-w-[300px] xl:min-w-[310px] fixed lg:relative lg:translate-x-0 bg-white top-0 left-0 z-40 w-64 h-screen transition-transform border-r shadow-r -translate-x-full ">
          <div className="flex flex-col h-full divide-y divide-solid">
            <div className="flex flex-col gap-2 p-2">
              <button
                aria-label="Upload Documents"
                className="items-center cursor-pointer  h-[35px] flex justify-between py-[0.65625rem] px-[1.09375rem] text-[#6366f1] border rounded-lg border-[#6366f1]"
                data-pc-name="button"
                data-pc-section="root"
                onClick={() => uploadDocument()}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-up-from-bracket"
                  className="h-4 w-fit svg-inline--fa fa-arrow-up-from-bracket "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"
                  ></path>
                </svg>
                <span
                  className="flex items-center justify-center w-full text-sm font-semibold text-center h-fit"
                  data-pc-section="label"
                >
                  Upload Documents
                </span>
              </button>
              <button
                aria-label="Chat with All Documents"
                className="items-center bg-[#6366f1] text-white cursor-pointer  h-[35px] flex justify-between py-[0.65625rem] px-[1.09375rem]  border rounded-lg border-[#6366f1] hover:bg-[#4f46e5]"
                data-pc-name="button"
                data-pc-section="root"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="comment-dots"
                  className="h-4 w-fit svg-inline--fa fa-comment-dots"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm160-32c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"
                  ></path>
                </svg>
                <span
                  className="flex items-center justify-center w-full text-sm font-semibold text-center h-fit"
                  data-pc-section="label"
                >
                  Chat with All Documents
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-2 pt-2 overflow-auto grow">
              <div>
                <div className="flex items-center w-full">
                  <button
                    className="w-8 h-8 p-button p-component p-button-icon-only p-button-text p-button-sm p-button-secondary px-[5px]"
                    data-pc-name="button"
                    data-pc-section="root"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-down"
                      className="svg-inline--fa fa-chevron-down "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                      ></path>
                    </svg>
                    <span className="p-button-label p-c">&nbsp;</span>
                  </button>
                  <div
                    className="w-full h-8 p-splitbutton p-component p-button-secondary p-button-text p-button-sm"
                    title="Folders"
                    data-pc-name="splitbutton"
                    data-pc-section="root"
                    id="pr_id_3"
                  >
                    <button
                      aria-label="Folders"
                      className="p-button text-left gap-[7px] px-[5px] p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap rounded-[3px] font-normal text-[rgb(49,_54,_57)]"
                      type="button"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="folder"
                        className="svg-inline--fa fa-folder "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
                        ></path>
                      </svg>
                      <span
                        className="p-button-label p-c"
                        data-pc-section="label"
                      >
                        Folders
                      </span>
                    </button>
                    <button
                      className="p-button pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-component p-splitbutton-menubutton p-button-icon-only"
                      type="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="ellipsis-vertical"
                        className="svg-inline--fa fa-ellipsis-vertical "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path
                          fill="currentColor"
                          d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                        ></path>
                      </svg>
                      <span className="p-button-label p-c">&nbsp;</span>
                    </button>
                  </div>
                </div>
                <div className="p-1 mt-1 space-y-2 border-t border-b">
                  <div className="flex items-center w-full">
                    <button
                      className="p-button h-[32px] w-[32px] pl-[5px] pr-[5px] p-component p-button-icon-only p-button-text p-button-sm p-button-secondary"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="chevron-down"
                        className="svg-inline--fa fa-chevron-down "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                        ></path>
                      </svg>
                      <span className="p-button-label p-c">&nbsp;</span>
                    </button>
                    <div
                      className="p-splitbutton h-[32px] w-full p-component p-button-secondary p-button-text p-button-sm"
                      title="zxcv"
                      data-pc-name="splitbutton"
                      data-pc-section="root"
                      id="pr_id_120"
                    >
                      <button
                        aria-label="zxcv"
                        className="p-button p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap text-left gap-[7px] pl-[5px] pr-[5px] rounded-[3px] font-normal"
                        type="button"
                        data-pc-name="button"
                        data-pc-section="root"
                      >
                        <span
                          className="p-button-label p-c"
                          data-pc-section="label"
                        >
                          zxcv
                        </span>
                      </button>
                      <button
                        className="p-button pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-component p-splitbutton-menubutton p-button-icon-only"
                        type="button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        data-pc-name="button"
                        data-pc-section="root"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="ellipsis-vertical"
                          className="svg-inline--fa fa-ellipsis-vertical "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 128 512"
                        >
                          <path
                            fill="currentColor"
                            d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                          ></path>
                        </svg>
                        <span className="p-button-label p-c">&nbsp;</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-1 mx-1 mt-1 space-y-2 bg-slate-100">
                    <div className="flex items-center w-full">
                      <div
                        className="p-splitbutton p-component p-button-secondary p-button-text p-button-sm h-[32px] w-full"
                        title="Viktor_Velychko(C++, Qt).pdf"
                        data-pc-name="splitbutton"
                        data-pc-section="root"
                        id="pr_id_130"
                      >
                        <button
                          aria-label="Viktor_Velychko(C++, Qt).pdf"
                          className="p-button p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap text-left gap-[7px] pl-[5px] pr-[5px] rounded-[3px] font-normal"
                          type="button"
                          data-pc-name="button"
                          data-pc-section="root"
                        >
                          <span
                            className="p-button-label p-c"
                            data-pc-section="label"
                          >
                            Viktor_Velychko(C++, Qt).pdf
                          </span>
                        </button>
                        <button
                          className="p-button p-component pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-splitbutton-menubutton p-button-icon-only"
                          type="button"
                          aria-expanded="false"
                          aria-haspopup="true"
                          data-pc-name="button"
                          data-pc-section="root"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="ellipsis-vertical"
                            className="svg-inline--fa fa-ellipsis-vertical "
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 512"
                          >
                            <path
                              fill="currentColor"
                              d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                            ></path>
                          </svg>
                          <span className="p-button-label p-c">&nbsp;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full">
                    <button
                      className="p-button h-[32px] w-[32px] pl-[5px] pr-[5px] p-component p-button-icon-only p-button-text p-button-sm p-button-secondary"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="chevron-down"
                        className="svg-inline--fa fa-chevron-down "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                        ></path>
                      </svg>
                      <span className="p-button-label p-c">&nbsp;</span>
                    </button>
                    <div
                      className="p-splitbutton h-[32px] w-full p-component p-button-secondary p-button-text p-button-sm"
                      title="asdf"
                      data-pc-name="splitbutton"
                      data-pc-section="root"
                      id="pr_id_121"
                    >
                      <button
                        aria-label="asdf"
                        className="p-button text-left gap-[7px] pl-[5px] pr-[5px] rounded-[3px] font-normal p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap"
                        type="button"
                        data-pc-name="button"
                        data-pc-section="root"
                      >
                        <span
                          className="p-button-label p-c"
                          data-pc-section="label"
                        >
                          asdf
                        </span>
                      </button>
                      <button
                        className="p-button pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-component p-splitbutton-menubutton p-button-icon-only"
                        type="button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        data-pc-name="button"
                        data-pc-section="root"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="ellipsis-vertical"
                          className="svg-inline--fa fa-ellipsis-vertical "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 128 512"
                        >
                          <path
                            fill="currentColor"
                            d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                          ></path>
                        </svg>
                        <span className="p-button-label p-c">&nbsp;</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-1 mx-1 mt-1 space-y-2 bg-slate-100">
                    <div className="flex items-center w-full">
                      <div
                        className="p-splitbutton p-component h-[32px] w-full p-button-secondary p-button-text p-button-sm"
                        title="Viktor_Velychko(C++, Qt).pdf"
                        data-pc-name="splitbutton"
                        data-pc-section="root"
                        id="pr_id_122"
                      >
                        <button
                          aria-label="Viktor_Velychko(C++, Qt).pdf"
                          className="p-button text-left gap-[7px] pl-[5px] pr-[5px] rounded-[3px] font-normal p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap"
                          type="button"
                          data-pc-name="button"
                          data-pc-section="root"
                        >
                          <span
                            className="p-button-label p-c"
                            data-pc-section="label"
                          >
                            Viktor_Velychko(C++, Qt).pdf
                          </span>
                        </button>
                        <button
                          className="p-button p-component p-splitbutton-menubutton pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-button-icon-only"
                          type="button"
                          aria-expanded="false"
                          aria-haspopup="true"
                          data-pc-name="button"
                          data-pc-section="root"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="ellipsis-vertical"
                            className="svg-inline--fa fa-ellipsis-vertical "
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 512"
                          >
                            <path
                              fill="currentColor"
                              d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                            ></path>
                          </svg>
                          <span className="p-button-label p-c">&nbsp;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center w-full">
                  <button
                    className="p-button h-[32px] w-[32px] pl-[5px] pr-[5px] p-component p-button-icon-only p-button-text p-button-sm p-button-secondary"
                    data-pc-name="button"
                    data-pc-section="root"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-right"
                      className="svg-inline--fa fa-chevron-right "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                      ></path>
                    </svg>
                    <span className="p-button-label p-c">&nbsp;</span>
                  </button>
                  <div
                    className="p-splitbutton p-component h-[32px] w-full p-button-secondary p-button-text p-button-sm"
                    title="All Documents"
                    data-pc-name="splitbutton"
                    data-pc-section="root"
                    id="pr_id_4"
                  >
                    <button
                      aria-label="All Documents"
                      className="p-button text-left gap-[7px] pl-[5px] pr-[5px] rounded-[3px] font-normal text-[rgb(49,_54,_57)] p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap"
                      type="button"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="file"
                        className="svg-inline--fa fa-file "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                        ></path>
                      </svg>
                      <span
                        className="p-button-label p-c"
                        data-pc-section="label"
                      >
                        All Documents
                      </span>
                    </button>
                    <button
                      className="p-button p-component p-splitbutton-menubutton pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-button-icon-only"
                      type="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="ellipsis-vertical"
                        className="svg-inline--fa fa-ellipsis-vertical "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path
                          fill="currentColor"
                          d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                        ></path>
                      </svg>
                      <span className="p-button-label p-c">&nbsp;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <nav className="h-[50px] w-full bg-white fixed lg:hidden flex px-3 items-center justify-end border-b z-30">
          <button
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center px-2 py-1 text-sm text-gray-700 rounded-sm h-fit focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="svg-inline--fa fa-bars "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
      <UploadDialog />
    </>
  );
};
