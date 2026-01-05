import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type PortfolioProject = Tables<"portfolio_projects">;
type ProjectInsert = TablesInsert<"portfolio_projects">;
type ProjectUpdate = TablesUpdate<"portfolio_projects">;

const emptyProject: Partial<ProjectInsert> = {
  client_name: "",
  industry: "",
  description: "",
  image_url: "",
  before_metrics: "",
  after_metrics: "",
  testimonial: "",
  testimonial_author: "",
  testimonial_company: "",
  status: "completed",
  is_visible: true,
  display_order: 0,
};

const PortfolioManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState<Partial<ProjectInsert>>(emptyProject);
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-portfolio-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as PortfolioProject[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (project: ProjectInsert) => {
      const { error } = await supabase.from("portfolio_projects").insert(project);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio-projects"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project created successfully");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error("Failed to create project: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProjectUpdate }) => {
      const { error } = await supabase
        .from("portfolio_projects")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio-projects"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project updated successfully");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error("Failed to update project: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("portfolio_projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio-projects"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete project: " + error.message);
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { error } = await supabase
        .from("portfolio_projects")
        .update({ is_visible })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio-projects"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
    },
  });

  const handleOpenDialog = (project?: PortfolioProject) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        client_name: project.client_name,
        industry: project.industry,
        description: project.description,
        image_url: project.image_url || "",
        before_metrics: project.before_metrics || "",
        after_metrics: project.after_metrics || "",
        testimonial: project.testimonial || "",
        testimonial_author: project.testimonial_author || "",
        testimonial_company: project.testimonial_company || "",
        status: project.status || "completed",
        is_visible: project.is_visible ?? true,
        display_order: project.display_order || 0,
      });
    } else {
      setEditingProject(null);
      setFormData({ ...emptyProject, display_order: (projects?.length || 0) + 1 });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData(emptyProject);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name || !formData.industry || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData as ProjectInsert);
    }
  };

  const handleInputChange = (field: keyof ProjectInsert, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Manage your portfolio projects
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name || ""}
                    onChange={(e) => handleInputChange("client_name", e.target.value)}
                    placeholder="e.g., Acme Fintech"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={formData.industry || ""}
                    onValueChange={(value) => handleInputChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fintech">Fintech</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="SME">SME</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the project and what was achieved..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Project Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url || ""}
                  onChange={(e) => handleInputChange("image_url", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="before_metrics">Before Metrics</Label>
                  <Input
                    id="before_metrics"
                    value={formData.before_metrics || ""}
                    onChange={(e) => handleInputChange("before_metrics", e.target.value)}
                    placeholder="e.g., 10K visitors/month"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="after_metrics">After Metrics</Label>
                  <Input
                    id="after_metrics"
                    value={formData.after_metrics || ""}
                    onChange={(e) => handleInputChange("after_metrics", e.target.value)}
                    placeholder="e.g., 150K visitors/month"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial">Client Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial || ""}
                  onChange={(e) => handleInputChange("testimonial", e.target.value)}
                  placeholder="What the client said about the project..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial_author">Testimonial Author</Label>
                  <Input
                    id="testimonial_author"
                    value={formData.testimonial_author || ""}
                    onChange={(e) => handleInputChange("testimonial_author", e.target.value)}
                    placeholder="e.g., John Doe, CEO"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial_company">Author's Company</Label>
                  <Input
                    id="testimonial_company"
                    value={formData.testimonial_company || ""}
                    onChange={(e) => handleInputChange("testimonial_company", e.target.value)}
                    placeholder="e.g., Acme Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status || "completed"}
                    onValueChange={(value) => handleInputChange("status", value as "active" | "upcoming" | "completed")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order || 0}
                    onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_visible"
                  checked={formData.is_visible ?? true}
                  onCheckedChange={(checked) => handleInputChange("is_visible", checked)}
                />
                <Label htmlFor="is_visible">Visible on website</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="hero"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending 
                    ? "Saving..." 
                    : editingProject ? "Update Project" : "Create Project"
                  }
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-premium p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg" />
                <div className="flex-1">
                  <div className="h-5 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first portfolio project to showcase your work.
          </p>
          <Button variant="hero-outline" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`card-premium p-4 transition-opacity ${!project.is_visible ? "opacity-60" : ""}`}
            >
              <div className="flex gap-4">
                {/* Drag handle */}
                <div className="flex items-center text-muted-foreground cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.client_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full gradient-cta flex items-center justify-center">
                      <span className="text-white text-xl font-bold opacity-50">
                        {project.client_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{project.client_name}</h4>
                    <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
                      {project.industry}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      project.status === "completed" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : project.status === "active"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  {project.before_metrics && project.after_metrics && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {project.before_metrics} → {project.after_metrics}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleVisibilityMutation.mutate({ 
                      id: project.id, 
                      is_visible: !project.is_visible 
                    })}
                    title={project.is_visible ? "Hide from website" : "Show on website"}
                  >
                    {project.is_visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(project)}
                    title="Edit project"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this project?")) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                    title="Delete project"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
