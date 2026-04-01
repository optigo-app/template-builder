// import React from 'react';

// const Footer2 = ({ data, selectedId, setSelectedId, viewMode }) => {
//   const isMobile = viewMode === "mobile";

//   // Extract sections from components array
//   const companySection = data?.components.find(c => c.type === "company-details");
//   const groupsSection = data?.components.find(c => c.type === "group-links");
//   const accountSection = data?.components.find(c => c.type === "account");
//   const copyrightSection = data?.components.find(c => c.type === "copyright");

//   // Common background color from props
//   const bgColor = companySection?.props?.backgroundColor || "#f5e6e6";

//   return (
//     <footer 
//       className="w-full font-sans"
//       style={{ backgroundColor: bgColor }}
//     >
//       {/* Top Border Line */}
//       <div className="w-full border-t border-black opacity-20 mb-8" />

//       <div className={`max-w-7xl mx-auto px-6 py-10 grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-4 gap-8'}`}>

//         {/* Section 1: Company Details */}
//         {companySection && (
//           <div 
//             className={`transition-all cursor-pointer p-2 rounded-lg ${selectedId === 'section-company-details' ? 'ring-2 ring-blue-500 bg-white/50' : ''}`}
//             onClick={() => setSelectedId('section-company-details')}
//           >
//             <h3 className="font-bold mb-4" style={{ color: companySection.props.headingColor, fontSize: companySection.props.fontSize }}>
//               {companySection.props.heading}
//             </h3>
//             <p className="leading-relaxed mb-4" style={{ color: companySection.props.textColor, fontSize: companySection.props.fontSize }}>
//               {companySection.props.text}
//             </p>
//             <a 
//               href={companySection.props.link.url}
//               className="underline font-medium hover:opacity-70 transition-opacity"
//               style={{ color: '#0000ff', fontSize: companySection.props.fontSize }}
//             >
//               {companySection.props.link.label}
//             </a>
//           </div>
//         )}

//         {/* Section 2: Group Links (Quick Links & Customer Service) */}
//         {groupsSection?.props?.groups.map((group, idx) => (
//           <div 
//             key={idx}
//             className={`transition-all cursor-pointer p-2 rounded-lg ${selectedId === 'section-group-links' ? 'ring-2 ring-blue-500 bg-white/50' : ''}`}
//             onClick={() => setSelectedId('section-group-links')}
//           >
//             <h3 className="font-bold mb-4" style={{ color: groupsSection.props.headingColor, fontSize: groupsSection.props.fontSize }}>
//               {group.heading}
//             </h3>
//             <ul className="space-y-2">
//               {group.links.map((link, lIdx) => (
//                 <li key={lIdx}>
//                   <a 
//                     href={link.url}
//                     className="hover:opacity-70 transition-opacity"
//                     style={{ color: groupsSection.props.textColor, fontSize: groupsSection.props.fontSize }}
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}

//         {/* Section 3: My Account */}
//         {accountSection && (
//           <div 
//             className={`transition-all cursor-pointer p-2 rounded-lg ${selectedId === 'section-account' ? 'ring-2 ring-blue-500 bg-white/50' : ''}`}
//             onClick={() => setSelectedId('section-account')}
//           >
//             <h3 className="font-bold mb-4" style={{ color: accountSection.props.headingColor, fontSize: accountSection.props.fontSize }}>
//               {accountSection.props.heading}
//             </h3>
//             <ul className="space-y-2">
//               {accountSection.props.links.map((link, idx) => (
//                 <li key={idx}>
//                   <a 
//                     href={link.url}
//                     className="hover:opacity-70 transition-opacity"
//                     style={{ color: accountSection.props.textColor, fontSize: accountSection.props.fontSize }}
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Section 4: Copyright & Bottom Border */}
//       {copyrightSection && (
//         <div 
//           className={`w-full mt-10 transition-all cursor-pointer ${selectedId === 'section-copyright' ? 'ring-2 ring-blue-500' : ''}`}
//           onClick={() => setSelectedId('section-copyright')}
//         >
//           <div className="w-full border-t border-black opacity-20" />
//           <div 
//             className="max-w-7xl mx-auto py-8 px-6"
//             style={{ 
//               textAlign: copyrightSection.props.textAlign,
//               color: copyrightSection.props.textColor,
//               fontSize: copyrightSection.props.fontSize
//             }}
//           >
//             {copyrightSection.props.content}
//           </div>
//         </div>
//       )}
//     </footer>
//   );
// };

// export default Footer2;

import React, { useState, useEffect } from 'react';
import { Settings2, Trash2, Plus, X } from 'lucide-react';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup';

const Footer2 = ({ data: initialData }) => {
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

    const handleSave = async () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        try {
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

            if (response.ok) Toast.fire({ icon: 'success', title: 'Saved successfully' });
        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Save failed' });
        }
    };

    const Editable = ({ id, field, className, tag: Tag = "div", style = {} }) => {
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
                    ...style
                }}
            >
                {content}
            </Tag>
        );
    };

    const renderCanvasContent = () => {
        const companySec = getComp("section-company-details");
        const groupsSec = getComp("section-group-links");
        const accountSec = getComp("section-account");
        const copySec = getComp("section-copyright");

        return (
            <footer
                className="w-full font-sans transition-colors duration-300"
                style={{ backgroundColor: data?.backgroundColor }}
            >
                <div className="w-full border-t border-black opacity-10 mb-8" />

                <div className={`max-w-7xl mx-auto px-6 py-10 grid ${isMobile ? 'grid-cols-1 gap-10 text-center' : 'grid-cols-4 gap-8'}`}>

                   
                    <div
                        className={`p-2 rounded-lg transition-all cursor-pointer ${selectedId === companySec.id ? 'ring-2 ring-blue-500 bg-white/30' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(companySec.id); }}
                    >
                        <Editable id="section-company-details" field="heading" tag="h3" className="font-bold mb-4" style={{ color: companySec.props.headingColor, fontSize: companySec.props.headingSize }} />
                        <Editable id="section-company-details" field="text" tag="p" className="leading-relaxed mb-4" />
                        <a href={companySec.props.link?.url} className="underline font-medium hover:opacity-70 text-blue-700 block">
                            {companySec.props.link?.label}
                        </a>
                    </div>
 
                    {groupsSec.props.groups?.map((group, gIdx) => (
                        <div
                            key={gIdx}
                            className={`p-2 rounded-lg transition-all cursor-pointer ${selectedId === groupsSec.id ? 'ring-2 ring-blue-500 bg-white/30' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(groupsSec.id); }}
                        >
                            <h3 className="font-bold mb-4" style={{ color: groupsSec.props.headingColor, fontSize: groupsSec.props.headingSize }}>
                                {group.heading}
                            </h3>
                            <ul className={`space-y-2 ${isMobile ? 'inline-block text-left' : ''}`}>
                                {group.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <span style={{ color: groupsSec.props.textColor, fontSize: groupsSec.props.fontSize }}>{link.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* My Account */}
                    <div
                        className={`p-2 rounded-lg transition-all cursor-pointer ${selectedId === accountSec.id ? 'ring-2 ring-blue-500 bg-white/30' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(accountSec.id); }}
                    >
                        <Editable id="section-account" field="heading" tag="h3" className="font-bold mb-4" style={{ color: accountSec.props.headingColor, fontSize: accountSec.props.headingSize }} />
                        <ul className="space-y-2">
                            {accountSec.props.links?.map((link, idx) => (
                                <li key={idx} style={{ color: accountSec.props.textColor, fontSize: accountSec.props.fontSize }}>{link.label}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className={`w-full mt-10 transition-all cursor-pointer border-t border-black/10 py-8 px-6 ${selectedId === copySec.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(copySec.id); }}
                >
                    <div className="max-w-7xl mx-auto">
                        <Editable id="section-copyright" field="content" tag="p" />
                    </div>
                </div>
            </footer>
        );
    };

    const activeComp = selectedId ? getComp(selectedId) : null;

    return (
        <div className="flex min-h-screen bg-gray-100" style={{ width: "81%" }} onClick={() => setSelectedId(null)}>
            <button onClick={() => setIsPreviewOpen(true)} className="fixed cursor-pointer top-3 right-80 z-50 text-white px-6 py-2 shadow-2xl rounded-lg font-bold bg-[#615fff]">
                Preview
            </button>

            <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                {renderCanvasContent()}
            </DeviceMockup>


            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-10 overflow-y-auto">
                    <button onClick={() => setIsPreviewOpen(false)} className="absolute cursor-pointer top-6 right-10 text-white"><X size={32} /></button>
                    <div className="w-full max-w-7xl bg-white rounded-xl overflow-hidden pointer-events-none">
                        {renderCanvasContent()}
                    </div>
                </div>
            )}


            <div
                className="bg-white border-l border-gray-200 fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col shadow-2xl"
                style={{ width: "18%" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="p-4 bg-white border-b sticky top-0 z-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-50 text-[#615fff] rounded-lg">
                            <Settings2 size={18} />
                        </div>
                        <h2 className="text-sm font-black text-gray-800 uppercase tracking-tight">Editor</h2>
                    </div>
                    <button
                        onClick={handleSave}
                        className="text-white px-5 py-2 rounded-lg text-sm font-semibold bg-[#615fff] hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95"
                        style={{ padding: "8px 18px", fontSize: "14px" }}
                    >
                        Publish
                    </button>
                </div>

                <div className="p-5 space-y-8">
                    {/* --- GLOBAL THEME --- */}
                    <section className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Global Canvas</label>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-700">Background</span>
                                <span className="text-[10px] font-mono text-gray-400 uppercase">{data?.backgroundColor || "#ffffff"}</span>
                            </div>
                            <div className="relative h-10 w-full rounded-xl border-2 border-white shadow-sm overflow-hidden group">
                                <input
                                    type="color"
                                    className="absolute inset-0 w-full h-full cursor-pointer scale-[3] bg-transparent"
                                    value={data?.backgroundColor || "#ffffff"}
                                    onChange={(e) => setData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* --- COMPONENT SPECIFIC SETTINGS --- */}
                    {activeComp ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">
                                    {activeComp.id.replace('section-', '')}
                                </span>
                            </div>

                            {/* 1. HEADING TYPOGRAPHY */}
                            {activeComp.id !== "section-copyright" && (
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Heading Typography</label>
                                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                                <span>Text Color</span>

                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <input
                                                    type="color"
                                                    className=" h-8 cursor-pointer rounded-lg overflow-hidden"
                                                    value={activeComp.props.headingColor || "#000000"}
                                                    onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)}
                                                />
                                                <span className="font-mono text-gray-400 uppercase">{activeComp.props.headingColor || "#000000"}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                                <span>Font Size</span>
                                                <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{activeComp.props.headingSize || '24px'}</span>
                                            </div>
                                            <input
                                                type="range" min="12" max="60"
                                                value={parseInt(activeComp.props.headingSize) || 24}
                                                onChange={(e) => handleUpdate(activeComp.id, "headingSize", `${e.target.value}px`)}
                                                className="w-full accent-[#615fff]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 2. CONTENT / LINK TYPOGRAPHY */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Body & Links</label>
                                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                            <span>Text Color</span>

                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <input
                                                type="color" className=" h-8 cursor-pointer rounded-lg"
                                                value={activeComp.props.textColor || activeComp.props.linkColor || "#666666"}
                                                onChange={(e) => {
                                                    handleUpdate(activeComp.id, "textColor", e.target.value);
                                                    handleUpdate(activeComp.id, "linkColor", e.target.value);
                                                }}
                                            />
                                            <span className="font-mono text-gray-400 uppercase">{activeComp.props.textColor || activeComp.props.linkColor || "#666666"}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                            <span>Font Size</span>
                                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{activeComp.props.fontSize || '14px'}</span>
                                        </div>
                                        <input
                                            type="range" min="10" max="30"
                                            value={parseInt(activeComp.props.fontSize) || 14}
                                            onChange={(e) => handleUpdate(activeComp.id, "fontSize", `${e.target.value}px`)}
                                            className="w-full accent-[#615fff]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 3. SECTION-ACCOUNT LINK MANAGEMENT */}
                            {activeComp.id === "section-account" && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Account Links</label>
                                        <button
                                            onClick={() => handleUpdate(activeComp.id, "links", [...(activeComp.props.links || []), { label: "New Link", url: "#" }])}
                                            className="p-1.5 bg-indigo-600 text-white rounded-full hover:shadow-lg transition-all"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {activeComp.props.links?.map((link, i) => (
                                            <div key={i} className="flex gap-2 items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100 group">
                                                <input
                                                    className="text-[11px] p-2 bg-white border border-gray-200 rounded-lg w-full focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
                                                    value={link.label}
                                                    onChange={(e) => {
                                                        const newList = [...activeComp.props.links];
                                                        newList[i] = { ...newList[i], label: e.target.value };
                                                        handleUpdate(activeComp.id, "links", newList);
                                                    }}
                                                />
                                                <button
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleUpdate(activeComp.id, "links", activeComp.props.links.filter((_, idx) => idx !== i))}
                                                >
                                                    <Trash2 size={14} className="text-red-400 hover:text-red-600" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 4. SECTION-GROUP-LINKS MANAGEMENT */}
                            {activeComp.id === "section-group-links" && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Link Groups</label>
                                        <button
                                            onClick={() => handleUpdate(activeComp.id, "groups", [...(activeComp.props.groups || []), { heading: "New Group", links: [] }])}
                                            className="px-3 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-full hover:bg-black transition-all"
                                        >
                                            + ADD GROUP
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {activeComp.props.groups?.map((group, gIdx) => (
                                            <div key={gIdx} className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm space-y-4 relative group/card">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        className="font-black text-xs flex-1 text-gray-800 bg-transparent border-b-2 border-transparent focus:border-indigo-500 outline-none uppercase tracking-wide"
                                                        value={group.heading}
                                                        onChange={(e) => {
                                                            const newGroups = [...activeComp.props.groups];
                                                            newGroups[gIdx] = { ...newGroups[gIdx], heading: e.target.value };
                                                            handleUpdate(activeComp.id, "groups", newGroups);
                                                        }}
                                                    />
                                                    <button onClick={() => handleUpdate(activeComp.id, "groups", activeComp.props.groups.filter((_, i) => i !== gIdx))}>
                                                        <Trash2 size={14} className="text-gray-300 hover:text-red-500 transition-colors" />
                                                    </button>
                                                </div>
                                                <div className="space-y-3">
                                                    {group.links?.map((link, lIdx) => (
                                                        <div key={lIdx} className="flex gap-2 items-center">
                                                            <input
                                                                className="text-[10px] p-2 bg-gray-50 border border-transparent rounded-lg w-1/2 focus:bg-white focus:border-indigo-200 outline-none"
                                                                value={link.label}
                                                                placeholder="Label"
                                                                onChange={(e) => {
                                                                    const newGroups = [...activeComp.props.groups];
                                                                    const newLinks = [...newGroups[gIdx].links];
                                                                    newLinks[lIdx] = { ...newLinks[lIdx], label: e.target.value };
                                                                    newGroups[gIdx] = { ...newGroups[gIdx], links: newLinks };
                                                                    handleUpdate(activeComp.id, "groups", newGroups);
                                                                }}
                                                            />
                                                            <input
                                                                className="text-[10px] p-2 bg-gray-50 border border-transparent rounded-lg w-1/2 focus:bg-white focus:border-indigo-200 outline-none font-mono text-gray-400"
                                                                value={link.url}
                                                                placeholder="URL"
                                                                onChange={(e) => {
                                                                    const newGroups = [...activeComp.props.groups];
                                                                    const newLinks = [...newGroups[gIdx].links];
                                                                    newLinks[lIdx] = { ...newLinks[lIdx], url: e.target.value };
                                                                    newGroups[gIdx] = { ...newGroups[gIdx], links: newLinks };
                                                                    handleUpdate(activeComp.id, "groups", newGroups);
                                                                }}
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newGroups = [...activeComp.props.groups];
                                                                    newGroups[gIdx].links = newGroups[gIdx].links.filter((_, i) => i !== lIdx);
                                                                    handleUpdate(activeComp.id, "groups", newGroups);
                                                                }}
                                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => {
                                                            const newGroups = [...activeComp.props.groups];
                                                            newGroups[gIdx].links = [...(newGroups[gIdx].links || []), { label: "New Link", url: "https://" }];
                                                            handleUpdate(activeComp.id, "groups", newGroups);
                                                        }}
                                                        className="w-full py-2 border-2 border-dashed border-gray-100 rounded-xl text-[10px] text-gray-400 font-bold hover:border-indigo-200 hover:text-indigo-500 transition-all"
                                                    >
                                                        + ADD ITEM
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-20 space-y-4 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-dashed border-gray-200">
                                <Settings2 size={24} className="text-gray-300" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400">No Section Selected</p>
                                <p className="text-[11px] text-gray-300 px-6">Click on a component in the preview to customize its styles.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Footer2;