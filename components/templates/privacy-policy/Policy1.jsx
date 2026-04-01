// import React from 'react';
// import { FileText, Shield, Truck, RefreshCcw, Info, Scale } from 'lucide-react';

// const Terms1 = ({ data, selectedId, setSelectedId, viewMode }) => {

//     const mainHeader = data?.components.find(c => c.id === "section-1-main-header");
//     const termsArray = data?.components.find(c => c.id === "section-2-terms-list");
//     const declaration = data?.components.find(c => c.id === "section-3-declaration");

//     const isMobile = viewMode === "mobile";



//     return (
//         <div className="w-full min-h-screen font-sans bg-white text-[#1a1a1a] pb-24">




//             {mainHeader && (
//                 <div
//                     className={`w-full transition-all cursor-pointer relative overflow-hidden ${selectedId === mainHeader.id ? 'ring-4 ring-blue-100' : ''}`}
//                     onClick={() => setSelectedId(mainHeader.id)}
//                     style={{
//                         padding: isMobile ? '60px 20px' : '120px 5%',

//                         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${mainHeader.props.backgroundImage})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         backgroundRepeat: 'no-repeat'
//                     }}
//                 >
//                     <div className="max-w-4xl mx-auto text-center relative z-10">
//                         <h1
//                             className="font-bold tracking-widest mb-6 uppercase"
//                             style={{
//                                 fontSize: isMobile ? '32px' : `${mainHeader.props.headingFontSize}px`,
//                                 color: mainHeader.props.headingColor || "#ffffff"
//                             }}
//                         >
//                             {mainHeader.props.heading}
//                         </h1>
//                         <p
//                             className="leading-relaxed max-w-3xl mx-auto opacity-90"
//                             style={{
//                                 fontSize: `${mainHeader.props.contentFontSize}px`,
//                                 color: mainHeader.props.contentColor || "#e0e0e0"
//                             }}
//                         >
//                             {mainHeader.props.content}
//                         </p>


//                         {(mainHeader.props.email || mainHeader.props.phone) && (
//                             <div className="mt-8 flex flex-col items-center gap-2">
//                                 {mainHeader.props.phone && (
//                                     <span className="font-medium" style={{ color: mainHeader.props.textColor }}>
//                                         {mainHeader.props.phone}
//                                     </span>
//                                 )}
//                                 {mainHeader.props.email && (
//                                     <span className="font-medium underline decoration-1 underline-offset-4" style={{ color: mainHeader.props.textColor }}>
//                                         {mainHeader.props.email}
//                                     </span>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* 2. Terms Array Section */}
//             <div className="max-w-5xl mx-auto px-6 mt-16 space-y-12">
//                 {termsArray && termsArray.props.terms.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`group transition-all cursor-pointer border-l-2 border-transparent   pl-6 ${selectedId === termsArray.id ? 'bg-gray-50 p-6 rounded-r-xl border-blue-400' : ''}`}
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedId(termsArray.id);
//                         }}
//                     >
//                         <div className="flex items-center gap-3 mb-4 text-gray-400 group-hover:text-black transition-colors">

//                             <h2
//                                 className="font-bold uppercase tracking-wider underline underline-offset-8 decoration-1"
//                                 style={{
//                                     fontSize: `${termsArray.props.headingFontSize}px`,
//                                     color: termsArray.props.headingColor
//                                 }}
//                             >
//                                 {item.heading}
//                             </h2>
//                         </div>
//                         <p
//                             className="leading-7 text-gray-600 font-light"
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

//             {/* 3. Declaration/Footnote Section */}
//             {declaration && (
//                 <div
//                     className={`max-w-5xl mx-auto mt-20 px-6 transition-all cursor-pointer ${selectedId === declaration.id ? 'ring-2 ring-blue-200 p-4 rounded-lg' : ''}`}
//                     onClick={() => setSelectedId(declaration.id)}
//                 >
//                     <div className="pt-8 border-t border-gray-100">
//                         <p
//                             className="opacity-70 leading-relaxed"
//                             style={{
//                                 fontSize: `${declaration.props.fontSize}px`,
//                                 color: declaration.props.color,
//                                 fontStyle: declaration.props.fontStyle
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

// export default Terms1;


import React, { useState, useEffect } from 'react';
import { Settings2, MousePointer2, X, Trash2, Plus, FileText, Shield, Truck, RefreshCcw, Info, Scale } from 'lucide-react';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';
import DeviceMockup from '../../layout/DeviceMockup'; // Assuming you have this component

const Policy1 = ({ data: initialData }) => {
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

    // Create a reusable "Premium" toast instance
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'rgba(255, 255, 255, 0.8)', // Glass effect
        backdrop: 'transparent',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
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
                    fontSize: isHeader ? (isMobile ? '24px' : `${comp.props.headingFontSize}px`) : `${comp.props.contentFontSize}px`,
                    color: isHeader ? comp.props.headingColor : comp.props.contentColor,
                    textAlign: comp.props.textAlign || 'left'
                }}
            >
                {content}
            </Tag>
        );
    };

    const renderCanvasContent = () => {
        const mainHeader = getComp("section-1-main-header");
        const termsList = getComp("section-2-terms-list");
        const declaration = getComp("section-3-declaration");

        return (
            <div className="w-full bg-white text-[#1a1a1a] min-h-screen">

                <div
                    className={`w-full transition-all cursor-pointer relative overflow-hidden ${selectedId === mainHeader.id ? 'ring-4 ring-blue-400' : ''}`}
                    onClick={() => setSelectedId(mainHeader.id)}
                    style={{
                        padding: isMobile ? '60px 20px' : '20px 5%',

                    }}
                >
                    <div className="  mx-auto text-center relative z-1">
                        <Editable id="section-1-main-header" field="heading" tag="h1" isHeader={true} className="font-bold tracking-widest mb-6 uppercase" />
                        <Editable id="section-1-main-header" field="content" tag="p" className="leading-relaxed opacity-90" />
                    </div>
                </div>


                <div className="max-w-5xl mx-auto px-6 mt-7 space-y-12">
                    {termsList.props.terms?.map((item, index) => (
                        <div
                            key={index}
                            className={`group transition-all pl-6 border-l-2 ${selectedId === termsList.id ? 'bg-blue-50/50 p-6 rounded-r-xl border-blue-400' : 'border-transparent'}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(termsList.id); }}
                        >
                            <h2
                                className="font-bold uppercase tracking-wider mb-4 underline underline-offset-8"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].heading = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{ fontSize: `${termsList.props.headingFontSize}px`, color: termsList.props.headingColor }}
                            >
                                {item.heading}
                            </h2>
                            <p
                                className="leading-7 text-gray-600 font-light"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTerms = [...termsList.props.terms];
                                    newTerms[index].content = e.target.innerText;
                                    handleUpdate(termsList.id, "terms", newTerms);
                                }}
                                style={{ fontSize: `${termsList.props.contentFontSize}px`, color: termsList.props.contentColor }}
                            >
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto mt-20 px-6 pb-24">
              
                    <div
                        className="relative   "
                        style={{
                            backgroundColor: activeComp?.id === "section-3-declaration" ? "#fdfdff" : "transparent",
                            borderColor: activeComp?.id === "section-3-declaration" ? "#e0e7ff" : "#f3f4f6"
                        }}
                    >
                      
                        <div className="pl-4"
                        style={{
                            fontSize: `${activeComp?.props?.fontSize || 12}px`,
                            color: activeComp?.props?.color || "#6b7280",
                            fontStyle: activeComp?.props?.fontStyle || "italic",
                            padding: activeComp?.props?.padding
                        }}>
                            <Editable
                                id="section-3-declaration"
                                field="text"
                                tag="p"
                                className="leading-relaxed tracking-tight"
                                style={{
                                    fontSize: `${activeComp?.props?.fontSize || 12}px`,
                                    color: activeComp?.props?.color || "#6b7280",
                                    fontStyle: activeComp?.props?.fontStyle || "italic",
                                    padding: activeComp?.props?.padding
                                }}
                                
                            />
                            {console.log(activeComp?.props?.color )}
                        
                        </div>
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
                                    Editing: {activeComp.id}
                                </span>
                            </div>

                        
                            {(activeComp.props.headingColor || activeComp.props.contentColor || activeComp.props.backgroundImage !== undefined) && (
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
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                style={{ accentColor: "#615fff" }}
                                            />
                                        </div>
                                    )}

                                    {/* Content Color */}
                                    {activeComp.props.contentColor && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-gray-700">Content Color</span>
                                                <span className="text-xs font-mono text-gray-400 uppercase">{activeComp.props.contentColor}</span>
                                            </div>
                                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] transition-all">
                                                <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                    <input
                                                        type="color"
                                                        value={activeComp.props.contentColor}
                                                        onChange={(e) => handleUpdate(activeComp.id, "contentColor", e.target.value)}
                                                        className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent border-none"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={activeComp.props.contentColor}
                                                    onChange={(e) => handleUpdate(activeComp.id, "contentColor", e.target.value)}
                                                    className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Font Size */}
                                    {activeComp.props.contentFontSize && (
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-gray-700">Content Size</span>
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.contentFontSize}px</span>
                                            </div>
                                            <input
                                                type="range" min="8" max="40"
                                                value={activeComp.props.contentFontSize}
                                                onChange={(e) => handleUpdate(activeComp.id, "contentFontSize", parseInt(e.target.value))}
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                style={{ accentColor: "#615fff" }}
                                            />
                                        </div>
                                    )}

                                    {/* Banner/Background Image */}
                                    {activeComp.props.backgroundImage !== undefined && (
                                        <div className="space-y-2">
                                            <span className="text-sm font-medium text-gray-700 block">Banner Image URL</span>
                                            <textarea
                                                className="w-full p-2 border border-gray-200 rounded-lg text-xs font-mono bg-gray-50 outline-none focus:border-[#615fff] focus:ring-1 focus:ring-[#615fff]/20 transition-all"
                                                rows="3"
                                                placeholder="https://example.com/image.jpg"
                                                value={activeComp.props.backgroundImage}
                                                onChange={(e) => handleUpdate(activeComp.id, "backgroundImage", e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}


                            {/* 5. SECTION-3-DECLARATION MANAGEMENT */}
                            {activeComp.id === "section-3-declaration" && (
                                <div className="space-y-6">


                                    {/* TYPOGRAPHY CARD */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Typography & Style</label>
                                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                                            {/* Color Picker */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                                    <span>Text Color</span>
                                                    <span className="font-mono text-gray-400 uppercase">{activeComp.props.color || "#6b7280"}</span>
                                                </div>
                                                <div className="relative h-10 w-full rounded-xl border border-gray-100 overflow-hidden shadow-inner">
                                                    <input
                                                        type="color"
                                                        className="absolute inset-0 w-full h-full cursor-pointer scale-[3] bg-transparent"
                                                        value={activeComp.props.color || "#6b7280"}
                                                        onChange={(e) => handleUpdate(activeComp.id, "color", e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Font Size Slider */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                                    <span>Font Size</span>
                                                    <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{activeComp.props.fontSize || 12}px</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="8"
                                                    max="24"
                                                    value={parseInt(activeComp.props.fontSize) || 12}
                                                    onChange={(e) => handleUpdate(activeComp.id, "fontSize", parseInt(e.target.value))}
                                                    className="w-full accent-[#615fff] h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>

                                            {/* Font Style Toggle */}
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                                <span className="text-[11px] font-bold text-gray-600">Italicize Text</span>
                                                <button
                                                    onClick={() => handleUpdate(activeComp.id, "fontStyle", activeComp.props.fontStyle === 'italic' ? 'normal' : 'italic')}
                                                    className={`w-10 h-5 rounded-full transition-colors relative ${activeComp.props.fontStyle === 'italic' ? 'bg-indigo-500' : 'bg-gray-200'}`}
                                                >
                                                    <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${activeComp.props.fontStyle === 'italic' ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}





                            {/* CONTENT/LIST MANAGEMENT GROUP */}
                            {activeComp.id === "section-2-terms-list" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                            Sections
                                        </label>
                                        <button
                                            onClick={() => {
                                                const newTerms = [...activeComp.props.terms, { heading: "New Term", content: "Add content here..." }];
                                                handleUpdate(activeComp.id, "terms", newTerms);
                                            }}
                                            className="text-[10px] text-white px-2 py-1 rounded hover:opacity-90 transition-colors flex items-center gap-1"
                                            style={{ backgroundColor: "#57915a", cursor: "pointer" }}
                                        >
                                            <span>+</span> Add Section
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {activeComp.props.terms.map((t, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                                                <span className="text-xs font-medium text-gray-600 truncate max-w-[120px]">
                                                    {t.heading}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        const newTerms = activeComp.props.terms.filter((_, idx) => idx !== i);
                                                        handleUpdate(activeComp.id, "terms", newTerms);
                                                    }}
                                                    className="text-red-400 hover:text-red-600 transition-colors"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <Trash2 size={16} color='#bd2222' />
                                                </button>
                                            </div>
                                        ))}
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
    return (
        // Parent container must be w-full and h-screen
        <div className="flex h-screen w-full bg-[#f8f9fa] font-sans" onClick={() => setSelectedId(null)}>
            
            {/* Main Editor Area: flex-1 makes it take up all remaining space */}
            <div className="relative flex-1 flex flex-col items-center overflow-y-auto">
                
                {/* Preview Button: Positioned relative to this container or the screen */}
                <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="fixed top-3 right-[22%] z-50 text-white px-6 py-2 shadow-2xl rounded-lg transition-all flex items-center gap-2 font-bold bg-[#615fff]"
                >
                    <MousePointer2 size={13} /> Preview
                </button>
    
                {/* Canvas Area */}
                <div className="w-full max-w-5xl p-8">
                    <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                        {renderCanvasContent()}
                    </DeviceMockup>
                </div>
            </div>
    
            {/* Sidebar: Occupies exactly 19% or a fixed width */}
            <div className="w-[19%] border-l bg-white">
                {/* Sidebar content here */}
            </div>
        </div>
    );
};

export default Policy1;