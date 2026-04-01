// import React from 'react';

// const Contact1 = ({ data }) => {
//   const { components } = data;

//   // Extract sections from JSON
//   const headingSection = components.find((c) => c.id === "main-heading-contact");
//   const formSection = components.find((c) => c.id === "contact-form-section");
//   const contentSection = components.find((c) => c.id === "text-content-section");
//   const mapSection = components.find((c) => c.id === "google-map-section");

//   return (
//     <div className="w-full bg-white py-16 px-6 font-sans text-[#4b5563]">
//       {/* 1. Centered Header Section */}
//       {headingSection && (
//         <div className="text-center mb-20 mx-auto max-w-[500px]" style={{width:"30%",margin:"0 auto",marginBottom:"40px"}}>
//           <h1 
//             className="font-serif mb-6 tracking-wide" 
//             style={{ 
//               fontSize: `${headingSection.props.headingFontSize}px`, 
//               color: headingSection.props.headingColor,
//               fontWeight: 400 
//             }}
//           >
//             {headingSection.props.heading}
//           </h1>
//           <p className="text-[15px] leading-relaxed text-gray-500">
//             {headingSection.props.content}
//           </p>
//         </div>
//       )}

//       {/* 2. Main Content Grid */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12" style={{boxShadow:"0 0 10px #0000001a",marginInline:"15%"}}>

//         {/* Left: Contact Form (Approx 42% width) */}
//         {formSection && (
//           <div className="w-full md:w-[42%]" style={{width:"70%", display:"flex",flexDirection:"column",alignItems:"center",margin:"90px 0px",borderRight:"1px solid gray"}}> 

//             <form className="space-y-5">
//               {formSection.props.fields.map((field) => (
//                 <div key={field.id} className="flex flex-col " style={{marginBottom:"20px"}}>
//                   <label className="text-[10px]   text-gray-400 mb-1 tracking-widest uppercase text-[14px]" style={{fontSize:"12px"}}>
//                     {field.label}
//                   </label>
//                   {field.type === "textarea" ? (
//                     <textarea
//                       className="border border-gray-200 p-3 h-32 outline-none focus:border-gray-400 transition-colors resize-none text-sm"
//                       placeholder={field.placeholder}
//                     />
//                   ) : (
//                     <input
//                       type={field.type}
//                       className="border border-gray-200 p-3 outline-none focus:border-gray-400 transition-colors text-sm"
//                       placeholder={field.placeholder}
//                     />
//                   )}
//                 </div>
//               ))}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-[180px] py-3 text-[12px] font-bold tracking-[0.2em] transition-all hover:brightness-95 uppercase"
//                   style={{ 
//                     backgroundColor: formSection.props.buttonColor, 
//                     color: formSection.props.buttonTextColor ,
//                     fontWeight:"500",
//                     fontSize:"14px",
//                     padding:"8px 15px"
//                   }}
//                 >
//                   {formSection.props.buttonText}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Right: Info & Map (Approx 48% width) */}
//         <div className="w-full md:w-[48%] space-y-16" style={{marginTop:"90px",paddingRight:"90px"}}>
//           {contentSection && (
//             <div className="border-l border-gray-100 pl-10 space-y-10">
//               {contentSection.props.sections.map((section, index) => (
//                 <div key={index} className="space-y-3" style={{marginBottom:"20px"}}>
//                   <h3 
//                     className="font-bold tracking-tight text-gray-800" 
//                     style={{ fontSize: `${contentSection.props.headingFontSize}px` ,marginBottom:"0px"}}
//                   >
//                     {section.heading}
//                   </h3>
//                   <div 
//                     className="whitespace-pre-line leading-[1.8] text-gray-500" 
//                     style={{ fontSize: `${contentSection.props.fontSize}px` }}
//                   >
//                     {section.content}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Map Section */}
//           {mapSection && (
//             <div className="w-full grayscale-[0.5] contrast-[1.1] hover:grayscale-0 transition-all duration-500">
//               <iframe
//                 title={mapSection.props.locationName}
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.0270631671986!2d77.21855931508051!3d28.53894298245143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26f1f5d6f1f%3A0x6d6d6d6d6d6d6d6d!2sSouth%20Extension%20II%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1625555555555!5m2!1sen!2sin"
//                 width="100%"
//                 height={mapSection.props.height}
//                 style={{ border: 0, borderRadius: `${mapSection.props.borderRadius}px` }}
//                 allowFullScreen=""
//                 loading="lazy"
//               ></iframe>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact1;









"use client"

import React, { useState, useEffect } from 'react';
import { Settings2, MousePointer2, Plus, Trash2, X } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';


const Contact1Dynamic = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    // --- Core Logic ---
    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
            ),
        }));
    };

    // --- List Management (Add/Delete for text-content-section) ---
    const handleAddSection = (id) => {
        const comp = getComp(id);
        const newSection = { heading: "New Heading", content: "New content details here..." };
        handleUpdate(id, "sections", [...comp.props.sections, newSection]);
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

    // --- Editable Wrapper ---
    const Editable = ({ id, field, index = null, className, tag: Tag = "div", style = {} }) => {
        const val = index !== null ? getComp(id).props.sections[index][field] : getComp(id).props[field];
        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
                style={style}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => index !== null
                    ? handleSectionTextUpdate(id, index, field, e.target.innerText)
                    : handleUpdate(id, field, e.target.innerText)}
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
            >
                {val}
            </Tag>
        );
    };

    const activeComp = selectedId ? getComp(selectedId) : null;
    const headingSection = getComp("main-heading-contact");
    const formSection = getComp("contact-form-section");
    const contentSection = getComp("text-content-section");
    const mapSection = getComp("google-map-section");

    const renderCanvasContent = (isModel) => (
        <div className={`bg-white min-h-screen  py-6   font-sans ${viewMode === "desktop" ? "px-16" : " "}`}>

            {/* 1. Header Section */}
            <div className="text-center mb-12 mx-auto" style={{ width: "50%", margin: "0 auto 40px" }}>
                <Editable
                    id="main-heading-contact" field="heading" tag="h1"
                    className="font-serif mb-4 cursor-pointer"
                    style={{ fontSize: `${headingSection.props.headingFontSize}px`, color: headingSection.props.headingColor }}
                />
                <Editable
                    id="main-heading-contact" field="content" tag="p"
                    className="leading-relaxed cursor-pointer"
                    style={{ fontSize: `${headingSection.props.contentFontSize}px`, color: headingSection.props.contentColor }}
                />
            </div>

            {/* 2. Main Grid */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start"
                style={{ boxShadow: "0 0 10px #0000001a", marginInline: "10%", flexDirection: viewMode === "desktop" ? "row" : "column" }}>

                {formSection && (
                    <div className="w-full " style={{ width: viewMode === "desktop" ? "70%" : "100%", display: "flex", flexDirection: "column", alignItems: "center", margin: "90px 0px", borderRight: viewMode === "desktop" ? "1px solid gray" : "none" }}>


                        <form className="space-y-5" style={{ width: viewMode === "desktop" ? "70%" : "90%", margin: "0 auto" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId("contact-form-section");
                            }}>
                            {formSection?.props?.fields?.map((field) => (
                                <div key={field.id} className="flex flex-col " style={{ marginBottom: "20px" }}>
                                    <label className="text-[10px]   text-gray-400 mb-1 tracking-widest uppercase text-[14px]" style={{ fontSize: "12px" }}>
                                        {field.label}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            className="border border-gray-200 p-3 h-32 outline-none focus:border-gray-400 transition-colors resize-none text-sm"
                                            placeholder={field.placeholder}
                                            style={{ padding: "7px 15px" }}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="border border-gray-200 p-3 outline-none focus:border-gray-400 transition-colors text-sm"
                                            placeholder={field.placeholder}
                                            style={{ padding: "7px 15px" }}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-[180px] py-3 text-[12px] font-bold tracking-[0.2em] transition-all hover:brightness-95 uppercase"
                                    style={{
                                        backgroundColor: formSection.props.buttonColor,
                                        color: formSection.props.buttonTextColor,
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        padding: "8px 15px"
                                    }}
                                >
                                    {formSection.props.buttonText}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Info & Map Section */}
                <div className="w-full p-10 space-y-12" style={{ marginTop: "90px", padding: "0px 30px" }} >
                    <div className="space-y-8" onClick={(e) => { e.stopPropagation(); setSelectedId(contentSection.id); }}>
                        {contentSection.props.sections?.map((section, idx) => (
                            <div key={idx} className="relative group" style={{ marginBottom: "18px" }}>
                                <Editable
                                    id={contentSection.id} index={idx} field="heading" tag="h3"
                                    className="font-bold mb-2"
                                    style={{ fontSize: `${contentSection.props.headingFontSize}px`, color: contentSection.props.headingColor, marginBottom: "0px" }}
                                />
                                <Editable
                                    id={contentSection.id} index={idx} field="content" tag="p"
                                    className="whitespace-pre-line leading-relaxed"
                                    style={{ fontSize: `${contentSection.props.fontSize}px`, color: contentSection.props.contentColor }}
                                />

                                {!isModel && (
                                    <button
                                        onClick={() => handleDeleteSection(contentSection.id, idx)}
                                        className="absolute -top-2 -right-2 cursor-pointer opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded-full transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>

                                )}

                            </div>
                        ))}

                    </div>

                    {/* Map Section */}
                    <div
                        className="w-full grayscale-[0.5] hover:grayscale-0 transition-all cursor-pointer relative"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId("google-map-section"); // Ensure this matches the Sidebar ID exactly
                        }}
                    >
                        {/* Overlay to capture clicks because iframes often eat click events */}
                        <div className="absolute inset-0 z-10"></div>

                        <iframe
                            title="map"
                            src={mapSection.props.mapUrl || "about:blank"}
                            className="w-full bg-gray-100"
                            height={mapSection.props.height || "300px"}
                            style={{ border: 0, borderRadius: `${mapSection.props.borderRadius || 0}px` }}
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "100%" }}>

            <button
                onClick={() => setIsPreviewOpen(true)}
                style={{ fontSize: "13px", backgroundColor: "#615fff" }}
                className="fixed top-3 right-80 z-50  cursor-pointer    text-white px-6 py-2  shadow-2xl  rounded-lg transition-all flex items-center gap-2 font-bold"
            >
                <MousePointer2 size={13} /> Preview
            </button>
            <div className="flex-1  " onClick={() => setSelectedId(null)}>
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

            {/* SIDEBAR SETTINGS */}

            <div
                className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col "
                style={{ width: "16%", right: "0px", scrollbarWidth: "0px" }}
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
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-3 py-2">
                                    Editing: {selectedId}
                                </span>
                            </div>

                            {/* Standard Content Group */}
                            {(selectedId === "main-heading-contact" || selectedId === "text-content-section") && (
                                <div className="space-y-6">

                                    {/* Heading Style Card */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Heading Style</label>
                                        <div className="space-y-4">
                                            {/* Heading Font Size */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Font Size</span>
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
                                            {/* Heading Color */}
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Heading Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Modern Small Label */}


                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* Clean Color Swatch */}
                                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.headingColor || "#000000"}
                                                                onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Input */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#000000"
                                                            value={activeComp.props.headingColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700 placeholder:text-gray-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Style Card */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Content Style</label>
                                        <div className="space-y-4">
                                            {/* Content Font Size */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Body Font Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{(activeComp.props.contentFontSize || activeComp.props.fontSize)}px</span>
                                                </div>
                                                <input
                                                    type="range" min="10" max="30"
                                                    value={activeComp.props.contentFontSize || activeComp.props.fontSize || 16}
                                                    onChange={(e) => handleUpdate(selectedId, selectedId === "text-content-section" ? "fontSize" : "contentFontSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }}
                                                />
                                            </div>
                                            {/* Content Color */}
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Body Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Professional Small Label */}


                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* Modern Color Swatch */}
                                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.contentColor || "#4B5563"}
                                                                onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Text Input */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#4B5563"
                                                            value={activeComp.props.contentColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700 placeholder:text-gray-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions for Text Section */}
                                    {selectedId === "text-content-section" && (
                                        <button onClick={() => handleAddSection(selectedId)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                            <Plus size={14} /> Add Section
                                        </button>
                                    )}
                                </div>
                            )}

                            {selectedId === "contact-form-section" && (
                                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                                    {/* Header with Add Button */}
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Form Fields
                                        </span>
                                        <button
                                            onClick={() => {
                                                const newField = {
                                                    id: `field-${Date.now()}`,
                                                    type: "text",
                                                    label: "New Label",
                                                    placeholder: "Enter value...",
                                                };
                                                handleUpdate("contact-form-section", "fields", [...(formSection.props.fields || []), newField]);
                                            }}
                                            className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-100 transition-colors"
                                        >
                                            + ADD FIELD
                                        </button>
                                    </div>

                                    {/* Dynamic Fields List */}
                                    <div className="space-y-4 mt-4">
                                        {formSection.props.fields?.map((field, index) => (
                                            <div key={field.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
                                                {/* Delete Field Button */}
                                                <button
                                                    onClick={() => {
                                                        const filtered = formSection.props.fields.filter((_, i) => i !== index);
                                                        handleUpdate("contact-form-section", "fields", filtered);
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-white text-red-500 shadow-sm border border-red-100 rounded-full p-1 hover:bg-red-50 transition-all z-1"
                                                >
                                                    <Trash2 size={12} />
                                                </button>

                                                {/* 1. INPUT TYPE SELECTOR */}
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Input Type</span>
                                                    <select
                                                        value={field.type}
                                                        onChange={(e) => {
                                                            const newFields = [...formSection.props.fields];
                                                            newFields[index].type = e.target.value;
                                                            handleUpdate("contact-form-section", "fields", newFields);
                                                        }}
                                                        className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-indigo-400"
                                                    >
                                                        <option value="text">Short Text</option>
                                                        <option value="email">Email Address</option>
                                                        <option value="tel">Phone Number</option>
                                                        <option value="textarea">Long Text (Area)</option>
                                                        <option value="number">Number</option>
                                                        <option value="date">Date Picker</option>
                                                    </select>
                                                </div>

                                                {/* 2. LABEL SETTING */}
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Field Label</span>
                                                    <input
                                                        type="text"
                                                        value={field.label}
                                                        onChange={(e) => {
                                                            const newFields = [...formSection.props.fields];
                                                            newFields[index].label = e.target.value;
                                                            handleUpdate("contact-form-section", "fields", newFields);
                                                        }}
                                                        className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none"
                                                    />
                                                </div>

                                                {/* 3. PLACEHOLDER SETTING */}
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Placeholder</span>
                                                    <input
                                                        type="text"
                                                        value={field.placeholder}
                                                        onChange={(e) => {
                                                            const newFields = [...formSection.props.fields];
                                                            newFields[index].placeholder = e.target.value;
                                                            handleUpdate("contact-form-section", "fields", newFields);
                                                        }}
                                                        className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Map Configuration Group */}
                            {selectedId === "google-map-section" && (
                                <div className="space-y-6">

                                    {/* Appearance Card */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Map Configuration</label>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Google Maps Embed URL</span>
                                                </div>
                                                <textarea
                                                    value={activeComp.props.mapUrl || ""}
                                                    onChange={(e) => handleUpdate(selectedId, "mapUrl", e.target.value)}
                                                    placeholder="Paste <iframe src='...'> URL here"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 h-24 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Layout Card */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Dimensions</label>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Map Height</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.height || '300px'}</span>
                                                </div>
                                                <div className="flex gap-3 items-center">
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
                                    </div>

                                </div>
                            )}

                        </div>
                    ) : (
                        /* Empty State */
                        <div className="h-full flex flex-col items-center justify-center text-center px-4">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
                            <p className="text-sm text-gray-400 max-w-[180px]">Click any element to start customizing.</p>
                        </div>
                    )}
                </div>
            </div>

        </div >
    );
};

export default Contact1Dynamic;

