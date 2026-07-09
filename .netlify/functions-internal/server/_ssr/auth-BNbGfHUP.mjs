import { i as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BNbGfHUP.js
var loginSchema = objectType({
	email: stringType().email("Enter a valid email"),
	password: stringType().min(6, "At least 6 characters")
});
var signupSchema = objectType({
	email: stringType().email("Enter a valid email"),
	password: stringType().min(8, "At least 8 characters")
});
var forgotSchema = objectType({ email: stringType().email("Enter a valid email") });
var resetSchema = objectType({
	password: stringType().min(8, "At least 8 characters"),
	confirm: stringType().min(8, "At least 8 characters")
}).refine((v) => v.password === v.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
//#endregion
export { signupSchema as i, loginSchema as n, resetSchema as r, forgotSchema as t };
