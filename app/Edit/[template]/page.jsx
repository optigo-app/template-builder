import EditLayout from "@/components/layout/EditLayout"
 
export default async function EditTemplate({ params }) {

  const { template } = await params;   // ✅ unwrap params

  console.log("TCL: Edit ->", template);

  return <EditLayout tempId={template} />;
}