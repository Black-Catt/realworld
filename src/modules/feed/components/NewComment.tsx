import { FC } from 'react';
import { useAuth } from '../../auth/hooks/useAuthState';
import { useForm } from 'react-hook-form';
import { Button, TextArea } from '../../../common/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateCommentMutation } from '../api/repository';
import { toast } from 'react-hot-toast';

interface NewCommentProps {
  slug: string;
}

interface NewCommentFormValues {
  comment: string;
}

const validationSchema = yup.object({
  comment: yup.string().required(),
});

const NewComment: FC<NewCommentProps> = ({ slug }) => {
  const auth = useAuth();
  const [triggerCreateComment] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      comment: '',
    },
    resolver: yupResolver(validationSchema),
  });

  if (!auth.isLoggedIn) {
    return <p></p>;
  }

  const onSubmit = async (values: NewCommentFormValues) => {
    try {
      await triggerCreateComment({
        articleSlug: slug,
        comment: values.comment,
      }).unwrap();
      reset();
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-250 rounded fdf"
    >
      <TextArea
        placeholder="Leave your comment"
        {...register('comment')}
        noBorder
        size="SM"
        rows={4}
        className="py-3 px-6"
      />
      <div className="border-t border-gray-250 bg-gray-150 py-3 px-5 flex justify-between items-center">
        <img
          src={auth.user?.image}
          alt={`${auth.user?.username} avatar`}
          className="w-8 h-8 rounded-full inline mr-2"
        />
        <Button type="submit" btnStyle="GREEN" disabled={isSubmitting}>
          Post comment
        </Button>
      </div>
    </form>
  );
};

export default NewComment;
