// "use client";

// import React from 'react';

// const About5 = ({ data, setSelectedId, selectedId }) => {
//   // 1. Extract Main History Section
//   const historySection = data?.components?.find(c => c.id === "section-main-history") || {};
//   const historyProps = historySection.props || {};

//   // 2. Extract Vision and Mission Cards
//   const visionCard = data?.components?.find(c => c.id === "section-vision") || {};
//   const missionCard = data?.components?.find(c => c.id === "section-mission") || {};

//   return (
//     <div className="bg-[#f4f4f4] min-h-screen font-sans">

//       {/* Top Section: Main History */}
//       <div 
//         className={`bg-white py-16 px-6 md:px-12 lg:px-24 transition-all cursor-pointer ${selectedId === historySection.id ? 'ring-4 ring-blue-500 ring-inset' : ''}`}
//         onClick={() => setSelectedId(historySection.id)}
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Icon and Title */}
//           <div className="flex flex-col items-center text-center mb-10">

//             <h1 
//               className="font-light tracking-[0.2em] uppercase leading-tight max-w-3xl"
//               style={{ 
//                 fontSize: `${historyProps.headingFontSize || 28}px`, 
//                 color: historyProps.headingColor || '#111' 
//               }}
//             >
//               {historyProps.heading}
//             </h1>
//           </div>

//           {/* Two-Column Text Content */}
//           <div 
//             className="md:columns-2 gap-12 text-justify leading-relaxed"
//             style={{ 
//               fontSize: `${historyProps.fontSize || 14}px`, 
//               color: historyProps.color || '#4b5563' 
//             }}
//           >
//             <p className="mb-4 whitespace-pre-line">
//               {historyProps.content}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section: Vision & Mission Grid */}
//       <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

//           {/* Vision Card */}
//           <div 
//             className={`flex flex-col transition-all cursor-pointer group ${selectedId === visionCard.id ? 'ring-4 ring-blue-500 p-2 rounded-lg' : ''}`}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedId(visionCard.id);
//             }}
//           >
//             <div className="overflow-hidden mb-6 aspect-video bg-gray-200">
//               <img 
//                 src={visionCard.props?.src} 
//                 alt="Vision" 
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 style={{ borderRadius: `${visionCard.props?.borderRadius || 0}px` }}
//               />
//             </div>
//             <h2 
//               className="uppercase font-bold tracking-widest mb-3"
//               style={{ 
//                 fontSize: `${visionCard.props?.headingFontSize || 20}px`,
//                 color: visionCard.props?.headingColor || '#111'
//               }}
//             >
//               {visionCard.props?.heading}
//             </h2>
//             <p 
//               className="leading-relaxed text-gray-600"
//               style={{ fontSize: `${visionCard.props?.fontSize || 14}px` }}
//             >
//               {visionCard.props?.content}
//             </p>
//           </div>

//           {/* Mission Card */}
//           <div 
//             className={`flex flex-col transition-all cursor-pointer group ${selectedId === missionCard.id ? 'ring-4 ring-blue-500 p-2 rounded-lg' : ''}`}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedId(missionCard.id);
//             }}
//           >
//             <div className="overflow-hidden mb-6 aspect-video bg-gray-200">
//               <img 
//                 src={missionCard.props?.src} 
//                 alt="Mission" 
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 style={{ borderRadius: `${missionCard.props?.borderRadius || 0}px` }}
//               />
//             </div>
//             <h2 
//               className="uppercase font-bold tracking-widest mb-3"
//               style={{ 
//                 fontSize: `${missionCard.props?.headingFontSize || 20}px`,
//                 color: missionCard.props?.headingColor || '#111'
//               }}
//             >
//               {missionCard.props?.heading}
//             </h2>
//             <p 
//               className="leading-relaxed text-gray-600"
//               style={{ fontSize: `${missionCard.props?.fontSize || 14}px` }}
//             >
//               {missionCard.props?.content}
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default About5;

"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Settings2, X, MousePointer2 } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';

const About5 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
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
        backdrop: 'transparent',
    });

    const handleSave = async () => {
        try {
            Toast.fire({ icon: 'info', title: 'Saving template...', timer: 0 });
            let folderName = "about-us";
            const payload = { ...data, category: folderName };

            const response = await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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

    const activeComp = selectedId ? getComp(selectedId) : null;

    const Editable = ({ id, field, className, tag: Tag = "div", style = {} }) => {
        const comp = getComp(id);
        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 transition-all`}
                style={style}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(id);
                }}
            >
                {comp.props[field]}
            </Tag>
        );
    };

    const renderCanvasContent = (isPreview = false) => (
        <div className={`bg-[#f4f4f4] min-h-screen font-sans ${isPreview ? 'pointer-events-none' : ''}`}>

            {/* Top Section: Main History */}
            {data?.components?.filter(c => c.id === 'section-main-history').map(history => (
                <div
                    key={history.id}
                    className={`bg-white py-16 px-6 md:px-12  ${viewMode =="mobile"?" ":"px-24 "} transition-all cursor-pointer ${selectedId === history.id ? 'ring-4 ring-blue-500 ring-inset' : ''}`}
                    onClick={() => setSelectedId(history.id)}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col items-center text-center mb-10">
                            {history.props.src && (
                                <img
                                    src={history.props.src}
                                    alt="icon"
                                    className="w-12 h-12 mb-4 object-contain opacity-70"
                                />
                            )}
                            <Editable
                                id={history.id}
                                field="heading"
                                tag="h1"
                                className="font-light tracking-[0.2em] uppercase leading-tight max-w-3xl"
                                style={{
                                    fontSize: `${history.props.headingFontSize || 28}px`,
                                    color: history.props.headingColor || '#111',
                                    wordBreak: 'break-all'
                                }}
                            />
                        </div>

                        <div
                            className={` ${viewMode =="mobile"?"grid-cols-1":"md:columns-2 gap-12 "}  text-justify leading-relaxed`}
                            style={{
                                fontSize: `${history.props.fontSize || 14}px`,
                                color: history.props.color || '#4b5563'
                            }}
                        >
                            <Editable
                                id={history.id}
                                field="content"
                                tag="p"
                                className="mb-4 whitespace-pre-line"
                                style={{ wordBreak: 'break-all' }}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Bottom Section: Vision & Mission Grid */}
            <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
                <div className={`grid ${viewMode =="mobile"?"grid-cols-1":"grid-cols-2 "}-cols gap-8 md:gap-12 w-full`}>
                    {/* Change: Filter by type so it's dynamic */}
                    {data?.components?.filter(c => c.type === 'card-section').map((card) => (
                        <div
                            key={card.id}
                            className={`flex flex-col transition-all cursor-pointer group relative ${selectedId === card.id ? 'ring-4 ring-blue-500 p-2 rounded-lg bg-white' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(card.id);
                            }}
                        >
                            <div className="overflow-hidden mb-6 aspect-video bg-gray-200 shadow-sm">
                                <img
                                    src={card.props?.src}
                                    alt={card.props?.heading}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ borderRadius: `${card.props?.borderRadius || 0}px` }}
                                />
                            </div>
                            <Editable
                                id={card.id}
                                field="heading"
                                tag="h2"
                                className="uppercase font-bold tracking-widest mb-3"
                                style={{
                                    fontSize: `${card.props?.headingFontSize || 20}px`,
                                    color: card.props?.headingColor || '#111'
                                }}
                            />
                            <Editable
                                id={card.id}
                                field="content"
                                tag="p"
                                className="leading-relaxed text-gray-600"
                                style={{ fontSize: `${card.props?.fontSize || 14}px`,color: card.props?.color || '#4b5563' }}
                            />
                        </div>
                    ))}
                </div>

                {/* Add Card Button */}
                {!isPreviewOpen && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const newId = `card-${Date.now()}`;
                            const newCard = {
                                id: newId,
                                type: "card-section",
                                props: {
                                    heading: "NEW VISION/MISSION",
                                    content: "Enter description here...",
                                    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070",
                                    fontSize: 14,
                                    headingFontSize: 20,
                                    borderRadius: 0
                                }
                            };
                            setData(prev => ({ ...prev, components: [...prev.components, newCard] }));
                            setSelectedId(newId);
                        }}
                        className="mt-10 mx-auto flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer"
                    >
                        <Plus size={20} /> Add New Card
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans w-full">
            {/* Preview Button */}
            <button
                onClick={() => setIsPreviewOpen(true)}
                className="fixed top-3 right-80 z-50 cursor-pointer text-white px-6 py-2 shadow-2xl rounded-lg transition-all flex items-center gap-2 font-bold bg-[#615fff]"
            >
                <MousePointer2 size={13} /> Preview
            </button>

            <div className="flex-1" onClick={() => setSelectedId(null)}>
                <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                    {renderCanvasContent(false)}
                </DeviceMockup>
            </div>

            {/* Full Screen Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto p-10">
                    <button
                        onClick={() => setIsPreviewOpen(false)}
                        className="absolute top-6 right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                    >
                        <X size={32} />
                    </button>
                    <div className="w-full mt-10 mb-20 bg-white rounded-xl shadow-2xl pointer-events-none">
                        {renderCanvasContent(true)}
                    </div>
                </div>
            )}

            {/* Settings Sidebar */}
            <div className="w-[16%] bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col">
                <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800"><Settings2 size={18} /> Settings</h2>
                        <button
                            onClick={handleSave}
                            className="text-white px-5 py-2 rounded-lg text-sm font-semibold bg-[#615fff] hover:bg-blue-600 transition-all shadow-md"
                        >
                            Publish
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                                    Editing Block: {activeComp.id.replace('section-', '')}
                                </span>
                            </div>

                            {/* Typography Controls */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-6">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Style Settings</label>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium">Heading Size</span>
                                        <span className="text-xs font-bold text-blue-600">{activeComp.props.headingFontSize}px</span>
                                    </div>
                                    <input
                                        type="range" min="14" max="80"
                                        value={activeComp.props.headingFontSize}
                                        onChange={(e) => handleUpdate(activeComp.id, "headingFontSize", parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                    />
                                </div>

                                <div>
                                    <span className="text-sm font-medium block mb-2">Heading Color</span>
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                        <input
                                            type="color"
                                            value={activeComp.props.headingColor || "#000000"}
                                            onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                            className="w-8 h-8 rounded-md cursor-pointer border-none"
                                        />
                                        <input
                                            type="text"
                                            value={activeComp.props.headingColor}
                                            onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                            className="bg-transparent border-none text-xs font-mono w-full outline-none uppercase"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium">Body Text Size</span>
                                        <span className="text-xs font-bold text-blue-600">{activeComp.props.fontSize}px</span>
                                    </div>
                                    <input
                                        type="range" min="10" max="24"
                                        value={activeComp.props.fontSize}
                                        onChange={(e) => handleUpdate(activeComp.id, "fontSize", parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                    />

                                </div>
                                <div>
                                    <span className="text-sm font-medium block mb-2">Body Color</span>
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                        <input
                                            type="color"
                                            value={activeComp.props.color || "#000000"}
                                            onChange={(e) => handleUpdate(selectedId, "color", e.target.value)}
                                            className="w-8 h-8 rounded-md cursor-pointer border-none"
                                        />
                                        <input
                                            type="text"
                                            value={activeComp.props.color}
                                            onChange={(e) => handleUpdate(selectedId, "color", e.target.value)}
                                            className="bg-transparent border-none text-xs font-mono w-full outline-none uppercase"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media Controls */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-6">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Media Settings</label>

                                    {/* ADDED: Delete Button for Cards */}
                                    {activeComp.type === 'card-section' && (
                                        <button
                                            onClick={() => {
                                                setData(prev => ({
                                                    ...prev,
                                                    components: prev.components.filter(c => c.id !== activeComp.id)
                                                }));
                                                setSelectedId(null);
                                            }}
                                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                            title="Delete Card"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <span className="text-sm font-medium block mb-2">Image URL</span>
                                    <input
                                        type="text"
                                        value={activeComp.props.src || ""}
                                        onChange={(e) => handleUpdate(activeComp.id, "src", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-blue-500"
                                        placeholder="https://..."
                                    />
                                </div>

                                {activeComp.id !== 'section-main-history' && (
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Image Roundedness</span>
                                            <span className="text-xs font-bold text-blue-600">{activeComp.props.borderRadius || 0}px</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100"
                                            value={activeComp.props.borderRadius || 0}
                                            onChange={(e) => handleUpdate(activeComp.id, "borderRadius", parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#615fff]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-40">
                            <Settings2 size={48} className="mb-4 text-gray-300" />
                            <h3 className="text-md font-bold text-gray-800">Selection Required</h3>
                            <p className="text-xs text-gray-400">Click on a heading or text block to adjust its settings.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About5;