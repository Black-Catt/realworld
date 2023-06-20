import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import {
  Button,
  Container,
  ErrorsList,
  Input,
} from '../../../common/components';
import { useAuth } from '../hooks/useAuthState';

interface SignInPageProps {}

interface SignInFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignInPage: FC<SignInPageProps> = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Container>
      <h1 className="text-4xl text-center mb-4">Sing in</h1>
      <p className="text-center mb-4">
        <Link to="/sign-up">Need an account?</Link>
      </p>
      <form
        className="max-w-xl mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <ErrorsList errors={errors} />
        <Input placeholder="Email" type="email" {...register('email')} />
        <Input
          placeholder="Password"
          type="password"
          {...register('password')}
        />
        <div className="flex justify-end">
          <Button
            btnStyle="GREEN"
            size="LG"
            type="submit"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignInPage;
