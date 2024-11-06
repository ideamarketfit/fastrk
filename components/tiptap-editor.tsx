'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { marked } from 'marked'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Bold, Italic, List, Heading1, Heading2, Heading3, 
  Code, Quote, ListOrdered, Undo, Redo, Text, Link as LinkIcon
} from 'lucide-react'
import { cn } from "@/lib/utils"

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: React.ElementType;
  tooltip: string;
}

const MenuButton = ({ onClick, isActive, icon: Icon, tooltip }: MenuButtonProps) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className={`${isActive ? 'bg-muted' : ''} hover:bg-muted/50 transition-colors`}
    title={tooltip}
  >
    <Icon className="h-5 w-5" />
  </Button>
)

interface TiptapEditorProps {
  content?: string;
  editable?: boolean;
  className?: string;
  isMarkdown?: boolean;
}

export function TiptapEditorComponent({ 
  content = 'Start typing here...', 
  editable = true,
  className = '',
  isMarkdown = true
}: TiptapEditorProps) {
  const processedContent = isMarkdown ? marked(content) : content;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-muted/50 rounded-md p-4 font-mono text-sm'
          }
        }
      })
    ],
    content: processedContent,
    editable,
    editorProps: {
      attributes: {
        class: cn(
          'prose dark:prose-invert max-w-none w-full h-full',
          'focus:outline-none',
          className
        )
      },
    },
  })

  return (
    <Card className="w-full h-full">
      <CardContent className="p-0 h-full flex flex-col">
        {editable && (
          <div className="flex flex-wrap gap-1 p-2 bg-muted/30 border-b">
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleBold().run()} 
              isActive={editor?.isActive('bold')}
              icon={Bold}
              tooltip="Bold"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleItalic().run()} 
              isActive={editor?.isActive('italic')}
              icon={Italic}
              tooltip="Italic"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleBulletList().run()} 
              isActive={editor?.isActive('bulletList')}
              icon={List}
              tooltip="Bullet List"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
              isActive={editor?.isActive('orderedList')}
              icon={ListOrdered}
              tooltip="Numbered List"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
              isActive={editor?.isActive('heading', { level: 1 })}
              icon={Heading1}
              tooltip="Heading 1"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
              isActive={editor?.isActive('heading', { level: 2 })}
              icon={Heading2}
              tooltip="Heading 2"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
              isActive={editor?.isActive('heading', { level: 3 })}
              icon={Heading3}
              tooltip="Heading 3"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()} 
              isActive={editor?.isActive('codeBlock')}
              icon={Code}
              tooltip="Code Block"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
              isActive={editor?.isActive('blockquote')}
              icon={Quote}
              tooltip="Blockquote"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().setParagraph().run()} 
              isActive={editor?.isActive('paragraph')}
              icon={Text}
              tooltip="Paragraph"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().undo().run()} 
              icon={Undo}
              tooltip="Undo"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().redo().run()} 
              icon={Redo}
              tooltip="Redo"
            />
          </div>
        )}
        <div className="flex-grow overflow-y-auto relative">
          <EditorContent 
            editor={editor} 
            className={cn(
              "h-full px-6 py-4",
              className
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}