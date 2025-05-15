import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import { Bug } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface FormData {
  title: string;
  description: string;
  steps: string;
  status: Bug['status'];
  priority: Bug['priority'];
  projectId: string;
  assigneeId: string;
}

const BugForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { bugs, users, projects, addBug, updateBug, currentUser } = useApp();
  
  const defaultFormData: FormData = {
    title: '',
    description: '',
    steps: '',
    status: 'new',
    priority: 'medium',
    projectId: projects[0]?.id || '',
    assigneeId: '',
  };
  
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (isEditing && id) {
      const bug = bugs.find(b => b.id === id);
      if (bug) {
        setFormData({
          title: bug.title,
          description: bug.description,
          steps: bug.steps,
          status: bug.status,
          priority: bug.priority,
          projectId: bug.projectId,
          assigneeId: bug.assigneeId || '',
        });
      } else {
        navigate('/bugs');
      }
    }
  }, [isEditing, id, bugs, navigate]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.projectId) {
      newErrors.projectId = 'Project is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      if (isEditing && id) {
        updateBug(id, {
          title: formData.title,
          description: formData.description,
          steps: formData.steps,
          status: formData.status,
          priority: formData.priority,
          projectId: formData.projectId,
          assigneeId: formData.assigneeId || null,
        });
        navigate(`/bugs/${id}`);
      } else {
        addBug({
          title: formData.title,
          description: formData.description,
          steps: formData.steps,
          status: formData.status,
          priority: formData.priority,
          projectId: formData.projectId,
          assigneeId: formData.assigneeId || null,
          reporterId: currentUser.id,
        });
        navigate('/bugs');
      }
      
      setIsSubmitting(false);
    }, 500);
  };
  
  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];
  
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];
  
  const projectOptions = projects.map(project => ({
    value: project.id,
    label: project.name,
  }));
  
  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    ...users.map(user => ({ value: user.id, label: user.name })),
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/bugs')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bugs
        </Button>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className="text-xl font-bold">
              {isEditing ? 'Edit Bug' : 'New Bug'}
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Bug title"
              error={errors.title}
              required
            />
            
            <Textarea
              label="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the issue"
              rows={4}
              error={errors.description}
              required
            />
            
            <Textarea
              label="Steps to Reproduce"
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="Step-by-step instructions to reproduce the bug"
              rows={4}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Status"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />
              
              <Select
                label="Priority"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                options={priorityOptions}
              />
              
              <Select
                label="Project"
                id="projectId"
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                options={projectOptions}
                error={errors.projectId}
              />
              
              <Select
                label="Assignee"
                id="assigneeId"
                name="assigneeId"
                value={formData.assigneeId}
                onChange={handleChange}
                options={assigneeOptions}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update Bug' : 'Create Bug'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BugForm;