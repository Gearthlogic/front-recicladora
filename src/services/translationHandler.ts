import translations from '../assets/translations';

const getLanguaje = () => 'es';

const objectMap = (obj: any, fn: any) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export const getTranslationSection = (section: string, withGeneralTranslations: boolean) => {
	const lang = getLanguaje();
	if (section in translations) {
		//@ts-ignore ignoro ya que ts no entiende que ya esta
		//verificado que section sea parte de translations
		let sectionObject = translations[section];
		if (withGeneralTranslations) {
			sectionObject = Object.assign(sectionObject, translations['generalTranslations']);
		}
		let translationObject = {};
		if (sectionObject) {
			translationObject = objectMap(sectionObject, (tr: { [x: string]: any; }) => tr[lang]);
		}
		return translationObject;
	} else {
		return null;
	}
};
