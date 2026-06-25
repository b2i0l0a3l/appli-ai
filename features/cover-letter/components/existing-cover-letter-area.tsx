"use client";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  Loader2,
  CheckCircle,
  CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useCoverLetterStore } from "../store/coverLetter-store";
import { debounce } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  getCoverLetter,
  updateGeneratedLetter,
} from "@/app/actions/application.actions";

export default function ExistingCoverLetterArea({id}: {id: string}) {
  const setContent = useCoverLetterStore((state) => state.setContent);
  const setMatchScore = useCoverLetterStore((state) => state.setMatchScore);
  const setJobTitle = useCoverLetterStore((state) => state.setJobTitle);
  const setCompanyName = useCoverLetterStore((state) => state.setCompanyName);

  const [saveStatus, setSaveStatus] = React.useState<
    "idle" | "saving" | "saved"
  >("idle");
  const [isFetching, setIsFetching] = React.useState<boolean>(!!id);

  const debouncedSave = React.useMemo(
    () =>
      debounce(async (html: string) => {
        setContent(html);
        if (id) {
          setSaveStatus("saving");
          try {
            await updateGeneratedLetter(id, html);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
          } catch (error) {
            console.error("Autosave failed:", error);
            setSaveStatus("idle");
            toast.error("Failed to sync changes to database");
          }
        }
      }, 1000),
    [setContent, id],
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `<p>Loading default template...</p>`,
    editorProps: {
      attributes: {
        class:
          "max-w-2xl mx-auto outline-none text-foreground leading-relaxed min-h-[500px]",
      },
    },
    onUpdate: ({ editor }) => {
      setSaveStatus("saving");
      debouncedSave(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!id || !editor) return;

    const fetchLetter = async () => {
      try {
        setIsFetching(true);
        const data = await getCoverLetter(id);

        if (data.application) {
          setMatchScore(data.application.match_score);
          setJobTitle(data.application.job_title);
          setCompanyName(data.application.company_name);
        }

        if (data.letter?.content) {
          editor.commands.setContent(data.letter.content);
          setContent(data.letter.content);
        } else {
          const fallbackContent = `
            <p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">
               [Your Name]<br />
               [Your Phone Number]<br />
               [Your Email]
            </p>
            <p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">
               ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">
               Hiring Manager<br />
               Technical Talent Acquisition<br />
               ${data.application?.company_name || "[Company Name]"}
            </p>
            <p>Dear Hiring Manager,</p>
            <p>I am writing to express my enthusiastic interest in the ${data.application?.job_title || "[Job Position]"} position at ${data.application?.company_name || "[Company Name]"}...</p>
            <p>Sincerely,</p>
            <p>[Your Name]</p>
          `;
          editor.commands.setContent(fallbackContent);
          setContent(fallbackContent);
        }
      } catch {
        console.error("Failed to load cover letter:");
        toast.error("Could not fetch the cover letter from database.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchLetter();
  }, [id, editor, setContent]);

  useEffect(() => {
    if (!id && editor) {
      const defaultContent = `
        <p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">
          [Your Name]<br />
          [Your Phone Number]<br />
          [Your Email]
        </p>
        <p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">
          December 1, 2024
        </p>
        <p style="color: #71717a; font-weight: 500; font-size: 0.875rem;">
          Hiring Manager<br />
          Technical Talent Acquisition<br />
          NextGen Systems Corp
        </p>
        <p>Dear Hiring Manager,</p>
        <p>I am writing to express my enthusiastic interest in the Senior Software Engineer position at NextGen Systems Corp. With over eight years of experience in full-stack development and a proven track record of architecting scalable distributed systems, I am confident in my ability to contribute meaningfully to your engineering team.</p>
        <p>Sincerely,</p>
        <p>[Your Name]</p>
      `;
      editor.commands.setContent(defaultContent);
      setContent(defaultContent);
    }
  }, [id, editor, setContent]);

  useEffect(() => {
    if (!editor) return;

    const handleApplySuggestion = (e: Event) => {
      const { originalText, suggestionText } = (e as CustomEvent).detail;
      const currentHTML = editor.getHTML();
      
      if (currentHTML.includes(originalText)) {
        const updatedHTML = currentHTML.replace(originalText, suggestionText);
        editor.commands.setContent(updatedHTML);
        setContent(updatedHTML);
        
        if (id) {
          setSaveStatus("saving");
          updateGeneratedLetter(id, updatedHTML)
            .then(() => {
              setSaveStatus("saved");
              setTimeout(() => setSaveStatus("idle"), 2000);
            })
            .catch((err) => {
              console.error("Autosave failed after suggestion apply");
              setSaveStatus("idle");
              toast.error("Failed to sync applied suggestion to database");
            });
        }
        toast.success("Applied suggestion to cover letter!");
      } else {
        toast.error("Could not find the original text in the editor. It may have been edited.");
      }
    };

    document.addEventListener("apply-suggestion", handleApplySuggestion);
    return () => {
      document.removeEventListener("apply-suggestion", handleApplySuggestion);
    };
  }, [editor, id, setContent]);

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <div className="bg-background border rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[700px] relative">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-muted/30">
          <AreaHeader editor={editor} />

          {id && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2 select-none">
              {saveStatus === "saving" && (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span>Saving...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Saved to DB
                  </span>
                </>
              )}
              {saveStatus === "idle" && (
                <>
                  <CloudUpload className="h-3.5 w-3.5 text-muted-foreground/60" />
                  <span>Synced</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="p-8 md:p-12 grow overflow-y-auto bg-background">
          {isFetching ? (
            <div className="flex flex-col items-center justify-center h-[400px] gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading your custom cover letter...
              </p>
            </div>
          ) : (
            <div className="[&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_strong]:font-bold [&_em]:italic">
              <EditorContent editor={editor} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const AreaHeader = React.memo(({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const buttons = [
    {
      onclick: () => editor.chain().focus().toggleBold().run(),
      className: `hover:text-foreground transition-colors p-1 rounded ${editor.isActive("bold") ? "bg-muted text-foreground" : ""}`,
      icon: Bold,
    },
    {
      onclick: () => editor.chain().focus().toggleItalic().run(),
      className: `hover:text-foreground transition-colors p-1 rounded ${editor.isActive("italic") ? "bg-muted text-foreground" : ""}`,
      icon: Italic,
    },
    {
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      className: `hover:text-foreground transition-colors p-1 rounded ${editor.isActive("bulletList") ? "bg-muted text-foreground" : ""}`,
      icon: List,
    },
    {
      onclick: () => editor.chain().focus().setTextAlign("left").run(),
      className: `hover:text-foreground transition-colors p-1 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-muted text-foreground" : ""}`,
      icon: AlignLeft,
    },
    {
      onclick: () => editor.chain().focus().setTextAlign("center").run(),
      className: `hover:text-foreground transition-colors p-1 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-muted text-foreground" : ""}`,
      icon: AlignCenter,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {buttons.map((button, index) => (
        <React.Fragment key={index}>
          <Button
            variant="ghost"
            size="icon"
            onClick={button.onclick}
            className={button.className}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
});
