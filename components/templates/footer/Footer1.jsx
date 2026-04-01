// import React from 'react';
// import { 
//   FaInstagram, 
//   FaFacebookF, 
//   FaXTwitter, 
//   FaYoutube, 
//   FaPinterestP, 
//   FaLinkedinIn, 
//   FaWhatsapp 
// } from 'react-icons/fa6';

// const Footer1 = ({ data, selectedId, setSelectedId, viewMode }) => {
//   const isMobile = viewMode === "mobile";

//   // Extract sections from components array
//   const logoSection = data?.components.find(c => c.type === "section-logo");
//   const linksSection = data?.components.find(c => c.type === "section-links");
//   const socialSection = data?.components.find(c => c.type === "section-social-icons");
//   const copyrightSection = data?.components.find(c => c.type === "section-copyright");

//   const getSocialIcon = (platform) => {
//     switch (platform.toLowerCase()) {
//       case 'instagram': return <FaInstagram size={20} />;
//       case 'facebook': return <FaFacebookF size={20} />;
//       case 'x': return <FaXTwitter size={20} />;
//       case 'youtube': return <FaYoutube size={20} />;
//       case 'pinterest': return <FaPinterestP size={20} />;
//       case 'linkedin': return <FaLinkedinIn size={20} />;
//       default: return null;
//     }
//   };

//   return (
//     <footer 
//       className="w-full font-sans relative"
//       style={{ backgroundColor: data?.backgroundColor || "#000000" }}
//     >
//       <div className={`max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-8 ${isMobile ? 'text-center' : ''}`}>

//         {/* Main Footer Row */}
//         <div className={`w-full flex ${isMobile ? 'flex-col gap-8' : 'flex-row justify-between'} items-center`}>

//           {/* Section 1: Logo */}
//           {logoSection && (
//             <div 
//               className={`transition-all cursor-pointer rounded-lg ${selectedId === 'section-logo' ? 'ring-2 ring-blue-500' : ''}`}
//               onClick={() => setSelectedId('section-logo')}
//             >
//               <img 
//                 src={logoSection.content.image} 
//                 alt={logoSection.content.alt}
//                 style={{ 
//                   height: logoSection.styling.height, 
//                   objectFit: logoSection.styling.objectFit,
//                   padding: logoSection.styling.padding 
//                 }}
//               />
//             </div>
//           )}

//           {/* Section 2: Links */}
//           {linksSection && (
//             <div 
//               className={`flex flex-wrap justify-center items-center transition-all cursor-pointer p-2 rounded-lg ${selectedId === 'section-links' ? 'ring-2 ring-blue-500' : ''}`}
//               onClick={() => setSelectedId('section-links')}
//               style={{ gap: linksSection.styling.gap }}
//             >
//               {linksSection.links.map((link, idx) => (
//                 <a 
//                   key={idx} 
//                   href={link.url}
//                   className="hover:opacity-80 transition-opacity"
//                   style={{ 
//                     color: linksSection.styling.textColor,
//                     fontSize: linksSection.styling.fontSize,
//                     fontWeight: linksSection.styling.fontWeight
//                   }}
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </div>
//           )}

//           {/* Section 3: Social Media Icons */}
//           {socialSection && (
//             <div 
//               className={`flex items-center transition-all cursor-pointer p-2 rounded-lg ${selectedId === 'section-social-icons' ? 'ring-2 ring-blue-500' : ''}`}
//               onClick={() => setSelectedId('section-social-icons')}
//               style={{ gap: socialSection.styling.gap }}
//             >
//               {socialSection.icons.map((social, idx) => (
//                 <a 
//                   key={idx} 
//                   href="#" 
//                   className="transition-transform hover:scale-110"
//                   style={{ color: social.color }}
//                 >
//                   {getSocialIcon(social.platform)}
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Section 4: Copyright */}
//         {copyrightSection && (
//           <div 
//             className={`w-full border-t border-gray-800 pt-8 transition-all cursor-pointer ${selectedId === 'section-copyright' ? 'bg-gray-900 rounded-md' : ''}`}
//             onClick={() => setSelectedId('section-copyright')}
//             style={{ padding: copyrightSection.styling.padding }}
//           >
//             <p 
//               style={{ 
//                 color: copyrightSection.styling.textColor,
//                 fontSize: copyrightSection.styling.fontSize,
//                 textAlign: copyrightSection.styling.textAlign
//               }}
//             >
//               {copyrightSection.content}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Floating WhatsApp Widget */}
//       <div className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-transform">
//         <div className="bg-[#25D366] p-3 rounded-full shadow-lg text-white flex items-center justify-center">
//           <FaWhatsapp size={32} />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer1;



import React, { useState, useEffect } from 'react';
import { Settings2, MousePointer2, X, Trash2, Plus } from 'lucide-react';
import {
    FaInstagram, FaFacebookF, FaXTwitter,
    FaYoutube, FaPinterestP, FaLinkedinIn, FaWhatsapp
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup';

const Footer1 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData);
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const isMobile = viewMode === "mobile";
    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
            ),
        }));
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'rgba(255, 255, 255, 0.8)',
    });

    const handleSave = async () => {
        try {
            Toast.fire({ icon: 'info', title: 'Saving template...', timer: 0 });
            let folderName = "general";
            templatesData.forEach(cat => {
                const found = cat.templates.find(t => t.templateId === data.templateId);
                if (found) folderName = cat.category;
            });

            const response = await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, category: folderName }),
            });

            if (response.ok) {
                Toast.fire({ icon: 'success', title: 'Saved successfully', timer: 2000 });
            } else {
                throw new Error();
            }
        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Save failed', timer: 3000 });
        }
    };

    const getSocialIcon = (platform, size = 20) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <FaInstagram size={size} />;
            case 'facebook': return <FaFacebookF size={size} />;
            case 'x': return <FaXTwitter size={size} />;
            case 'youtube': return <FaYoutube size={size} />;
            case 'pinterest': return <FaPinterestP size={size} />;
            case 'linkedin': return <FaLinkedinIn size={size} />;
            default: return null;
        }
    };

    const Editable = ({ id, field, className, tag: Tag = "div" }) => {
        const comp = getComp(id);
        const content = comp.props[field];
        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-300 rounded transition-all`}
                contentEditable
                suppressContentEditableWarning={true}
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                style={{
                    fontSize: comp.props.fontSize,
                    color: comp.props.textColor,
                    textAlign: comp.props.textAlign
                }}
            >
                {content}
            </Tag>
        );
    };

    const renderCanvasContent = () => {
        const logoSec = getComp("section-logo");
        const linksSec = getComp("section-links");
        const socialSec = getComp("section-social-icons");
        const copySec = getComp("section-copyright");

        return (
            <footer className="w-full font-sans relative min-h-[300px]" style={{ backgroundColor: data?.backgroundColor || "#000000" }}>
                <div className={`max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-8 ${isMobile ? 'text-center' : ''}`}>
                    <div className={`w-full flex ${isMobile ? 'flex-col gap-8' : 'flex-row justify-between'} items-center`}>

                        {/* Logo Section */}
                        <div
                            className={`transition-all cursor-pointer rounded-lg p-2 ${selectedId === logoSec.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(logoSec.id);
                            }}
                        >
                            <img src={logoSec.props.image} alt={logoSec.props.alt} style={{ height: logoSec.props.height, objectFit: logoSec.props.objectFit }} />
                        </div>

                        {/* Links Section */}
                        <div
                            className={`flex flex-wrap justify-center items-center transition-all cursor-pointer p-2 rounded-lg ${selectedId === linksSec.id ? 'ring-2 ring-blue-500' : ''}`}

                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(linksSec.id);
                            }}
                            style={{ gap: linksSec.props.gap }}
                        >
                            {linksSec.props.links?.map((link, idx) => (
                                <span key={idx} style={{ color: linksSec.props.textColor, fontSize: linksSec.props.fontSize }}>{link.label}</span>
                            ))}
                        </div>

                        {/* Social Icons Section */}
                        <div
                            className={`flex items-center transition-all cursor-pointer p-2 rounded-lg ${selectedId === socialSec.id ? 'ring-2 ring-blue-500' : ''}`}

                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(socialSec.id);
                            }}
                            style={{ gap: socialSec.props.gap }}
                        >
                            {socialSec.props.icons?.map((social, idx) => (
                                <div key={idx} style={{ color: social.color }}>
                                    {getSocialIcon(social.platform, parseInt(socialSec.props.iconSize))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div
                        className={`w-full border-t border-gray-800 pt-8 transition-all cursor-pointer ${selectedId === copySec.id ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setSelectedId(copySec.id)}
                    >
                        <Editable id="section-copyright" field="content" tag="p" />
                    </div>
                </div>
            </footer>
        );
    };

    const activeComp = selectedId ? getComp(selectedId) : null;

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "81%" }} onClick={() => setSelectedId(null)}>
            <button onClick={() => setIsPreviewOpen(true)} className="fixed top-3 right-80 z-50 text-white px-6 py-2 shadow-2xl rounded-lg font-bold bg-[#615fff]">
                Preview
            </button>

            <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                {renderCanvasContent()}
            </DeviceMockup>

            {/* Sidebar Settings */}
            <div
                className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                style={{ width: "16%" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800" style={{ fontSize: "18px" }}>
                        <Settings2 size={18} /> Settings
                    </h2>
                    <button
                        onClick={handleSave}
                        className="text-white px-5 py-2 rounded-lg text-sm font-semibold bg-[#615fff] hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95"
                        style={{ padding: "8px 18px", fontSize: "14px" }}
                    >
                        Publish
                    </button>
                </div>

                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">

                            {/* Breadcrumb style Badge */}
                            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 p-1 rounded-xl mb-4">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {activeComp.id.replace('section-', '').replace(/-/g, ' ')}
                                </span>
                            </div>

                            {/* GENERAL STYLING GROUP */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">General Styling</label>

                                {/* Footer Background */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-700">Footer Background</span>
                                        <span className="text-xs font-mono text-gray-400 uppercase">{data.backgroundColor}</span>
                                    </div>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                            <input
                                                type="color"
                                                value={data.backgroundColor}
                                                onChange={(e) => setData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.backgroundColor}
                                            onChange={(e) => setData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Text Color */}
                                {activeComp.props.textColor && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Text Color</span>
                                            <span className="text-xs font-mono text-gray-400 uppercase">{activeComp.props.textColor}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                            <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                <input
                                                    type="color"
                                                    value={activeComp.props.textColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, "textColor", e.target.value)}
                                                    className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={activeComp.props.textColor}
                                                onChange={(e) => handleUpdate(activeComp.id, "textColor", e.target.value)}
                                                className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Font Size Slider */}
                                {activeComp.props.fontSize && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Font Size</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.fontSize}</span>
                                        </div>
                                        <input
                                            type="range" min="10" max="40"
                                            value={parseInt(activeComp.props.fontSize)}
                                            onChange={(e) => handleUpdate(activeComp.id, "fontSize", `${e.target.value}px`)}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* LOGO SETTINGS */}
                            {activeComp.id === "section-logo" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Logo Settings</label>
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-700 block">Image URL</span>
                                        <input
                                            type="text"
                                            value={activeComp.props.image}
                                            onChange={(e) => handleUpdate(activeComp.id, "image", e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50 outline-none focus:border-[#615fff] focus:ring-4 focus:ring-[#615fff]/5 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Height</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.height}</span>
                                        </div>
                                        <input
                                            type="range" min="20" max="150"
                                            value={parseInt(activeComp.props.height)}
                                            onChange={(e) => handleUpdate(activeComp.id, "height", `${e.target.value}px`)}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* NAVIGATION LINKS */}
                            {activeComp.id === "section-links" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Navigation Links</label>
                                        <button
                                            onClick={() => {
                                                const newLinks = [...(activeComp.props.links || []), { label: "New Link", url: "#" }];
                                                handleUpdate(activeComp.id, "links", newLinks);
                                            }}
                                            className="text-[10px] text-white px-3 py-1 rounded-lg hover:opacity-90 transition-colors flex items-center gap-1 font-bold shadow-sm"
                                            style={{ backgroundColor: "#57915a", cursor: "pointer" }}
                                        >
                                            <span>+</span> Add
                                        </button>
                                    </div>
                                    <div className="space-y-2     pr-1  ">
                                        {(activeComp.props.links || []).map((link, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-indigo-200 transition-all">
                                                <input
                                                    className="bg-transparent text-xs font-semibold text-gray-600 focus:outline-none w-full"
                                                    value={link.label}
                                                    onChange={(e) => {
                                                        const newLinks = [...activeComp.props.links];
                                                        newLinks[i].label = e.target.value;
                                                        handleUpdate(activeComp.id, "links", newLinks);
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newLinks = activeComp.props.links.filter((_, idx) => idx !== i);
                                                        handleUpdate(activeComp.id, "links", newLinks);
                                                    }}
                                                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            
                            {activeComp.id === "section-social-icons" && (
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Icon Appearance</label>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-gray-700">Icon Size</span>
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.iconSize}</span>
                                            </div>
                                            <input
                                                type="range" min="12" max="48"
                                                value={parseInt(activeComp.props.iconSize) || 20}
                                                onChange={(e) => handleUpdate(activeComp.id, "iconSize", `${e.target.value}px`)}
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Active Icons</label>
                                            <button
                                                onClick={() => {
                                                    const newIcons = [...(activeComp.props.icons || []), { platform: "instagram", color: "#ffffff", url: "#" }];
                                                    handleUpdate(activeComp.id, "icons", newIcons);
                                                }}
                                                className="p-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {(activeComp.props.icons || []).map((social, i) => (
                                                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
                                                    <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-100 shadow-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-1.5 bg-gray-100 rounded text-gray-600">
                                                                {getSocialIcon(social.platform, 14)}
                                                            </div>
                                                            <select
                                                                className="text-xs border-none bg-transparent font-bold focus:ring-0 cursor-pointer capitalize"
                                                                value={social.platform}
                                                                onChange={(e) => {
                                                                    const newIcons = [...activeComp.props.icons];
                                                                    newIcons[i].platform = e.target.value;
                                                                    handleUpdate(activeComp.id, "icons", newIcons);
                                                                }}
                                                            >
                                                                <option value="facebook">Facebook</option>
                                                                <option value="instagram">Instagram</option>
                                                                <option value="x">X</option>
                                                                <option value="youtube">YouTube</option>
                                                            </select>
                                                        </div>
                                                        <Trash2
                                                            size={14}
                                                            className="text-red-400 hover:text-red-600 cursor-pointer transition-all"
                                                            onClick={() => {
                                                                const newIcons = activeComp.props.icons.filter((_, idx) => idx !== i);
                                                                handleUpdate(activeComp.id, "icons", newIcons);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Color:</span>
                                                        <input
                                                            type="color"
                                                            value={social.color || "#ffffff"}
                                                            onChange={(e) => {
                                                                const newIcons = [...activeComp.props.icons];
                                                                newIcons[i].color = e.target.value;
                                                                handleUpdate(activeComp.id, "icons", newIcons);
                                                            }}
                                                            className="w-6 h-6 cursor-pointer border-none bg-transparent"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                <Settings2 className="w-10 h-10 text-indigo-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">No Section Selected</h3>
                            <p className="text-sm text-gray-400 max-w-[180px]">
                                Click any element on the left to adjust its specific properties.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-10 overflow-y-auto">
                    <button onClick={() => setIsPreviewOpen(false)} className="absolute top-6 right-10 text-white"><X size={32} /></button>
                    <div className="w-full max-w-7xl bg-white rounded-xl overflow-hidden pointer-events-none">
                        {renderCanvasContent()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Footer1;