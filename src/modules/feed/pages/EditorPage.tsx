import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  ErrorsList,
  Input,
  MDEditorHookForm,
} from '../../../common/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../common/components/Button';
import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetSingleArticleQuery,
} from '../api/repository';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateArticleInDTO } from '../api/dto/create-article.in';
import { EditArticleInDTO } from '../api/dto/edit-article.in';

interface EditorPageProps {}

interface EditorFormValues {
  title: string;
  description: string;
  body: string;
  tags: string;
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
});

const EditorPage: FC<EditorPageProps> = ({}) => {
  const navigate = useNavigate();
  const [triggerCreateArticle] = useCreateArticleMutation();
  const [triggerEditArticle] = useEditArticleMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const { slug } = useParams();
  const { data, isLoading } = useGetSingleArticleQuery(
    { slug: String(slug) },
    { skip: !Boolean(slug) }
  );

  const onSubmit = async (values: EditorFormValues) => {
    try {
      let data: CreateArticleInDTO | EditArticleInDTO;
      if (slug) {
        data = await triggerEditArticle({ ...values, slug }).unwrap();
      } else {
        data = await triggerCreateArticle(values).unwrap();
      }
      navigate(`/article/${data.article.slug}`);
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };
  useEffect(() => {
    if (slug && isLoading) {
      return;
    }
    reset({
      title: data?.article.title,
      description: data?.article.description,
      body: data?.article.body,
      tags: data?.article.tagList.join(', '),
    });
  }, [data]);

  return (
    <Container>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <ErrorsList errors={errors} />
        <Input placeholder="Article Tittle" {...register('title')} />
        <Input
          placeholder="Article About"
          {...register('description')}
          size="SM"
        />
        <MDEditorHookForm control={control} name="body" />
        <Input placeholder="tags" {...register('tags')} size="SM" />
        <div className="flex justify-end">
          <Button
            type="submit"
            size="LG"
            btnStyle="GREEN"
            disabled={isSubmitting}
          >
            Publish
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default EditorPage;
