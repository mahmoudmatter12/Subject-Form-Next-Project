'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

const subjectSchema = z.object({
  subjectCode: z.string().min(1, 'Subject code is required'),
  name: z.string().min(1, 'Name is required'),
  isOpen: z.boolean().default(false),
  prerequisites: z.string().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  defaultValues?: SubjectFormValues;
  onSubmit?: SubmitHandler<SubjectFormValues>;
  isEdit?: boolean;
  onSubjectAdded?: (subject: SubjectFormValues) => void;
}

export default function SubjectForm({ defaultValues, isEdit = false, onSubjectAdded }: SubjectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<SubjectFormValues> = async (data) => {
    try {
      const response = await fetch('/api/subjects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjectName: data.name,
          subjectCode: data.subjectCode,
          isOpen: data.isOpen,
          prerequisites: data.prerequisites,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        const errorData = JSON.parse(text);
        toast.error(errorData.error || 'An error occurred');
        return;
      }

      const result = JSON.parse(text);
      // console.log(result);
      toast.success(`Subject ${isEdit ? 'updated' : 'created'} successfully!`);
      window.location.reload();
      setIsOpen(false);
      reset();
      if (onSubjectAdded) {
        onSubjectAdded(result);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className='bg-gray-900'>
          <Button variant="outline">{isEdit ? 'Edit Subject' : 'Add Subject'}</Button>
        </DialogTrigger>
        <DialogContent className="w-96 bg-gradient-to-bl from-gray-800 to-black">
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
            <DialogDescription>
              {isEdit ? 'Update the subject details.' : 'Fill out the form to add a new subject.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <div>
                <Label htmlFor="name" className=' pb-4 ' >Name</Label>
                <Input id="name" {...register('name')} placeholder="Enter subject name" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <br />
              <hr className="border-gray-500 mb-4 " />
              <Label htmlFor="subjectCode" className=' pb-4 ' >Subject Code</Label>
              <Input
                id="subjectCode"
                {...register('subjectCode')}
                placeholder="Enter subject code"
              />
              {errors.subjectCode && (
                <p className="text-sm text-red-500">{errors.subjectCode.message}</p>
              )}
            </div>
            <hr className="border-gray-500 mb-4 " />
            <div>
              <Label htmlFor="prerequisites" className=' pb-4 '>Prerequisites</Label>
              <Input
                id="prerequisites"
                {...register('prerequisites')}
                placeholder="Enter prerequisites (comma separated)"
              />
              {errors.prerequisites && (
                <p className="text-sm text-red-500">{errors.prerequisites.message}</p>
              )}
            </div>
            <hr className="border-gray-500 mb-4 " />
            
            <div className="flex items-center space-x-2 border-2 border-gray-500 p-2 rounded-lg">
              <Controller
                name="isOpen"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isOpen"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked ?? false)}
                  />
                )}
              />
              <Label htmlFor="isOpen">Is Open for Enrollment</Label>

            </div>
            <hr className="border-gray-500 mb-4 " />
            <Button className='cursor-pointer bg-gray-600 ' type="submit">{isEdit ? 'Update Subject' : 'Add Subject'}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}