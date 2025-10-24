import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import api from '../../services/api';

interface ImageUploaderProps {
  token: string;
  onImageUpload: (url: string) => void;
  currentImageUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  token,
  onImageUpload,
  currentImageUrl,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to backend/Cloudinary
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onImageUpload(response.data.url);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload image');
      console.error(err);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300">
        Project Image (Optional)
      </label>

      {/* Preview */}
      <div className="relative">
        {preview ? (
          <div className="relative w-full h-48 bg-dark-800 rounded-lg overflow-hidden border-2 border-primary-500/50">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {/* Crop guide overlay */}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
              <div className="text-center text-white/70">
                <p className="text-xs">Preview (16:9 ratio)</p>
              </div>
            </div>
            {/* Remove button */}
            <button
              onClick={handleRemoveImage}
              disabled={loading}
              className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-lg transition disabled:opacity-50"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 bg-dark-800 rounded-lg border-2 border-dashed border-gray-600 hover:border-primary-500 transition cursor-pointer flex flex-col items-center justify-center gap-3"
          >
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Click to upload image</span>
            <span className="text-xs text-gray-500">16:9 ratio recommended</span>
          </div>
        )}
      </div>

      {/* File input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={loading}
        className="hidden"
      />

      {/* URL Input alternative */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Or paste image URL:</p>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          onBlur={(e) => {
            if (e.target.value) {
              setPreview(e.target.value);
              onImageUpload(e.target.value);
            }
          }}
          className="w-full px-3 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500 transition"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-primary-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
