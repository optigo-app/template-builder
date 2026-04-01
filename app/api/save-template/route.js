// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';

// export async function POST(request) {
//   try {
//     const data = await request.json();
//     const fileName = `${data.templateId || 'template'}.json`;
    
//     // Path: This saves to a 'data' folder in your project root
//     const dataDirectory = path.join(process.cwd(), 'data');
    
//     // Create 'data' folder if it doesn't exist
//     await fs.mkdir(dataDirectory, { recursive: true });

//     const filePath = path.join(dataDirectory, fileName);
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
//     return NextResponse.json({ message: 'Saved successfully!' }, { status: 200 });
//   } catch (error) {
//     console.error("Server Error:", error);
//     return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
//   }
// }











// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';

// // This handles the SAVE (Post)
// export async function POST(request) {
//   try {
//     const data = await request.json();
//     const dataDirectory = path.join(process.cwd(), 'data');
//     await fs.mkdir(dataDirectory, { recursive: true });
//     const filePath = path.join(dataDirectory, `${data.templateId}.json`);
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
//     return NextResponse.json({ message: 'Saved successfully!' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
//   }
// }

// // NEW: This handles the LOAD (Get)
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const tempId = searchParams.get('tempId');
  
//   try {
//     const filePath = path.join(process.cwd(), 'data', `${tempId}.json`);
//     const fileContent = await fs.readFile(filePath, 'utf8');
//     return NextResponse.json(JSON.parse(fileContent));
//   } catch (error) {
//     // If file doesn't exist, return 404 so the frontend knows to use defaults
//     return NextResponse.json({ error: 'Not found' }, { status: 404 });
//   }
// }











import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { templateId, category } = data;  

    // Check for missing data
    if (!templateId || !category) {
       return NextResponse.json({ error: 'Missing templateId or category' }, { status: 400 });
    }
     
    // Create the absolute path
    const dataDirectory = path.join(process.cwd(), 'data', category);
    
    // Ensure directory exists
    await fs.mkdir(dataDirectory, { recursive: true });
    
    const filePath = path.join(dataDirectory, `${templateId}.json`);
    
    // Write the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Saved successfully!' });
  } catch (error) {
    console.error("SERVER SIDE ERROR:", error); // This shows in your terminal/command prompt
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tempId = searchParams.get('tempId');
  const category = searchParams.get('category'); 
  
  try {
    const filePath = path.join(process.cwd(), 'data', category, `${tempId}.json`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}