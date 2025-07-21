import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DropzoneProps {
  onFileSelected: (file: File) => void
  initialFile?: File | null
}

export function ImagePicker({ onFileSelected, initialFile = null }: DropzoneProps) {
  const [file, setFile] = useState<File | null>(initialFile)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      onFileSelected(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      onFileSelected(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    onFileSelected(null as any)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex items-center justify-center border border-dashed rounded-xl h-40 cursor-pointer p-4 text-center transition hover:bg-muted/40",
          !file && "text-muted-foreground"
        )}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {!file ? (
          <span className="text-sm">
            Glissez une image ici ou cliquez pour sélectionner un fichier
          </span>
        ) : (
          <div className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt="aperçu"
              className="h-36 object-contain rounded shadow"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1 right-1 opacity-70 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="text-sm text-muted-foreground truncate">
          Fichier : <strong>{file.name}</strong>
        </div>
      )}
    </div>
  )
}
