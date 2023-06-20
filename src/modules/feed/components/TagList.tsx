import { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

enum TagListStyle {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

interface TagListProps {
  list: string[];
  itemStyle?: keyof typeof TagListStyle;
}

const TagList: FC<TagListProps> = ({
  list,
  itemStyle = TagListStyle.LIGHT,
}) => {
  const itemClasses = clsx(
    'font-light px-2 py-0.5 text-date border mr-1 mb-0.2  rounded-tag hover:bg-black hover:text-white hover:border-black hover:no-underline',
    {
      'border-gray-300 text-gray-600': itemStyle === TagListStyle.LIGHT,
      'bg-zinc-600 border-zinc-600 text-white hover:bg-gray-900':
        itemStyle === TagListStyle.DARK,
    }
  );

  return (
    <ul className="flex flex-wrap gap-y-1">
      {list.map((tag) => {
        return (
          <Link key={tag} to={`/?tag=${tag}`} className={itemClasses}>
            <li>{tag}</li>
          </Link>
        );
      })}
    </ul>
  );
};
export default TagList;
