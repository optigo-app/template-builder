// import React, { useState } from 'react';
// import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

// const SocialMedia3 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     const components = data?.components || [];
//     const bgColor = data?.backgroundColor || "#f9f9f9";
//     const [isPaused, setIsPaused] = useState(false);

//     const renderIcon = (name, color) => {
//         const iconProps = { size: 12, style: { color: color || "#E1306C" } };
//         switch (name?.toLowerCase()) {
//             case 'instagram': return <FaInstagram {...iconProps} />;
//             case 'linkedin': return <FaLinkedinIn {...iconProps} />;
//             case 'facebook': return <FaFacebookF {...iconProps} />;
//             case 'pinterest': return <FaPinterestP {...iconProps} />;
//             default: return null;
//         }
//     };

//     const header = components.find(c => c.type === 'social-header');
//     const posts = components.filter(c => c.type === 'social-post');

//     // Duplicate posts to ensure the loop is seamless and covers the screen width
//     const displayPosts = [...posts, ...posts, ...posts];

//     return (
//         <div className="w-full py-12 font-sans overflow-hidden" style={{ backgroundColor: bgColor }}>
//             {/* Header Section - Constrained to max-width to prevent edge-to-edge text */}
//             {header && (
//                 <div 
//                     onClick={() => setSelectedId?.(header.id)}
//                     className={`mb-10 flex justify-between items-end cursor-pointer max-w-7xl mx-auto px-6
//                         ${selectedId === header.id ? 'ring-2 ring-indigo-500 p-2 rounded' : ''}`}
//                 >
//                     <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
//                         {header.props.title}
//                     </h2>
//                     <div className="text-sm font-semibold border-b-2 border-gray-900 pb-1 flex items-center gap-1 uppercase tracking-wider">
//                         {header.props.username}
//                     </div>
//                 </div>
//             )}

//             {/* The "Window" Container - This MUST have overflow-hidden */}
//             <div 
//                 className="relative w-full overflow-hidden"
//                 onMouseEnter={() => setIsPaused(true)}
//                 onMouseLeave={() => setIsPaused(false)}
//             >
//                 <div 
//                     className={`flex gap-6 animate-infinite-scroll ${isPaused ? 'pause-animation' : ''}`}
//                     style={{ width: "max-content" }}
//                 >
//                     {displayPosts.map((item, index) => {
//                         const { id, props } = item;
//                         return (
//                             <div
//                                 key={`${id}-${index}`}
//                                 onClick={() => setSelectedId?.(id)}
//                                 className={`flex flex-col bg-white overflow-hidden transition-all duration-300 w-[280px] shrink-0
//                                     ${selectedId === id ? 'ring-4 ring-indigo-500' : 'hover:shadow-2xl'}`}
//                                 style={{ borderRadius: `${props.borderRadius}px` }}
//                             >
//                                 <div className="relative w-full overflow-hidden" style={{ aspectRatio: props.aspectRatio || '3/4' }}>
//                                     <img
//                                         src={props.image}
//                                         alt="social-content"
//                                         className="h-full w-full object-cover"
//                                     />
//                                 </div>

//                                 <div className="p-4 flex items-center justify-between border-t border-gray-50">
//                                     <div className="flex items-center gap-2">
//                                         <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-bold">
//                                             {props.username?.charAt(1).toUpperCase() || 'U'}
//                                         </div>
//                                         <span className="text-xs font-bold text-gray-800 truncate max-w-[120px]">
//                                             {props.username}
//                                         </span>
//                                     </div>
//                                     <div>{renderIcon(props.socialmedianame, props.iconColor)}</div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

             
//         </div>
//     );
// };

// export default SocialMedia3;








import React, { useState, useEffect } from 'react';
import {
    Trash2, Plus, Settings2, X, MousePointer2,
    Image as ImageIcon, Type, Video, Users
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP, FaPlay } from 'react-icons/fa';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
const SocialMedia3 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
            ),
        }));
    };

    const handleAddPost = () => {
        const newId = `post-${Date.now()}`;
        const newPost = {
            id: newId,
            type: "social-post",
            props: {
                image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1974&auto=format&fit=crop",
                socialmedianame: "instagram",
                username: "@new_post",
                borderRadius: 12,
                aspectRatio: "3/4",
                iconShape: "circle",
                iconColor: "#E1306C"
            }
        };
        setData(prev => ({ ...prev, components: [...prev.components, newPost] }));
        setSelectedId(newId);
    };

    const handleDeletePost = (id) => {
        setData(prev => ({ ...prev, components: prev.components.filter(c => c.id !== id) }));
        setSelectedId(null);
    };

    const renderIcon = (itemProps, size = 12) => {
        const { socialmedianame, iconColor } = itemProps;
        const iconStyle = { color: iconColor || "#E1306C" };
        let Icon;
        switch (socialmedianame?.toLowerCase()) {
            case 'facebook': Icon = FaFacebookF; break;
            case 'linkedin': Icon = FaLinkedinIn; break;
            case 'pinterest': Icon = FaPinterestP; break;
            default: Icon = FaInstagram;
        }
        return <Icon size={size} style={iconStyle} />;
    };

    const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: 'rgba(255, 255, 255, 0.8)',
            backdrop: 'transparent',
        });

     const handleSave = async () => {
       try {
      
           Toast.fire({
               icon: 'info',
               title: 'Saving template...',
               showConfirmButton: false,
               timer: 0, 
           });
   
        
           let folderName = "general"; 
           
         
           templatesData.forEach(cat => {
               const found = cat.templates.find(t => t.templateId === data.templateId);
               if (found) {
    
                   folderName = cat.category; 
               }
           });
   
           const payload = {
               ...data,
               category: folderName 
           };
   
     
           const response = await fetch('/api/save-template', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(payload),
           });
   
           if (response.ok) {
               Toast.fire({
                   icon: 'success',
                   title: 'Saved successfully',
                   timer: 2000,
               });
           } else {
               const errorText = await response.text();
               console.error("Server Error:", errorText);
               throw new Error();
           }
       } catch (error) {
           console.error("Frontend Error:", error);
           Toast.fire({
               icon: 'error',
               title: 'Save failed',
               timer: 3000,
           });
       }
   };

    const activeComp = selectedId ? getComp(selectedId) : null;

    const renderCanvasContent = (isPreview = false) => {
        const header = data.components.find(c => c.type === 'social-header');
        const posts = data.components.filter(c => c.type === 'social-post');
        
        // Only duplicate for the actual preview carousel
        const displayPosts = isPreview && posts.length > 0 ? [...posts, ...posts, ...posts] : posts;
    
        return (
            <div className={`w-full py-16 font-sans min-h-screen bg-white ${isPreview ? 'overflow-hidden' : 'pb-40'}`}>
                {/* Header Section */}
                {header && (
                    <div
                        onClick={(e) => { e.stopPropagation(); !isPreview && setSelectedId(header.id); }}
                        className={` mx-auto px-6 mb-12 flex justify-between items-end cursor-pointer group
                            ${selectedId === header.id && !isPreview ? 'ring-2 ring-indigo-500 p-2 rounded' : ''}`}
                    >
                        <div>
                            <h2 className="text-5xl font-black tracking-tighter text-gray-900 uppercase"
                                style={{ fontSize: `${header.props.titleSize}px` }}>
                                {header.props.title}
                            </h2>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-bold text-gray-900 border-b-2 border-gray-900"
                                style={{ fontSize: `${header.props.usernameSize}px` }}>
                                {header.props.username}
                            </span>
                        </div>
                    </div>
                )}
    
                {isPreview ? (
                    /* --- PREVIEW MODE: INFINITE CAROUSEL --- */
                    <div 
                        className="relative w-full  "
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div
                            className={`flex gap-6 ${posts.length > 0 ? 'animate-infinite-scroll' : ''} ${isPaused ? 'pause-animation' : ''}`}
                            style={{ width: "max-content", paddingLeft: '1.5rem' }}
                        >
                            {displayPosts.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="relative flex flex-col bg-white overflow-hidden w-[300px] shrink-0 shadow-lg"
                                    style={{ borderRadius: `${item.props.borderRadius}px` }}
                                >
                                    <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: item.props.aspectRatio || '3/4' }}>
                                        <img src={item.props.image} className="h-full w-full object-cover" alt="post" />
                                    </div>
                                    <div className="p-4 flex items-center justify-between border-t border-gray-50 bg-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                                {item.props.username?.charAt(1).toUpperCase() || 'U'}
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{item.props.username}</span>
                                        </div>
                                        <div className={`p-2 bg-gray-50 ${item.props.iconShape === 'circle' ? 'rounded-full' : 'rounded'}`}>
                                            {renderIcon(item.props)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* --- EDITOR MODE: STATIC GRID --- */
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((item) => {
                                const isSelected = selectedId === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={(e) => { e.stopPropagation(); setSelectedId(item.id); }}
                                        className={`group relative flex flex-col bg-white overflow-hidden transition-all duration-300 cursor-pointer
                                            ${isSelected ? 'ring-4 ring-indigo-500 scale-[0.98]' : 'hover:shadow-xl border border-gray-100'}`}
                                        style={{ borderRadius: `${item.props.borderRadius}px` }}
                                    >
                                        <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: item.props.aspectRatio || '3/4' }}>
                                            <img src={item.props.image} className="h-full w-full object-cover" alt="post" />
                                            
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeletePost(item.id); }}
                                                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
    
                                        <div className="p-4 flex items-center justify-between border-t border-gray-50 bg-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                                    {item.props.username?.charAt(1).toUpperCase() || 'U'}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{item.props.username}</span>
                                            </div>
                                            <div className={`p-2 bg-gray-50 ${item.props.iconShape === 'circle' ? 'rounded-full' : 'rounded'}`}>
                                                {renderIcon(item.props)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
    
                            {/* Add Post Button - Now part of the grid */}
                            <button
                                onClick={handleAddPost}
                                className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all bg-gray-50/50"
                            >
                                <Plus size={40} />
                                <span className="text-sm font-bold mt-2 uppercase tracking-tighter">Add New Post</span>
                            </button>
                        </div>
                    </div>
                )}
    
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes scroll-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-33.33% - 16px)); }
                    }
                    .animate-infinite-scroll {
                        animation: scroll-left 35s linear infinite;
                    }
                    .pause-animation {
                        animation-play-state: paused;
                    }
                `}} />
            </div>
        );
    };
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "75%" }} onClick={() => setSelectedId(null)}>
            <button
                onClick={() => setIsPreviewOpen(true)}
                className="fixed top-3 right-80 z-50 text-white px-6 py-2 shadow-2xl rounded-lg transition-all flex items-center gap-2 font-bold bg-[#615fff]"
            >
                <MousePointer2 size={13} /> Preview
            </button>

            <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                {renderCanvasContent()}
            </DeviceMockup>
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-10">
                    <button onClick={() => setIsPreviewOpen(false)} className="absolute top-6 right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"><X size={32} /></button>
                    <div className="w-full   mt-10">{renderCanvasContent(true)}</div>
                </div>
            )}

            {/* SETTINGS SIDEBAR */}
            <div className="w-[16%] bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                onClick={(e) => e.stopPropagation()}>
                <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="text-sm font-bold flex items-center gap-2"><Settings2 size={16} />Settings</h2>
                    <button onClick={handleSave} className="text-white px-5 py-2 rounded-lg text-sm font-semibold bg-[#615fff] hover:bg-blue-600 shadow-md transition-all">Publish</button>
                </div>

                <div className="p-5 space-y-6">
                    {activeComp ? (
                        <div className="space-y-6">
                            {activeComp.type === 'social-header' ? (
                               <div className="space-y-4">
                               <label className="text-[11px] font-black text-indigo-600 uppercase tracking-widest block">Header Styling</label>
                               
                               {/* Title Settings */}
                               <div className="space-y-2">
                                   <div>
                                       <span className="text-xs font-medium text-gray-700 block mb-1">Title</span>
                                       <input 
                                           type="text" 
                                           value={activeComp.props.title} 
                                           onChange={(e) => handleUpdate(activeComp.id, "title", e.target.value)} 
                                           className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs" 
                                       />
                                   </div>
                                   <div>
                                       <div className="flex justify-between items-center mb-1">
                                           <span className="text-[10px] font-bold text-gray-500 uppercase">Title Font Size</span>
                                           <span className="text-[10px] text-indigo-600 font-bold">{activeComp.props.titleSize || 48}px</span>
                                       </div>
                                       <input 
                                           type="range" 
                                           min="24" 
                                           max="120" 
                                           value={activeComp.props.titleSize || 48} 
                                           onChange={(e) => handleUpdate(activeComp.id, "titleSize", parseInt(e.target.value))} 
                                           className="w-full accent-indigo-600" 
                                       />
                                   </div>
                               </div>
                           
                               <hr className="border-gray-100" />
                           
                               {/* Username Settings */}
                               <div className="space-y-2">
                                   <div>
                                       <span className="text-xs font-medium text-gray-700 block mb-1">Username Display</span>
                                       <input 
                                           type="text" 
                                           value={activeComp.props.username} 
                                           onChange={(e) => handleUpdate(activeComp.id, "username", e.target.value)} 
                                           className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs" 
                                       />
                                   </div>
                                   <div>
                                       <div className="flex justify-between items-center mb-1">
                                           <span className="text-[10px] font-bold text-gray-500 uppercase">Username Font Size</span>
                                           <span className="text-[10px] text-indigo-600 font-bold">{activeComp.props.usernameSize || 18}px</span>
                                       </div>
                                       <input 
                                           type="range" 
                                           min="12" 
                                           max="40" 
                                           value={activeComp.props.usernameSize || 18} 
                                           onChange={(e) => handleUpdate(activeComp.id, "usernameSize", parseInt(e.target.value))} 
                                           className="w-full accent-indigo-600" 
                                       />
                                   </div>
                               </div>
                           </div>
                            ) : (
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-indigo-600 uppercase tracking-widest block">Post Settings</label>

                                    {/* Edit Username */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Username</span>
                                        <input
                                            type="text"
                                            value={activeComp.props.username || ""}
                                            onChange={(e) => handleUpdate(activeComp.id, "username", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px] focus:ring-1 focus:ring-indigo-500 outline-none"
                                            placeholder="@handle"
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Image URL</span>
                                        <input
                                            type="text"
                                            value={activeComp.props.image}
                                            onChange={(e) => handleUpdate(activeComp.id, "image", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px] focus:ring-1 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>

                                    {/* Platform Selection */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Platform</span>
                                        <select
                                            value={activeComp.props.socialmedianame}
                                            onChange={(e) => handleUpdate(activeComp.id, "socialmedianame", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs outline-none"
                                        >
                                            <option value="instagram">Instagram</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="pinterest">Pinterest</option>
                                        </select>
                                    </div>

                                    {/* Icon Color Picker */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Icon Color</span>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={activeComp.props.iconColor || "#E1306C"}
                                                onChange={(e) => handleUpdate(activeComp.id, "iconColor", e.target.value)}
                                                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={activeComp.props.iconColor || "#E1306C"}
                                                onChange={(e) => handleUpdate(activeComp.id, "iconColor", e.target.value)}
                                                className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px] uppercase"
                                            />
                                        </div>
                                    </div>

                                    {/* Aspect Ratio */}
                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Aspect Ratio</span>
                                        <select
                                            value={activeComp.props.aspectRatio || "3/4"}
                                            onChange={(e) => handleUpdate(activeComp.id, "aspectRatio", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs outline-none"
                                        >
                                            <option value="1/1">Square (1:1)</option>
                                            <option value="3/4">Portrait (3:4)</option>
                                            <option value="4/5">Instagram (4:5)</option>
                                            <option value="16/9">Wide (16:9)</option>
                                        </select>
                                    </div>

                                    {/* Corner Radius */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-medium text-gray-700">Corner Radius</span>
                                            <span className="text-[10px] text-gray-400 font-bold">{activeComp.props.borderRadius || 0}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="40"
                                            value={activeComp.props.borderRadius || 0}
                                            onChange={(e) => handleUpdate(activeComp.id, "borderRadius", parseInt(e.target.value))}
                                            className="w-full accent-[#615fff]"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-60 flex flex-col items-center justify-center text-center opacity-40">
                            <ImageIcon size={40} className="mb-2 text-gray-300" />
                            <p className="text-xs uppercase font-bold">Select element<br />to edit</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialMedia3;