import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Input, TextArea } from '../../../common/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../auth/hooks/useAuthState';
import { toast } from 'react-hot-toast';
import { useUpdateUserMutation } from '../api/repository';
import { useNavigate } from 'react-router-dom';
import { ErrorsList } from '../../../common/components/ErrorsList';

interface SettingsPageProps {}

interface SettingsFormValues {
  avatar: string;
  username: string;
  bio: string;
  email: string;
  newPassword: string;
}

const validationSchema = yup.object({
  avatar: yup.string().url().required(),
  username: yup.string().min(3).required(),
  bio: yup.string(),
  email: yup.string().email().required(),
  newPassword: yup.string(),
});

const SettingsPage: FC<SettingsPageProps> = ({}) => {
  const auth = useAuth();
  const [triggerUpdateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: auth.user?.image || 'Image link',
      username: auth.user?.username || 'username',
      bio: auth.user?.bio || '',
      email: auth.user?.email || 'email',
      newPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await triggerUpdateUser(values).unwrap();
      navigate(`/${encodeURIComponent(values.username)}`);
      auth.logOut();
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Container>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <ErrorsList errors={errors} />

        <Input
          placeholder="URL of profile picture"
          {...register('avatar')}
          size="SM"
        />
        <Input placeholder="Username" {...register('username')} />
        <TextArea placeholder="Your bio" {...register('bio')} rows={10} />
        <Input placeholder="Email" {...register('email')} type="email" />
        <Input
          placeholder="New password"
          {...register('newPassword')}
          type="password"
        />
        <div className="flex justify-end">
          <Button type="submit" btnStyle="GREEN" size="LG">
            Update
          </Button>
        </div>
      </form>
    </Container>
  );
};
export default SettingsPage;
