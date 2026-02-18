
import '../LandingPage.css';
import { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useParams, useNavigate } from 'react-router-dom';
import supabaseClient from '@/utils/supabase';
import { Button } from '@/components/ui/button';

const UploadImages = () => {
    const navigate = useNavigate();
  const { id: property_id } = useParams();
  const { getToken } = useAuth();
  const [imageFiles, setImageFiles] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const filesToUpload = imageFiles.filter(file => file);
      
      if (filesToUpload.length === 0) throw new Error('Please provide at least one image file.');
      if (filesToUpload.length > 5) throw new Error('Maximum 5 images allowed.');

      const supabaseAccessToken = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(supabaseAccessToken);
      const uploadedUrls = [];

      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `property-${property_id}-img-${Date.now()}-${i}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('property-image')
          .upload(fileName, file, { upsert: true });
        if (uploadError) throw uploadError;
        // Get the public URL from Supabase
        const { data: publicUrlData } = supabase.storage.from('property-image').getPublicUrl(fileName);
        if (!publicUrlData?.publicUrl) throw new Error('Could not get public URL for uploaded image.');
        uploadedUrls.push(publicUrlData.publicUrl);
      }

      const inserts = uploadedUrls.map(url => ({ property_id: Number(property_id), image_url: url }));
      const { error: dbError } = await supabase
        .from('images')
        .insert(inserts);
      if (dbError) throw dbError;
      setSuccess(true);
      setImageFiles([null]);

      if (uploadedUrls.length === 5) {
        navigate(`/property/${property_id}`);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <div className="grid-background"></div>
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Upload up to 5 images for property</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {imageFiles.map((file, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const newFiles = [...imageFiles];
                newFiles[idx] = e.target.files[0];
                setImageFiles(newFiles);
              }}
              className="border p-2 rounded w-full"
              required={idx === 0}
            />
            {imageFiles.length > 1 && (
              <Button type="button" variant="destructive" onClick={() => {
                setImageFiles(imageFiles.filter((_, i) => i !== idx));
              }}>Remove</Button>
            )}
          </div>
        ))}
        {imageFiles.length < 5 && (
          <Button type="button" variant="outline" onClick={() => setImageFiles([...imageFiles, null])}>
            + Add image field
          </Button>
        )}
        <Button type="submit" disabled={loading || imageFiles.filter(file => file).length === 0}>
          {loading ? 'Saving...' : 'Save images'}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Images saved successfully!</p>}

    </div>
    </>
  );
};

export default UploadImages;
