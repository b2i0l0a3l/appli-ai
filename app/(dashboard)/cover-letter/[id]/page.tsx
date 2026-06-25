import { CoverLetterBuilder } from "@/features/cover-letter/components/cover-letter-builder";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;

    return <CoverLetterBuilder id={id}/> 
}