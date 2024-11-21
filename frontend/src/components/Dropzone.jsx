import { CircleX, Upload } from "lucide-react"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"

function Dropzone({
  acceptedFiles,
  setAcceptedFiles,
  heroImage,
  setHeroImage,
  className,
  maxSize = null,
  maxFiles,
  maxSizeMessage,
  maxFilesMessage,
  error,
}) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setAcceptedFiles((prevFiles) => [...prevFiles, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]) //we are creating a new property of preview containing url of it to show in browser later.
    if (acceptedFiles.length > 0) {
      setHeroImage(acceptedFiles[0].name)
    }
    if (rejectedFiles) {
      toast.error(rejectedFiles[0].errors[0].message)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] }, maxSize, maxFiles })

  const removeFile = (filePreview) => {
    setAcceptedFiles((prevFiles) => prevFiles.filter((file) => file.preview != filePreview))
  }

  const resetFiles = () => {
    setAcceptedFiles([])
  }

  const handleHeroImage = (fileName) => {
    setHeroImage(fileName)
  }

  //   console.log(acceptedFiles)
  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps({
          // Any prop that needs to be passed to this div should be passed to this function. If passed directly to div, our attributes can override the library's props, which are essential for functioning.
          className: `${className}`, // Concatenate `className` properly
        })}
      >
        <div className="px-12 py-12 mt-4 bg-white border border-neutral-300 rounded-xl cursor-pointer hover:bg-secondary-lightest">
          <input {...getInputProps()} name="uploadedFiles" />
          {isDragActive ? (
            <p className="rounded-3xl">Drop the files here ...</p>
          ) : (
            <>
              <Upload className="mx-auto" size={"2.5rem"} />
              <p className="py-4 text-center">
                Drag 'n' drop files here, or click to select files <br /> {maxFilesMessage} <br /> {maxSizeMessage}
              </p>
            </>
          )}
        </div>
      </div>
      {/* PREVIEW UPLOADED FILES */}
      <div>
        <div className="flex flex-col gap-2 justify-between text-[0.79rem] text-slate-700 leading-4">
          {acceptedFiles.length > 0 && (
            <>
              <h2 className="pb-1 text-xl font-semibold">Preview</h2>
              <p>Hero image is selected, click to select a different image for property.</p>
              <button className="btn text-slate-50 px-4 btn-xs btn-warning " onClick={resetFiles}>
                Reset
              </button>
            </>
          )}
        </div>
        <div className="py-4">
          {acceptedFiles.length > 0 && (
            <ul className="flex gap-3 flex-wrap">
              {acceptedFiles.map((file, index) => (
                <li key={`${file.name}`} className="relative ">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className={`w-24 h-24 rounded-xl cursor-pointer object-cover ${file.name === heroImage && "border-secondary border-2"}`}
                    onClick={() => handleHeroImage(file.name)}
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                  />
                  <button
                    className="absolute -right-3 -top-3 btn btn-ghost  h-[30px] min-h-[30px] w-[30px] min-w-[30px] p-0 flex hover:scale-[120%]"
                    onClick={() => removeFile(file.preview)}
                  >
                    <CircleX size={"1.9rem"} color="#ffe3e3 " fill="#fd6365" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>{error && <p className="text-warning py-1">{error.message}</p>}</div>
    </div>
  )
}

export default Dropzone
