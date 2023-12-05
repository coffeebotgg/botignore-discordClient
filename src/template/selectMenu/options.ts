import {
	selectmenuId,
	IDE_Id,
	TemplateId,
	FrameworkId,
	LanguageId,
	ApplicationId,
} from "../../constants/customId";

interface IOptions {
	label: string;
	value: string;
	description?: string;
	emoji?: string;
}

export const InitOptions: IOptions[] = [
	{
		label: "IDE Options",
		value: selectmenuId.IDE,
		description: "Select IDE specific options",
		emoji: "👨‍💻",
	},
	{
		label: "Language Options",
		value: selectmenuId.language,
		description: "Chose your language",
		emoji: "🌐",
	},
	{
		label: "Application Options",
		value: selectmenuId.apps,
		description: "Select application specific options",
		emoji: "📱",
	},
	{
		label: "Framework Options",
		value: selectmenuId.framework,
		description: "Select framework specific options",
		emoji: "📦",
	},
	{
		label: "Template Options",
		value: selectmenuId.templates,
		description: "Select pre-defined templates",
		emoji: "📄",
	},
];

export const IDEOptions: IOptions[] = Object.values(IDE_Id).map((id) => {
	return {
		label: id.value,
		value: id.file,
	};
});
export const TemplatesOptions: IOptions[] = Object.values(TemplateId).map(
	(id) => {
		return {
			label: id.value,
			value: id.file,
		};
	}
);
export const LanguageOptions: IOptions[] = Object.values(LanguageId).map(
	(id) => {
		return {
			label: id.value,
			value: id.file,
		};
	}
);
export const FrameworkOptions: IOptions[] = Object.values(FrameworkId).map(
	(id) => {
		return {
			label: id.value,
			value: id.file,
		};
	}
);
export const ApplicationOptions: IOptions[] = Object.values(ApplicationId).map(
	(id) => {
		return {
			label: id.value,
			value: id.file,
		};
	}
);
