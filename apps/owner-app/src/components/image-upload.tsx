import type React from 'react';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { X, Upload, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: File[]
  existingImages?: Array<{ url: string; order: number; active: boolean }>
  onImagesChange: (images: File[]) => void
  onRemoveExisting?: (index: number) => void
}

export function ImageUpload({ images, existingImages = [], onImagesChange, onRemoveExisting }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    if (files.length > 0) {
      onImagesChange([...images, ...files]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onImagesChange([...images, ...files]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop images here, or{' '}
          <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
            browse
            <input type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" />
          </label>
        </p>
      </div>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Existing Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <Card key={index} className="relative p-2">
                <img
                  src={image.url || '/placeholder.svg'}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={() => onRemoveExisting?.(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Images */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">New Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
                <Card key={index} className="relative p-2 group">
                  <div
                      className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        // Create preview URL for file
                        const previewUrl = URL.createObjectURL(image)
                        const modal = document.createElement("div")
                        modal.className = "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                        modal.innerHTML = `
                      <div class="relative max-w-4xl max-h-full">
                        <img src="${previewUrl}" alt="Preview" class="max-w-full max-h-full object-contain rounded" />
                        <button class="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100" onclick="URL.revokeObjectURL('${previewUrl}'); this.parentElement.parentElement.remove()">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    `
                        modal.onclick = (e) => {
                          if (e.target === modal) {
                            URL.revokeObjectURL(previewUrl)
                            modal.remove()
                          }
                        }
                        document.body.appendChild(modal)
                      }}
                  >
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                  <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage(index)
                      }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
