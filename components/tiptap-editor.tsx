'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { marked } from 'marked'
import { Button } from "@/components/ui/button"
import { 
  Bold, Italic, Strikethrough,
  List, ListOrdered, Code, Quote, 
  Undo, Redo, ChevronDown, Heading
} from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
      StarterKit
    ],
    content: processedContent,
    editable,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm dark:prose-invert max-w-none w-full h-full',
          'focus:outline-none',
          className
        )
      },
    },
  })

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg">
      {editable && (
        <div className="p-1 flex items-center gap-1 bg-stone-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-1 mr-2">
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
              onClick={() => editor?.chain().focus().toggleStrike().run()} 
              isActive={editor?.isActive('strike')}
              icon={Strikethrough}
              tooltip="Strikethrough"
            />
          </div>
          
          <div className="w-px h-6 bg-stone-200 mx-1" />
          
          <div className="flex items-center gap-1 mr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 px-2 w-auto">
                  <Heading className="h-4 w-4 mr-2" />
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
                  Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                  Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                  Heading 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
              isActive={editor?.isActive('blockquote')}
              icon={Quote}
              tooltip="Quote"
            />
            <MenuButton 
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()} 
              isActive={editor?.isActive('codeBlock')}
              icon={Code}
              tooltip="Code Block"
            />
          </div>
          <div className="flex items-center gap-1">
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
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
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
    </div>
  )
}