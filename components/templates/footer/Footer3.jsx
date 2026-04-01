// import React from 'react';
// import { 
//     FaInstagram, FaFacebookF, FaXTwitter, 
//     FaYoutube, FaPinterestP, FaLinkedinIn, 
//     FaMapLocationDot, FaPhone, FaEnvelope 
// } from 'react-icons/fa6';

// const Footer3 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     const isMobile = viewMode === "mobile";


//     const logoSection = data?.components.find(c => c.id === "section-logo");
//     const linksSection = data?.components.find(c => c.id === "section-links");
//     const companyDetailSection = data?.components.find(c => c.id === "section-company-detail");
//     const copyrightSection = data?.components.find(c => c.id === "section-copyright");

//     const bgColor = logoSection?.props?.backgroundColor || "#f8f7f5";


//     const SocialIcon = ({ platform, color, size }) => {
//         const icons = {
//             Instagram: <FaInstagram style={{ color }} size={size} />,
//             Facebook: <FaFacebookF style={{ color }} size={size} />,
//             X: <FaXTwitter style={{ color }} size={size} />,
//             YouTube: <FaYoutube style={{ color }} size={size} />,
//             Pinterest: <FaPinterestP style={{ color }} size={size} />,
//             LinkedIn: <FaLinkedinIn style={{ color }} size={size} />
//         };
//         return icons[platform] || null;
//     };

//     return (
//         <footer className="w-full  " style={{ backgroundColor: bgColor }}>
//             <div className={`max-w-7xl mx-auto px-6 py-16 flex ${isMobile ? 'flex-col gap-12 text-center' : 'flex-row justify-between items-start'}`}>


//                 {logoSection && (
//                     <div 
//                         className={`transition-all cursor-pointer p-2 rounded-lg flex-1 ${selectedId === 'section-logo' ? 'ring-2 ring-blue-500 bg-white/30' : ''}`}
//                         onClick={() => setSelectedId('section-logo')}
//                     >
//                         <img 
//                             src={logoSection.props.image} 
//                             alt={logoSection.props.alt} 
//                             style={{ height: logoSection.props.height, objectFit: 'contain' }}
//                             className={isMobile ? 'mx-auto' : ''}
//                         />
//                     </div>
//                 )}


//                 {linksSection && (
//                     <div 
//                         className={`transition-all cursor-pointer p-2 rounded-lg flex-[1.5] grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-4'}`}
//                         onClick={() => setSelectedId('section-links')}
//                         style={{ outline: selectedId === 'section-links' ? '2px solid #3b82f6' : 'none' }}
//                     >
//                         {linksSection.props.groups.map((group, idx) => (
//                             <ul key={idx} className="space-y-4">
//                                 {group.links.map((link, lIdx) => (
//                                     <li key={lIdx}>
//                                         <a 
//                                             href={link.url}
//                                             className="hover:opacity-50 transition-opacity uppercase tracking-widest"
//                                             style={{ 
//                                                 color: linksSection.props.textColor, 
//                                                 fontSize: linksSection.props.fontSize,
//                                                 fontWeight: linksSection.props.fontWeight
//                                             }}
//                                         >
//                                             {link.label}
//                                         </a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ))}
//                     </div>
//                 )}


//                 {companyDetailSection && (
//                     <div 
//                         className={`transition-all cursor-pointer p-2 rounded-lg flex-1 space-y-6 ${selectedId === 'section-company-detail' ? 'ring-2 ring-blue-500 bg-white/30' : ''}`}
//                         onClick={() => setSelectedId('section-company-detail')}
//                     >
//                         {/* Social Row */}
//                         <div className={`flex gap-4 ${isMobile ? 'justify-center' : 'justify-start'}`}>
//                             {companyDetailSection.props.socialIcons.map((social, sIdx) => (
//                                 <a key={sIdx} href={social.url} className="hover:opacity-70">
//                                     <SocialIcon 
//                                         platform={social.platform} 
//                                         color={social.color} 
//                                         size={parseInt(companyDetailSection.props.iconSize)} 
//                                     />
//                                 </a>
//                             ))}
//                         </div>

//                         <div className="space-y-4" style={{ color: companyDetailSection.props.textColor, fontSize: companyDetailSection.props.fontSize }}>
//     <div className="flex gap-3 items-start">

//         <FaMapLocationDot className="mt-1 shrink-0" size={16} />
//         <p className="leading-relaxed">{companyDetailSection.props.location}</p>
//     </div>
//     <div className="flex gap-3 items-center">

//         <FaPhone className="shrink-0" size={14} />
//         <p>{companyDetailSection.props.phone}</p>
//     </div>
//     <div className="flex gap-3 items-center">

//         <FaEnvelope className="shrink-0" size={14} />
//         <p>{companyDetailSection.props.email}</p>
//     </div>
// </div>
//                     </div>
//                 )}
//             </div>

//             {copyrightSection && (
//                 <div 
//                     className={`w-full py-10 transition-all cursor-pointer ${selectedId === 'section-copyright' ? 'ring-2 ring-blue-500' : ''}`}
//                     onClick={() => setSelectedId('section-copyright')}
//                 >
//                     <div 
//                         className="text-center"
//                         style={{ 
//                             color: copyrightSection.props.textColor, 
//                             fontSize: copyrightSection.props.fontSize 
//                         }}
//                     >
//                         {copyrightSection.props.content}
//                     </div>
//                 </div>
//             )}
//         </footer>
//     );
// };

// export default Footer3;


import React, { useState, useEffect } from 'react';
import { Settings2, Trash2, Plus, X } from 'lucide-react';
import {
    FaInstagram, FaFacebookF, FaXTwitter,
    FaYoutube, FaPinterestP, FaLinkedinIn,
    FaMapLocationDot, FaPhone, FaEnvelope
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup';

const Footer3 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData);
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const isMobile = viewMode === "mobile";

    // Helper to get component data
    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
            ),
        }));
    };

    const handleSave = async () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
        });
        try {
            let category = "general";
            templatesData.forEach(cat => {
                if (cat.templates.find(t => t.templateId === data.templateId)) category = cat.category;
            });
            await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, category }),
            });
            Toast.fire({ icon: 'success', title: 'Saved successfully' });
        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Save failed' });
        }
    };

    const SocialIcon = ({ platform, color, size }) => {
        const icons = {
            Instagram: <FaInstagram style={{ color }} size={size} />,
            Facebook: <FaFacebookF style={{ color }} size={size} />,
            X: <FaXTwitter style={{ color }} size={size} />,
            YouTube: <FaYoutube style={{ color }} size={size} />,
            Pinterest: <FaPinterestP style={{ color }} size={size} />,
            LinkedIn: <FaLinkedinIn style={{ color }} size={size} />
        };
        return icons[platform] || null;
    };

    const Editable = ({ id, field, className, tag: Tag = "div" }) => {
        const comp = getComp(id);
        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-400 rounded`}
                contentEditable
                suppressContentEditableWarning
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                style={{ color: comp.props.textColor, fontSize: comp.props.fontSize }}
            >
                {comp.props[field]}
            </Tag>
        );
    };

    const renderCanvas = () => {
        const logoSec = getComp("section-logo");
        const linksSec = getComp("section-links");
        const companySec = getComp("section-company-detail");
        const copySec = getComp("section-copyright");

        return (
            <footer className="w-full" style={{ backgroundColor: data?.backgroundColor || "#f8f7f5" }}>
                <div className={`max-w-7xl mx-auto px-6 py-16 flex ${isMobile ? 'flex-col gap-12 text-center' : 'flex-row justify-between items-start'}`}>

                   
                    <div
                        className={`transition-all cursor-pointer p-2 rounded-lg flex-1 ${selectedId === 'section-logo' ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-logo'); }}
                    >
                        <img
                            src={logoSec.props.image}
                            alt="logo"
                            style={{ height: logoSec.props.height, objectFit: 'contain' }}
                            className={isMobile ? 'mx-auto' : ''}
                        />
                    </div>

                 
                    <div
                        className={`transition-all cursor-pointer p-2 rounded-lg flex-[1.5] grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 gap-8'} ${selectedId === 'section-links' ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-links'); }}
                    >
                        {linksSec.props.groups?.map((group, gIdx) => (
                            <ul key={gIdx} className="space-y-4" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "13px" }}>
                                {group.links?.map((link, lIdx) => (
                                    <li key={lIdx} className="uppercase tracking-widest hover:opacity-50 transition-opacity" style={{ color: linksSec.props.textColor, fontSize: linksSec.props.fontSize }}>
                                        {link.label}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>

            
                    <div
                        className={`transition-all cursor-pointer p-2 rounded-lg flex-1 space-y-6 ${selectedId === 'section-company-detail' ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-company-detail'); }}
                    >
                        <div className={`flex gap-4 ${isMobile ? 'justify-center' : 'justify-start'}`}>
                            {companySec.props.socialIcons?.map((social, sIdx) => (
                                <SocialIcon key={sIdx} platform={social.platform} color={social.color} size={parseInt(companySec.props.iconSize)} />
                            ))}
                        </div>
                        <div className="space-y-4" style={{ color: companySec.props.textColor, fontSize: companySec.props.fontSize }}>
                            <div className="flex gap-3"><FaMapLocationDot className="mt-1 shrink-0" size={16} /><p style={{textAlign: "left"}}>{companySec.props.location}</p></div>
                            <div className="flex gap-3"><FaPhone size={14} /><p>{companySec.props.phone}</p></div>
                            <div className="flex gap-3"><FaEnvelope size={14} /><p>{companySec.props.email}</p></div>
                        </div>
                    </div>
                </div>

         
                <div className={`w-full py-7 border-t border-black/5 text-center transition-all ${selectedId === 'section-copyright' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedId('section-copyright')}
                    style={{ backgroundColor: copySec.props.backgroundColor }}
                >
                    <Editable id="section-copyright" field="content" tag="p" />
                </div>
            </footer>
        );
    };

    const activeComp = selectedId ? getComp(selectedId) : null;

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "81%" }} onClick={() => setSelectedId(null)}>
            <button onClick={() => setIsPreviewOpen(true)} className="fixed cursor-pointer top-3 right-80 z-50 text-white px-6 py-2 shadow-2xl rounded-lg font-bold bg-[#615fff]">
                Preview
            </button>

            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-10 overflow-y-auto">
                    <button onClick={() => setIsPreviewOpen(false)} className="absolute cursor-pointer top-6 right-10 text-white"><X size={32} /></button>
                    <div className="w-full max-w-7xl bg-white rounded-xl overflow-hidden pointer-events-none">
                        {renderCanvas()}
                    </div>
                </div>
            )}

            <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                {renderCanvas()}
            </DeviceMockup>
     
            <div
                className=" bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                style={{ width: "16%" }}
                onClick={(e) => e.stopPropagation()}
            >
              
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

                
                            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 p-1 rounded-xl mb-4">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {activeComp.id.replace('section-', '').replace(/-/g, ' ')}
                                </span>
                            </div>

               
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">General Styling</label>

                           
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium text-gray-700">
                                        <span>Background Color</span>
                                        <span className="text-xs font-mono text-gray-400 uppercase">{data.backgroundColor}</span>
                                    </div>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                            <input
                                                type="color"
                                                value={data.backgroundColor || "#f8f7f5"}
                                                onChange={(e) => setData({ ...data, backgroundColor: e.target.value })}
                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.backgroundColor}
                                            onChange={(e) => setData({ ...data, backgroundColor: e.target.value })}
                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Text Color Picker (If exists in props) */}
                                {(activeComp.props.textColor) && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium text-gray-700">
                                            <span>Text Color</span>
                                            <span className="text-xs font-mono text-gray-400 uppercase">{activeComp.props.textColor}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                            <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                <input
                                                    type="color"
                                                    value={activeComp.props.textColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'textColor', e.target.value)}
                                                    className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={activeComp.props.textColor}
                                                onChange={(e) => handleUpdate(activeComp.id, 'textColor', e.target.value)}
                                                className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* LINKS EDITOR */}
                            {activeComp.id === 'section-links' && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Links List</label>
                                        <button
                                            onClick={() => {
                                                const currentLinks = activeComp.props.groups[0].links || [];
                                                const newGroups = [...activeComp.props.groups];
                                                newGroups[0] = { ...newGroups[0], links: [...currentLinks, { label: 'New Link', url: '#' }] };
                                                handleUpdate(activeComp.id, 'groups', newGroups);
                                            }}
                                            className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 transition-colors"
                                        >
                                            + ADD
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {activeComp.props.groups[0].links?.map((link, index) => (
                                            <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2 relative group">
                                                <button
                                                    onClick={() => {
                                                        const newLinks = activeComp.props.groups[0].links.filter((_, i) => i !== index);
                                                        const newGroups = [...activeComp.props.groups];
                                                        newGroups[0] = { ...newGroups[0], links: newLinks };
                                                        handleUpdate(activeComp.id, 'groups', newGroups);
                                                    }}
                                                    className="absolute -top-1 -right-1 bg-white border border-gray-200 text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ✕
                                                </button>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 text-xs font-medium border-none bg-white rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-indigo-500"
                                                    value={link.label}
                                                    onChange={(e) => {
                                                        const newLinks = [...activeComp.props.groups[0].links];
                                                        newLinks[index].label = e.target.value;
                                                        const newGroups = [...activeComp.props.groups];
                                                        newGroups[0].links = newLinks;
                                                        handleUpdate(activeComp.id, 'groups', newGroups);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* COMPANY DETAIL EDITOR */}
                            {activeComp.id === 'section-company-detail' && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Contact Info</label>
                                    <div className="space-y-3">
                                        <textarea
                                            className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50 outline-none focus:border-[#615fff] transition-all"
                                            value={activeComp.props.location}
                                            onChange={(e) => handleUpdate(activeComp.id, 'location', e.target.value)}
                                            placeholder="Location Address"
                                        />
                                        <input
                                            type="text"
                                            className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50 outline-none focus:border-[#615fff]"
                                            value={activeComp.props.phone}
                                            onChange={(e) => handleUpdate(activeComp.id, 'phone', e.target.value)}
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                            )}


                            {/* TYPOGRAPHY GROUP (FONT SIZE SLIDERS) */}
                            {activeComp.props.fontSize && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">Typography</label>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Text Size</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.fontSize}</span>
                                        </div>
                                        <input
                                            type="range" min="10" max="30"
                                            value={parseInt(activeComp.props.fontSize)}
                                            onChange={(e) => handleUpdate(activeComp.id, "fontSize", `${e.target.value}px`)}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* SOCIAL MEDIA GROUP */}
                         {
                        activeComp.id === 'section-company-detail' &&(
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4 mt-6">
                            <div className="flex justify-between items-center">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Social Media</label>
                                <button
                                    onClick={() => {
                                        const newIcons = [...(activeComp.props.socialIcons || []), { platform: 'Facebook', color: '#000000', url: '#' }];
                                        handleUpdate(activeComp.id, 'socialIcons', newIcons);
                                    }}
                                    className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 transition-colors"
                                >
                                    + ADD ICON
                                </button>
                            </div>

                            <div className="space-y-4">
                                {activeComp.props.socialIcons?.map((social, index) => (
                                    <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => {
                                                const newIcons = activeComp.props.socialIcons.filter((_, i) => i !== index);
                                                handleUpdate(activeComp.id, 'socialIcons', newIcons);
                                            }}
                                            className="absolute -top-2 -right-2 bg-white border border-gray-200 text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-[10px] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50"
                                        >
                                            ✕
                                        </button>

                                        {/* Platform & Color Row */}
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Platform"
                                                className="w-2/3 p-2 text-xs font-medium border border-gray-200 bg-white rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
                                                value={social.platform}
                                                onChange={(e) => {
                                                    const newIcons = [...activeComp.props.socialIcons];
                                                    newIcons[index].platform = e.target.value;
                                                    handleUpdate(activeComp.id, 'socialIcons', newIcons);
                                                }}
                                            />
                                            <div className="w-1/3 relative h-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                                <input
                                                    type="color"
                                                    value={social.color}
                                                    onChange={(e) => {
                                                        const newIcons = [...activeComp.props.socialIcons];
                                                        newIcons[index].color = e.target.value;
                                                        handleUpdate(activeComp.id, 'socialIcons', newIcons);
                                                    }}
                                                    className="absolute inset-0 w-full h-full cursor-pointer scale-[3] bg-transparent border-none"
                                                />
                                            </div>
                                        </div>

                                        {/* URL Input */}
                                        <input
                                            type="text"
                                            placeholder="Profile URL"
                                            className="w-full p-2 text-xs font-mono border border-gray-200 bg-white rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 text-gray-500"
                                            value={social.url}
                                            onChange={(e) => {
                                                const newIcons = [...activeComp.props.socialIcons];
                                                newIcons[index].url = e.target.value;
                                                handleUpdate(activeComp.id, 'socialIcons', newIcons);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        )
                         }

                            {activeComp.id === 'section-copyright' && (
                        <div className="space-y-6">
                            {/* Background Color Group */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">Section Background</label>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-700">Background</span>
                                        <span className="text-xs font-mono text-gray-400 uppercase">
                                            {activeComp.props.backgroundColor || "#f8f7f5"}
                                        </span>
                                    </div>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                            <input
                                                type="color"
                                                value={activeComp.props.backgroundColor || "#f8f7f5"}
                                                onChange={(e) => handleUpdate(activeComp.id, 'backgroundColor', e.target.value)}
                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={activeComp.props.backgroundColor || "#f8f7f5"}
                                            onChange={(e) => handleUpdate(activeComp.id, 'backgroundColor', e.target.value)}
                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    )}

                        </div>

                      
                   
                    ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                        <Settings2 size={48} className="text-gray-300" />
                        <p className="text-sm font-medium text-gray-500 italic px-10">Select a component to customize its settings</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer3;
