import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, Play, Plus, X } from "lucide-react";

const EventVendorVideos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videos, setVideos] = useState<Array<{
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
  }>>([]);

  const handleAddVideo = () => {
    if (!videoUrl || !videoTitle) {
      toast({
        title: "Missing Information",
        description: "Please provide both video URL and title.",
        variant: "destructive",
      });
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      title: videoTitle,
      description: videoDescription,
      url: videoUrl,
      thumbnail: "/placeholder.svg"
    };

    setVideos([...videos, newVideo]);
    setVideoUrl("");
    setVideoTitle("");
    setVideoDescription("");

    toast({
      title: "Video Added",
      description: "Video has been added to your showcase.",
    });
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleFileUpload = () => {
    toast({
      title: "Storage Setup Required",
      description: "Video upload functionality will be available once storage is configured.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Service Videos</h1>
        <p className="text-muted-foreground">Add videos to highlight your services in action</p>
      </div>

      <div className="grid gap-6">
        {/* Video Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Upload Videos
            </CardTitle>
            <CardDescription>
              Showcase your work with videos that demonstrate your skills and services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div 
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
              onClick={handleFileUpload}
            >
              <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop video files here or click to browse</p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports MP4, MOV, AVI files up to 100MB
              </p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>

            {/* Video URL Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex-1 h-px bg-border"></div>
                <span>OR</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    placeholder="Wedding Reception Setup"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="video-description">Description (Optional)</Label>
                  <Textarea
                    id="video-description"
                    placeholder="Brief description of what this video showcases..."
                    rows={3}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                  />
                </div>

                <Button onClick={handleAddVideo} className="w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Gallery */}
        {videos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Video Showcase</CardTitle>
              <CardDescription>
                {videos.length} video{videos.length !== 1 ? 's' : ''} in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {videos.map((video) => (
                  <div key={video.id} className="relative group">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveVideo(video.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-medium">{video.title}</h4>
                      {video.description && (
                        <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Video Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 text-sm">
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">Tip</Badge>
                <p>Keep videos under 2 minutes for better engagement</p>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">Tip</Badge>
                <p>Show the process, not just the final result</p>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">Tip</Badge>
                <p>Include before-and-after transformations when relevant</p>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="shrink-0">Tip</Badge>
                <p>Add captions or text overlays to highlight key points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => navigate("/dashboard/vendor-gallery")}>
            Previous: Service Gallery
          </Button>
          <Button onClick={() => navigate("/dashboard/vendor-pricing")}>
            Next: Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventVendorVideos;