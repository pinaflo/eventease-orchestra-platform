import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Image, X, Eye, Camera, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const EventVendorGallery = () => {
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: string;
    url: string;
    name: string;
    category: string;
    description: string;
  }>>([]);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    "Wedding Events",
    "Corporate Events", 
    "Birthday Parties",
    "Cultural Events",
    "Social Gatherings",
    "Festival Events",
    "Other"
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // For now, just show toast since storage isn't set up
    toast({
      title: "Files detected!",
      description: "Storage setup needed to upload files. Please configure storage first.",
      variant: "default",
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // For now, just show toast since storage isn't set up
      toast({
        title: "Files selected!",
        description: "Storage setup needed to upload files. Please configure storage first.",
        variant: "default",
      });
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Gallery saved!",
      description: "Your work portfolio has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/vendor-availability">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Availability
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Upload photos of your past work to showcase your skills
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Work Photos
            </CardTitle>
            <CardDescription>
              Drag and drop photos or click to select files. Showcase your best work!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Upload your work photos</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Drag and drop files here, or click to select
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">JPG</Badge>
                  <Badge variant="secondary">PNG</Badge>
                  <Badge variant="secondary">WEBP</Badge>
                  <Badge variant="secondary">Max 5MB</Badge>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" className="mt-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mt-6 space-y-3">
              <Label>Categorize Your Work</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="cursor-pointer justify-center py-2 transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Photo Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">High-quality images</p>
                  <p className="text-muted-foreground">Use good lighting and clear photos</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Show variety</p>
                  <p className="text-muted-foreground">Include different types of events</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Before & after</p>
                  <p className="text-muted-foreground">Show transformation or process</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">4</span>
                </div>
                <div>
                  <p className="font-medium">Professional presentation</p>
                  <p className="text-muted-foreground">Keep photos clean and focused</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Gallery */}
      {uploadedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Your Gallery ({uploadedImages.length} photos)
            </CardTitle>
            <CardDescription>
              Preview and manage your uploaded work photos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-medium truncate">{image.name}</p>
                    <p className="text-gray-300">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {uploadedImages.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Image className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No photos uploaded yet</h3>
                <p className="text-muted-foreground">
                  Start building your portfolio by uploading photos of your work
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/dashboard/vendor-availability">
            Previous
          </Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard/vendor-videos">
            Next: Service Videos
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventVendorGallery;