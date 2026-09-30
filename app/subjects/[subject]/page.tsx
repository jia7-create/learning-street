import SubjectClient from "@/components/SubjectClient";
export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) { const { subject } = await params; return <SubjectClient slug={subject} />; }
