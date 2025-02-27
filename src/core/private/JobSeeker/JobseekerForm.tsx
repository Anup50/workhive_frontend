// import { useRef, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { toast, Toaster } from "sonner";
// import { uploadProfileImage } from "../../../Api";
// import defaultImg from "../../../assets/images/Default.png";
// import AnimationWrapper from "../../../components/AnimationWrapper";
// import Skill from "../../../components/Skill";
// import { useAuth } from "../../../context/AuthContext";

// const userStructure = {
//   bio: "",
//   skills: [] as string[],
//   location: "",
// };

// const JobseekerForm = () => {
//   const { jobSeekerId } = useAuth();
//   if (jobSeekerId !== "null") {
//     return <Navigate to="/user" />;
//   }

//   const [user, setUser] = useState(userStructure);
//   const { bio, skills, location } = user;
//   const skillLimit = 10;
//   let profileImgEle = useRef();
//   const [updatedProfileImg, setUpdatedProfileImg] = useState<File | null>(null);
//   const [profilePicture, setProfilePicture] = useState("");

//   const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const skill = e.currentTarget.value.trim();

//       if (skill && skills.length < skillLimit && !skills.includes(skill)) {
//         setUser({ ...user, skills: [...skills, skill] });
//       } else {
//         toast.error(`You can add max ${skillLimit} skills`);
//       }
//       e.currentTarget.value = "";
//     }
//   };

//   const handleSkillDelete = (skillToRemove) => {
//     setUser({
//       ...user,
//       skills: user.skills.filter((skill) => skill !== skillToRemove),
//     });
//   };
//   const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       console.log("Selected file:", file); // Verify file selection
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (profileImgEle.current) {
//           profileImgEle.current.src = event.target?.result as string;
//         }
//       };
//       reader.readAsDataURL(file);
//       setUpdatedProfileImg(file);
//     }
//   };
//   // const handleImageUpload = (e) => {
//   //   e.preventDefault();
//   //   if (updatedProfileImg) {
//   //     let loadingToast = toast.loading("Uploading....");
//   //     e.target.setAttribute("disabled", true);
//   //   }
//   // };
//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!updatedProfileImg) return;

//     try {
//       const loadingToast = toast.loading("Uploading image...");
//       const uploadButton = e.currentTarget;
//       uploadButton.disabled = true;

//       const imageFormData = new FormData();
//       // Changed from 'image' to 'profilePicture'
//       imageFormData.append("profilePicture", updatedProfileImg);

//       const { data } = await uploadProfileImage(imageFormData);
//       setProfilePicture(data.data);
//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Image upload failed");
//     } finally {
//       toast.dismiss(loadingToast);
//       uploadButton.removeAttribute("disabled");
//     }
//   };
//   return (
//     <AnimationWrapper>
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <form className="w-full">
//           <Toaster />
//           <div className="max-w-4xl mx-auto">
//             <h1 className="max-md:hidden text-2xl font-semibold mb-6 text-center">
//               Enter your details
//             </h1>

//             <div className="bg-slate-50 rounded-xl shadow-sm p-6 lg:p-8">
//               <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
//                 {/* Left Column - Image Upload */}
//                 <div className="w-full lg:max-w-[200px]">
//                   <label
//                     htmlFor="uploadImg"
//                     className="relative block w-48 h-48 rounded-full overflow-hidden border-2 border-dashed border-gray-300 shadow-md mx-auto"
//                   >
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer">
//                       Upload Image
//                     </div>
//                     <img
//                       ref={profileImgEle}
//                       src={defaultImg || "default-avatar.png"}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   </label>
//                   <input
//                     type="file"
//                     id="uploadImg"
//                     accept=".jpg, .png"
//                     hidden
//                     onChange={handleImagePreview}
//                   />
//                   <button
//                     type="button"
//                     className="mt-5 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
//                     onClick={handleImageUpload}
//                   >
//                     Upload
//                   </button>
//                 </div>

//                 {/* Right Column - Form Fields */}
//                 <div className="flex-1 w-full space-y-6">
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       name="bio"
//                       placeholder="Enter your bio"
//                       className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={bio}
//                       onChange={(e) =>
//                         setUser({ ...user, bio: e.target.value })
//                       }
//                     />

//                     <div className="space-y-2">
//                       <p className="text-gray-600 font-medium">
//                         Skills (Helps in suggesting you jobs)
//                       </p>
//                       <div className="space-y-3">
//                         <input
//                           type="text"
//                           placeholder="Enter a skill and press Enter"
//                           className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           onKeyDown={handleKeydown}
//                         />
//                         <div className="flex flex-wrap gap-2">
//                           {skills.map((skill, i) => (
//                             <Skill
//                               key={i}
//                               skill={skill}
//                               onDelete={handleSkillDelete}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <input
//                       type="text"
//                       name="location"
//                       placeholder="Enter your location"
//                       className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={location}
//                       onChange={(e) =>
//                         setUser({ ...user, location: e.target.value })
//                       }
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                   >
//                     Join
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </AnimationWrapper>
//   );
// };

// export default JobseekerForm;

import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { createJobSeeker, uploadProfileImage } from "../../../Api";
import defaultImg from "../../../assets/images/Default.png";
import AnimationWrapper from "../../../components/AnimationWrapper";
import Skill from "../../../components/Skill";
import { useAuth } from "../../../context/AuthContext";

const userStructure = {
  bio: "",
  skills: [] as string[],
  location: "",
};

const JobseekerForm = () => {
  const { jobSeekerId } = useAuth();
  const userId = localStorage.getItem("userId");
  if (!userId) {
    toast.error("User ID not found. Please log in again.");
    return;
  }

  if (jobSeekerId !== "null") {
    return <Navigate to="/user" />;
  }

  const [user, setUser] = useState(userStructure);
  const { bio, skills, location } = user;
  const skillLimit = 10;
  const profileImgEle = useRef<HTMLImageElement>(null);
  const [updatedProfileImg, setUpdatedProfileImg] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState("");

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const skill = e.currentTarget.value.trim();

      if (skill && skills.length < skillLimit && !skills.includes(skill)) {
        setUser({ ...user, skills: [...skills, skill] });
      } else {
        toast.error(`You can add max ${skillLimit} skills`);
      }
      e.currentTarget.value = "";
    }
  };

  const handleSkillDelete = (skillToRemove: string) => {
    setUser({
      ...user,
      skills: user.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file); // Log file info for debugging
      const reader = new FileReader();
      reader.onload = (event) => {
        if (profileImgEle.current) {
          profileImgEle.current.src = event.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
      setUpdatedProfileImg(file);
    } else {
      console.warn("No file selected!");
    }
  };

  const handleImageUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Log the current file to ensure it was captured
    console.log("Uploading file:", updatedProfileImg);
    if (!updatedProfileImg) {
      toast.error("No file selected for upload!");
      return;
    }

    let loadingToast;
    try {
      loadingToast = toast.loading("Uploading image...");
      const uploadButton = e.currentTarget;
      uploadButton.disabled = true;

      const imageFormData = new FormData();
      imageFormData.append("profilePicture", updatedProfileImg);

      // Log FormData contents (for debugging, note: cannot see file content, only key names)
      console.log("FormData keys:", Array.from(imageFormData.keys()));

      const { data } = await uploadProfileImage(imageFormData);
      setProfilePicture(data.data);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Image upload failed");
      console.error("Upload error:", error);
    } finally {
      if (loadingToast) toast.dismiss(loadingToast);
      e.currentTarget.removeAttribute("disabled");
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    const payload = {
      userId,
      bio,
      skills,
      location,
      profilePicture,
    };

    try {
      const response = await createJobSeeker(payload);
      if (response.data.success) {
        toast.success("Profile created successfully!");
        localStorage.setItem("jobSeekerId", response.data.data._id);
      } else {
        toast.error("Failed to create profile.");
      }
    } catch (error) {
      toast.error("Error creating profile.");
      console.error("Profile creation error:", error);
    }
  };

  return (
    <AnimationWrapper>
      <div className="min-h-screen flex items-center justify-center p-4">
        <form className="w-full" onSubmit={handleFormSubmit}>
          <Toaster />
          <div className="max-w-4xl mx-auto">
            <h1 className="max-md:hidden text-2xl font-semibold mb-6 text-center">
              Enter your details
            </h1>
            <div className="bg-slate-50 rounded-xl shadow-sm p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                {/* Left Column - Image Upload */}
                <div className="w-full lg:max-w-[200px]">
                  <label
                    htmlFor="uploadImg"
                    className="relative block w-48 h-48 rounded-full overflow-hidden border-2 border-dashed border-gray-300 shadow-md mx-auto"
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer">
                      Upload Image
                    </div>
                    <img
                      ref={profileImgEle}
                      src={defaultImg || "default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </label>
                  <input
                    type="file"
                    id="uploadImg"
                    accept=".jpg, .png"
                    hidden
                    onChange={handleImagePreview}
                  />
                  <button
                    type="button"
                    className="mt-5 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    onClick={handleImageUpload}
                  >
                    Upload
                  </button>
                </div>
                {/* Right Column - Form Fields */}
                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="bio"
                      placeholder="Enter your bio"
                      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bio}
                      onChange={(e) =>
                        setUser({ ...user, bio: e.target.value })
                      }
                    />
                    <div className="space-y-2">
                      <p className="text-gray-600 font-medium">
                        Skills (Helps in suggesting you jobs)
                      </p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Enter a skill and press Enter"
                          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={handleKeydown}
                        />
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, i) => (
                            <Skill
                              key={i}
                              skill={skill}
                              onDelete={handleSkillDelete}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter your location"
                      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={location}
                      onChange={(e) =>
                        setUser({ ...user, location: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AnimationWrapper>
  );
};

export default JobseekerForm;
