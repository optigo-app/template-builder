// import React from 'react';
// import {
//     FaInstagram, FaFacebookF, FaXTwitter,
//     FaYoutube, FaPinterestP, FaLinkedinIn,
//     FaLocationDot, FaPhone, FaEnvelope
// } from 'react-icons/fa6';

// const Footer4 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     const isMobile = viewMode === "mobile";

//     // Extract Sections from JSON
//     const logoSection = data?.components.find(c => c.id === "section-1-logo-social");
//     const officeSection = data?.components.find(c => c.id === "section-2-company-details");
//     const linksSection = data?.components.find(c => c.id === "section-3-group-links");
//     const signupSection = data?.components.find(c => c.id === "section-4-signup");
//     const copyrightSection = data?.components.find(c => c.id === "section-copyright");

//     const bgColor = data?.backgroundColor || "#ffffff";

//     const SocialIcon = ({ platform, size = 20 }) => {
//         const icons = {
//             Instagram: <FaInstagram size={size} className="text-[#c13584]" />,
//             Facebook: <FaFacebookF size={size} className="text-[#1877f2]" />,
//             X: <FaXTwitter size={size} className="text-black" />,
//             YouTube: <FaYoutube size={size} className="text-[#ff0000]" />,
//             Pinterest: <FaPinterestP size={size} className="text-[#e60023]" />,
//             LinkedIn: <FaLinkedinIn size={size} className="text-[#0077b5]" />
//         };
//         return icons[platform] || null;
//     };

//     const SelectionWrapper = ({ id, children, className = "" }) => (
//         <div
//             onClick={() => setSelectedId(id)}
//             className={`transition-all cursor-pointer p-2 rounded-lg ${className} ${selectedId === id ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''
//                 }`}
//         >
//             {children}
//         </div>
//     );

//     return (
//         <footer className="w-full font-sans border-t border-gray-100" style={{ backgroundColor: bgColor }}>
//             <div className={`max-w-7xl mx-auto px-6 py-12 flex ${isMobile ? 'flex-col gap-10' : 'flex-row justify-between items-start gap-8'}`}>

//                 {/* Section 1: Logo & Social */}
//                 {logoSection && (
//                     <SelectionWrapper id={logoSection.id} className="flex-1 min-w-[150px]">
//                         <div className="mb-6 flex flex-col items-start">
//                             {/* Logo Icon */}
//                             <img
//                                 src={logoSection.props.logoUrl}
//                                 alt="Logo Icon"
//                                 className="w-8 h-8 mb-2 object-contain"
//                             />


//                         </div>
//                         <div className="flex flex-wrap gap-3">
//                             {logoSection.props.socialLinks.map((social, idx) => (
//                                 <a key={idx} href={social.url} className="hover:scale-110 transition-transform">
//                                     <SocialIcon platform={social.platform} />
//                                 </a>
//                             ))}
//                         </div>
//                     </SelectionWrapper>
//                 )}

//                 {/* Section 2: Office Details */}
//                 {officeSection && (
//                     <SelectionWrapper id={officeSection.id} className="flex-1 min-w-[250px]">
//                         <h4 className="text-sm font-semibold tracking-[0.2em] mb-6 text-gray-500 uppercase">
//                             {officeSection.props.heading}
//                         </h4>
//                         <div className="space-y-4 text-sm leading-relaxed" style={{ color: officeSection.props.textColor }}>
//                             <div className="flex gap-3">
//                                 <FaLocationDot className="mt-1 shrink-0 text-gray-400" size={16} />
//                                 <p>{officeSection.props.address}</p>
//                             </div>
//                             <div className="flex gap-3 items-center">
//                                 <FaPhone className="shrink-0 text-gray-400" size={14} />
//                                 <p>{officeSection.props.phone}</p>
//                             </div>
//                             <div className="flex gap-3 items-center">
//                                 <FaEnvelope className="shrink-0 text-gray-400" size={14} />
//                                 <p>{officeSection.props.email}</p>
//                             </div>
//                         </div>
//                     </SelectionWrapper>
//                 )}

//                 {/* Section 3: Group Links */}
//                 {linksSection && (
//                     <SelectionWrapper id={linksSection.id} className={`flex-[1.5] flex ${isMobile ? 'flex-col gap-8' : 'flex-row gap-12'}`}>
//                         {linksSection.props.groups.map((group, gIdx) => (
//                             <div key={gIdx} className="flex-1">
//                                 <h4 className="text-sm font-semibold tracking-[0.2em] mb-6 text-gray-500 uppercase">
//                                     {group.heading}
//                                 </h4>
//                                 <ul className="space-y-3">
//                                     {group.links.map((link, lIdx) => (
//                                         <li key={lIdx}>
//                                             <a href={link.url} className="text-sm hover:text-black transition-colors" style={{ color: linksSection.props.textColor }}>
//                                                 {link.label}
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </SelectionWrapper>
//                 )}

//                 {/* Section 4: Newsletter Signup */}
//                 {signupSection && (
//                     <SelectionWrapper id={signupSection.id} className="flex-1 min-w-[280px]">
//                         <h4 className="text-sm font-semibold tracking-[0.2em] mb-4 text-gray-500 uppercase">
//                             {signupSection.props.heading}
//                         </h4>
//                         <p className="text-xs leading-relaxed mb-6 text-gray-500">
//                             {signupSection.props.description}
//                         </p>
//                         <div className="flex border-b border-black pb-1">
//                             <input
//                                 type="email"
//                                 placeholder={signupSection.props.inputPlaceholder}
//                                 className="bg-transparent text-sm w-full outline-none py-2"
//                             />
//                             <button className="bg-black text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest hover:bg-gray-800 transition-colors">
//                                 {signupSection.props.buttonLabel}
//                             </button>
//                         </div>
//                     </SelectionWrapper>
//                 )}
//             </div>

//             {/* Copyright Bar */}
//             {copyrightSection && (
//                 <div
//                     onClick={() => setSelectedId(copyrightSection.id)}
//                     className={`max-w-7xl mx-auto px-6 py-8 border-t border-gray-100 mt-8 ${selectedId === copyrightSection.id ? 'ring-2 ring-blue-500' : ''
//                         }`}
//                 >
//                     <p className="text-gray-500" style={{ fontSize: copyrightSection.props.fontSize, textAlign: copyrightSection.props.textAlign }}>
//                         {copyrightSection.props.content}
//                     </p>
//                 </div>
//             )}
//         </footer>
//     );
// };

// export default Footer4;


import React, { useState, useEffect } from 'react';
import { Settings2, Trash2, Plus, X } from 'lucide-react';
import {
    FaInstagram, FaFacebookF, FaXTwitter,
    FaYoutube, FaPinterestP, FaLinkedinIn,
    FaLocationDot, FaPhone, FaEnvelope
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup';

const Footer4 = ({ data: initialData }) => {
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

    const SocialIcon = ({ platform, size = 20, color }) => {
        const icons = {

            Instagram: <FaInstagram size={size} color={color} />,
            Facebook: <FaFacebookF size={size} color={color} />,
            X: <FaXTwitter size={size} color={color} />,
            YouTube: <FaYoutube size={size} color={color} />,
            Pinterest: <FaPinterestP size={size} color={color} />,
            LinkedIn: <FaLinkedinIn size={size} color={color} />
        };
        return icons[platform] || null;
    };
    const Editable = ({ id, field, className, tag: Tag = "div", placeholder = "", style = {} }) => {
        const comp = getComp(id);

        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-400 rounded transition-all`}
                contentEditable
                link-placeholder={placeholder}
                suppressContentEditableWarning
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                // MERGE the passed style prop with component data
                style={{
                    ...style, // This allows you to pass headingColor, textSize, etc.
                    outline: 'none'
                }}
            >
                {comp.props[field]}
            </Tag>
        );
    };

    const renderCanvas = () => {
        const logoSec = getComp("section-1-logo-social");
        const officeSec = getComp("section-2-company-details");
        const linksSec = getComp("section-3-group-links");
        const signupSec = getComp("section-4-signup");
        const copySec = getComp("section-copyright");

        return (
            <footer className="w-full font-sans border-t border-gray-100" style={{ backgroundColor: data?.backgroundColor || "#ffffff" }}>
                <div className={`max-w-7xl mx-auto px-6 py-12 flex ${isMobile ? 'flex-col gap-10' : 'flex-row justify-between items-start gap-8 flex-wrap'}`}>

                    {/* Section 1: Logo & Social */}
                    <div
                        className={`flex-1 min-w-[150px] cursor-pointer p-2 rounded-lg transition-all ${selectedId === logoSec.id ? 'ring-2 ring-blue-500 bg-blue-50/10' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(logoSec.id); }}
                    >
                        <div className="mb-6">
                            {logoSec.props.logoUrl && (
                                <img src={logoSec.props.logoUrl} alt="Logo" style={{ height: logoSec.props.logoHeight }} className="object-contain" />
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {logoSec.props.socialLinks?.map((social, idx) => (
                                <a key={idx} href={social.url} className="hover:scale-110 transition-transform">
                                    <SocialIcon platform={social.platform} color={social.color} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Office */}
                    <div
                        className={`flex-1 min-w-[200px] cursor-pointer p-2 rounded-lg transition-all ${selectedId === officeSec.id ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(officeSec.id); }}
                    >
                        <Editable id={officeSec.id} field="heading" tag="h4" className="font-semibold tracking-widest mb-6 uppercase"
                            style={{ color: officeSec.props.headingColor, fontSize: officeSec.props.headingSize }} />
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <FaLocationDot className="mt-1 shrink-0" size={16} style={{ color: officeSec.props.textColor }} />
                                <Editable id={officeSec.id} field="address" tag="p" className="text-sm"
                                    style={{ color: officeSec.props.textColor, fontSize: officeSec.props.textSize }} />
                            </div>
                            {/* Phone Row */}
                            <div className="flex gap-3 items-center">
                                <FaPhone className="shrink-0 " size={14} style={{ color: officeSec.props.textColor }} />
                                <Editable
                                    id={officeSec.id}
                                    field="phone"
                                    tag="p"
                                    className="text-sm"
                                    style={{
                                        color: officeSec.props.textColor,
                                        fontSize: officeSec.props.textSize
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Links */}
                    <div
                        className={`flex-[1.5] p-2 flex ${isMobile ? 'flex-col gap-8' : 'flex-row gap-12'} ${selectedId === linksSec.id ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(linksSec.id); }}
                    >
                        {linksSec.props.groups?.map((group, gIdx) => (
                            <div key={gIdx} className="flex-1">
                                <h4 className="font-bold tracking-widest uppercase mb-4" style={{ color: linksSec.props.headingColor, fontSize: linksSec.props.headingSize }}>{group.heading}</h4>
                                <ul className="space-y-2">
                                    {group.links?.map((link, lIdx) => (
                                        <li key={lIdx} className="text-sm transition-opacity hover:opacity-70"
                                            style={{ color: linksSec.props.linkColor, fontSize: linksSec.props.linkSize }}>{link.label}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Section 4: Signup */}
                    <div
                        className={`flex-1 min-w-[250px] p-2 ${selectedId === signupSec.id ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(signupSec.id); }}
                    >
                        <Editable id={signupSec.id} field="heading" tag="h4" className="font-bold tracking-widest uppercase mb-4"
                            style={{ color: signupSec.props.headingColor, fontSize: signupSec.props.headingSize }} />

                        {/* Description */}
                        <Editable
                            id={signupSec.id}
                            field="description"
                            tag="p"
                            className="leading-relaxed"
                            style={{
                                color: activeComp?.props?.descriptionColor,
                                fontSize: activeComp?.props?.descriptionSize
                            }}
                        />
                        <div className="flex border-b border-gray-300 gap-2">
                            <input type="email" placeholder={signupSec.props.inputPlaceholder} className="bg-transparent outline-none text-sm flex-1" />
                            <button className=" py-3 px-2 font-bold text-xs uppercase transition-all hover:brightness-110"
                                style={{ backgroundColor: signupSec.props.buttonColor, color: signupSec.props.buttonTextColor ,fontSize: signupSec.props.buttonSize}}>
                                {signupSec.props.buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 py-6 text-center" onClick={(e) => { e.stopPropagation(); setSelectedId(copySec.id); }}>
                    <Editable id={copySec.id} field="content" tag="p" className="text-xs text-gray-400" />
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

            {/* Settings Sidebar */}
            <div
                className="bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                style={{ width: "16%" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="font-bold flex items-center gap-2 text-gray-800" style={{ fontSize: "18px" }}>
                        <Settings2 size={18} /> Settings
                    </h2>
                    <button
                        onClick={handleSave}
                        className="text-white rounded-lg text-sm font-semibold bg-[#615fff] hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95"
                        style={{ padding: "8px 18px", fontSize: "14px" }}
                    >
                        Publish
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">

                            {/* Active Component Indicator */}
                            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 p-1 rounded-xl mb-4">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {activeComp.id.replace('section-', '').replace(/-/g, ' ')}
                                </span>
                            </div>

                            {/* SECTION 1: LOGO & SOCIAL */}
                            {activeComp.id === 'section-1-logo-social' && (
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Logo Settings</label>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-medium text-gray-700">Logo URL</label>
                                                <input
                                                    type="text"
                                                    className="w-full mt-1 p-2 text-xs border border-gray-200 rounded-lg"
                                                    value={activeComp.props.logoUrl || ''}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'logoUrl', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <label className="text-xs font-medium text-gray-700">Logo Height</label>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.logoHeight || '40px'}</span>
                                                </div>
                                                <input
                                                    type="range" min="20" max="150"
                                                    value={parseInt(activeComp.props.logoHeight) || 40}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'logoHeight', `${e.target.value}px`)}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4 mt-6">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Social Media</label>
                                            <button
                                                onClick={() => {
                                                    const newLinks = [...(activeComp.props.socialLinks || []), { platform: 'Facebook', color: '#000000', url: '#' }];
                                                    handleUpdate(activeComp.id, 'socialLinks', newLinks);
                                                }}
                                                className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 transition-colors"
                                            >
                                                + ADD ICON
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {activeComp.props.socialLinks?.map((social, index) => (
                                                <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => {
                                                            const newLinks = activeComp.props.socialLinks.filter((_, i) => i !== index);
                                                            handleUpdate(activeComp.id, 'socialLinks', newLinks);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-white border border-gray-200 text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-[10px] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50"
                                                    >
                                                        ✕
                                                    </button>

                                                    {/* Platform Name & Color Row */}
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Platform (e.g. Instagram)"
                                                            className="w-2/3 p-2 text-xs font-medium border border-gray-200 bg-white rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
                                                            value={social.platform}
                                                            onChange={(e) => {
                                                                const newLinks = [...activeComp.props.socialLinks];
                                                                newLinks[index].platform = e.target.value;
                                                                handleUpdate(activeComp.id, 'socialLinks', newLinks);
                                                            }}
                                                        />
                                                        <div className="w-1/3 relative h-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                                                            <input
                                                                type="color"
                                                                value={social.color || "#000000"}
                                                                onChange={(e) => {
                                                                    const newLinks = [...activeComp.props.socialLinks];
                                                                    newLinks[index].color = e.target.value;
                                                                    handleUpdate(activeComp.id, 'socialLinks', newLinks);
                                                                }}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[3] bg-transparent border-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* URL Input */}
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Profile Link</label>
                                                        <input
                                                            type="text"
                                                            placeholder="https://..."
                                                            className="w-full p-2 text-xs font-mono border border-gray-200 bg-white rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 text-gray-600"
                                                            value={social.url}
                                                            onChange={(e) => {
                                                                const newLinks = [...activeComp.props.socialLinks];
                                                                newLinks[index].url = e.target.value;
                                                                handleUpdate(activeComp.id, 'socialLinks', newLinks);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            {(!activeComp.props.socialLinks || activeComp.props.socialLinks.length === 0) && (
                                                <p className="text-center text-xs text-gray-400 py-4 italic border-2 border-dashed border-gray-100 rounded-xl">
                                                    No social links added yet
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION 2 & 4: TYPOGRAPHY (Heading & Text) */}
                            {(activeComp.id === 'section-2-company-details') && (
                                <div className="space-y-6">
                                    {/* Heading Controls */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Heading Style</label>
                                            <span className="text-[10px] font-mono text-indigo-600 font-bold">{activeComp.props.headingSize}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="color"
                                                value={activeComp.props.headingColor || "#000000"}
                                                onChange={(e) => handleUpdate(activeComp.id, 'headingColor', e.target.value)}
                                                className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                            />
                                            <div className="flex-1">
                                                <input
                                                    type="range"
                                                    min="12"
                                                    max="40"
                                                    value={parseInt(activeComp.props.headingSize) || 20}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'headingSize', `${e.target.value}px`)}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none accent-[#615fff] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body Text Controls */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Body Text Style</label>
                                            <span className="text-[10px] font-mono text-indigo-600 font-bold">{activeComp.props.textSize}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="color"
                                                value={activeComp.props.textColor || "#6b6b6b"}
                                                onChange={(e) => handleUpdate(activeComp.id, 'textColor', e.target.value)}
                                                className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                            />
                                            <div className="flex-1">
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="24"
                                                    value={parseInt(activeComp.props.textSize) || 16}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'textSize', `${e.target.value}px`)}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none accent-[#615fff] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {activeComp.id === "section-3-group-links" && (
                                <div className="space-y-6">
                                    {/* --- STYLE CONTROLS --- */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Typography Styles</label>

                                        {/* Heading Style Row */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between"><span className="text-[10px] text-gray-500">Headings</span></div>
                                            <div className="flex items-center gap-3">
                                                <input type="color" value={activeComp.props.headingColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'headingColor', e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer" />
                                                <input type="range" min="12" max="32" value={parseInt(activeComp.props.headingSize)}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'headingSize', `${e.target.value}px`)}
                                                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none accent-indigo-500" />
                                            </div>
                                        </div>

                                        {/* Link Style Row */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between"><span className="text-[10px] text-gray-500">Links</span></div>
                                            <div className="flex items-center gap-3">
                                                <input type="color" value={activeComp.props.linkColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'linkColor', e.target.value)}
                                                    className="w-8 h-8 rounded cursor-pointer" />
                                                <input type="range" min="10" max="24" value={parseInt(activeComp.props.linkSize)}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'linkSize', `${e.target.value}px`)}
                                                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none accent-indigo-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- GROUP MANAGEMENT --- */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Link Groups</label>
                                            <button
                                                onClick={() => handleUpdate(activeComp.id, "groups", [...(activeComp.props.groups || []), { heading: "NEW GROUP", links: [] }])}
                                                className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md hover:bg-indigo-100 transition-all"
                                            >
                                                + ADD GROUP
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {activeComp.props.groups?.map((group, gIdx) => (
                                                <div key={gIdx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-4 relative group/card">
                                                    {/* Group Header */}
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            className="font-bold text-[11px] flex-1 bg-white p-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
                                                            value={group.heading}
                                                            onChange={(e) => {
                                                                const newGroups = [...activeComp.props.groups];
                                                                newGroups[gIdx] = { ...newGroups[gIdx], heading: e.target.value };
                                                                handleUpdate(activeComp.id, "groups", newGroups);
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => handleUpdate(activeComp.id, "groups", activeComp.props.groups.filter((_, i) => i !== gIdx))}
                                                            className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg shadow-sm"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>

                                                    {/* Nested Links */}
                                                    <div className="space-y-2 pl-2 border-l-2 border-gray-200">
                                                        {group.links?.map((link, lIdx) => (
                                                            <div key={lIdx} className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                                                                <input
                                                                    className="text-[10px] flex-1 outline-none font-medium"
                                                                    value={link.label}
                                                                    placeholder="Label"
                                                                    onChange={(e) => {
                                                                        const newGroups = [...activeComp.props.groups];
                                                                        const newLinks = [...newGroups[gIdx].links];
                                                                        newLinks[lIdx] = { ...newLinks[lIdx], label: e.target.value };
                                                                        newGroups[gIdx].links = newLinks;
                                                                        handleUpdate(activeComp.id, "groups", newGroups);
                                                                    }}
                                                                />
                                                                {/* <input
                                                                    className="text-[9px] w-24 outline-none font-mono text-gray-400"
                                                                    value={link.url}
                                                                    placeholder="URL"
                                                                    onChange={(e) => {
                                                                        const newGroups = [...activeComp.props.groups];
                                                                        const newLinks = [...newGroups[gIdx].links];
                                                                        newLinks[lIdx] = { ...newLinks[lIdx], url: e.target.value };
                                                                        newGroups[gIdx].links = newLinks;
                                                                        handleUpdate(activeComp.id, "groups", newGroups);
                                                                    }}
                                                                /> */}
                                                                <button
                                                                    onClick={() => {
                                                                        const newGroups = [...activeComp.props.groups];
                                                                        newGroups[gIdx].links = newGroups[gIdx].links.filter((_, i) => i !== lIdx);
                                                                        handleUpdate(activeComp.id, "groups", newGroups);
                                                                    }}
                                                                    className="text-gray-300 hover:text-red-500"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => {
                                                                const newGroups = [...activeComp.props.groups];
                                                                newGroups[gIdx].links = [...(newGroups[gIdx].links || []), { label: "New Link", url: "#" }];
                                                                handleUpdate(activeComp.id, "groups", newGroups);
                                                            }}
                                                            className="w-full py-1 text-[9px] text-indigo-500 font-bold hover:bg-white rounded transition-all"
                                                        >
                                                            + ADD LINK
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeComp.id === "section-4-signup" && (
                                <div className="space-y-6">
                                    {/* Heading Style */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Heading Style</label>
                                        <div className="flex items-center gap-4">
                                            <input type="color" value={activeComp.props.headingColor}
                                                onChange={(e) => handleUpdate(activeComp.id, 'headingColor', e.target.value)}
                                                className="w-8 h-8 rounded cursor-pointer" />
                                            <input type="range" min="14" max="40" value={parseInt(activeComp.props.headingSize)}
                                                onChange={(e) => handleUpdate(activeComp.id, 'headingSize', `${e.target.value}px`)}
                                                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none accent-indigo-500" />
                                        </div>
                                    </div>

                                    {/* Description Style */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Description Style</label>
                                        <div className="flex items-center gap-4">
                                            <input type="color" value={activeComp.props.descriptionColor}
                                                onChange={(e) => handleUpdate(activeComp.id, 'descriptionColor', e.target.value)}
                                                className="w-8 h-8 rounded cursor-pointer" />
                                            <input type="range" min="10" max="24" value={parseInt(activeComp.props.descriptionSize)}
                                                onChange={(e) => handleUpdate(activeComp.id, 'descriptionSize', `${e.target.value}px`)}
                                                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none accent-indigo-500" />
                                        </div>
                                    </div>

                                    {/* Button Style */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Button Style</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-gray-400">BG Color</span>
                                                <input type="color" value={activeComp.props.buttonColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'buttonColor', e.target.value)}
                                                    className="w-full h-8 rounded cursor-pointer" />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-gray-400">Text Color</span>
                                                <input type="color" value={activeComp.props.buttonTextColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, 'buttonTextColor', e.target.value)}
                                                    className="w-full h-8 rounded cursor-pointer" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-gray-400">Button Text Size</span>
                                            <input type="range" min="10" max="20" value={parseInt(activeComp.props.buttonSize)}
                                                onChange={(e) => handleUpdate(activeComp.id, 'buttonSize', `${e.target.value}px`)}
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none accent-indigo-500" />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                <Settings2 size={24} className="text-gray-300" />
                            </div>
                            <p className="text-gray-400 text-sm font-medium">Select a section on the canvas to customize its settings</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer4;



