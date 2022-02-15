import { useMemo } from 'react';
import { getTranslationSection } from '../../services/translationHandler';

const useTranslation = (section: string, withGeneralTranslations: boolean) => {
	return useMemo(() => getTranslationSection(section, withGeneralTranslations), [section, withGeneralTranslations]);
};

export default useTranslation;
