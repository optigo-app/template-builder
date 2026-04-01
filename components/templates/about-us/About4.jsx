// "use client"

// import React, { useState } from 'react';
// // Assuming Editable is your custom component for live editing
// // import Editable from './Editable'; 

// const About4 = ({ data, setSelectedId, selectedId }) => {
//   // 1. Get Main Heading Props
//   const mainHeading = data?.components?.find(c => c.id === "main-heading-about")?.props || {};

//   // 2. Get Tabs Section
//   const tabsSectionComp = data?.components?.find(c => c.id === "tabs-section-about") || {};
//   const tabsProps = tabsSectionComp.props || {};

//   // 3. Extract Common Image and Tabs
//   const commonImage = tabsProps["about-image"] || {};
//   const tabs = tabsProps.tabs || [];

//   // 4. State for Active Tab
//   const [activeTab, setActiveTab] = useState(tabs[0]?.["tab-head"] || 'ABOUT');

//   // 5. Find the content for the currently active tab
//   const activeTabObject = tabs.find(tab => tab["tab-head"] === activeTab) || {};
//   const activeTabData = activeTabObject["tab-content"] || {};

//   return (
//     <div 
//       className={`bg-white min-h-screen p-6 md:p-12 lg:p-20 font-sans cursor-pointer transition-all ${selectedId === tabsSectionComp.id ? 'ring-2 ring-blue-500' : ''}`}
//       onClick={() => setSelectedId(tabsSectionComp.id)}
//     >
//       <div className="max-w-7xl mx-auto">

//         {/* Page Title - Editable */}
//         <div className="text-center mb-12">
//            <h1 
//             className="font-bold tracking-widest uppercase inline-block"
//             style={{ 
//               fontSize: `${mainHeading.headingFontSize || 32}px`, 
//               color: mainHeading.headingColor || '#111' 
//             }}
//           >
//             {mainHeading.heading}
//           </h1>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-12 items-start">

//           {/* LEFT SIDE: Tabs & Content */}
//           <div className="w-full lg:w-1/2">

//             {/* Tab Navigation */}
//             <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setActiveTab(tab["tab-head"]);
//                   }}
//                   className={`py-2 px-4 md:px-8 text-xs font-bold tracking-widest whitespace-nowrap transition-all duration-300 border-b-2`}
//                   style={{
//                     borderColor: activeTab === tab["tab-head"] ? (tabsProps.activeTabColor || '#111') : 'transparent',
//                     color: activeTab === tab["tab-head"] ? (tabsProps.activeTabColor || '#111') : '#9ca3af',
//                     fontSize: `${tabsProps.tabFontSize || 12}px`
//                   }}
//                 >
//                   {tab["tab-head"]}
//                 </button>
//               ))}
//             </div>

//             {/* Dynamic Text Content Area */}
//             <div className="min-h-[300px] animate-fadeIn" key={activeTab}>
//               <h2 
//                 className="font-bold mb-4"
//                 style={{ 
//                   fontSize: `${activeTabData.headingFontSize || 18}px`,
//                   color: tabsProps.contentHeadingColor || "#111" 
//                 }}
//               >
//                 {activeTabData.heading}
//               </h2>
//               <p 
//                 className="leading-relaxed whitespace-pre-line text-justify"
//                 style={{ 
//                   fontSize: `${activeTabData.fontSize || 14}px`, 
//                   color: activeTabData.color || "#4b5563" 
//                 }}
//               >
//                 {activeTabData.content}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT SIDE: Common Image */}
//           <div className="w-full lg:w-1/2">
//             <div 
//               className="overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01]"
//               style={{ borderRadius: `${commonImage.borderRadius || 12}px` }}
//             >
//               <img
//                 src={commonImage.src}
//                 alt={commonImage.alt}
//                 className="w-full h-auto object-cover aspect-[4/3]"
//               />
//             </div>
//           </div>

//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default About4;











"use client"

import React, { useState, useEffect } from 'react';
import { Settings2, Plus, Trash2, Image as ImageIcon, Type, MousePointer2, X } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
 import templatesData from '@/data/templates.json';

const About4 = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || { components: [] });
  const [selectedId, setSelectedId] = useState(null);
  const [activeTabId, setActiveTabId] = useState(initialData?.components?.find(c => c.type === 'tabs-section')?.props.tabs[0]?.id || null);
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

  // --- Tab Management Logic ---
  const handleAddTab = () => {
    const tabsComp = data.components.find(c => c.type === 'tabs-section');
    const newTabId = `tab-${Date.now()}`;
    const newTab = {
      id: newTabId,
      "tab-head": "NEW TAB",
      "tab-content": {
        "heading": "New Heading",
        "content": "Enter your description here...",
        "fontSize": 14,
        "headingFontSize": 18,
        "color": "#4b5563"
      }
    };

    const updatedTabs = [...tabsComp.props.tabs, newTab];
    handleUpdate(tabsComp.id, "tabs", updatedTabs);

    // Update state with ID
    setActiveTabId(newTabId);
    setSelectedId(tabsComp.id);
  };
  const handleDeleteTab = (tabId, e) => {
    e.stopPropagation();
    const tabsComp = data.components.find(c => c.type === 'tabs-section');
    if (tabsComp.props.tabs.length <= 1) return alert("You must have at least one tab.");

    const updatedTabs = tabsComp.props.tabs.filter(t => t.id !== tabId);
    handleUpdate(tabsComp.id, "tabs", updatedTabs);

    // Set active to the first remaining tab's ID
    setActiveTabId(updatedTabs[0].id);
  };

  const handleTabUpdate = (tabId, field, value) => {
    const tabsComp = data.components.find(c => c.type === 'tabs-section');
    const updatedTabs = tabsComp.props.tabs.map(tab =>
      tab.id === tabId
        ? { ...tab, [field === 'tab-head' ? 'tab-head' : 'tab-content']: field === 'tab-head' ? value : { ...tab["tab-content"], [field]: value } }
        : tab
    );
    handleUpdate(tabsComp.id, "tabs", updatedTabs);
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


  const activeComp = selectedId ? getComp(selectedId) : null;
  const tabsSection = data?.components?.find(c => c.type === 'tabs-section') || { props: { tabs: [] } };
  // Find tab by ID instead of Name
  const activeTab = tabsSection.props.tabs.find(t => t.id === activeTabId) || tabsSection.props.tabs[0];
  // --- Editable Component ---
  const Editable = ({ id, field, isTab = false, tabId = null, className, tag: Tag = "div", style = {} }) => {
    return (
      <Tag
        className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
        style={style}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => isTab ? handleTabUpdate(tabId, field, e.target.innerText) : handleUpdate(id, field, e.target.innerText)}
        onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
      >
        {isTab ? (field === 'tab-head' ? activeTab?.["tab-head"] : activeTab?.["tab-content"][field]) : getComp(id).props[field]}
      </Tag>
    );
  };

  const renderCanvasContent =( forModel)=>(
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 overflow-y-auto">

    {data?.components?.filter(c => c.type === 'heading').map(header => (
      <div key={header.id} className="py-12 text-center px-4 group relative cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedId(header.id); }}>
        <Editable id={header.id} field="heading" tag="h1" className="tracking-widest uppercase font-bold"
          style={{ color: header.props.headingColor, fontSize: `${header.props.headingFontSize}px` }}
        />
      </div>
    ))}

    <div className="max-w-7xl mx-auto px-8">
      <div className="flex flex-col lg:flex-row gap-12 items-start"
        style={{ flexDirection: viewMode === 'desktop' ? 'row' : 'column' }}>

        <div style={{ width: viewMode === 'desktop' ? '50%' : '100%' }}>
          {/* Tab Heads Navigation */}
          <div className="flex items-center border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar group/tabs">
            {tabsSection.props.tabs.map((tab) => (
              <div key={tab.id} className="relative group/tab">
                <button
                  onClick={() => {
                    setActiveTabId(tab.id); // Use ID here
                    setSelectedId(tabsSection.id);
                  }}
                  className={`py-2 px-6 text-xs font-bold tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTabId === tab.id ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-400'
                    }`}
                >
                  {tab["tab-head"]}
                </button>
                {forModel === 0 && ( 
                  <button
                  onClick={(e) => handleDeleteTab(tab.id, e)}
                  className="absolute top-2 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/tab:opacity-100 transition-opacity cursor-pointer"
                >

                  <X size={10} />

                </button>

                 )}
                
              </div>
            ))}
            {/* ADD NEW TAB BUTTON */}
            {forModel === 0 && (
               <button
               onClick={(e) => { e.stopPropagation(); handleAddTab(); }}
               className="ml-4 p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors cursor-pointer"
               title="Add New Tab"
             >
               <Plus size={18} />
             </button>
            )}
           
          </div>

          <div className="min-h-[300px]" onClick={(e) => { e.stopPropagation(); setSelectedId(tabsSection.id); }}>
            <Editable
              id={tabsSection?.id}
              tabId={activeTab?.id}
              isTab field="heading"
              tag="h2"
              className="font-bold mb-4"
              style={{
                fontSize: `${activeTab?.["tab-content"].headingFontSize}px`,
                color: tabsSection.props.contentHeadingColor || '#111' // Uses the new global heading color
              }}
            />
            <Editable
              id={tabsSection?.id}
              tabId={activeTab?.id}
              isTab field="content"
              tag="p"
              className="leading-relaxed text-justify whitespace-pre-line"
              style={{
                fontSize: `${activeTab?.["tab-content"].fontSize}px`,
                color: activeTab?.["tab-content"].color || '#4b5563' // Uses the specific tab text color
              }}
            />
          </div>
        </div>

        <div style={{ width: viewMode === 'desktop' ? '50%' : '100%' }} className="flex justify-center">
          <img
            src={tabsSection.props["about-image"]?.src}
            onClick={(e) => { e.stopPropagation(); setSelectedId("common-image-trigger"); }}
            className={`shadow-2xl transition-all cursor-pointer w-full object-cover aspect-[4/3] ${selectedId === "common-image-trigger" ? 'ring-4 ring-indigo-500' : ''}`}
            style={{ borderRadius: `${tabsSection.props["about-image"]?.borderRadius || 0}px` }}
          />
        </div>
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

      {/* SETTINGS SIDEBAR */}
      {/* SETTINGS SIDEBAR */}
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
          {selectedId ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">

              {/* Active Badge */}
              <div className="flex items-center space-x-2 bg-indigo-50 p-2 rounded-xl justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50  m-0">
                  Editing: {selectedId === "common-image-trigger" ? "Common Image" : activeComp?.type || "Tab Content"}
                </span>

                {/* DELETE TAB BUTTON */}
                <button
                  onClick={(e) => handleDeleteTab(activeTab.id, e)}
                  className=" flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Tab Label Editing (Only if a tab is selected) */}
              {selectedId === tabsSection.id && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Navigation</label>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Tab Label</span>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
                      value={activeTab?.["tab-head"] || ""}
                      onChange={(e) => {
                        handleTabUpdate(activeTab.id, "tab-head", e.target.value);

                      }}
                    />
                  </div>
                </div>
              )}

              {/* Typography Group */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Typography & Color</label>
                <div className="space-y-6">

                  {/* Heading Section */}
                  {(activeComp?.type === 'heading' || selectedId === tabsSection.id) && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Heading Style</span>
                        <span className="text-xs font-bold text-indigo-600">
                          {activeComp?.type === 'heading' ? activeComp.props.headingFontSize : activeTab?.["tab-content"].headingFontSize}px
                        </span>
                      </div>

                      {/* Font Size Slider */}
                      <input
                        type="range" min="12" max="80"
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: "#615fff" }}
                        value={activeComp?.type === 'heading' ? activeComp.props.headingFontSize : activeTab?.["tab-content"].headingFontSize}
                        onChange={(e) => activeComp?.type === 'heading'
                          ? handleUpdate(activeComp.id, "headingFontSize", parseInt(e.target.value))
                          : handleTabUpdate(activeTab.id, "headingFontSize", parseInt(e.target.value))
                        }
                      />

                      {/* Heading Color Picker */}
                      <div className="flex flex-col gap-1.5 w-full">
                        {/* Sub-label for clarity */}
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight ml-1">Heading Color</span>

                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all">
                          {/* Color Picker Square */}
                          <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200">
                            <input
                              type="color"
                              className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                              style={{ border: 'none', appearance: 'none' }}
                              value={activeComp?.type === 'heading' ? (activeComp.props.headingColor || "#111111") : (tabsSection.props.contentHeadingColor || "#111111")}
                              onChange={(e) => activeComp?.type === 'heading'
                                ? handleUpdate(activeComp.id, "headingColor", e.target.value)
                                : handleUpdate(tabsSection.id, "contentHeadingColor", e.target.value)
                              }
                            />
                          </div>

                          {/* Hex Text Input */}
                          <input
                            type="text"
                            maxLength={7}
                            placeholder="#000000"
                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                            value={activeComp?.type === 'heading' ? (activeComp.props.headingColor || "") : (tabsSection.props.contentHeadingColor || "")}
                            onChange={(e) => activeComp?.type === 'heading'
                              ? handleUpdate(activeComp.id, "headingColor", e.target.value)
                              : handleUpdate(tabsSection.id, "contentHeadingColor", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Body Content Section (Only for Tabs) */}
                  {selectedId === tabsSection.id && (
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Content Style</span>
                        <span className="text-xs font-bold text-indigo-600">{activeTab?.["tab-content"].fontSize}px</span>
                      </div>

                      {/* Content Font Size */}
                      <input
                        type="range" min="10" max="24"
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: "#615fff" }}
                        value={activeTab?.["tab-content"].fontSize}
                        onChange={(e) => handleTabUpdate(activeTab.id, "fontSize", parseInt(e.target.value))}
                      />

                      {/* Content Color Picker */}
                      <div className="flex flex-col gap-1.5 w-full">
                        {/* Professional Small Label */}
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Content Color
                        </span>

                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                          {/* Premium Color Swatch */}
                          <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                            <input
                              type="color"
                              value={activeTab?.["tab-content"].color || "#4b5563"}
                              onChange={(e) => handleTabUpdate(activeTab?.id, "color", e.target.value)}
                              className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                              style={{ border: 'none', appearance: 'none' }}
                            />
                          </div>

                          {/* Hex Code Text Input */}
                          <input
                            type="text"
                            maxLength={7}
                            placeholder="#4B5563"
                            value={activeTab?.["tab-content"].color || ""}
                            onChange={(e) => handleTabUpdate(activeTab?.id, "color", e.target.value)}
                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700 placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Media Settings Group */}
              {selectedId === "common-image-trigger" && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Media Settings</label>
                  <div className="space-y-6">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Image URL</span>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500"
                        value={tabsSection.props["about-image"].src}
                        onChange={(e) => {
                          const updatedImg = { ...tabsSection.props["about-image"], src: e.target.value };
                          handleUpdate(tabsSection.id, "about-image", updatedImg);
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Border Radius</span>
                        <span className="text-xs font-bold text-indigo-600">{tabsSection.props["about-image"].borderRadius}px</span>
                      </div>
                      <input
                        type="range" min="0" max="100"
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: "#615fff" }}
                        value={tabsSection.props["about-image"].borderRadius}
                        onChange={(e) => {
                          const updatedImg = { ...tabsSection.props["about-image"], borderRadius: parseInt(e.target.value) };
                          handleUpdate(tabsSection.id, "about-image", updatedImg);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">

              <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
              <p className="text-sm text-gray-400 max-w-[180px]">Click any text or image to start customizing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About4;