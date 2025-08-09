import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { Bug } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { getUserById } from '../../lib/mock-data';
import { formatDate } from '../../utils/format';

interface BugCommentsProps {
  bug: Bug;
}

const BugComments: React.FC<BugCommentsProps> = ({ bug }) => {
  const { addComment, currentUser } = useApp();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      addComment(bug.id, comment);
      setComment('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium">Comments ({bug.comments.length})</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {bug.comments.length > 0 ? (
          <div className="space-y-4">
            {bug.comments.map((comment) => {
              const author = getUserById(comment.authorId);
              return (
                <div key={comment.id} className="flex space-x-3 animate-in fade-in duration-300">
                  {author && (
                    <img 
                      src={author.avatar} 
                      alt={author.name} 
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{author?.name}</span>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-line">{comment.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No comments yet. Be the first to comment.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-start space-x-3 w-full">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full"
              />
              <div className="mt-2 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={!comment.trim() || isSubmitting}
                  isLoading={isSubmitting}
                  className="flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default BugComments;