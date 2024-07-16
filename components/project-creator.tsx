import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ModelWithImages } from "@/prisma/prisma-utils"
import { Project } from "@prisma/client"

export function ProjectCreator() {
  const [project, setProject] = useState<ModelWithImages<Project>>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<any[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImages([...images, file])
    setPreviewImage(URL.createObjectURL(file))
  }
  const handleSave = () => {
  }
  const handleCancel = () => {
  }
  const handleDelete = () => {
  }
  return (
    <div className="p-2 md:p-10 max-w-4xl h-full">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={project?.title || title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            value={project?.description || description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            rows={4}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="images" className="text-sm font-medium">
            Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {(project?.images || images).map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src="/placeholder.svg"
                  alt={`Image ${index}`}
                  width={200}
                  height={200}
                  className="rounded-md object-cover w-full aspect-square"
                />
                {typeof image !== "string" && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center border-2 border-dashed border-muted rounded-md cursor-pointer hover:border-primary transition-colors"
            >
              <div className="p-4 text-center text-muted-foreground">
                <PlusIcon className="w-8 h-8 mx-auto" />
                <span className="block text-sm font-medium">Add Image</span>
              </div>
              <input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        {project && (
          <Button variant="destructive" className="bg-red-500 text-neutral-200" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}



function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
