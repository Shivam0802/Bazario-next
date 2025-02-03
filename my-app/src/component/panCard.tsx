import { useState } from "react";
import { CreditCard, Upload, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const UpdatePANCard = () => {
  const [formData, setFormData] = useState<FormData>({
    panNumber: "",
    name: "",
    document: null,
  });

  const [errors, setErrors] = useState<Errors>({});

  interface FormData {
    panNumber: string;
    name: string;
    document: Blob | null;
  }

  interface Errors {
    panNumber?: string;
    name?: string;
    document?: string;
    [key: string]: string | undefined;
  }

  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 5 * 1024 * 1024) {
//       // 5MB limit
//       setFormData((prev) => ({
//         ...prev,
//         document: file,
//       }));
//     } else {
//       toast.error("File size should be less than 5MB");
//     }
//   };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
     const files = e.target.files;
     if (files) {
         const fileReaders: Promise<string>[] = Array.from(files).map((file) => {
             return new Promise((resolve, reject) => {
                 const reader = new FileReader();
                 reader.onload = () => {
                     if (reader.result) resolve(reader.result as string);
                 };
                 reader.onerror = reject;
                 reader.readAsDataURL(file);
             });
         });

         Promise.all(fileReaders)
             .then((base64Images) => {
                 setFormData((prev) => ({
                     ...prev,
                     document: files[0] // Assuming you want to store the first image
                 }));
             })
             .catch((error) => {
                 console.error("Error reading files:", error);
             });
     }
 };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!formData.panNumber || !validatePAN(formData.panNumber)) {
      newErrors.panNumber = "Please enter a valid 10-character PAN number";
    }
    if (!formData.name) {
      newErrors.name = "Full name is required";
    }
    if (!formData.document) {
      newErrors.document = "Please upload PAN card scan";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission
    toast.success("PAN card details updated successfully");
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-900 ">
          Update PAN Card Details
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mb-6">
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              
              required
              className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
            />
            <label
              htmlFor="panNumber"
              className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
            >
              PAN Number
            </label>
          </div>
          {errors.panNumber && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.panNumber}
            </p>
          )}

        <div>
        <div className="relative mb-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="peer block w-full rounded-md border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                >
                  Your Name
                </label>
              </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload PAN Card Scan
          </label>
          <div className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
              <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
              <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Upload Files
                    </h3>
                    <p className="text-sm text-slate-600">
                      Drag &amp; drop your files here
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <svg
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                <div className="group/dropzone mt-6 w-[40%]">
                  <div className="relative rounded-xl border-1 border-slate-700 bg-white p-8 transition-colors group-hover/dropzone:border-cyan-500/50">
                    <input
                      type="file"
                      className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                      onChange={handleFileChange}
                    />
                    <div className="space-y-6 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/20">
                        <svg
                          className="h-10 w-10 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-gray-900">
                          Drop your files here or browse
                        </p>
                        <p className="text-sm text-slate-500">
                          Support files: PDF, DOC, DOCX, JPG, PNG
                        </p>
                        <p className="text-xs text-slate-500">
                          Max file size: 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                
                </div>
                {formData.document && (
                <div className="w-[60%] mt-6">
                  <img
                    src={formData.document ? URL.createObjectURL(formData.document) : ""}
                    alt="Uploaded PAN Card"
                    className="w-full h-[16.5rem] rounded-lg shadow-md"
                  />
                </div>
              )}
                </div>
              </div>
            </div>
          </div>

          {errors.document && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.document}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#ffe5c9d9] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors hover:bg-[#FFDAB3]"
          >
            Update PAN Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePANCard;
