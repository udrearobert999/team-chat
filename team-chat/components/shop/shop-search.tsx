'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ChangeEventHandler } from 'react';

const formSchema = z.object({
  content: z.string().min(1),
});

interface ShopSearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const ShopSearch = ({ onChange }: ShopSearchProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      form.reset();
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4">
                  <button
                    type="button"
                    className="absolute top-7 right-8 h-[24px] w-[24px] transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Search className="text-zinc-500 dark:text-zinc-400" />
                  </button>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onChange(e);
                    }}
                    disabled={isLoading}
                    className="placeholder:text-center pr-14 py-6 pl-4 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder="Search for an item"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
