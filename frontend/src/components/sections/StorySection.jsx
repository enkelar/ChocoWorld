import { useLanguage } from '../../context/LanguageContext';
import './StorySection.css';

export function StorySection() {
  const { t } = useLanguage();

  return (
    <section className="cw-story">
      <div className="container cw-story-inner">
        <span className="eyebrow" style={{ textAlign: 'center' }}>
          {t('story_eyebrow')}
        </span>
        <h2 className="font-serif cw-story-title">
          {t('story_title')}
        </h2>
      </div>
    </section>
  );
}
