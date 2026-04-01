// import React from 'react';

// const Contact2 = ({ data }) => {
//     const { components } = data;

//     // Extract components from JSON
//     const banner = components.find((c) => c.type === "banner");
//     const heading = components.find((c) => c.id === "main-heading-contact");
//     const gridContainer = components.find((c) => c.id === "contact-grid-container");
//     const mapSection = components.find((c) => c.id === "google-map-section");

//     // Extract children from grid container
//     const formSection = gridContainer?.children.find((child) => child.type === "form");
//     const infoSection = gridContainer?.children.find((child) => child.type === "content-group");

//     return (
//         <div className="w-full bg-white font-sans overflow-x-hidden ">

//             {/* 1. Hero Banner Section */}
//             {banner && (
//                 <div
//                     style={{
//                         backgroundImage: `url(${banner.props.backgroundImage})`,
//                         height: banner.props.height,
//                         backgroundColor: banner.props.overlayColor,
//                         ...banner.props.style
//                     }}
//                     className="w-full relative"
//                 />
//             )}

//             {/* 2. Main Heading Section */}
//             {heading && (
//                 <div className="  px-6 text-center max-w-3xl mx-auto">
//                     <h1
//                         style={{
//                             fontSize: `${heading.props.headingFontSize}px`,
//                             color: heading.props.headingColor,
//                             textAlign: heading.props.textAlign,
//                             margin: heading.props.margin
//                         }}
//                         className="font-serif mb-4"
//                     >
//                         {heading.props.heading}
//                     </h1>

//                 </div>
//             )}

//             {/* Right Column: Information List */}
//             {infoSection && (
//                 <div className="space-y-12" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,marginBottom:"90px",padding:"0 60px"}}>
//                     {infoSection.props.sections.map((section, idx) => (
//                         <div key={idx} className="space-y-3">
//                             <h3
//                                 className="font-bold tracking-tight"
//                                 style={{
//                                     fontSize: `${infoSection.props.headingFontSize}px`,
//                                     color: infoSection.props.headingColor
//                                 }}
//                             >
//                                 {section.heading}
//                             </h3>
//                             <div
//                                 className="whitespace-pre-line leading-relaxed"
//                                 style={{
//                                     fontSize: `${infoSection.props.contentFontSize}px`,
//                                     color: infoSection.props.contentColor
//                                 }}
//                             >

//                                 {section.content.split('\n').map((line, index) => (
//                                     <React.Fragment key={index}>
//                                         {line}
//                                         <br />
//                                     </React.Fragment>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* 3. Responsive Grid Content */}
//             <div
//                 className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 mb-20"
//                 style={{ padding: gridContainer?.props.padding }}
//             >



//                 {/* Left Column: Contact Form */}
//                 {formSection && (
//                     <div className="  ">
//                        <div style={{width:"42%",margin:"0 auto",textAlign:"center"}}>
//                        <h2 className="text-xl font-bold mb-2 text-gray-800">{formSection.props.formHeading}</h2>
//                        <p className="text-sm text-gray-500 mb-8">{formSection.props.formDescription}</p>
//                        </div>

//                         <form className="  flex-wrap -mx-2" style={{display:"flex",flexWrap:"wrap"}}>
//                             {formSection.props.fields.map((field) => (
//                                 <div
//                                     key={field.id}
//                                     className="px-2 mb-6"
//                                     style={{ width: window.innerWidth > 1024 ? field.width : "100%" }}
//                                 >
//                                     {
//                                         field.type !== "textarea" &&(
//                                             <label className="block text-[11px]   text-gray-400 uppercase tracking-widest mb-1" style={{fontSize:"12px"}}>
//                                         {field.label}
//                                     </label>
//                                         )
//                                     }
//                                     {field.type === "textarea" ? (
//                                         <textarea
//                                             className="w-full border-b py-2 outline-none focus:border-indigo-500 transition-colors resize-none h-24 border p-1 border-gray-300"
//                                             placeholder={field.label}
//                                             style={{padding:"10px"}}
//                                         />
//                                     ) : (
//                                         <input
//                                             type={field.type}
//                                             className="w-full border-b border-gray-300 py-2 outline-none focus:border-indigo-500 transition-colors"
//                                             style={{width:"100%"}}
//                                         />
//                                     )}
//                                 </div>
//                             ))}

//                             <div className="w-full px-2 pt-4" style={{display:"flex",
//                                         justifyContent:"center",
//                                         alignItems:"center"}}>
//                                 <button
//                                     type="submit"
//                                     className="px-10 py-3 text-sm font-bold tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"

//                                     style={{
//                                         backgroundColor: formSection.props.buttonColor,
//                                         color: formSection.props.buttonTextColor,
//                                         padding:"7px 40px",

//                                     }}
//                                 >
//                                     {formSection.props.buttonText}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}


//             </div>


//         </div>
//     );
// };

// export default Contact2;


"use client"

import React, { useState, useEffect } from 'react';
import { Settings2, Plus, Trash2, X,MousePointer2 } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';

const Contact2Dynamic = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    const getComp = (id) => {
        // Search in top-level components or inside layout-grid children
        let found = data?.components?.find((item) => item.id === id);
        if (!found) {
            const grid = data?.components?.find(c => c.type === 'layout-grid');
            found = grid?.children?.find(child => child.id === id);
        }
        return found || { props: {} };
    };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) => {
                if (comp.id === id) {
                    return { ...comp, props: { ...comp.props, [field]: value } };
                }
                if (comp.type === 'layout-grid') {
                    return {
                        ...comp,
                        children: comp.children.map(child =>
                            child.id === id ? { ...child, props: { ...child.props, [field]: value } } : child
                        )
                    };
                }
                return comp;
            }),
        }));
    };

    const handleAddSection = (id) => {
        const comp = getComp(id);
        const newSection = { heading: "New Heading", content: "New content details here..." };
        handleUpdate(id, "sections", [...(comp.props.sections || []), newSection]);
    };

    const handleDeleteSection = (id, index) => {
        const comp = getComp(id);
        const updated = comp.props.sections.filter((_, i) => i !== index);
        handleUpdate(id, "sections", updated);
    };

    const handleSectionTextUpdate = (id, index, field, value) => {
        const comp = getComp(id);
        const updated = comp.props.sections.map((sec, i) =>
            i === index ? { ...sec, [field]: value } : sec
        );
        handleUpdate(id, "sections", updated);
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
            // 1. Loading Toast
            Toast.fire({
                icon: 'info',
                title: 'Saving template...',
                showConfirmButton: false,
                timer: 0, 
            });
    
            // 2. Logic to find folder name
            let folderName = "general"; 
            
            // This loop now uses the 'templatesData' we imported in Step 1
            templatesData.forEach(cat => {
                const found = cat.templates.find(t => t.templateId === data.templateId);
                if (found) {
                    // Use 'category' because that is the key in your JSON
                    folderName = cat.category; 
                }
            });
    
            const payload = {
                ...data,
                category: folderName 
            };
    
            // 3. Send to API
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
    const Editable = ({ id, field, index = null, className, tag: Tag = "div", style = {} }) => {
        const comp = getComp(id);
        const val = index !== null ? comp.props.sections[index][field] : comp.props[field];

        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
                style={{ ...style, whiteSpace: 'pre-line' }}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                    const text = e.target.innerText;
                    index !== null
                        ? handleSectionTextUpdate(id, index, field, text)
                        : handleUpdate(id, field, text);
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
            >
                {val}
            </Tag>
        );
    };

    const heroBanner = getComp("contact-hero-banner");
    const headingSection = getComp("main-heading-contact");
    const formSection = getComp("contact-form-section");
    const infoSection = getComp("contact-info-list");
    const mapSection = getComp("google-map-section");
    const activeComp = selectedId ? getComp(selectedId) : null;

    const renderCanvasContent = (isModel)=>(
        <div className="bg-white min-h-screen">

        {/* 1. Hero Banner */}
        <div
            className="relative w-full overflow-hidden mb-12"
            onClick={(e) => { e.stopPropagation(); setSelectedId("contact-hero-banner"); }}
            style={{
                height: heroBanner.props.height || '300px',
                backgroundImage: `url(${heroBanner.props.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0" style={{ backgroundColor: heroBanner.props.overlayColor }}></div>
        </div>

        {/* 2. Main Heading */}
        <div className="px-6 text-center max-w-3xl mx-auto mb-16" style={{ width: viewMode === "desktop" ? "40%" : "100% ", margin: "0 auto" }}>
            <Editable
                id="main-heading-contact" field="heading" tag="h1"
                className="font-bold mb-4"
                style={{
                    fontSize: `${headingSection.props.headingFontSize}px`,
                    color: headingSection.props.headingColor,
                }}
            />
            <Editable
                id="main-heading-contact" field="content" tag="p"
                className="leading-relaxed"
                style={{
                    fontSize: `${headingSection.props.contentFontSize}px`,
                    color: headingSection.props.contentColor,
                }}
            />
        </div>

        {/* Right: Info List */}
        <div
            className="space-y-12"
            onClick={(e) => { e.stopPropagation(); setSelectedId("contact-info-list"); }}
            style={{
                display: "flex",
                flexDirection: viewMode !== "mobile" ? "row" : "column",
                justifyContent: "space-between",
                alignItems: viewMode === "desktop" ? "" : "flex-start",
                // padding: "60px 50px",
                padding: viewMode === "desktop" ? "60px 50px" : "35px 26px",
                gap: viewMode === "desktop" ? "20px" : "0px"
            }}
        >
            {infoSection.props.sections?.map((section, idx) => (
                <div key={idx} className="relative group p-2 border border-transparent hover:border-gray-100 rounded-lg transition-all">
                    <Editable
                        id="contact-info-list" index={idx} field="heading" tag="h3"
                        className="font-bold mb-3"
                        style={{
                            fontSize: `${infoSection.props.headingFontSize}px`,
                            color: infoSection.props.headingColor
                        }}
                    />
                    <Editable
                        id="contact-info-list" index={idx} field="content" tag="div"
                        className="leading-relaxed whitespace-pre-line"
                        style={{
                            fontSize: `${infoSection.props.contentFontSize}px`,
                            color: infoSection.props.contentColor
                        }}
                    />

                    {/* Delete Button with Trash Icon */}
                    {!isModel && (
                             <button
                             onClick={(e) => {
                                 e.stopPropagation(); // Prevent selecting the whole list when deleting
                                 handleDeleteSection("contact-info-list", idx);
                             }}
                             style={{ color: "#b21111", cursor: "pointer" }}
                             className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 bg-red-300 hover:bg-red-400 text-white p-1.5 rounded-full shadow-md transition-all z-10 flex items-center justify-center"
                             title="Delete Section"
                         >
                             <Trash2 size={12} />
                         </button>

                    )}
                   
                </div>
            ))}
        </div>

        {/* 3. Layout Grid (Form & Info List) */}
        <div className="max-w-7xl mx-auto px-6     mb-20">

            {/* Left: Form */}
            <div className="w-full">
                <div className="mb-8" onClick={(e) => { e.stopPropagation(); setSelectedId("contact-form-section"); }}>

                </div>
                {formSection && (
                    <div
                        className="transition-all cursor-pointer rounded-xl p-4"
                        style={{
                            padding: viewMode === "desktop" ? "0 80px" : "0",
                            // Visual feedback so the user knows this whole block is selectable
                            outline: selectedId === "contact-form-section" ? "2px solid #6366f1" : "none",
                            backgroundColor: selectedId === "contact-form-section" ? "rgba(99, 102, 241, 0.05)" : "transparent"
                        }}
                        // THIS IS THE KEY: Clicking anywhere in the section selects the form
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId("contact-form-section");
                        }}
                    >
                        <div style={{ width: viewMode === "desktop" ? "42%" : "100%", margin: "0 auto", textAlign: "center", marginBottom: "40px" }}>
                            <Editable id="contact-form-section" field="formHeading" tag="h2" className="text-2xl font-bold mb-2 text-[#111827]" />
                            <Editable id="contact-form-section" field="formDescription" tag="p" className="text-sm text-gray-500" />
                        </div>

                        <form className="flex-wrap -mx-2" style={{ display: "flex", flexWrap: "wrap" }}>
                            {formSection.props.fields?.map((field) => (
                                <div
                                    key={field.id}
                                    className="px-2 mb-6"
                                    style={{ width: viewMode === "desktop" ? field.width : "100%" }}
                                >
                                    {field.type === "textarea" ? (
                                        <textarea
                                            className="w-full border py-2 outline-none border-gray-300 rounded p-2"
                                            placeholder={field.label}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="w-full border-b border-gray-300 py-2 outline-none"
                                            placeholder={field.label}
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="w-full px-2 pt-4 flex justify-center items-center">
                                <button
                                    type="button" // Use type="button" in editor to prevent accidental refreshes
                                    className="px-10 py-3 text-sm font-bold tracking-widest uppercase transition-all"
                                    style={{
                                        backgroundColor: formSection.props.buttonColor,
                                        color: formSection.props.buttonTextColor,
                                        padding: "7px 40px",
                                        marginBottom: "40px"
                                    }}
                                >
                                    {formSection.props.buttonText}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>


        </div>


    </div>
    )

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "100%" }}>

<button
        onClick={() => setIsPreviewOpen(true)}
        style={{fontSize:"13px",backgroundColor: "#615fff"}}
        className="fixed top-3 right-80 z-50  cursor-pointer    text-white px-6 py-2  shadow-2xl  rounded-lg transition-all flex items-center gap-2 font-bold"
      >
        <MousePointer2 size={13} /> Preview 
      </button>
            <div className="flex-1" onClick={() => setSelectedId(null)}>
                <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                    {renderCanvasContent(0)}
                </DeviceMockup>
            </div>

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

            {/* --- SIDEBAR SETTINGS --- */}
            <div
                className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                style={{ width: "16%", right: "0px" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800" style={{ fontSize: "18px" }} ><Settings2 size={18} /> Settings</h2>
                        <button
                            onClick={handleSave}
                            className="  text-white px-5 py-2 rounded-lg text-sm font-semibold   hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95"
                            style={{ backgroundColor: "#615fff", padding: "8px 18px", fontSize: "14px" }}
                        >
                           Publish
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            {/* Editing Status Tag */}
                            <div className="flex items-center space-x-2 bg-indigo-50 p-1 rounded-xl mb-6">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {selectedId.replace(/-/g, ' ')}
                                </span>
                            </div>

                            {/* Hero Banner Settings */}
                            {selectedId === "contact-hero-banner" && (
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-6">
                                    <div>
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Banner Visuals</label>
                                        <span className="text-sm font-medium text-gray-700 block mb-2">Image URL</span>
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={activeComp.props.backgroundImage}
                                            onChange={(e) => handleUpdate(selectedId, "backgroundImage", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 mb-4"
                                        />

                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Banner Height</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.height}</span>
                                                </div>
                                                <input
                                                    type="range" min="200" max="800" step="10"
                                                    value={parseInt(activeComp.props.height) || 400}
                                                    onChange={(e) => handleUpdate(selectedId, "height", `${e.target.value}px`)}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }}
                                                />
                                            </div>

                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Overlay Color</span>
                                                <input
                                                    type="color"
                                                    value={activeComp.props.overlayColor?.startsWith('rgba') ? "#000000" : activeComp.props.overlayColor}
                                                    onChange={(e) => handleUpdate(selectedId, "overlayColor", e.target.value)}
                                                    className="w-full h-10 rounded-lg cursor-pointer border-2 border-gray-100 bg-transparent overflow-hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* Text Styles (Headings & Lists) */}
                            {(selectedId === "main-heading-contact" || selectedId === "contact-info-list" || selectedId === "text-content-section") && (
                                <div className="space-y-6">
                                    {/* Typography Card */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Typography</label>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Heading Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.headingFontSize}px</span>
                                                </div>
                                                <input
                                                    type="range" min="12" max="80"
                                                    value={activeComp.props.headingFontSize || 24}
                                                    onChange={(e) => handleUpdate(selectedId, "headingFontSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }}
                                                />
                                            </div>

                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Heading Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Professional Small Label */}


                                                    <div className="grid grid-cols-[40px_1fr] items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm overflow-hidden">
                                                        {/* Color Picker Swatch - Fixed Width */}
                                                        <div className="relative h-8 w-full rounded-md border border-gray-200 overflow-hidden shadow-inner shrink-0">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.headingColor || "#000000"}
                                                                onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                                className="absolute -inset-2 w-[150%] h-[150%] cursor-pointer scale-[2.5]"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Text Input - Fills remaining space perfectly */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            value={activeComp.props.headingColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                            placeholder="#000000"
                                                            className="w-full bg-transparent border-none px-1 text-[11px] font-mono outline-none uppercase text-gray-700 truncate"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-gray-50">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Body Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.contentFontSize || activeComp.props.fontSize}px</span>
                                                </div>
                                                <input
                                                    type="range" min="10" max="30"
                                                    value={activeComp.props.contentFontSize || activeComp.props.fontSize || 16}
                                                    onChange={(e) => handleUpdate(selectedId, selectedId === "text-content-section" ? "fontSize" : "contentFontSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }}
                                                />
                                            </div>

                                            <div>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Refined Small Label */}
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Body Color
                                                    </span>

                                                    <div className="grid grid-cols-[40px_1fr] items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* Modern Color Swatch */}
                                                        <div className="relative h-8 w-full rounded-md border border-gray-200 overflow-hidden shadow-inner shrink-0">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.contentColor || "#666666"}
                                                                onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                                className="absolute -inset-2 w-[150%] h-[150%] cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Input for Body Color */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#666666"
                                                            value={activeComp.props.contentColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* List Specific Actions */}
                                    {selectedId === "contact-info-list" && (
                                        <button onClick={() => handleAddSection("contact-info-list")} className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest border-2 border-dashed border-indigo-100 w-full justify-center py-4 rounded-xl hover:bg-indigo-50 transition-all">
                                            <Plus size={16} /> Add Info Section
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Form Settings */}
                            {selectedId === "contact-form-section" && activeComp && (
                                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">

                                    {/* --- DYNAMIC FIELDS MANAGEMENT --- */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                                Form Fields
                                            </label>
                                            <button
                                                onClick={() => {
                                                    const newField = {
                                                        id: `field-${Date.now()}`,
                                                        type: "text",
                                                        label: "New Label",
                                                        placeholder: "Enter value...",
                                                    };
                                                    const currentFields = activeComp.props.fields || [];
                                                    handleUpdate(selectedId, "fields", [...currentFields, newField]);
                                                }}
                                                className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
                                            >
                                                + ADD FIELD
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {activeComp.props.fields?.map((field, index) => (
                                                <div key={field.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
                                                    {/* Delete Field Button */}
                                                    <button
                                                        onClick={() => {
                                                            const filtered = activeComp.props.fields.filter((_, i) => i !== index);
                                                            handleUpdate(selectedId, "fields", filtered);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-white cursor-pointer text-red-500 shadow-sm border border-red-100 rounded-full p-1 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 z-10"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                                    </button>

                                                    {/* Label Input */}
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Label</span>
                                                        <input
                                                            type="text"
                                                            value={field.label}
                                                            onChange={(e) => {
                                                                const newFields = [...activeComp.props.fields];
                                                                newFields[index].label = e.target.value;
                                                                handleUpdate(selectedId, "fields", newFields);
                                                            }}
                                                            className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-indigo-400"
                                                        />
                                                    </div>

                                                    {/* Type Selection */}
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Input Type</span>
                                                        <select
                                                            value={field.type}
                                                            onChange={(e) => {
                                                                const newFields = [...activeComp.props.fields];
                                                                newFields[index].type = e.target.value;
                                                                handleUpdate(selectedId, "fields", newFields);
                                                            }}
                                                            className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none cursor-pointer"
                                                        >
                                                            <option value="text">Short Text</option>
                                                            <option value="email">Email</option>
                                                            <option value="tel">Phone</option>
                                                            <option value="textarea">Message Area</option>
                                                            <option value="number">Number</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* --- BUTTON SETTINGS (Your Existing Code) --- */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-2">Form Action Button</label>
                                        <div>
                                            <span className="text-sm font-medium text-gray-700 block mb-2">Button Text</span>
                                            <input
                                                type="text"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
                                                value={activeComp.props.buttonText || "Submit"}
                                                onChange={(e) => handleUpdate(selectedId, "buttonText", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-700 block mb-2">Button Color</span>
                                            <input
                                                type="color"
                                                value={activeComp.props.buttonColor || "#4f39f6"}
                                                onChange={(e) => handleUpdate(selectedId, "buttonColor", e.target.value)}
                                                className="w-full h-10 rounded-lg cursor-pointer border-2 border-gray-100"
                                            />
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* Google Map Settings */}
                            {selectedId === "google-map-section" && (
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Map Configuration</label>
                                        <textarea
                                            value={activeComp.props.mapUrl || ""}
                                            onChange={(e) => handleUpdate(selectedId, "mapUrl", e.target.value)}
                                            placeholder="Paste iframe URL here..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 h-24 resize-none"
                                        />
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">Map Height</span>
                                                <span className="text-xs font-bold text-indigo-600">{activeComp.props.height || '300px'}</span>
                                            </div>
                                            <input
                                                type="range" min="200" max="800" step="10"
                                                value={parseInt(activeComp.props.height) || 300}
                                                onChange={(e) => handleUpdate(selectedId, "height", `${e.target.value}px`)}
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                style={{ accentColor: "#615fff" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="h-full flex flex-col items-center justify-center text-center px-4">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                <Settings2 size={40} className="text-indigo-200" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
                            <p className="text-sm text-gray-400 max-w-[180px]">Click any element to start customizing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact2Dynamic;