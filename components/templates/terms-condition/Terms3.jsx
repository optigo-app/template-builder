// import React from 'react';

// const Terms3 = ({ data, selectedId, setSelectedId, viewMode, isPreview = true, handleUpdate }) => {
//     const mainHeader = data?.components.find(c => c.id === "section-1-main-header");
//     const termsArray = data?.components.find(c => c.id === "section-2-terms-list");

//     const isMobile = viewMode === "mobile";

//     // Helper to render text with line breaks and bullets for the disclaimer
//     const renderContent = (text) => {
//         return text.split('\n').map((line, i) => {
//             if (line.trim().startsWith('•')) {
//                 return <li key={i} className="ml-4 list-none">{line}</li>;
//             }
//             return <p key={i} className={line.trim() === "" ? "h-4" : "mb-2"}>{line}</p>;
//         });
//     };

//     return (
//         <div className="w-full min-h-screen font-sans bg-white text-[#000000] pb-20">
//             {/* 1. Centered Main Header */}
//             {mainHeader && (
//                 <div
//                     className={`w-full transition-all cursor-pointer text-center ${
//                         selectedId === mainHeader.id ? 'bg-blue-50/50 ring-1 ring-blue-200' : ''
//                     }`}
//                     onClick={() => setSelectedId(mainHeader.id)}
//                     style={{
//                         padding: isMobile ? '40px 20px 10px 20px' : '60px 10% 20px 10%',
//                     }}
//                 >
//                     <h1
//                         className="font-semibold mb-2"
//                         contentEditable={!isPreview}
//                         suppressContentEditableWarning
//                         onBlur={(e) => handleUpdate(mainHeader.id, "heading", e.target.innerText)}
//                         style={{
//                             fontSize: isMobile ? '24px' : `${mainHeader.props.headingFontSize}px`,
//                             color: mainHeader.props.headingColor
//                         }}
//                     >
//                         {mainHeader.props.heading}
//                     </h1>
//                     <p 
//                         className="font-medium italic"
//                         contentEditable={!isPreview}
//                         suppressContentEditableWarning
//                         onBlur={(e) => handleUpdate(mainHeader.id, "content", e.target.innerText)}
//                         style={{ fontSize: '14px' }}
//                     >
//                         {mainHeader.props.content}
//                     </p>
//                 </div>
//             )}

//             {/* 2. Terms List - Document Style */}
//             <div 
//                 className="max-w-4xl mx-auto px-8 mt-4 space-y-8"
//                 style={{ textAlign: 'left' }}
//             >
//                 {termsArray && termsArray.props.terms.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`transition-all cursor-pointer group ${
//                             selectedId === termsArray.id ? 'ring-1 ring-blue-100 p-4 rounded bg-gray-50/30' : ''
//                         }`}
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedId(termsArray.id);
//                         }}
//                     >
//                         {/* Heading - No Index Number based on image */}
//                         <h2
//                             className="font-bold mb-3"
//                             contentEditable={!isPreview}
//                             suppressContentEditableWarning
//                             onBlur={(e) => {
//                                 const newTerms = [...termsArray.props.terms];
//                                 newTerms[index].heading = e.target.innerText;
//                                 handleUpdate(termsArray.id, "terms", newTerms);
//                             }}
//                             style={{
//                                 fontSize: `${termsArray.props.headingFontSize}px`,
//                                 color: termsArray.props.headingColor
//                             }}
//                         >
//                             {item.heading}
//                         </h2>

//                         {/* Content Area */}
//                         <div
//                             className="leading-relaxed whitespace-pre-line"
//                             contentEditable={!isPreview}
//                             suppressContentEditableWarning
//                             onBlur={(e) => {
//                                 const newTerms = [...termsArray.props.terms];
//                                 newTerms[index].content = e.target.innerText;
//                                 handleUpdate(termsArray.id, "terms", newTerms);
//                             }}
//                             style={{
//                                 fontSize: `${termsArray.props.contentFontSize}px`,
//                                 color: termsArray.props.contentColor,
//                                 textAlign: 'justify'
//                             }}
//                         >
//                             {/* In preview mode, we format the bullets. In edit mode, we show raw text */}
//                             {isPreview ? renderContent(item.content) : item.content}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Terms3;






import React, { useState, useEffect } from 'react';
import { Settings2, MousePointer2, X, Trash2, Mail, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup';

const Terms3 = ({ data: initialData }) => {
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
        background: 'rgba(255, 255, 255, 0.8)',
    });

    const handleSave = async () => {
        try {
            Toast.fire({ icon: 'info', title: 'Saving template...', timer: 0 });
            let folderName = "general";
            templatesData.forEach(cat => {
                if (cat.templates.find(t => t.templateId === data.templateId)) {
                    folderName = cat.category;
                }
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

    // Helper to render text with line breaks and bullets for the disclaimer
    const renderFormattedContent = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            if (line.trim().startsWith('•')) {
                return <li key={i} className="ml-4 list-none">{line}</li>;
            }
            return <p key={i} className={line.trim() === "" ? "h-4" : "mb-2"}>{line}</p>;
        });
    };

    const Editable = ({ id, field, className, tag: Tag = "div", isHeader = false }) => {
        const comp = getComp(id);
        const content = comp.props[field];

        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-300 rounded transition-all`}
                contentEditable
                suppressContentEditableWarning={true}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(id);
                }}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                style={{
                    fontSize: isHeader ? (isMobile ? '24px' : `${comp.props.headingFontSize}px`) : `${comp.props.fontSize || comp.props.contentFontSize}px`,
                    color: isHeader ? comp.props.headingColor : (comp.props.color || comp.props.contentColor),
                    textAlign: comp.props.textAlign || 'left'
                }}
            >
                {content}
            </Tag>
        );
    };

    const renderCanvasContent = (isPreview = false) => {
        const mainHeader = getComp("section-1-main-header");
        const termsList = getComp("section-2-terms-list");

        return (
            <div className="w-full min-h-screen font-sans bg-white text-[#000000] pb-20">
                {/* 1. Centered Main Header */}
                {mainHeader && (
                    <div
                        className={`w-full transition-all cursor-pointer   relative ${!isPreview && selectedId === mainHeader.id ? 'bg-blue-50/50 ring-1 ring-blue-200' : ''}`}
                        onClick={() => setSelectedId(mainHeader.id)}
                        style={{
                            padding: isMobile ? '40px 20px 10px 20px' : '60px 10% 20px 10%',
                        }}
                    >
                        <Editable id={mainHeader.id} field="heading" tag="h1" isHeader={true} className="font-semibold mb-2" />
                        <Editable id={mainHeader.id} field="content" tag="p" className="font-medium italic  "  style={{textAlign:"left"}}/>
                    </div>
                )}

                {/* 2. Terms List - Document Style */}
                <div className="max-w-4xl mx-auto px-8 mt-4 space-y-8" style={{ textAlign: 'left' }}>
                    {termsList.props.terms?.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-all cursor-pointer group ${!isPreview && selectedId === termsList.id ? 'ring-1 ring-blue-100 p-4 rounded bg-gray-50/30' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(termsList.id); }}
                        >
                            <h2
                                className="font-bold mb-3 outline-none"
                                contentEditable={!isPreview}
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].heading = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{
                                    fontSize: `${termsList.props.headingFontSize}px`,
                                    color: termsList.props.headingColor
                                }}
                            >
                                {item.heading}
                            </h2>

                            <div
                                className="leading-relaxed whitespace-pre-line outline-none"
                                contentEditable={!isPreview}
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].content = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{
                                    fontSize: `${termsList.props.contentFontSize}px`,
                                    color: termsList.props.contentColor,
                                    textAlign: 'justify'
                                }}
                            >
                                {isPreview ? renderFormattedContent(item.content) : item.content}
                            </div>
                        </div>
                    ))}
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

            {/* Sidebar Settings */}
            <div
                className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                style={{ width: "16%", right: "0px" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800" style={{ fontSize: "18px" }}>
                            <Settings2 size={18} /> Settings
                        </h2>
                        <button
                            onClick={handleSave}
                            className="text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-all active:scale-95"
                            style={{ backgroundColor: "#615fff" }}
                        >
                            Publish
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 p-1 rounded-xl mb-4">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {activeComp.id.split('-').pop()}
                                </span>
                            </div>

                            {/* Appearance Group */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">Appearance</label>

                                {activeComp.props.headingColor && (
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-700">Heading Color</span>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                                            <input type="color" value={activeComp.props.headingColor} onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)} className="w-8 h-8 cursor-pointer" />
                                            <input type="text" value={activeComp.props.headingColor} onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)} className="bg-transparent border-none text-xs font-mono w-full outline-none uppercase" />
                                        </div>
                                    </div>
                                )}

                                {activeComp.props.headingFontSize && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Heading Size</span>
                                            <span className="text-xs font-bold text-indigo-600">{activeComp.props.headingFontSize}px</span>
                                        </div>
                                        <input type="range" min="12" max="80" value={activeComp.props.headingFontSize} onChange={(e) => handleUpdate(activeComp.id, "headingFontSize", parseInt(e.target.value))} className="w-full accent-[#615fff]" />
                                    </div>
                                )}

                                {(activeComp.props.contentFontSize || activeComp.props.fontSize) && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Text Size</span>
                                            <span className="text-xs font-bold text-indigo-600">{activeComp.props.contentFontSize || activeComp.props.fontSize}px</span>
                                        </div>
                                        <input type="range" min="8" max="40" value={activeComp.props.contentFontSize || activeComp.props.fontSize} onChange={(e) => handleUpdate(activeComp.id, activeComp.props.contentFontSize ? "contentFontSize" : "fontSize", parseInt(e.target.value))} className="w-full accent-[#615fff]" />
                                    </div>
                                )}
                            </div>

                            {/* List Controls */}
                            {activeComp.id === "section-2-terms-list" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Clauses</label>
                                        <button
                                            onClick={() => {
                                                const newTerms = [...activeComp.props.terms, { heading: "New Clause", content: "Enter details here..." }];
                                                handleUpdate(activeComp.id, "terms", newTerms);
                                            }}
                                            className="text-[10px] text-white px-3 py-1 rounded-lg bg-[#57915a] font-bold"
                                        >
                                            + Add Clause
                                        </button>
                                    </div>
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {activeComp.props.terms.map((t, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                                                <span className="text-xs font-semibold text-gray-600 truncate max-w-[120px]">{t.heading}</span>
                                                <button onClick={() => {
                                                    const filtered = activeComp.props.terms.filter((_, idx) => idx !== i);
                                                    handleUpdate(activeComp.id, "terms", filtered);
                                                }} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-60">
                            <Settings2 className="w-12 h-12 mb-4 text-indigo-200" />
                            <h3 className="text-lg font-bold text-gray-800">Select a section</h3>
                            <p className="text-xs text-gray-400">Click on any text in the preview to edit its appearance.</p>
                        </div>
                    )}
                </div>
            </div>

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
        </div>
    );
};

export default Terms3;