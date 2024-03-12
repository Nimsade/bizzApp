import Joi from "joi";

import { validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
	first: Joi.string().min(2).max(256).required(),
});
const middleSchema = Joi.object({
	middle: Joi.string().min(2).max(256),
});
const lastSchema = Joi.object({
	last: Joi.string().min(2).max(256).required(),
});

const phoneSchema = Joi.object({
	phone: Joi.string().min(9).max(11).required(),
});

const urlSchema = Joi.object({
	url: Joi.string().min(14),
});
const altSchema = Joi.object({
	alt: Joi.string().min(2),
});
const stateSchema = Joi.object({
	state: Joi.string().min(2).max(256),
});
const countrySchema = Joi.object({
	country: Joi.string().min(2).max(256).required(),
});
const citySchema = Joi.object({
	city: Joi.string().min(2).max(256).required(),
});
const streetSchema = Joi.object({
	street: Joi.string().min(2).max(256).required(),
});
const houseNumberSchema = Joi.object({
	houseNumber: Joi.number().min(2).max(99999999).required(),
});
const zipSchema = Joi.object({
	zip: Joi.number().min(2).max(999999999).required(),
});
const isBusinessSchema = Joi.object({
	isBusiness: Joi.boolean().invalid(true).required(),
});

const validateFirstSchema = (first) => firstSchema.validate(first);
const validateMiddleSchema = (middle) => middleSchema.validate(middle);
const validateLastSchema = (last) => lastSchema.validate(last);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateStateSchema = (state) => stateSchema.validate(state);
const validateCountrySchema = (country) => countrySchema.validate(country);
const validateCitySchema = (city) => citySchema.validate(city);
const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHousenumberSchema = (houseNumber) =>
	houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);
const validateIsBusinessSchema = (isBusiness) =>
	isBusinessSchema.validate(isBusiness);

const validateSchema = {
	first: validateFirstSchema,
	email: validateEmailLogin,
	password: validatePasswordLogin,
	middle: validateMiddleSchema,
	last: validateLastSchema,
	phone: validatePhoneSchema,
	url: validateUrlSchema,
	alt: validateAltSchema,
	state: validateStateSchema,
	country: validateCountrySchema,
	city: validateCitySchema,
	street: validateStreetSchema,
	houseNumber: validateHousenumberSchema,
	zip: validateZipSchema,
	isBusiness: validateIsBusinessSchema,
};

export { validateSchema };
