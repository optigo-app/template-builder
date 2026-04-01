// import React from 'react';
// import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP, FaPlay } from 'react-icons/fa';

// const SocialMedia2 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     const components = data?.components || [];

//     const isMobile = viewMode === "mobile";
//     const isTablet = viewMode === "tablet";

//     const renderIcon = (name, color) => {
//         const iconProps = { size: 14, style: { color: color || "#374151" } };

//         switch (name?.toLowerCase()) {
//             case 'instagram': return <FaInstagram {...iconProps} />;
//             case 'linkedin': return <FaLinkedinIn {...iconProps} />;
//             case 'facebook': return <FaFacebookF {...iconProps} />; 
//             case 'pinterest': return <FaPinterestP {...iconProps} />;
//             default: return null;
//         }
//     };

//     return (
//         <div className="w-full bg-white py-12 px-4 md:px-10 font-sans">
//             <div className={`grid gap-6 ${
//                 isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'
//             }`}>
//                 {components.map((item) => {
//                     const { id, type, props } = item;
//                     const isSelected = selectedId === id;

//                     // Header Type Layout (Span 2 columns)
//                     if (type === 'social-header') {
//                         return (
//                             <div 
//                                 key={id}
//                                 onClick={() => setSelectedId?.(id)}
//                                 className={`col-span-1 ${!isMobile ? 'md:col-span-2' : ''} bg-[#F3F4F6] p-10 flex flex-col justify-center relative cursor-pointer transition-all duration-300
//                                     ${isSelected ? 'ring-4 ring-indigo-500' : 'hover:shadow-md'}`}
//                                 style={{ borderRadius: `${props.borderRadius}px`, aspectRatio: isMobile ? '1/1' : props.aspectRatio }}
//                             >
//                                 <div className="max-w-[200px]">
//                                     <h2 className="text-2xl font-medium text-gray-800 leading-tight mb-8">
//                                         {props.title}
//                                     </h2>
//                                 </div>

//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden">
//                                         <div className="text-white text-[8px]">LOGO</div>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm font-bold text-gray-900">{props.username}</p>
//                                         <p className="text-xs text-gray-500">{props.followers}</p>
//                                     </div>
//                                 </div>

//                                 <button className="w-fit bg-[#1A1A1A] text-white px-8 py-2.5 rounded-md text-sm font-bold hover:bg-black transition-colors">
//                                     {props.buttonText}
//                                 </button>
//                             </div>
//                         );
//                     }

//                     // Standard Post Layout
//                     return (
//                         <div 
//                             key={id}
//                             onClick={() => setSelectedId?.(id)}
//                             className={`relative group cursor-pointer overflow-hidden transition-all duration-300
//                                 ${isSelected ? 'ring-4 ring-indigo-500 scale-[0.98]' : 'hover:shadow-xl'}`}
//                             style={{ 
//                                 borderRadius: `${props.borderRadius}px`, 
//                                 aspectRatio: props.aspectRatio || '1/1' 
//                             }}
//                         >
//                             <img 
//                                 src={props.image} 
//                                 alt="social-content"
//                                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                             />

//                             {/* Video Play Overlay */}
//                             {props.isVideo && (
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <div className="bg-white/90 p-4 rounded-full shadow-lg backdrop-blur-sm">
//                                         <FaPlay className="text-gray-900 ml-1" size={20} />
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Icon Badge */}
//                             <div className="absolute bottom-4 left-4">
//                                 <div 
//                                     className={`bg-white p-2 shadow-lg border border-gray-100 flex items-center justify-center 
//                                     ${props.iconShape === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
//                                 >
//                                     {renderIcon(props.socialmedianame, props.iconColor)}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default SocialMedia2;

import React, { useState, useEffect } from 'react';
import {
    Trash2, Plus, Settings2, X, MousePointer2,
    Image as ImageIcon, Type, Video, Users
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP, FaPlay } from 'react-icons/fa';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';

const SocialMedia2 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
                borderRadius: 12,
                aspectRatio: "1/1",
                iconShape: "circle",
                iconColor: "#374151"
            }
        };
        setData(prev => ({ ...prev, components: [...prev.components, newPost] }));
        setSelectedId(newId);
    };

    const handleDeletePost = (id) => {
        setData(prev => ({ ...prev, components: prev.components.filter(c => c.id !== id) }));
        setSelectedId(null);
    };

    const renderIcon = (itemProps, size = 14) => {
        const { socialmedianame, iconShape, iconColor } = itemProps;
        const iconStyle = { color: iconColor || "#374151" };

        let IconComponent;
        switch (socialmedianame?.toLowerCase()) {
            case 'instagram': IconComponent = <FaInstagram size={size} style={iconStyle} />; break;
            case 'facebook': IconComponent = <FaFacebookF size={size} style={iconStyle} />; break;
            case 'linkedin': IconComponent = <FaLinkedinIn size={size} style={iconStyle} />; break;
            case 'pinterest': IconComponent = <FaPinterestP size={size} style={iconStyle} />; break;
            default: IconComponent = <FaInstagram size={size} style={iconStyle} />;
        }

        const shapeClasses = {
            circle: "rounded-full",
            square: "rounded-none",
            rounded: "rounded-lg"
        };

        return (
            <div className={`bg-white p-2 shadow-lg border border-gray-100 flex items-center justify-center ${shapeClasses[iconShape] || "rounded-full"}`}>
                {IconComponent}
            </div>
        );
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
            Toast.fire({ icon: 'info', title: 'Saving template...', timer: 0 });
            const response = await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, category: "social-media" }),
            });
            if (response.ok) Toast.fire({ icon: 'success', title: 'Saved successfully', timer: 2000 });
            else throw new Error();
        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Save failed', timer: 3000 });
        }
    };

    const activeComp = selectedId ? getComp(selectedId) : null;

    const renderCanvasContent = (isPreview = false) => (
        <div className={`w-full bg-white py-12 px-4 md:px-10 font-sans min-h-screen ${isPreview ? '' : 'pb-40'}`}>
            <div className={`grid gap-6 ${viewMode === 'mobile' ? 'grid-cols-1' : viewMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'
                }`}>
                {data?.components?.map((item) => {
                    const isSelected = selectedId === item.id && !isPreview;

                    if (item.type === 'social-header') {
                        const themeColor = item.props.themeColor || "#1A1A1A";
                        return (
                            <div
                                key={item.id}
                                onClick={(e) => { e.stopPropagation(); !isPreview && setSelectedId(item.id); }}
                                className={`col-span-1 ${viewMode !== 'mobile' ? 'md:col-span-2' : ''} bg-[#F3F4F6] p-10 flex flex-col justify-center relative cursor-pointer transition-all duration-300
          ${isSelected ? 'ring-4 ring-indigo-500 scale-[1.02]' : 'hover:shadow-md'}`}
                                style={{ borderRadius: `${item.props.borderRadius}px`, }}
                            >
                                <div className="max-w-[250px]">
                                    <h2 className="text-3xl font-bold leading-tight mb-3" style={{ color: themeColor }}>
                                        {item.props.title}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                                        {item.props.logo ? (
                                            <img src={item.props.logo} alt="logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-gray-400 text-[8px]">LOGO</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{item.props.username}</p>
                                        <p className="text-xs text-gray-500 font-medium">{item.props.followers}</p>
                                    </div>
                                </div>
                                <button
                                    className="w-fit text-white px-8 py-3 rounded-md text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    {item.props.buttonText}
                                </button>
                            </div>
                        );
                    }

                    // SOCIAL POST ITEM
                    return (
                        <div
                            key={item.id}
                            onClick={(e) => { e.stopPropagation(); !isPreview && setSelectedId(item.id); }}
                            className={`relative group cursor-pointer transition-all duration-300 
        ${isSelected ? 'ring-4 ring-indigo-500 scale-[1.02]' : 'hover:shadow-2xl'}`}
                            style={{
                                borderRadius: `${item?.props?.borderRadius || 0}px`,
                                aspectRatio: item?.props?.aspectRatio || "1/1"
                            }}
                        >
                            <div className="h-full w-full overflow-hidden bg-gray-100" style={{ borderRadius: `${item?.props?.borderRadius || 0}px` }}>
                                {/* Render Video or Image based on props */}
                                {item.props.isVideo ? (
                                    <video src={item.props.image} className="h-full w-full object-cover" muted loop playsInline />
                                ) : (
                                    <img src={item?.props?.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Post" />
                                )}
                            </div>

                            {item.props.isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white/90 p-4 rounded-full shadow-lg backdrop-blur-sm"><FaPlay className="text-gray-900 ml-1" size={20} /></div>
                                </div>
                            )}

                            <div className="absolute bottom-4 left-4">{renderIcon(item.props)}</div>

                            {!isPreview && (
                                <button onClick={(e) => { e.stopPropagation(); handleDeletePost(item.id); }} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    );
                })}

                {/* ADD POST BUTTON - Keep this inside the grid but outside the map */}
                {!isPreview && (
                    <button onClick={handleAddPost} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl min-h-[250px] text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all bg-gray-50/50">
                        <Plus size={40} className="mb-2" />
                        <span className="font-medium text-sm">Add Social Post</span>
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans w-full">
            <button onClick={() => setIsPreviewOpen(true)} className="fixed top-3 right-80 z-50 cursor-pointer bg-[#615fff] text-white px-6 py-2 shadow-2xl rounded-lg flex items-center gap-2 font-bold text-xs">
                <MousePointer2 size={13} /> Preview
            </button>

            <div className="flex-1" onClick={() => setSelectedId(null)}>
                <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>{renderCanvasContent(false)}</DeviceMockup>
            </div>

            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-10">
                    <button onClick={() => setIsPreviewOpen(false)} className="absolute top-6 right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"><X size={32} /></button>
                    <div className="w-full max-w-7xl mt-10">{renderCanvasContent(true)}</div>
                </div>
            )}

            {/* SETTINGS SIDEBAR */}
            {/* SETTINGS SIDEBAR */}
            <div className="w-[18%] bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="text-sm font-bold flex items-center gap-2"><Settings2 size={16} />Settings</h2>
                    <button onClick={handleSave} className="text-white px-5 py-2 rounded-lg text-sm font-semibold bg-[#615fff] hover:bg-blue-600 shadow-md transition-all">Publish</button>
                </div>

                <div className="p-5 space-y-6">
                    {activeComp ? (
                        <div className="space-y-6">
                            {activeComp.type === 'social-header' ? (
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-indigo-600 uppercase tracking-widest block">Header Content</label>

                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Title Text</span>
                                        <textarea value={activeComp.props.title} onChange={(e) => handleUpdate(activeComp.id, "title", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px] outline-none h-20" />
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Theme Color (Text & Button)</span>
                                        <div className="flex items-center gap-3">
                                            <input type="color" value={activeComp.props.themeColor || "#1A1A1A"} onChange={(e) => handleUpdate(activeComp.id, "themeColor", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-none bg-transparent" />
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">{activeComp.props.themeColor || "#1A1A1A"}</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-gray-100">
                                        <span className="text-xs font-medium text-gray-700 block mb-1 flex items-center gap-1"><ImageIcon size={12} /> Logo Image URL</span>
                                        <input type="text" value={activeComp.props.logo || ""} onChange={(e) => handleUpdate(activeComp.id, "logo", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px]" placeholder="https://..." />
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Username</span>
                                        <input type="text" value={activeComp.props.username} onChange={(e) => handleUpdate(activeComp.id, "username", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px]" />
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1 flex items-center gap-1"><Users size={12} /> Followers Count</span>
                                        <input type="text" value={activeComp.props.followers} onChange={(e) => handleUpdate(activeComp.id, "followers", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px]" />
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1">Button Text</span>
                                        <input type="text" value={activeComp.props.buttonText} onChange={(e) => handleUpdate(activeComp.id, "buttonText", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px]" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Post Media</label>
                                    <div>
                                        <span className="text-xs font-medium text-gray-700 block mb-1 flex items-center gap-1">
                                            <ImageIcon size={12} /> Image URL
                                        </span>
                                        <input
                                            type="text"
                                            value={activeComp.props.image}
                                            onChange={(e) => {
                                                handleUpdate(activeComp.id, "image", e.target.value);
                                                // Explicitly ensure isVideo is false if it was previously set
                                                if (activeComp.props.isVideo) {
                                                    handleUpdate(activeComp.id, "isVideo", false);
                                                }
                                            }}
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px] outline-none focus:border-indigo-400"
                                            placeholder="Enter image link (e.g. https://...)"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Shared Styling */}
                            {/* Shared Styling */}
                            <div className="space-y-4 border-t pt-4">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Styling</label>

                                {/* Corner Radius Control */}
                                <div>
                                    <span className="text-xs font-medium text-gray-700 block mb-2">Corner Radius</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        value={activeComp.props.borderRadius || 0}
                                        onChange={(e) => handleUpdate(activeComp.id, "borderRadius", parseInt(e.target.value))}
                                        className="w-full accent-[#615fff]"
                                    />
                                </div>

                                {activeComp.type === 'social-post' && (
                                    <>
                                        {/* Social Platform Selection */}
                                        <div>
                                            <span className="text-xs font-medium text-gray-700 block mb-1">Social Platform</span>
                                            <select
                                                value={activeComp.props.socialmedianame}
                                                onChange={(e) => handleUpdate(activeComp.id, "socialmedianame", e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs"
                                            >
                                                <option value="instagram">Instagram</option>
                                                <option value="facebook">Facebook</option>
                                                <option value="linkedin">LinkedIn</option>
                                                <option value="pinterest">Pinterest</option>
                                            </select>
                                        </div>

                                        {/* Icon Shape Selection */}
                                        <div>
                                            <span className="text-xs font-medium text-gray-700 block mb-1">Icon Shape</span>
                                            <select
                                                value={activeComp.props.iconShape || "circle"}
                                                onChange={(e) => handleUpdate(activeComp.id, "iconShape", e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs"
                                            >
                                                <option value="circle">Circle</option>
                                                <option value="rounded">Round (Soft)</option>
                                                <option value="square">Square</option>
                                            </select>
                                        </div>

                                        {/* Icon Color Control */}
                                        <div>
                                            <span className="text-xs font-medium text-gray-700 block mb-1">Icon Color</span>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={activeComp.props.iconColor || "#374151"}
                                                    onChange={(e) => handleUpdate(activeComp.id, "iconColor", e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                                />
                                                <span className="text-[10px] font-mono text-gray-500 uppercase">{activeComp.props.iconColor || "#374151"}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-60 flex flex-col items-center justify-center text-center opacity-40">
                            <ImageIcon size={40} className="mb-2 text-gray-300" />
                            <p className="text-xs">Select a card or header<br />to edit properties</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialMedia2;