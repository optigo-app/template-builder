"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
// import TemplateCard from "../templates/TemplateCard"
import templatesData from "@/data/templates.json"
import About1 from "@/components/templates/About1"
import About2 from "@/components/templates/About2"
import About3 from "@/components/templates/About3"
import About4 from "@/components/templates/About4"
import img from "@/public/img/about1.png"
import Link from 'next/link';


export default function BuilderLayout() {
    const [selected, setSelected] = useState("about-us")

    const category = templatesData.find(
        (c) => c.category === selected
    )

    return (
        <div className="flex">

            <Sidebar
                categories={templatesData}
                selected={selected}
                onSelect={setSelected}
            />

            <div className="  p-6  " style={{ display: "flex", flexWrap: "wrap", gap: "10px", backgroundColor: "#fbf9fa",width:"100%" }}>

                {category?.templates.map((template,i) => (
                    <div  key={i}>

                        <Link
                            href={`/Edit/${template.templateId}`}
                           
                            className="block group"
                        >
                            <div
                                style={{ height: "270px" }}
                                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 w-full max-w-[280px] cursor-pointer flex flex-col"
                            >
                                {/* Image Container with Hover Overlay */}
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                                    <img
                                        src={`/img/${template.preview}`}
                                        alt={template.templateId}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Hover Overlay Button effect */}
                                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            Use Template
                                        </span>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="mt-4 flex-1 flex flex-col justify-between">
                                    <div>

                                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {template.templateId}
                                        </h3>
                                    </div>

                                    <div className="mt-auto flex items-center text-xs text-gray-400 font-medium">
                                        Click to customize →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    )
}