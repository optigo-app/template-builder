// import React from 'react';
// import { Mail } from 'lucide-react';

// const Terms2 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     const mainHeader = data?.components.find(c => c.id === "section-1-main-header");
//     const termsArray = data?.components.find(c => c.id === "section-2-terms-list");
//     const declaration = data?.components.find(c => c.id === "section-3-declaration");

//     const isMobile = viewMode === "mobile";

//     return (
//         <div className="w-full min-h-screen font-sans bg-white text-[#111827] pb-24">
//             {/* 1. Simple Header Section */}
//             {mainHeader && (
//                 <div
//                     className={`w-full transition-all cursor-pointer   ${selectedId === mainHeader.id ? 'bg-blue-50/30' : ''}`}
//                     onClick={() => setSelectedId(mainHeader.id)}
//                     style={{
//                         padding: isMobile ? '40px 20px 0px 20px' : '60px 5% 0px 5%',
//                     }}
//                 >
//                     <div className="max-w-6xl mx-auto">
//                         <h1
//                             className="font-bold mb-4"
//                             style={{
//                                 fontSize: isMobile ? '28px' : `${mainHeader.props.headingFontSize}px`,
//                                 color: mainHeader.props.headingColor
//                             }}
//                         >
//                             {mainHeader.props.heading}
//                         </h1>
//                     </div>
//                 </div>
//             )}

//             {/* 2. Terms List Section */}
//             <div className="max-w-6xl mx-auto px-6 mt-10 space-y-8">
//                 {termsArray && termsArray.props.terms.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`transition-all cursor-pointer   ${selectedId === termsArray.id ? 'ring-2 ring-blue-100 p-4 rounded-lg bg-gray-50' : ''}`}
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedId(termsArray.id);
//                         }}
//                     >
//                         <h2
//                             className="font-bold mb-2"
//                             style={{
//                                 fontSize: `${termsArray.props.headingFontSize}px`,
//                                 color: termsArray.props.headingColor
//                             }}
//                         >
//                             {`${index+1}. ` + item.heading}
//                         </h2>
//                         <p
//                             className="leading-relaxed"
//                             style={{
//                                 fontSize: `${termsArray.props.contentFontSize}px`,
//                                 color: termsArray.props.contentColor
//                             }}
//                         >
//                             {item.content}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {/* 3. Footer / Declaration Section */}
//             {declaration && (
//                 <div
//                     className={`max-w-6xl mx-auto mt-16 px-6 transition-all cursor-pointer ${selectedId === declaration.id ? 'bg-blue-50/50 p-6 rounded-xl' : ''}`}
//                     onClick={() => setSelectedId(declaration.id)}
//                 >
//                     <div className="pt-8 border-t border-gray-200 space-y-6">
//                         <p
//                             className="leading-relaxed opacity-80"
//                             style={{
//                                 fontSize: `${declaration.props.fontSize}px`,
//                                 color: declaration.props.color,
//                                 fontStyle: declaration.props.fontStyle
//                             }}
//                         >
//                             {declaration.props.text}
//                         </p>

//                         {declaration.props.showEmailButton && (
//                             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email:</span>
//                                 <button className="flex items-center gap-3 px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 group">
//                                     <Mail size={16} className="group-hover:scale-110 transition-transform" />
//                                     <span className="text-xs font-bold tracking-tighter uppercase">
//                                         {declaration.props.email}
//                                     </span>
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Terms2;














import React, { useState, useEffect } from 'react';
import { Settings2, MousePointer2, X, Trash2, Mail, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup';

const Terms2 = ({ data: initialData }) => {
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
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
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
                    fontSize: isHeader ? (isMobile ? '28px' : `${comp.props.headingFontSize}px`) : `${comp.props.fontSize || comp.props.contentFontSize}px`,
                    color: isHeader ? comp.props.headingColor : (comp.props.color || comp.props.contentColor),
                    fontStyle: comp.props.fontStyle || 'normal',
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
        const declaration = getComp("section-3-declaration");

        return (
            <div className={`w-full bg-white text-[#111827] min-h-screen font-sans ${isPreview ? '' : 'pb-24'}`}>
                {/* 1. Dynamic Header */}
                {mainHeader && (
                    <div
                        className={`w-full transition-all cursor-pointer relative ${!isPreview && selectedId === mainHeader.id ? 'bg-blue-50/30 ring-2 ring-inset ring-blue-200' : ''}`}
                        onClick={() => setSelectedId(mainHeader.id)}
                        style={{
                            padding: isMobile ? '40px 20px 0px 20px' : '60px 5% 0px 3%',
                            backgroundColor: mainHeader.props.backgroundColor || 'transparent'
                        }}
                    >
                        <div className="max-w-6xl mx-auto">
                            <Editable id={mainHeader.id} field="heading" tag="h1" isHeader={true} className="font-bold mb-1" />
                        </div>
                    </div>
                )}

                {/* 2. Dynamic Terms List */}
                <div className="max-w-6xl mx-auto px-6 mt-10 space-y-8">
                    {termsList.props.terms?.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-all cursor-pointer p-4 rounded-lg ${!isPreview && selectedId === termsList.id ? 'ring-2 ring-blue-100 bg-gray-50' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(termsList.id); }}
                        >
                            <div className="flex gap-2 mb-2">
                                {/* Keep the index separate and non-editable */}
                                <span
                                    className="font-bold"
                                    style={{
                                        fontSize: `${termsList.props.headingFontSize}px`,
                                        color: termsList.props.headingColor
                                    }}
                                >
                                    {index + 1}.
                                </span>

                                <h2
                                    className="font-bold flex-1 outline-none"
                                    contentEditable={!isPreview}
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        const newTerms = [...termsList.props.terms];
                                        // Now this only saves the actual text description
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
                            </div>
                            <p
                                className="leading-relaxed"
                                contentEditable={!isPreview}
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].content = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{
                                    fontSize: `${termsList.props.contentFontSize}px`,
                                    color: termsList.props.contentColor
                                }}
                            >
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 3. Dynamic Declaration/Footer */}
                {declaration && (
                    <div
                        className={`max-w-6xl mx-auto mt-16 px-6 transition-all cursor-pointer ${!isPreview && selectedId === declaration.id ? 'bg-blue-50/50 p-6 rounded-xl' : ''}`}
                        onClick={() => setSelectedId(declaration.id)}
                    >
                        <div className="pt-8 border-t border-gray-200 space-y-6">
                            <Editable id={declaration.id} field="text" tag="p" className="leading-relaxed opacity-80" />

                            {declaration.props.showEmailButton && (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email:</span>
                                    <button className="flex items-center gap-3 px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-all group">
                                        <Mail size={16} />
                                        <span className="text-xs font-bold uppercase tracking-tighter">
                                            {declaration.props.email}
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
                {/* Header Section */}
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

                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">

                            {/* Breadcrumb style Badge */}
                            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 p-1 rounded-xl mb-4">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {activeComp.id.split('-').slice(2).join(' ')}
                                </span>
                            </div>

                            {/* APPEARANCE GROUP (Global Styles) */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">Appearance</label>

                                {/* Heading Color */}
                                {activeComp.props.headingColor && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Heading Color</span>
                                            <span className="text-xs font-mono text-gray-400 uppercase">{activeComp.props.headingColor}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                            <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                <input
                                                    type="color"
                                                    value={activeComp.props.headingColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)}
                                                    className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={activeComp.props.headingColor}
                                                onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)}
                                                className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Heading Font Size */}
                                {activeComp.props.headingFontSize && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Heading Size</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.headingFontSize}px</span>
                                        </div>
                                        <input
                                            type="range" min="12" max="80"
                                            value={activeComp.props.headingFontSize}
                                            onChange={(e) => handleUpdate(activeComp.id, "headingFontSize", parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                )}

                                {/* Content Color (Unified Style) */}
                                {(activeComp.props.contentColor || activeComp.props.color) && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Text Color</span>
                                            <span className="text-xs font-mono text-gray-400 uppercase">{activeComp.props.contentColor || activeComp.props.color}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                            <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                <input
                                                    type="color"
                                                    value={activeComp.props.contentColor || activeComp.props.color || "#000000"}
                                                    onChange={(e) => handleUpdate(activeComp.id, activeComp.props.contentColor ? "contentColor" : "color", e.target.value)}
                                                    className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={activeComp.props.contentColor || activeComp.props.color}
                                                onChange={(e) => handleUpdate(activeComp.id, activeComp.props.contentColor ? "contentColor" : "color", e.target.value)}
                                                className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Text Font Size (Unified Style) */}
                                {(activeComp.props.contentFontSize || activeComp.props.fontSize) && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Text Size</span>
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.contentFontSize || activeComp.props.fontSize}px</span>
                                        </div>
                                        <input
                                            type="range" min="8" max="40"
                                            value={activeComp.props.contentFontSize || activeComp.props.fontSize}
                                            onChange={(e) => handleUpdate(activeComp.id, activeComp.props.contentFontSize ? "contentFontSize" : "fontSize", parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* CONTENT SPECIFIC CONTROLS */}
                            {activeComp.id === "section-2-terms-list" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">List Items</label>
                                        <button
                                            onClick={() => {
                                                const newTerms = [...activeComp.props.terms, { heading: "New Clause", content: "Description..." }];
                                                handleUpdate(activeComp.id, "terms", newTerms);
                                            }}
                                            className="text-[10px] text-white px-3 py-1 rounded-lg hover:opacity-90 transition-colors flex items-center gap-1 font-bold shadow-sm"
                                            style={{ backgroundColor: "#57915a", cursor: "pointer" }}
                                        >
                                            <span>+</span> Add Item
                                        </button>
                                    </div>
                                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                                        {activeComp.props.terms.map((t, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-indigo-200 transition-all">
                                                <span className="text-xs font-semibold text-gray-600 truncate max-w-[140px]">{t.heading}</span>
                                                <button
                                                    onClick={() => {
                                                        const filtered = activeComp.props.terms.filter((_, idx) => idx !== i);
                                                        handleUpdate(activeComp.id, "terms", filtered);
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

                            {activeComp.id === "section-3-declaration" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Contact Info</label>
                                    <div className="space-y-2">
                                        <span className="text-sm font-medium text-gray-700 block">Email Address</span>
                                        <input
                                            type="email"
                                            className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50 outline-none focus:border-[#615fff] focus:ring-4 focus:ring-[#615fff]/5 transition-all"
                                            value={activeComp.props.email}
                                            onChange={(e) => handleUpdate(activeComp.id, "email", e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : (
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

export default Terms2;