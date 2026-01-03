import { useState } from "react";
import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortfolioManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Manage your portfolio projects
        </p>
        <Button variant="hero" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="card-premium p-12 text-center">
        <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
        <p className="text-muted-foreground mb-4">
          Add your first portfolio project to showcase your work.
        </p>
        <Button variant="hero-outline">
          <Plus className="w-4 h-4 mr-2" />
          Add First Project
        </Button>
      </div>
    </div>
  );
};

export default PortfolioManager;
