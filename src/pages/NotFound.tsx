import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead title="404 — Page Not Found" />

      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="font-display font-light text-dark/10 text-[120px] md:text-[200px] leading-none select-none">
            404
          </div>
          <h1 className="font-display text-dark font-light text-3xl mb-3">
            {t('common.notFound')}
          </h1>
          <p className="font-sans text-muted text-sm mb-8">
            {t('common.notFoundSub')}
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              {t('common.goHome')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
