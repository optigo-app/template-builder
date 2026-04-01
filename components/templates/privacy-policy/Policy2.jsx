// import React from 'react';

// const PrivacyPolicyUI = ({ data, selectedId, setSelectedId, viewMode }) => {
//     const mainHeader = data?.components.find(c => c.id === "section-1-main-header");
//     const termsArray = data?.components.find(c => c.id === "section-2-terms-list");
//     const declaration = data?.components.find(c => c.id === "section-3-declaration");

//     const isMobile = viewMode === "mobile";

//     // Helper to render content that might contain bullet points (split by semicolons or newlines)
//     const renderContent = (content, style) => {
//         if (content.includes(';')) {
//             const points = content.split(';').filter(p => p.trim() !== "");
//             return (
//                 <ul className="list-disc ml-5 space-y-2">
//                     {points.map((point, i) => (
//                         <li key={i} style={style}>{point.trim()}</li>
//                     ))}
//                 </ul>
//             );
//         }
//         return <p style={style} className="leading-relaxed whitespace-pre-line">{content}</p>;
//     };

//     return (
//         <div className="w-full min-h-screen bg-white text-[#333] pb-24 font-sans">
            
//             {/* 1. Main Header - Clean Professional Style */}
//             {mainHeader && (
//                 <div
//                     className={`w-full transition-all cursor-pointer border-b border-gray-100 ${selectedId === mainHeader.id ? 'bg-blue-50/30' : ''}`}
//                     onClick={() => setSelectedId(mainHeader.id)}
//                     style={{ padding: isMobile ? '40px 20px' : '60px 1%' }}
//                 >
//                     <div className="max-w-4xl">
//                         <h1
//                             className="font-bold mb-6"
//                             style={{
//                                 fontSize: isMobile ? '28px' : `${mainHeader.props.headingFontSize * 1.5}px`,
//                                 color: mainHeader.props.headingColor || "#111827"
//                             }}
//                         >
//                             {mainHeader.props.heading}
//                         </h1>
//                         <p
//                             className="leading-relaxed opacity-80"
//                             style={{
//                                 fontSize: `${mainHeader.props.contentFontSize}px`,
//                                 color: mainHeader.props.contentColor || "#4B5563"
//                             }}
//                         >
//                             {mainHeader.props.content}
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {/* 2. Content Sections */}
//             <div className="  px-6 mt-12 space-y-10">
//                 {termsArray && termsArray.props.terms.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`transition-all cursor-pointer rounded-lg ${selectedId === termsArray.id ? 'ring-2 ring-blue-100 p-4 -m-4 bg-blue-50/10' : ''}`}
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedId(termsArray.id);
//                         }}
//                     >
//                         <h2
//                             className="font-semibold mb-3"
//                             style={{
//                                 fontSize: `${termsArray.props.headingFontSize}px`,
//                                 color: termsArray.props.headingColor || "#111827"
//                             }}
//                         >
//                             {item.heading}
//                         </h2>
                        
//                         {renderContent(item.content, {
//                             fontSize: `${termsArray.props.contentFontSize}px`,
//                             color: termsArray.props.contentColor || "#374151"
//                         })}
//                     </div>
//                 ))}
//             </div>

//             {/* 3. Footer Contact/Note */}
//             {declaration && (
//                 <div
//                     className={`max-w-4xl mx-auto mt-16 px-6 transition-all cursor-pointer ${selectedId === declaration.id ? 'bg-gray-50 p-6 rounded-xl' : ''}`}
//                     onClick={() => setSelectedId(declaration.id)}
//                 >
//                     <div className="pt-8 border-t border-gray-200">
//                         <p
//                             className="leading-relaxed"
//                             style={{
//                                 fontSize: `${declaration.props.fontSize}px`,
//                                 color: declaration.props.color || "#6B7280",
//                                 fontStyle: declaration.props.fontStyle || "normal"
//                             }}
//                         >
//                             {declaration.props.text}
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PrivacyPolicyUI;

import React, { useState, useEffect } from 'react';
import { Settings2, MousePointer2, Trash2, Plus, Type, Palette, Layout,X } from 'lucide-react';
import Swal from 'sweetalert2';
import DeviceMockup from '../../layout/DeviceMockup'; // Adjust path as needed

const Policy2 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData);
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    const isMobile = viewMode === "mobile";

    // --- Core Logic ---
    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id
                    ? { ...comp, props: { ...comp.props, [field]: value } }
                    : comp
            ),
        }));
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const handleSave = async () => {
        try {
            Toast.fire({ icon: 'info', title: 'Saving changes...' });
            const response = await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) Toast.fire({ icon: 'success', title: 'Saved successfully' });
        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Save failed' });
        }
    };

    // --- Helper Components ---
    const Editable = ({ id, field, className, tag: Tag = "div", isHeader = false }) => {
        const comp = getComp(id);
        const content = comp.props[field];

        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-300 rounded p-1 transition-all`}
                contentEditable
                suppressContentEditableWarning={true}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(id);
                }}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                style={{
                    fontSize: isHeader ? (isMobile ? '28px' : `${comp.props.headingFontSize}px`) : `${comp.props.contentFontSize}px`,
                    color: isHeader ? comp.props.headingColor : comp.props.contentColor,
                    textAlign: comp.props.textAlign || 'left'
                }}
            >
                {content}
            </Tag>
        );
    };

    // --- Canvas Renderer ---
    const renderCanvasContent = () => {
        const mainHeader = getComp("section-1-main-header");
        const termsList = getComp("section-2-terms-list");
        const declaration = getComp("section-3-declaration");
    
        return (
            <div className="w-full bg-white text-[#333] min-h-screen font-sans overflow-x-hidden">
            
                <div
                    className={`w-full transition-all cursor-pointer border-b border-gray-100 ${selectedId === mainHeader.id ? 'bg-blue-50/50 ring-2 ring-blue-400 ring-inset' : ''}`}
                    onClick={() => setSelectedId(mainHeader.id)}
                    style={{ padding: isMobile ? '60px 20px' : '20px 5%' }}
                >
                   
                    <div className="max-w-5xl mx-auto"> 
                        <Editable id="section-1-main-header" field="heading" tag="h1" isHeader={true} className="font-bold mb-6 leading-tight" />
                        <Editable id="section-1-main-header" field="content" tag="p" className="leading-relaxed opacity-80" />
                    </div>
                </div>
    
              
                <div className="max-w-5xl mx-auto px-6 mt-8 space-y-10">
                    {termsList.props.terms?.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative transition-all rounded-lg ${selectedId === termsList.id ? 'ring-2 ring-blue-100 p-4 bg-blue-50/10' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(termsList.id); }}
                        >
                            <h2
                                className="font-semibold mb-3 outline-none focus:ring-1 focus:ring-blue-300"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].heading = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{
                                    fontSize: `${termsList.props.headingFontSize}px`,
                                    color: termsList.props.headingColor || "#111827"
                                }}
                            >
                                {item.heading}
                            </h2>
                            <p
                                className="leading-relaxed whitespace-pre-line outline-none focus:ring-1 focus:ring-blue-300"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].content = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{
                                    fontSize: `${termsList.props.contentFontSize}px`,
                                    color: termsList.props.contentColor || "#374151"
                                }}
                            >
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
    
                {/* 3. Footer Declaration - Changed to max-w-5xl */}
                <div
                    className={`max-w-5xl mx-auto mt-10 px-6 pb-20 transition-all cursor-pointer`}
                    onClick={() => setSelectedId(declaration.id)}
                >
                    <div className={`pt-8 border-t border-gray-200   `}>
                        <Editable
                            id="section-3-declaration"
                            field="text"
                            tag="p"
                            className="leading-relaxed"
                            style={{
                                fontSize: `${declaration.props.fontSize}px`,
                                color: declaration.props.color || "#6B7280",
                                fontStyle: declaration.props.fontStyle || "normal"
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const activeComp = selectedId ? getComp(selectedId) : null;

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "81%" }} onClick={() => setSelectedId(null)}>
        <button
            onClick={() => setIsPreviewOpen(true)}
            className="fixed top-3 right-80 z-50 text-white px-6 py-2 shadow-2xl rounded-lg transition-all flex items-center gap-2 font-bold bg-[#615fff]"
        >
            <MousePointer2 size={13} /> Preview
        </button>

        <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
            {renderCanvasContent()}
        </DeviceMockup>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto p-10">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsPreviewOpen(false)}
                        className="absolute top-6 right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                    >
                        <X size={32} />
                    </button>

                    <div className="w-full  mt-10 mb-20">
                        <div className="  p-12 font-serif text-black rounded-xl pointer-events-none">
                            {/* We use pointer-events-none so they can't edit while previewing */}
                            {renderCanvasContent(1)}
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar Settings */}
            <div
                className="fixed right-0 top-0 h-full bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col overflow-hidden"
                style={{ width: "16%" }}
                onClick={(e) => e.stopPropagation()}
            >
               <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10">
                                   <div className="flex justify-between items-center">
                                       <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800" style={{ fontSize: "18px" }}>
                                           <Settings2 size={18} /> Settings
                                       </h2>
                                       <button
                                           onClick={handleSave}
                                           className="text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95"
                                           style={{ backgroundColor: "#615fff", padding: "8px 18px", fontSize: "14px" }}
                                       >
                                           Publish
                                       </button>
                                   </div>
                               </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {activeComp ? (
                        <div className="space-y-6">
                            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Selected Component</p>
                                <p className="text-sm font-bold text-indigo-700">{activeComp.id}</p>
                            </div>

                            {/* Typography Controls */}
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2"><Type size={12}/> Typography</label>
                                
                                {activeComp.props.headingFontSize !== undefined && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>Heading Size</span>
                                            <span className="text-indigo-600">{activeComp.props.headingFontSize}px</span>
                                        </div>
                                        <input
                                            type="range" min="14" max="72"
                                            value={activeComp.props.headingFontSize}
                                            onChange={(e) => handleUpdate(activeComp.id, "headingFontSize", parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                )}

                                {activeComp.props.contentFontSize !== undefined && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>Content Size</span>
                                            <span className="text-indigo-600">{activeComp.props.contentFontSize}px</span>
                                        </div>
                                        <input
                                            type="range" min="10" max="32"
                                            value={activeComp.props.contentFontSize}
                                            onChange={(e) => handleUpdate(activeComp.id, "contentFontSize", parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Color Controls */}
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2"><Palette size={12}/> Colors</label>
                                
                                {activeComp.props.headingColor !== undefined && (
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                                        <span className="text-xs">Heading</span>
                                        <input 
                                            type="color" 
                                            value={activeComp.props.headingColor}
                                            onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                )}
                                
                                {activeComp.props.contentColor !== undefined && (
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                                        <span className="text-xs">Content</span>
                                        <input 
                                            type="color" 
                                            value={activeComp.props.contentColor}
                                            onChange={(e) => handleUpdate(activeComp.id, "contentColor", e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* List Specific Management */}
                            {activeComp.id === "section-2-terms-list" && (
                                <div className="space-y-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2"><Layout size={12}/> Sections</label>
                                        <button 
                                            onClick={() => {
                                                const newTerms = [...activeComp.props.terms, { heading: "New Title", content: "Add content description here..." }];
                                                handleUpdate(activeComp.id, "terms", newTerms);
                                            }}
                                            className="text-[10px] bg-green-600 text-white px-2 py-1 rounded-md flex items-center gap-1"
                                        >
                                            <Plus size={10} /> Add
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {activeComp.props.terms?.map((t, i) => (
                                            <div key={i} className="flex items-center gap-2 p-2 bg-white border rounded-md group">
                                                <span className="text-xs truncate flex-1">{t.heading}</span>
                                                <button 
                                                    onClick={() => {
                                                        const newTerms = activeComp.props.terms.filter((_, idx) => idx !== i);
                                                        handleUpdate(activeComp.id, "terms", newTerms);
                                                    }}
                                                    className="text-red-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                            <MousePointer2 size={40} className="mb-4" />
                            <p className="text-sm">Click any part of the document<br/>to edit its properties</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Policy2;