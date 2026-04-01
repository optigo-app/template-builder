// import React from 'react';

// const About2 = ({ data }) => {
//   // Helper to find component data by ID
//   const getComp = (id) =>
//     data?.components?.find((item) => item.id === id)?.props || {};

//   const mainHeading = getComp("main-heading");
//   const subHeading1 = getComp("sub-heading-1");
//   const introText = getComp("intro-text");
//   const advantageHeading = getComp("advantage-heading");
//   const advantageText = getComp("advantage-text");
//   const visionHeading = getComp("vision-heading");
//   const visionText = getComp("vision-text");
//   const promiseHeading = getComp("promise-heading");
//   const promiseList = getComp("promise-list");

//   return (
//     <div className="bg-white min-h-screen font-sans text-gray-800 py-12 px-6 md:px-16 lg:px-32">
//       <div className="max-w-5xl mx-auto">

//         {/* Main Heading */}
//         <h1 
//           className="font-bold text-center mb-12"
//           style={{ 
//             fontSize: `${mainHeading.fontSize}px`, 
//             color: mainHeading.color,
//             textAlign: mainHeading.textAlign 
//           }}
//         >
//           {mainHeading.content}
//         </h1>

//         {/* Experience Section */}
//         <section className="mb-8">
//           <h2 
//             className="font-bold mb-4"
//             style={{ 
//               fontSize: `${subHeading1.fontSize}px`, 
//               color: subHeading1.color 
//             }}
//           >
//             {subHeading1.content}
//           </h2>
//           <div 
//             className="space-y-4 leading-relaxed ml-2 md:ml-4"
//             style={{ 
//               fontSize: `${introText.fontSize}px`, 
//               color: introText.color,
//               lineHeight: introText.lineHeight,
//               textAlign: introText.textAlign
//             }}
//           >
//             <p>{introText.content}</p>
//           </div>
//         </section>

//         {/* Advantage Section */}
//         <section className="mb-8">
//           <h3 
//             className="font-bold underline mb-4 decoration-2 underline-offset-4"
//             style={{ 
//               fontSize: `${advantageHeading.fontSize}px`, 
//               color: advantageHeading.color 
//             }}
//           >
//             {advantageHeading.content}
//           </h3>
//           <div 
//             className="space-y-4 leading-relaxed ml-2 md:ml-4"
//             style={{ 
//               fontSize: `${advantageText.fontSize}px`, 
//               color: advantageText.color,
//               lineHeight: advantageText.lineHeight 
//             }}
//           >
//             <p>{advantageText.content}</p>
//           </div>
//         </section>

//         {/* Brand Vision Section */}
//         <section className="mb-8">
//           <h3 
//             className="font-bold underline mb-4 decoration-2 underline-offset-4"
//             style={{ 
//               fontSize: `${visionHeading.fontSize}px`, 
//               color: visionHeading.color 
//             }}
//           >
//             {visionHeading.content}
//           </h3>
//           <div 
//             className="leading-relaxed ml-2 md:ml-4"
//             style={{ 
//               fontSize: `${visionText.fontSize}px`, 
//               color: visionText.color,
//               lineHeight: visionText.lineHeight 
//             }}
//           >
//             <p>{visionText.content}</p>
//           </div>
//         </section>

//         {/* Our Promise Section */}
//         <section className="mb-12">
//           <h3 
//             className="font-bold underline mb-4 decoration-2 underline-offset-4"
//             style={{ 
//               fontSize: `${promiseHeading.fontSize}px`, 
//               color: promiseHeading.color 
//             }}
//           >
//             {promiseHeading.content}
//           </h3>
//           <ul 
//             className="list-disc pl-6 md:pl-10 space-y-3"
//             style={{ 
//               fontSize: `${promiseList.fontSize}px`, 
//               color: promiseList.color,
//               lineHeight: promiseList.lineHeight 
//             }}
//           >
//             {promiseList.items?.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default About2;









import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import { MousePointer2 } from "lucide-react";
import { X } from "lucide-react";
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';

import { Image as ImageIcon, Type, Settings2, Layout, Sliders, Trash, Maximize } from 'lucide-react';

const About2 = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

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

  const Editable = ({ id, className, tag: Tag = "div", style = {} }) => {
    const comp = getComp(id);
    const isSelected = selectedId === id;

    return (
      <Tag
        className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
        style={{ ...comp.props, ...style }}
        contentEditable
        suppressContentEditableWarning={true}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
        onBlur={(e) => handleUpdate(id, "content", e.target.innerText)}
      >
        {comp.props.content}
      </Tag>
    );
  };

  const renderCanvasContent = ()=>(
    <div className="bg-white shadow-2xl p-6 md:p-7 font-sans text-gray-800 transition-all duration-500">
          <div className="  mx-auto">

            {/* Main Heading */}
            <Editable
              id="main-heading"
              tag="h1"
              className="font-bold text-center mb-12 leading-tight"
            />

            {/* Experience Section */}
            <section className="mb-8">
              <Editable id="sub-heading-1" tag="h2" className="font-bold mb-4" />
              <div className="ml-2 md:ml-4">
                <Editable id="intro-text" tag="p" className="leading-relaxed" />
              </div>
            </section>

            {/* Advantage Section */}
            <section className="mb-8">
              <Editable id="advantage-heading" tag="h3" className="font-bold underline mb-4 decoration-2 underline-offset-4" />
              <div className="ml-2 md:ml-4">
                <Editable id="advantage-text" tag="p" className="leading-relaxed" />
              </div>
            </section>

            {/* Vision Section */}
            <section className="mb-8">
              <Editable id="vision-heading" tag="h3" className="font-bold underline mb-4 decoration-2 underline-offset-4" />
              <div className="ml-2 md:ml-4">
                <Editable id="vision-text" tag="p" className="leading-relaxed" />
              </div>
            </section>

            {/* Promise Section */}
            <section className="mb-12">
              <Editable id="promise-heading" tag="h3" className="font-bold underline mb-4 decoration-2 underline-offset-4" />
              <ul
                className={`list-disc pl-6 md:pl-10 space-y-3 cursor-pointer rounded transition-all ${selectedId === 'promise-list' ? 'ring-2 ring-indigo-500 bg-indigo-50/30' : 'hover:bg-gray-50'}`}
                style={{ color: getComp("promise-list").props.color, fontSize: getComp("promise-list").props.fontSize }}
                onClick={(e) => { e.stopPropagation(); setSelectedId("promise-list"); }}
              >
                {getComp("promise-list").props.items?.map((item, index) => (
                  <li
                    key={index}
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none"
                    onBlur={(e) => {
                      const newItems = [...getComp("promise-list").props.items];
                      newItems[index] = e.target.innerText;
                      handleUpdate("promise-list", "items", newItems);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
  )

  const activeComp = selectedId ? getComp(selectedId) : null;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "81.5%" }} onClick={() => setSelectedId(null)}>
 <button
         onClick={() => setIsPreviewOpen(true)}
         style={{fontSize:"13px",backgroundColor: "#615fff"}}
         className="fixed top-3 right-80 z-50  cursor-pointer    text-white px-6 py-2  shadow-2xl  rounded-lg transition-all flex items-center gap-2 font-bold"
       >
         <MousePointer2 size={13} /> Preview 
       </button>
      {/* LEFT: MAIN EDITOR CANVAS */}
      <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
        {renderCanvasContent()}
      </DeviceMockup>

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
                    {renderCanvasContent()}
                  </div>
                </div>
              </div>
            )}

      {/* RIGHT: SETTINGS SIDEBAR */}
      <div
        className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
        style={{ width: "16%", right: "0px" }}
        onClick={(e) => e.stopPropagation()}
      >
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
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              <div className="flex items-center space-x-2 bg-indigo-50 p-1 rounded-xl" style={{ marginBottom: "10px" }}>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-2 ">
                  Editing: {selectedId}
                </span>
              </div>

              <div className="space-y-6">
                {/* Appearance Group */}
                {activeComp.props.color !== undefined && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Appearance</label>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Text Color</span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                          {/* Modern Small Label for Consistency */}
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Element Color
                          </span>

                          <div className="grid grid-cols-[40px_1fr] items-stretch bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
                            {/* Left Side: Color Picker Area - Fixed Square */}
                            <div className="relative w-full h-9 border-r border-gray-200 group overflow-hidden">
                              <input
                                type="color"
                                value={activeComp.props.color || "#000000"}
                                onChange={(e) => handleUpdate(selectedId, "color", e.target.value)}
                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                style={{ background: 'none', border: 'none', appearance: 'none' }}
                              />
                            </div>

                            {/* Right Side: Text Input - Fills exactly the rest of the space */}
                            <input
                              type="text"
                              maxLength={7}
                              value={activeComp.props.color || ""}
                              onChange={(e) => handleUpdate(selectedId, "color", e.target.value)}
                              placeholder="#000000"
                              className="w-full bg-transparent px-3 py-1.5 text-[11px] font-mono outline-none uppercase text-gray-700 placeholder:text-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Typography Group */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Typography</label>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Font Size (px)</span>
                        <span className="text-xs font-bold text-indigo-600">{activeComp.props.fontSize || '16'}px</span>
                      </div>
                      <input
                        type="range" min="12" max="80"
                        value={parseInt(activeComp.props.fontSize) || 16}
                        onChange={(e) => handleUpdate(selectedId, "fontSize", `${e.target.value}px`)}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: "#615fff" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Promise List Specific Editor */}
                {selectedId === "promise-list" && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">List Items</label>
                      <button
                        onClick={() => {
                          const newItems = [...(activeComp.props.items || []), "New promise item"];
                          handleUpdate("promise-list", "items", newItems);
                        }}
                        style={{ backgroundColor: "#57915a", padding: "2px 6px", fontSize: "12px", cursor: "pointer" }}
                        className="text-[10px] bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                      >
                        <Plus className=' ' size={12} /> Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {activeComp.props.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                          <span className="text-xs font-medium text-gray-600 truncate max-w-[150px]">{item}</span>
                          <button
                            onClick={() => {
                              const newItems = activeComp.props.items.filter((_, i) => i !== idx);
                              handleUpdate("promise-list", "items", newItems);
                            }}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} color='#bd2222' />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
              <p className="text-sm text-gray-400 max-w-[180px]">Click any text or list to start customizing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About2;

 

 